"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { type User, userAPI, authAPI, tokenManager } from "./api";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (access: string, refresh: string | null, user?: User) => Promise<void>;
  loginFromMobileBridge: (accessToken: string, userData: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      const accessToken = tokenManager.getAccessToken();
      const storedUser = localStorage.getItem("auth_user");
      const authSource = localStorage.getItem("auth_source");

      // Если нет токена - просто завершаем загрузку
      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      // Если есть токен но нет сохраненного user - невалидная сессия
      if (!storedUser) {
        // Очищаем невалидный токен
        localStorage.removeItem("access_token");
        localStorage.removeItem("auth_source");
        setIsLoading(false);
        return;
      }

      // Восстанавливаем user из localStorage
      try {
        const restoredUser = JSON.parse(storedUser);
        setUser(restoredUser);
      } catch {
        localStorage.removeItem("auth_user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("auth_source");
        setIsLoading(false);
        return;
      }

      // Для mobile-bridge - НЕ делаем getProfile(), просто используем сохраненные данные
      // Это избегает проблем с холодным бэкендом
      if (authSource === "mobile-bridge") {
        setIsLoading(false);
        return;
      }

      // Обычная авторизация - пытаемся обновить данные пользователя с API
      try {
        const profile = await userAPI.getProfile();
        const userData: User = {
          id: profile.id,
          email: profile.email,
          first_name: profile.first_name,
          last_name: profile.last_name,
          phone: profile.phone,
          avatar: profile.avatar,
          is_verified: profile.is_verified,
        };
        setUser(userData);
        localStorage.setItem("auth_user", JSON.stringify(userData));
      } catch (error) {
        // Проверяем тип ошибки - только 401 означает невалидный токен
        const errorWithStatus = error as Error & { status?: number };
        const isAuthError = 
          errorWithStatus.status === 401 ||
          (error instanceof Error && error.message.includes("401"));
        
        if (isAuthError) {
          // Токен невалидный - очищаем
          tokenManager.clearTokens();
          localStorage.removeItem("auth_user");
          localStorage.removeItem("auth_source");
          setUser(null);
        }
        // Для сетевых ошибок - оставляем restoredUser
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Refresh user data from API
  const refreshUser = useCallback(async () => {
    if (!tokenManager.hasValidTokens()) return;

    try {
      const profile = await userAPI.getProfile();
      const userData: User = {
        id: profile.id,
        email: profile.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
        avatar: profile.avatar,
        is_verified: profile.is_verified,
      };
      setUser(userData);
      localStorage.setItem("auth_user", JSON.stringify(userData));
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  }, []);

  // Login function - store tokens and user
  // refresh token is optional (null for mobile-bridge auth where backend sets session cookie)
  const login = useCallback(
    async (access: string, refresh: string | null, newUser?: Partial<User>) => {
      // Сохраняем токены (если refresh null, сохраняем только access)
      if (refresh) {
        tokenManager.setTokens(access, refresh);
      } else {
        // Для mobile-bridge: сохраняем только access token
        // Backend устанавливает session cookie автоматически
        localStorage.setItem("access_token", access);
      }

      let userData: User | null = null;

      // Backend может вернуть только { id: "..." } без email/first_name
      // Для mobile-bridge: проверяем есть ли хотя бы id и email
      const hasUserData = newUser && newUser.id && newUser.email;

      if (hasUserData) {
        // Используем данные от бэкенда, дополняя недостающие поля
        userData = {
          id: newUser.id!,
          email: newUser.email!,
          first_name: newUser.first_name || "",
          last_name: newUser.last_name || "",
          phone: newUser.phone || null,
          avatar: newUser.avatar || null,
          is_verified: newUser.is_verified ?? true,
        };
      } else {
        // Данные отсутствуют - загружаем профиль с API
        try {
          const profile = await userAPI.getProfile();
          userData = {
            id: profile.id,
            email: profile.email,
            first_name: profile.first_name,
            last_name: profile.last_name,
            phone: profile.phone,
            avatar: profile.avatar,
            is_verified: profile.is_verified,
          };
        } catch (error) {
          console.error("Failed to fetch user profile after login:", error);
          // Если есть хотя бы newUser.id, создаем минимальный user объект
          // чтобы isAuthenticated стал true
          if (newUser?.id) {
            userData = {
              id: newUser.id,
              email: newUser.email || "unknown@email.com",
              first_name: newUser.first_name || "",
              last_name: newUser.last_name || "",
              phone: newUser.phone || null,
              avatar: newUser.avatar || null,
              is_verified: newUser.is_verified ?? true,
            };
          }
        }
      }

      // Обновляем состояние и localStorage
      if (userData) {
        localStorage.setItem("auth_user", JSON.stringify(userData));
        setUser(userData);
      }

      // Всегда завершаем загрузку, даже если профиль не удалось получить
      setIsLoading(false);
    },
    [],
  );

  // Простая авторизация для Mobile Bridge
  // Сохраняем в localStorage чтобы пережить редирект (React перемонтирует компоненты)
  const loginFromMobileBridge = useCallback((accessToken: string, userData: User) => {
    // Сохраняем access token
    localStorage.setItem("access_token", accessToken);
    
    // Сохраняем user данные - ВАЖНО для редиректа на dashboard
    localStorage.setItem("auth_user", JSON.stringify(userData));
    
    // Помечаем что это mobile-bridge сессия - не нужно делать getProfile()
    localStorage.setItem("auth_source", "mobile-bridge");
    
    // Устанавливаем state
    setUser(userData);
    setIsLoading(false);
  }, []);

  // Logout function - clear everything
  const logout = useCallback(() => {
    authAPI.logout();
    setUser(null);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_source");
  }, []);

  // Update user data locally
  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("auth_user", JSON.stringify(updatedUser));
  }, []);

  // isAuthenticated должен быть true когда есть токены И пользователь
  // Это гарантирует что состояние полностью инициализировано
  const isAuthenticated = !isLoading && tokenManager.hasValidTokens() && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        loginFromMobileBridge,
        logout,
        updateUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
