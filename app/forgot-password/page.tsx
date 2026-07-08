"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Loader2,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

const BASE_URL = "https://backend-obd-production.up.railway.app/api/v1";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || cooldown > 0) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${BASE_URL}/auth/password/reset/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.status === 429) {
        const data = await response.json().catch(() => ({}));
        const retryAfter: number =
          typeof data.retry_after === "number" ? data.retry_after : 30;
        setCooldown(retryAfter);
        setMessage(
          `Слишком много запросов. Повторите через ${retryAfter} секунд.`,
        );
        return;
      }

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setMessage(
          data.detail ||
            data.message ||
            "Не удалось отправить письмо. Попробуйте ещё раз.",
        );
        return;
      }

      setSuccess(true);
      setCooldown(30);
      setMessage("Письмо с инструкциями отправлено на вашу почту.");
    } catch {
      setMessage("Ошибка сети. Проверьте подключение и попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  // Countdown timer
  useEffect(() => {
    if (cooldown === 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  if (success) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">
              Проверьте почту
            </h1>
            <p className="text-muted-foreground mb-6">
              Мы отправили инструкции по сбросу пароля на{" "}
              <strong className="text-foreground">{email}</strong>
            </p>

            {message && (
              <p className="text-sm text-muted-foreground mb-4">{message}</p>
            )}

            {/* Allow resend after cooldown expires */}
            {cooldown > 0 ? (
              <Button
                variant="outline"
                size="lg"
                className="w-full mb-3"
                disabled
              >
                Повторить через {cooldown}с
              </Button>
            ) : (
              <Button
                variant="outline"
                size="lg"
                className="w-full mb-3"
                onClick={() => {
                  setSuccess(false);
                  setMessage("");
                }}
              >
                Отправить повторно
              </Button>
            )}

            <Link href="/login">
              <Button variant="glow" size="lg" className="w-full">
                <ArrowLeft className="h-5 w-5" />
                Войти
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Восстановление пароля
          </h1>
          <p className="text-muted-foreground">
            Введите email и мы отправим инструкции для сброса пароля
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          <form onSubmit={handleReset} className="space-y-6">
            {message && (
              <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span className="text-sm">{message}</span>
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full h-12 pl-12 pr-4 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="glow"
              size="lg"
              className="w-full"
              disabled={loading || cooldown > 0}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Отправка...
                </>
              ) : cooldown > 0 ? (
                `Повторить через ${cooldown}с`
              ) : (
                "Восстановить пароль"
              )}
            </Button>
          </form>

          {cooldown > 0 && (
            <div className="mt-2 text-center text-sm text-muted-foreground">
              Повторный запрос доступен через {cooldown} сек.
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Назад ко входу
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
