"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Loader2, AlertCircle, XCircle } from "lucide-react";

import { type User } from "@/lib/api";

const BASE_URL = "https://backend-obd-production.up.railway.app/api/v1";

// Retry configuration - до 15 секунд попыток
const MAX_RETRY_TIME_MS = 15000; // 15 секунд максимум
const RETRY_INTERVAL_MS = 1500;  // пауза между попытками

// Серверные ошибки которые означают "холодный старт" - нужно повторить
const RETRYABLE_STATUS_CODES = [500, 502, 503, 504];

/**
 * Fetch with retry logic for cold start handling
 * Retries on server errors (500, 502, 503, 504) and network errors
 * Gives up after 15 seconds total
 */
async function fetchWithRetry(
  url: string,
  options?: RequestInit,
  onRetry?: (attemptNumber: number, elapsedMs: number) => void,
): Promise<Response> {
  const startTime = Date.now();
  let attempt = 0;

  while (true) {
    attempt++;
    const elapsed = Date.now() - startTime;

    // Проверяем таймаут
    if (elapsed > MAX_RETRY_TIME_MS) {
      throw new Error(`Timeout after ${Math.round(elapsed / 1000)}s`);
    }

    try {
      const response = await fetch(url, options);

      // Успех - возвращаем сразу
      if (response.ok) {
        return response;
      }

      // Клиентские ошибки (400-499) - не retry, возвращаем как есть
      if (response.status >= 400 && response.status < 500) {
        return response;
      }

      // Серверные ошибки (500+) - retry если это "холодный старт"
      if (RETRYABLE_STATUS_CODES.includes(response.status)) {
        onRetry?.(attempt, elapsed);
        await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL_MS));
        continue;
      }

      // Другие ошибки - возвращаем
      return response;
    } catch {
      // Сетевая ошибка - retry
      onRetry?.(attempt, elapsed);
      await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL_MS));
    }
  }
}

interface AuthError {
  type: "missing_token" | "session_expired" | "user_not_found" | "generic";
  message: string;
  detail?: string;
}

function getAuthError(
  status: number,
  data: Record<string, unknown>,
): AuthError {
  // Проверяем requiresLogin - сессия истекла или пользователь не найден
  if (data.requiresLogin === true) {
    if (data.detail === "User not found.") {
      return {
        type: "user_not_found",
        message: "Account not found",
        detail:
          "We couldn't find your account. Please make sure you're signed in to the app.",
      };
    }
    return {
      type: "session_expired",
      message: "Session expired",
      detail:
        "Your session has expired. Please close this window and tap 'Manage Subscription' again in the app.",
    };
  }

  // Проверяем другие ошибки по detail
  if (data.detail === "Refresh token is required.") {
    return {
      type: "missing_token",
      message: "Authorization required",
      detail:
        "Please close this window and tap 'Manage Subscription' again in the app.",
    };
  }

  if (data.detail === "Invalid token type.") {
    return {
      type: "session_expired",
      message: "Invalid session",
      detail:
        "Your session is invalid. Please close this window and tap 'Manage Subscription' again in the app.",
    };
  }

  // Общая ошибка
  return {
    type: "generic",
    message: "Authentication failed",
    detail:
      "Something went wrong. Please close this window and try again from the app.",
  };
}

export default function MobileBridgePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginFromMobileBridge } = useAuth();
  const [error, setError] = useState<AuthError | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const loginAttempted = useRef(false);

  // Effect: Handle login when we have a token
  useEffect(() => {
    const token = searchParams.get("token");

    // Если нет токена - показываем ошибку вместо редиректа
    if (!token) {
      setError({
        type: "missing_token",
        message: "No authorization token",
        detail:
          "Please close this window and tap 'Manage Subscription' again in the app.",
      });
      setIsLoading(false);
      return;
    }

    // Предотвращаем повторный вызов
    if (loginAttempted.current) return;
    loginAttempted.current = true;

    // Получаем redirect path (по умолчанию subscription)
    const redirectPath = searchParams.get("redirect") || "/dashboard/subscription";

    const doLogin = async () => {
      try {
        const url = `${BASE_URL}/auth/mobile-bridge/?token=${encodeURIComponent(token)}`;

        const res = await fetchWithRetry(
          url,
          {
            method: "GET",
            credentials: "include",
          },
          // Callback при каждом retry - обновляем UI
          (attemptNumber) => {
            setRetryCount(attemptNumber);
          }
        );

        if (!res.ok) {
          // Пытаемся получить детали ошибки от бэкенда
          let errorData: Record<string, unknown> = {};
          try {
            errorData = await res.json();
          } catch {
            // Если не удалось распарсить JSON
          }

          const authError = getAuthError(res.status, errorData);
          setError(authError);
          setIsLoading(false);
          return;
        }

        const data = await res.json();

        // Response format: { success: true, user: {...}, access: "jwt_session_token" }
        if (data.success === true && data.access && data.user) {
          // Формируем полный User объект
          const userData: User = {
            id: data.user.id,
            email: data.user.email,
            first_name: data.user.first_name || "",
            last_name: data.user.last_name || "",
            phone: data.user.phone || null,
            avatar: data.user.avatar || null,
            is_verified: data.user.is_verified ?? true,
          };
          
          // Простая авторизация - сохраняем токен и user, устанавливаем state
          // НЕ делаем никаких дополнительных API запросов
          loginFromMobileBridge(data.access, userData);
          
          // Сразу редиректим - state уже обновлен синхронно
          router.replace(redirectPath);
        } else {
          setError({
            type: "generic",
            message: "Authentication failed",
            detail:
              "The server response was invalid. Please close this window and try again from the app.",
          });
          setIsLoading(false);
        }
      } catch {
        setError({
          type: "generic",
          message: "Connection error",
          detail:
            "Could not connect to the server. Please check your internet connection, close this window, and try again.",
        });
        setIsLoading(false);
      }
    };

    doLogin();
  }, [searchParams, loginFromMobileBridge, router]);

  // Показываем ошибку с инструкциями вместо редиректа
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            {error.type === "session_expired" ||
            error.type === "missing_token" ? (
              <AlertCircle className="h-8 w-8 text-destructive" />
            ) : (
              <XCircle className="h-8 w-8 text-destructive" />
            )}
          </div>

          <h1 className="mb-2 text-xl font-semibold text-foreground">
            {error.message}
          </h1>

          <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
            {error.detail}
          </p>

          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <p className="text-xs font-medium text-muted-foreground">
              How to retry:
            </p>
            <ol className="mt-2 space-y-1 text-left text-xs text-muted-foreground">
              <li>1. Close this window</li>
              <li>2. Go back to the app</li>
              <li>3. Tap &quot;Manage Subscription&quot; again</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">
          {retryCount === 0 
            ? "Signing you in..." 
            : `Connecting to server... (attempt ${retryCount + 1})`
          }
        </p>
        {retryCount > 0 && (
          <p className="text-xs text-muted-foreground/70">
            Server is waking up, please wait
          </p>
        )}
      </div>
    );
  }

  return null;
}
