"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Loader2 } from "lucide-react";

interface GuestGuardProps {
  children: React.ReactNode;
}

/**
 * GuestGuard - Protects auth pages (login, register, forgot-password, reset-password)
 * from authenticated users. Redirects to /dashboard if user is already logged in.
 * Shows loading state while checking auth status to prevent UI flicker.
 */
export function GuestGuard({ children }: GuestGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Don't render anything while redirecting authenticated users
  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
