"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { passwordAPI } from "@/lib/api";
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Redirect to login if no uid or token
  useEffect(() => {
    if (!uid || !token) {
      router.push("/login");
    }
  }, [uid, token, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate password match
    if (formData.new_password1 !== formData.new_password2) {
      setError("Passwords do not match.");
      return;
    }

    // Validate password length
    if (formData.new_password1.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!uid || !token) {
      setError("Invalid reset link. Please request a new one.");
      return;
    }

    setIsLoading(true);

    try {
      await passwordAPI.confirmReset(
        uid,
        token,
        formData.new_password1,
        formData.new_password2
      );
      setSuccess(true);
    } catch (err) {
      const error = err as Error & { data?: { detail?: string } };
      if (error.data?.detail) {
        setError(error.data.detail);
      } else {
        setError(
          error.message || "Failed to reset password. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render anything until we verify uid and token exist
  if (!uid || !token) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12">
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-muted-foreground">Redirecting...</span>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">
              Password Reset Successful
            </h1>
            <p className="text-muted-foreground mb-6">
              Your password has been successfully reset. You can now sign in
              with your new password.
            </p>
            <Link href="/login">
              <Button variant="glow" size="lg" className="w-full">
                Go to Sign In
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
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Set New Password
          </h1>
          <p className="text-muted-foreground">
            Enter your new password below. This link is valid for 1 hour.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Global Error */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* New Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="new_password1"
                className="text-sm font-medium text-foreground"
              >
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="new_password1"
                  name="new_password1"
                  type={showPassword ? "text" : "password"}
                  value={formData.new_password1}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
                  className="w-full h-12 pl-12 pr-12 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="new_password2"
                className="text-sm font-medium text-foreground"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="new_password2"
                  name="new_password2"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.new_password2}
                  onChange={handleChange}
                  placeholder="Repeat your new password"
                  required
                  className="w-full h-12 pl-12 pr-12 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="glow"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Resetting password...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>

          {/* Back to login link */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12">
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="text-muted-foreground">Loading...</span>
          </div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
