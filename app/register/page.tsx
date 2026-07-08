"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authAPI } from "@/lib/api";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    password2: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [success, setSuccess] = useState(false);

  // ✅ Новое состояние для капчи
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    // Проверяем, прошёл ли пользователь капчу
    if (!isCaptchaVerified) {
      setError("Please complete the CAPTCHA to continue.");
      return;
    }

    // Validate password match
    if (formData.password1 !== formData.password2) {
      setFieldErrors({
        password2: ["Passwords do not match."],
      });
      return;
    }

    // Validate password length
    if (formData.password1.length < 8) {
      setFieldErrors({
        password1: ["Password must be at least 8 characters."],
      });
      return;
    }

    setIsLoading(true);

    try {
      // 🔹 Отправляем только email и пароли
      await authAPI.register(
        formData.email,
        formData.password1,
        formData.password2,
      );
      setSuccess(true);
    } catch (err) {
      const error = err as Error & {
        data?: Record<string, string[]> & { detail?: string };
      };
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
            setError(error.message || "Registration failed. Please try again.");
          }
        }
      } else {
        setError(error.message || "Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Check Your Email
            </h1>
            <p className="text-muted-foreground mb-6">
              We've sent a verification link to{" "}
              <strong>{formData.email}</strong>. Please check your inbox and
              click the link to verify your account.
            </p>
            <Link href="/login">
              <Button variant="glow" size="lg" className="w-full">
                Go to Login
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
            Create Account
          </h1>
          <p className="text-muted-foreground">
            Join LinguaHub and start learning a new language
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Global Error */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Email Field */}
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
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full h-12 pl-12 pr-4 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
              {fieldErrors.email && (
                <p className="text-sm text-destructive">
                  {fieldErrors.email[0]}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password1"
                className="text-sm font-medium text-foreground"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="password1"
                  name="password1"
                  type={showPassword ? "text" : "password"}
                  value={formData.password1}
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
              {fieldErrors.password1 && (
                <p className="text-sm text-destructive">
                  {fieldErrors.password1[0]}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password2"
                className="text-sm font-medium text-foreground"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="password2"
                  name="password2"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.password2}
                  onChange={handleChange}
                  placeholder="Repeat your password"
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
              {fieldErrors.password2 && (
                <p className="text-sm text-destructive">
                  {fieldErrors.password2[0]}
                </p>
              )}
            </div>

            {/* ✅ Google reCAPTCHA */}
            {typeof window !== "undefined" && (
              <div className="flex justify-center mt-2">
                <ReCAPTCHA
                  sitekey="6LfbEaosAAAAABgOwuT4WBlyt3uUrtXrOtlx2INT"
                  onChange={() => setIsCaptchaVerified(true)}
                />
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="glow"
              size="lg"
              className="w-full mt-2"
              disabled={isLoading || !isCaptchaVerified}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-4 text-muted-foreground">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <Link href="/login">
            <Button variant="outline" size="lg" className="w-full">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
