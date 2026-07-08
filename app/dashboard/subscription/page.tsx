"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { 
  billingAPI, 
  paymentsAPI, 
  type ActivePaymentResponse, 
  type SubscriptionStatusResponse,
  type Invoice,
} from "@/lib/api";
import { CryptoPaymentModal } from "@/components/crypto-payment-modal";
import { InvoiceDetailModal } from "@/components/invoice-detail-modal";
import { PeriodSelector, calculatePriceWithDiscount } from "@/components/period-selector";
import { RenewalModal } from "@/components/renewal-modal";
import {
  Check,
  Loader2,
  AlertCircle,
  Crown,
  Sparkles,
  Zap,
  ArrowLeft,
  Wallet,
  Calendar,
  Clock,
  ExternalLink,
  Receipt,
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Plan {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  interval: string;
  metadata: {
    features?: string[];
    highlighted?: boolean;
    icon?: string;
  } | null;
}

export default function SubscriptionPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [plans, setPlans] = useState<Plan[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Active payment and subscription state
  const [activePayment, setActivePayment] = useState<ActivePaymentResponse | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionStatusResponse | null>(null);
  
  // Payment modal state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  
  // Invoice detail modal state
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  // Period selector state
  const [selectedMonths, setSelectedMonths] = useState(1);

  // Renewal modal state
  const [isRenewalModalOpen, setIsRenewalModalOpen] = useState(false);

  // Cancel payment state
  const [isCancelling, setIsCancelling] = useState(false);

  // Cancel invoice state
  const [cancellingInvoiceId, setCancellingInvoiceId] = useState<number | null>(null);

  // Refetch all subscription data - defined first since other callbacks depend on it
  const refetchData = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    try {
      const [plansData, activePaymentData, subscriptionData, invoicesData] = await Promise.all([
        billingAPI.getPlans(),
        paymentsAPI.getActivePayment().catch(() => null),
        paymentsAPI.getSubscriptionStatus().catch(() => null),
        paymentsAPI.getInvoices().catch(() => []),
      ]);
      
      setPlans(plansData);
      setActivePayment(activePaymentData);
      setSubscription(subscriptionData);
      setInvoices(invoicesData);
    } catch (err) {
      console.error("Failed to refetch data:", err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const handleSelectPlan = useCallback((plan: Plan) => {
    if (plan.price <= 0) return;
    // If user has active PAID subscription, don't allow new payment
    // Free plan (price === 0) should allow purchasing paid plans
    const currentPlanIsPaid = subscription?.subscription?.plan_price && subscription.subscription.plan_price > 0;
    if (subscription?.has_subscription && subscription.subscription?.status === "active" && currentPlanIsPaid) {
      return;
    }
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  }, [subscription]);

  const handleClosePaymentModal = useCallback(() => {
    setIsPaymentModalOpen(false);
  }, []);

  const handlePaymentSuccess = useCallback(() => {
    setIsPaymentModalOpen(false);
    // Refetch all data to show updated subscription
    refetchData();
  }, [refetchData]);

  const handleContinuePayment = useCallback(() => {
    if (activePayment?.payment?.payment_url) {
      window.open(activePayment.payment.payment_url, "_blank", "noopener,noreferrer");
    }
  }, [activePayment]);

  const handleViewInvoice = useCallback((invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsInvoiceModalOpen(true);
  }, []);

  const handleCloseInvoiceModal = useCallback(() => {
    setIsInvoiceModalOpen(false);
    setSelectedInvoice(null);
  }, []);

  const handleInvoiceUpdate = useCallback((updatedInvoice: Invoice) => {
    // Update invoice in the list without page refresh
    setInvoices(prev => 
      prev.map(inv => 
        inv.id === updatedInvoice.id ? updatedInvoice : inv
      )
    );
    setSelectedInvoice(updatedInvoice);
  }, []);

  const handleOpenRenewalModal = useCallback(() => {
    setIsRenewalModalOpen(true);
  }, []);

  const handleCloseRenewalModal = useCallback(() => {
    setIsRenewalModalOpen(false);
  }, []);

  const handleRenewalSuccess = useCallback(() => {
    setIsRenewalModalOpen(false);
    // Refetch all data to show updated subscription
    refetchData();
  }, [refetchData]);

  const handleCancelInvoice = useCallback(async (invoiceId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the invoice detail modal
    
    if (cancellingInvoiceId) return; // Already cancelling an invoice
    
    setCancellingInvoiceId(invoiceId);
    try {
      await paymentsAPI.cancelInvoice(invoiceId);
      // Refetch data to show updated state and payment options
      refetchData();
    } catch (err) {
      console.error("Failed to cancel invoice:", err);
      setError("Failed to cancel invoice. Please try again.");
    } finally {
      setCancellingInvoiceId(null);
    }
  }, [cancellingInvoiceId, refetchData]);

  // Fetch plans, active payment, subscription status, and invoices
  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) return;

      setIsLoading(true);
      setError(null);
      try {
        // Fetch all data in parallel
        const [plansData, activePaymentData, subscriptionData, invoicesData] = await Promise.all([
          billingAPI.getPlans(),
          paymentsAPI.getActivePayment().catch(() => null),
          paymentsAPI.getSubscriptionStatus().catch(() => null),
          paymentsAPI.getInvoices().catch(() => []),
        ]);
        
        setPlans(plansData);
        setActivePayment(activePaymentData);
        setSubscription(subscriptionData);
        setInvoices(invoicesData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load subscription data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) {
      fetchData();
    }
  }, [isAuthenticated, authLoading]);

  const getPlanIcon = (plan: Plan) => {
    const iconName = plan.metadata?.icon;
    if (iconName === "crown") return <Crown className="h-6 w-6" />;
    if (iconName === "sparkles") return <Sparkles className="h-6 w-6" />;
    return <Zap className="h-6 w-6" />;
  };

  const formatPrice = (price: number, currency: string) => {
    if (price === 0) return "Free";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
    }).format(price);
  };

  const formatInterval = (interval: string) => {
    if (interval === "month") return "/month";
    if (interval === "year") return "/year";
    return "";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getInvoiceStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "cancelled":
        return <AlertTriangle className="h-4 w-4 text-muted-foreground" />;
      case "expired":
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getInvoiceStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-0.5 text-xs font-medium rounded-full";
    switch (status) {
      case "paid":
        return `${baseClasses} bg-green-500/20 text-green-500`;
      case "pending":
        return `${baseClasses} bg-yellow-500/20 text-yellow-500`;
      case "failed":
        return `${baseClasses} bg-red-500/20 text-red-500`;
      case "cancelled":
        return `${baseClasses} bg-muted text-muted-foreground`;
      case "expired":
        return `${baseClasses} bg-orange-500/20 text-orange-500`;
      default:
        return `${baseClasses} bg-muted text-muted-foreground`;
    }
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
            Please log in to manage your subscription.
          </p>
          <Link href="/login">
            <Button variant="glow">Log In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-160px)] px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Subscription & Billing
          </h1>
          <p className="text-muted-foreground">
            Manage your subscription plan and view billing history
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Current Subscription Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Current Subscription
          </h2>

          {subscription?.has_subscription && subscription.subscription ? (() => {
            const isFreePlan = subscription.subscription.plan_price === 0;
            
            return (
              <div className="p-6 bg-gradient-to-br from-primary/10 via-card to-card border border-primary/30 rounded-2xl">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Plan Icon */}
                  <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
                    {isFreePlan ? <Zap className="h-7 w-7 text-primary" /> : <Crown className="h-7 w-7 text-primary" />}
                  </div>
                  
                  {/* Plan Details */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-foreground">
                        {subscription.subscription.plan_name}
                      </h3>
                      <span className={cn(
                        "px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide",
                        subscription.subscription.status === "active" 
                          ? "bg-primary text-primary-foreground"
                          : subscription.subscription.status === "expired"
                          ? "bg-destructive/20 text-destructive"
                          : "bg-accent/20 text-accent"
                      )}>
                        {subscription.subscription.status === "active" ? "Active Plan" : subscription.subscription.status}
                      </span>
                    </div>
                    
                    {/* Price */}
                    <div className="mb-3">
                      <span className="text-2xl font-bold text-foreground">
                        {formatPrice(subscription.subscription.plan_price, subscription.subscription.plan_currency)}
                      </span>
                      {!isFreePlan && (
                        <span className="text-muted-foreground">
                          {formatInterval(subscription.subscription.plan_interval)}
                        </span>
                      )}
                    </div>
                    
                    {/* Dates - only for paid plans */}
                    {!isFreePlan && (
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          Started: {formatDate(subscription.subscription.start_date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          Expires: {formatDate(subscription.subscription.end_date)}
                        </span>
                        {subscription.subscription.remaining_days > 0 && (
                          <span className="flex items-center gap-1.5 text-primary font-medium">
                            <Sparkles className="h-4 w-4" />
                            {subscription.subscription.remaining_days} days remaining
                          </span>
                        )}
                      </div>
                    )}

                    {/* Free plan info */}
                    {isFreePlan && (
                      <p className="text-sm text-muted-foreground">
                        Free plan is always active. Upgrade to a paid plan for premium features.
                      </p>
                    )}

                    {/* Renew Button - only for paid plans and when no pending payment */}
                    {!isFreePlan && !activePayment?.has_active_payment && (
                      <div className="mt-4 pt-4 border-t border-primary/20">
                        <Button
                          variant="glow"
                          size="sm"
                          onClick={handleOpenRenewalModal}
                          className="w-full sm:w-auto"
                        >
                          <RefreshCw className="h-4 w-4" />
                          Extend Subscription
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })() : (
            <div className="p-6 bg-card/50 border border-border rounded-2xl text-center">
              <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-7 w-7 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No Active Subscription
              </h3>
              <p className="text-muted-foreground mb-4">
                Choose a plan below to unlock premium features
              </p>
            </div>
          )}
        </section>

        {/* Active Payment Notice */}
        {activePayment?.has_active_payment && activePayment.payment && (
          <div className="mb-8 p-5 bg-accent/10 border border-accent/30 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="h-6 w-6 text-accent animate-pulse" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  Pending Payment
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  You have an active payment for <strong>{activePayment.payment.plan_name}</strong>. 
                  Complete your payment to activate the subscription.
                </p>
                <Button 
                  variant="glow" 
                  size="sm"
                  onClick={handleContinuePayment}
                >
                  <ExternalLink className="h-4 w-4" />
                  Continue Payment
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Available Plans Section - hide when there's a pending payment */}
        {!activePayment?.has_active_payment && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Available Plans
            </h2>

          {/* Info Notice - show if no paid subscription and no pending payment */}
          {(() => {
            const currentPlanIsPaid = subscription?.subscription?.plan_price && subscription.subscription.plan_price > 0;
            const hasActivePaidSubscription = subscription?.has_subscription && currentPlanIsPaid;
            return !hasActivePaidSubscription && !activePayment?.has_active_payment;
          })() && (
            <div className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-xl">
              <div className="flex items-start gap-3">
                <Wallet className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                <div>
                  <p className="text-sm text-accent font-medium mb-1">
                    Multiple Payment Options
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We accept bank card payments (Visa, Mastercard, MIR) and cryptocurrency (USDT, BTC, ETH). Select a plan below to choose your preferred payment method.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Period Selector - show if no paid subscription (Free plan allows selecting new plans) */}
          {(() => {
            const currentPlanIsPaid = subscription?.subscription?.plan_price && subscription.subscription.plan_price > 0;
            const hasActivePaidSubscription = subscription?.has_subscription && currentPlanIsPaid;
            return !hasActivePaidSubscription && plans.some(p => p.price > 0);
          })() && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Select subscription period
              </h3>
              <PeriodSelector
                months={selectedMonths}
                onChange={setSelectedMonths}
                basePrice={plans.find(p => p.price > 0)?.price || 0}
                currency={plans.find(p => p.price > 0)?.currency || "USD"}
              />
            </div>
          )}

          {/* Plans Grid */}
          {plans.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No plans available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => {
                const isHighlighted = plan.metadata?.highlighted;
                const features = plan.metadata?.features || [];
                const isPaid = plan.price > 0;
                const isCurrentPlan = subscription?.subscription?.plan_id === plan.id;
                const hasActiveSubscription = subscription?.has_subscription && 
                  subscription.subscription?.status === "active";

                return (
                  <div
                    key={plan.id}
                    className={cn(
                      "relative flex flex-col rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300",
                      isCurrentPlan && hasActiveSubscription
                        ? "border-primary bg-gradient-to-b from-primary/15 to-card ring-2 ring-primary/30"
                        : isHighlighted
                        ? "border-primary/50 bg-gradient-to-b from-primary/10 to-card hover:border-primary/70"
                        : "border-border bg-card/50 hover:border-primary/30"
                    )}
                  >
                    {/* Current Plan Badge */}
                    {isCurrentPlan && hasActiveSubscription && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                        Current Plan
                      </div>
                    )}
                    
                    {/* Highlighted Badge */}
                    {isHighlighted && !isCurrentPlan && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium rounded-full bg-accent text-accent-foreground">
                        Popular
                      </div>
                    )}

                    {/* Plan Icon */}
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                        isCurrentPlan && hasActiveSubscription
                          ? "bg-primary/20 text-primary"
                          : isHighlighted
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {getPlanIcon(plan)}
                    </div>

                    {/* Plan Info */}
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {plan.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {plan.description}
                    </p>

                    {/* Price */}
                    {(() => {
                      if (plan.price === 0) {
                        return (
                          <div className="mb-6">
                            <span className="text-3xl font-bold text-foreground">Free</span>
                          </div>
                        );
                      }

                      const { totalPrice, discount, pricePerMonth } = calculatePriceWithDiscount(plan.price, selectedMonths);
                      const hasDiscount = discount > 0 && !hasActiveSubscription;

                      return (
                        <div className="mb-6">
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-foreground">
                              {formatPrice(totalPrice, plan.currency)}
                            </span>
                            {hasDiscount && (
                              <span className="text-sm line-through text-muted-foreground">
                                {formatPrice(plan.price * selectedMonths, plan.currency)}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-muted-foreground">
                              for {selectedMonths} {selectedMonths === 1 ? "month" : "months"}
                            </span>
                            {hasDiscount && (
                              <span className={cn(
                                "px-2 py-0.5 text-xs font-bold rounded-full",
                                discount >= 20 ? "bg-green-500/20 text-green-500" :
                                discount >= 15 ? "bg-emerald-500/20 text-emerald-500" :
                                "bg-primary/20 text-primary"
                              )}>
                                -{discount}%
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatPrice(pricePerMonth, plan.currency)}/mo
                          </p>
                        </div>
                      );
                    })()}

                    {/* Features */}
                    {features.length > 0 && (
                      <ul className="space-y-3 flex-1 mb-6">
                        {features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-sm text-card-foreground"
                          >
                            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Action Button */}
                    {(() => {
                      const hasPendingPaymentForPlan = activePayment?.has_active_payment && 
                        activePayment.payment?.plan_id === plan.id;

                      if (!isPaid) {
                        return (
                          <Button
                            variant="secondary"
                            className="w-full mt-auto"
                            disabled
                          >
                            <Check className="h-4 w-4" />
                            Free Plan
                          </Button>
                        );
                      }

                      if (isCurrentPlan && hasActiveSubscription) {
                        return (
                          <Button
                            variant="secondary"
                            className="w-full mt-auto"
                            disabled
                          >
                            <Check className="h-4 w-4" />
                            Current Plan
                          </Button>
                        );
                      }

                      if (hasPendingPaymentForPlan) {
                        return (
                          <Button
                            variant="glow"
                            className="w-full mt-auto"
                            onClick={handleContinuePayment}
                          >
                            <ExternalLink className="h-4 w-4" />
                            Continue Payment
                          </Button>
                        );
                      }

                      // Check if current subscription is a paid plan
                      const currentPlanIsPaid = subscription?.subscription?.plan_price && subscription.subscription.plan_price > 0;
                      
                      // If user has active PAID subscription, show disabled Switch Plan
                      if (hasActiveSubscription && currentPlanIsPaid) {
                        return (
                          <Button
                            variant="outline"
                            className="w-full mt-auto"
                            disabled
                          >
                            Switch Plan
                          </Button>
                        );
                      }

                      if (activePayment?.has_active_payment) {
                        return (
                          <Button
                            variant="outline"
                            className="w-full mt-auto"
                            disabled
                          >
                            <Clock className="h-4 w-4" />
                            Payment Pending
                          </Button>
                        );
                      }

                      return (
                        <Button
                          variant={isHighlighted ? "glow" : "outline"}
                          className="w-full mt-auto"
                          onClick={() => handleSelectPlan(plan)}
                        >
                          <Wallet className="h-4 w-4" />
                          Subscribe
                        </Button>
                      );
                    })()}
                  </div>
                );
              })}
            </div>
          )}
          </section>
        )}

        {/* Billing History Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Billing History
          </h2>

          {invoices.length === 0 ? (
            <div className="p-6 bg-card/50 border border-border rounded-2xl text-center">
              <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                <Receipt className="h-7 w-7 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No Payment History
              </h3>
              <p className="text-muted-foreground">
                Your payment history will appear here once you make a purchase
              </p>
            </div>
          ) : (
            <div className="bg-card/50 border border-border rounded-2xl overflow-hidden">
              {/* Table Header */}
              <div className="hidden md:grid md:grid-cols-8 gap-4 px-6 py-3 bg-muted/50 border-b border-border text-sm font-medium text-muted-foreground">
                <div>Date</div>
                <div>Payment ID</div>
                <div>Duration</div>
                <div>Amount</div>
                <div>Currency</div>
                <div>Method</div>
                <div>Status</div>
                <div>Actions</div>
              </div>

              {/* Invoice Rows */}
              <div className="divide-y divide-border">
                {invoices.map((invoice) => {
                  // extension_months is the ONLY source of truth for duration
                  const months = invoice.extension_months ?? 1;
                  const durationText = months === 1 ? "1 month" : `${months} months`;
                  const isCancelled = invoice.status === "cancelled";
                  const isPending = invoice.status === "pending";
                  const isCancellingThis = cancellingInvoiceId === invoice.id;
                  
                  return (
                    <div 
                      key={invoice.id}
                      onClick={() => handleViewInvoice(invoice)}
                      className={cn(
                        "w-full text-left grid grid-cols-2 md:grid-cols-8 gap-2 md:gap-4 px-6 py-4 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-inset",
                        isCancelled 
                          ? "bg-muted/20 opacity-60" 
                          : "hover:bg-muted/30"
                      )}
                    >
                      {/* Date */}
                      <div className={cn(
                        "text-sm",
                        isCancelled ? "text-muted-foreground" : "text-foreground"
                      )}>
                        <span className="md:hidden text-muted-foreground mr-2">Date:</span>
                        {formatDate(invoice.created_at)}
                      </div>

                      {/* Payment ID */}
                      <div className="text-sm text-muted-foreground font-mono truncate col-span-2 md:col-span-1">
                        <span className="md:hidden text-muted-foreground mr-2">ID:</span>
                        {invoice.payment_id}
                      </div>

                      {/* Duration */}
                      <div className={cn(
                        "text-sm",
                        isCancelled ? "text-muted-foreground" : "text-foreground"
                      )}>
                        <span className="md:hidden text-muted-foreground mr-2">Duration:</span>
                        {durationText}
                      </div>

                      {/* Amount */}
                      <div className={cn(
                        "text-sm font-semibold",
                        isCancelled ? "text-muted-foreground line-through" : "text-foreground"
                      )}>
                        <span className="md:hidden text-muted-foreground font-normal mr-2">Amount:</span>
                        {formatPrice(invoice.amount, invoice.currency)}
                      </div>

                      {/* Currency */}
                      <div className="text-sm text-muted-foreground uppercase">
                        <span className="md:hidden text-muted-foreground mr-2">Currency:</span>
                        {invoice.currency}
                      </div>

                      {/* Payment Method */}
                      <div className="text-sm text-muted-foreground">
                        <span className="md:hidden text-muted-foreground mr-2">Method:</span>
                        <span className={cn(
                          "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                          invoice.payment_provider === "centapp" 
                            ? "bg-blue-500/20 text-blue-500"
                            : "bg-amber-500/20 text-amber-500"
                        )}>
                          {invoice.payment_provider === "centapp" ? "Card" : "Crypto"}
                        </span>
                      </div>

                      {/* Status */}
                      <div className="flex items-center gap-2">
                        {getInvoiceStatusIcon(invoice.status)}
                        <span className={getInvoiceStatusBadge(invoice.status)}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                        <span className="md:hidden text-muted-foreground mr-2">Actions:</span>
                        {isPending && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleCancelInvoice(invoice.id, e)}
                            disabled={isCancellingThis}
                            className="h-8 px-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            {isCancellingThis ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <XCircle className="h-3.5 w-3.5" />
                            )}
                            <span className="ml-1.5">Cancel</span>
                          </Button>
                        )}
                        {isCancelled && (
                          <span className="text-xs text-muted-foreground">No actions</span>
                        )}
                        {!isPending && !isCancelled && (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* Info Note */}
        <div className="p-4 bg-muted/50 rounded-xl">
          <p className="text-sm text-muted-foreground text-center">
            Need help? Check out our{" "}
            <Link href="/pricing" className="text-primary hover:underline">
              detailed pricing comparison
            </Link>{" "}
            or{" "}
            <Link href="/dashboard/support" className="text-primary hover:underline">
              contact support
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Crypto Payment Modal */}
      {selectedPlan && (() => {
        const { totalPrice, discount } = calculatePriceWithDiscount(selectedPlan.price, selectedMonths);
        return (
          <CryptoPaymentModal
            isOpen={isPaymentModalOpen}
            onClose={handleClosePaymentModal}
            amount={totalPrice}
            planId={selectedPlan.id}
            planName={selectedPlan.title}
            months={selectedMonths}
            discount={discount}
            onSuccess={handlePaymentSuccess}
          />
        );
      })()}

      {/* Renewal Modal */}
      {subscription?.subscription && (
        <RenewalModal
          isOpen={isRenewalModalOpen}
          onClose={handleCloseRenewalModal}
          planId={subscription.subscription.plan_id}
          planName={subscription.subscription.plan_name}
          basePrice={subscription.subscription.plan_price}
          currency={subscription.subscription.plan_currency}
          onSuccess={handleRenewalSuccess}
        />
      )}

      {/* Invoice Detail Modal */}
      <InvoiceDetailModal
        invoice={selectedInvoice}
        isOpen={isInvoiceModalOpen}
        onClose={handleCloseInvoiceModal}
        onInvoiceUpdate={handleInvoiceUpdate}
      />
    </div>
  );
}
