"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import {
  userAPI,
  authAPI,
  paymentsAPI,
  type SubscriptionStatusResponse,
} from "@/lib/api";
import {
  User,
  Mail,
  Phone,
  Loader2,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Lock,
  CreditCard,
  Sparkles,
  Crown,
  Calendar,
  Clock,
  ChevronDown,
  UserCircle,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const { user, updateUser, refreshUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSendingVerification, setIsSendingVerification] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [subscription, setSubscription] =
    useState<SubscriptionStatusResponse | null>(null);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(true);

  // Fetch subscription status
  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) return;

      try {
        const data = await paymentsAPI.getSubscriptionStatus();
        setSubscription(data);
      } catch (err) {
        console.error("Failed to fetch subscription:", err);
      } finally {
        setIsLoadingSubscription(false);
      }
    };

    fetchSubscription();
  }, [user]);

  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone: user?.phone || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      const profile = await userAPI.updateProfile(formData);
      updateUser({
        id: profile.id,
        email: profile.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
        avatar: profile.avatar,
        is_verified: profile.is_verified,
      });
      setIsEditing(false);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      const error = err as Error;
      setMessage({
        type: "error",
        text: error.message || "Failed to update profile.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendVerification = async () => {
    if (!user?.email) return;

    setIsSendingVerification(true);
    setMessage(null);

    try {
      await authAPI.resendVerification(user.email);
      setMessage({
        type: "success",
        text: "Verification email sent! Please check your inbox.",
      });
    } catch (err) {
      const error = err as Error;
      setMessage({
        type: "error",
        text: error.message || "Failed to send verification email.",
      });
    } finally {
      setIsSendingVerification(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      phone: user?.phone || "",
    });
    setIsEditing(false);
  };

  if (!user) return null;

  const isEmailVerified = user.is_verified;

  return (
    <div className="min-h-[calc(100vh-160px)] px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your account and profile settings
          </p>
        </div>

        {/* Messages */}
        {message && (
          <div
            className={`flex items-center gap-3 p-4 mb-6 rounded-xl ${
              message.type === "success"
                ? "bg-primary/10 border border-primary/20 text-primary"
                : "bg-destructive/10 border border-destructive/20 text-destructive"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="h-5 w-5 shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0" />
            )}
            <span className="text-sm">{message.text}</span>
          </div>
        )}

        {/* Email Verification Status */}
        {isEmailVerified ? (
          <div className="flex items-start gap-3 p-3 mb-6 bg-primary/10 border border-primary/20 rounded-xl">
            <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-primary">Email verified</p>
              <p className="text-sm text-primary/80">
                Your email address has been successfully verified.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 p-3 mb-6 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-700">
                  Email not verified
                </p>
                <p className="text-xs text-amber-600">
                  Please verify your email to access all features.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSendVerification}
              disabled={isSendingVerification}
              className="w-full border-amber-500/30 text-amber-700 hover:bg-amber-500/10 h-8 text-xs"
            >
              {isSendingVerification ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Verification"
              )}
            </Button>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header - Clickable */}
          <button
            onClick={() => setIsProfileExpanded(!isProfileExpanded)}
            className="w-full p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <UserCircle className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-foreground">
                  Profile Information
                </h3>
                <p className="text-sm text-muted-foreground">
                  {user.first_name} {user.last_name}
                </p>
              </div>
            </div>
            <ChevronDown
              className={cn(
                "h-5 w-5 text-muted-foreground transition-transform duration-200",
                isProfileExpanded && "rotate-180"
              )}
            />
          </button>

          {/* Profile Details - Collapsible */}
          {isProfileExpanded && (
            <div className="px-6 pb-6 border-t border-border">
              <div className="flex items-center justify-end pt-4 mb-4">
                {!isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </div>

              <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full h-11 px-4 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  ) : (
                    <p className="h-11 px-4 flex items-center bg-muted rounded-xl text-foreground">
                      {user.first_name || "Not set"}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full h-11 px-4 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  ) : (
                    <p className="h-11 px-4 flex items-center bg-muted rounded-xl text-foreground">
                      {user.last_name || "Not set"}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email
                </label>
                <p className="h-11 px-4 flex items-center bg-muted rounded-xl text-foreground">
                  {user.email}
                </p>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  Phone
                </label>
                {isEditing ? (
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full h-11 px-4 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                ) : (
                  <p className="h-11 px-4 flex items-center bg-muted rounded-xl text-foreground">
                    {user.phone || "Not set"}
                  </p>
                )}
              </div>

              {/* Edit Actions */}
              {isEditing && (
                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="glow"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              )}
              </div>
            </div>
          )}

          {/* Security Section */}
          <div className="p-6 border-t border-border bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Lock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Password</h4>
                  <p className="text-sm text-muted-foreground">
                    Change your account password
                  </p>
                </div>
              </div>
              <Link href="/dashboard/password">
                <Button variant="outline" size="sm">
                  Change Password
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Subscription Card */}
        <div className="mt-6 bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Subscription Plan
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your current plan and billing
                  </p>
                </div>
              </div>
              <Link href="/dashboard/subscription">
                <Button variant="outline" size="sm">
                  Manage Plan
                </Button>
              </Link>
            </div>

            {isLoadingSubscription ? (
              <div className="p-4 bg-muted/50 border border-border rounded-xl flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : subscription?.has_subscription && subscription.subscription ? (
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Crown className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">
                        {subscription.subscription.plan_name}
                      </h4>
                      <span
                        className={cn(
                          "px-2 py-0.5 text-xs font-medium rounded-full",
                          subscription.subscription.status === "active"
                            ? "bg-primary/20 text-primary"
                            : subscription.subscription.status === "expired"
                              ? "bg-destructive/20 text-destructive"
                              : "bg-accent/20 text-accent",
                        )}
                      >
                        {subscription.subscription.status
                          .charAt(0)
                          .toUpperCase() +
                          subscription.subscription.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Expires:{" "}
                        {new Date(
                          subscription.subscription.end_date,
                        ).toLocaleDateString()}
                      </span>
                      {subscription.subscription.remaining_days > 0 && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {subscription.subscription.remaining_days} days left
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-muted/50 border border-border rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">Free Plan</h4>
                    <p className="text-sm text-muted-foreground">
                      Upgrade to unlock all features
                    </p>
                  </div>
                  <Link href="/dashboard/subscription">
                    <Button variant="glow" size="sm">
                      Upgrade
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Support Card */}
        <div className="mt-6 bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Support
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Need help? Contact our support team
                  </p>
                </div>
              </div>
              <Link href="/dashboard/support">
                <Button variant="outline" size="sm">
                  Get Help
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
