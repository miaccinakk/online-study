"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function ChangePasswordPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    old_password: "",
    new_password1: "",
    new_password2: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    // Validate password match
    if (formData.new_password1 !== formData.new_password2) {
      setFieldErrors({
        new_password2: ["Passwords do not match."],
      });
      return;
    }

    // Validate password length
    if (formData.new_password1.length < 8) {
      setFieldErrors({
        new_password1: ["New password must be at least 8 characters."],
      });
      return;
    }

    setIsLoading(true);

    try {
      await passwordAPI.changePassword(
        formData.old_password,
        formData.new_password1,
        formData.new_password2
      );
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      const error = err as Error & { data?: Record<string, string[]> & { detail?: string } };
      if (error.data) {
        if (error.data.detail) {
          setError(error.data.detail);
        } else {
          const errors: Record<string, string[]> = {};
          for (const [key, value] of Object.entries(error.data)) {
            if (Array.isArray(value)) {
              errors[key] = value;
            }
          }
          if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
          } else {
            setError(error.message || "Failed to change password.");
          }
        }
      } else {
        setError(error.message || "Failed to change password.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">
              Password Changed!
            </h1>
            <p className="text-muted-foreground mb-6">
              Your password has been updated successfully. Redirecting to
              dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-160px)] px-4 py-12">
      <div className="max-w-md mx-auto">
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Change Password
          </h1>
          <p className="text-muted-foreground">
            Update your account password for better security
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

            {/* Current Password */}
            <div className="space-y-2">
              <label
                htmlFor="old_password"
                className="text-sm font-medium text-foreground"
              >
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="old_password"
                  name="old_password"
                  type={showCurrentPassword ? "text" : "password"}
                  value={formData.old_password}
                  onChange={handleChange}
                  placeholder="Enter current password"
                  required
                  className="w-full h-12 pl-12 pr-12 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {fieldErrors.old_password && (
                <p className="text-sm text-destructive">
                  {fieldErrors.old_password[0]}
                </p>
              )}
            </div>

            {/* New Password */}
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
                  type={showNewPassword ? "text" : "password"}
                  value={formData.new_password1}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
                  className="w-full h-12 pl-12 pr-12 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {fieldErrors.new_password1 && (
                <p className="text-sm text-destructive">
                  {fieldErrors.new_password1[0]}
                </p>
              )}
            </div>

            {/* Confirm New Password */}
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
                  placeholder="Repeat new password"
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
              {fieldErrors.new_password2 && (
                <p className="text-sm text-destructive">
                  {fieldErrors.new_password2[0]}
                </p>
              )}
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
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
