"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { paymentsAPI, type SubscriptionStatusResponse } from "@/lib/api";
import {
  CheckCircle2,
  Loader2,
  Calendar,
  Clock,
  Crown,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!isAuthenticated) return;

      setIsLoading(true);
      try {
        const data = await paymentsAPI.getSubscriptionStatus();
        setSubscription(data);
      } catch (err) {
        console.error("Failed to fetch subscription:", err);
        setError("Failed to load subscription details");
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) {
      if (isAuthenticated) {
        fetchSubscription();
      } else {
        setIsLoading(false);
      }
    }
  }, [isAuthenticated, authLoading]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Authentication Required
          </h2>
          <p className="text-muted-foreground mb-6">
            Please log in to view your subscription.
          </p>
          <Link href="/login">
            <Button variant="glow">Log In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Success Card */}
        <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
          {/* Success Header */}
          <div className="p-8 text-center bg-gradient-to-b from-primary/10 to-transparent">
            <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Payment Successful!
            </h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your subscription is now active.
            </p>
          </div>

          {/* Subscription Details */}
          <div className="p-6 space-y-4">
            {error ? (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                <p className="text-sm text-destructive text-center">{error}</p>
              </div>
            ) : subscription?.has_subscription && subscription.subscription ? (
              <>
                {/* Plan Info */}
                <div className="p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Crown className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Plan</p>
                      <p className="font-semibold text-foreground">
                        {subscription.subscription.plan_name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    Active Subscription
                  </span>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-xs">Start Date</span>
                    </div>
                    <p className="font-medium text-foreground">
                      {formatDate(subscription.subscription.start_date)}
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-xs">End Date</span>
                    </div>
                    <p className="font-medium text-foreground">
                      {formatDate(subscription.subscription.end_date)}
                    </p>
                  </div>
                </div>

                {/* Remaining Time */}
                {subscription.subscription.remaining_days > 0 && (
                  <div className="p-4 bg-accent/10 border border-accent/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-accent" />
                      <div>
                        <p className="text-sm text-muted-foreground">Remaining Time</p>
                        <p className="font-semibold text-foreground">
                          {subscription.subscription.remaining_days} days
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted/50 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No Active Subscription
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  You don&apos;t have any active payments or subscriptions at the moment.
                </p>
                <Link href="/pricing">
                  <Button variant="outline" size="sm">
                    View Plans
                  </Button>
                </Link>
              </div>
            )}

            {/* Action Button */}
            <div className="pt-4">
              <Link href="/dashboard" className="block">
                <Button variant="glow" className="w-full">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
