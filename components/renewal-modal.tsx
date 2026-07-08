"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PeriodSelector, calculatePriceWithDiscount } from "@/components/period-selector";
import { PaymentMethodSelector, type PaymentMethod } from "@/components/payment-method-selector";
import { paymentsAPI, cardPaymentsAPI, type PaymentResponse, type CardPaymentResponse } from "@/lib/api";
import {
  X,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Copy,
  RefreshCw,
  QrCode,
  Calendar,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import QRCode from "react-qr-code";

interface RenewalModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string;
  planName: string;
  basePrice: number;
  currency?: string;
  onSuccess?: () => void;
}

type RenewalStatus = "idle" | "creating" | "pending" | "paid" | "failed" | "expired";

function getStatusConfig(status: RenewalStatus, paymentMethod: PaymentMethod) {
  switch (status) {
    case "creating":
      return {
        icon: Loader2,
        iconClass: "animate-spin text-primary",
        title: "Creating Renewal",
        description: "Setting up your renewal payment...",
        bgClass: "bg-primary/10",
      };
    case "pending":
      return {
        icon: Clock,
        iconClass: "text-accent animate-pulse",
        title: "Waiting for Payment",
        description: paymentMethod === "card"
          ? "Complete your payment on the payment page"
          : "Complete your payment using the QR code or link below",
        bgClass: "bg-accent/10",
      };
    case "paid":
      return {
        icon: CheckCircle2,
        iconClass: "text-primary",
        title: "Renewal Successful!",
        description: "Your subscription has been extended",
        bgClass: "bg-primary/10",
      };
    case "failed":
    case "expired":
      return {
        icon: XCircle,
        iconClass: "text-destructive",
        title: status === "failed" ? "Payment Failed" : "Payment Expired",
        description: "Something went wrong. Please try again.",
        bgClass: "bg-destructive/10",
      };
    default:
      return {
        icon: Calendar,
        iconClass: "text-primary",
        title: "Extend Subscription",
        description: "Choose how long to extend your subscription",
        bgClass: "bg-muted",
      };
  }
}

export function RenewalModal({
  isOpen,
  onClose,
  planId,
  planName,
  basePrice,
  currency = "USD",
  onSuccess,
}: RenewalModalProps) {
  const [months, setMonths] = useState(1);
  const [status, setStatus] = useState<RenewalStatus>("idle");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("crypto");
  
  // Crypto payment state
  const [cryptoPaymentData, setCryptoPaymentData] = useState<PaymentResponse | null>(null);
  const [cryptoPollingInterval, setCryptoPollingInterval] = useState<NodeJS.Timeout | null>(null);
  
  // Card payment state  
  const [cardPaymentData, setCardPaymentData] = useState<CardPaymentResponse | null>(null);
  const [cardPollingInterval, setCardPollingInterval] = useState<NodeJS.Timeout | null>(null);
  
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { totalPrice, discount } = calculatePriceWithDiscount(basePrice, months);

  // Get current payment data based on method
  const paymentData = paymentMethod === "card" ? cardPaymentData : cryptoPaymentData;
  const paymentUrl = paymentMethod === "card" 
    ? cardPaymentData?.payment_url 
    : cryptoPaymentData?.payment_url;

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (cryptoPollingInterval) {
        clearInterval(cryptoPollingInterval);
      }
      if (cardPollingInterval) {
        clearInterval(cardPollingInterval);
      }
    };
  }, [cryptoPollingInterval, cardPollingInterval]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen && status === "idle") {
      setMonths(1);
      setCopied(false);
      setError(null);
    }
  }, [isOpen, status]);

  const handleCreateCryptoRenewal = useCallback(async () => {
    setIsLoading(true);
    setStatus("creating");
    setError(null);

    try {
      const orderId = `renewal_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      const response = await paymentsAPI.createPayment({
        amount: totalPrice,
        currency: "USD",
        order_id: orderId,
        description: `${planName} Subscription Renewal (${months} mo)`,
        plan_id: planId,
        months,
      });

      setCryptoPaymentData(response);
      setPaymentAmount(totalPrice);
      setStatus("pending");

      // Automatically open payment URL
      if (response.payment_url) {
        window.open(response.payment_url, "_blank", "noopener,noreferrer");
      }

      // Start polling for payment status
      const interval = setInterval(async () => {
        try {
          const paymentStatus = await paymentsAPI.getPaymentStatus(response.payment_id);
          if (paymentStatus.status === "paid" || paymentStatus.status === "completed") {
            clearInterval(interval);
            setCryptoPollingInterval(null);
            setStatus("paid");
            onSuccess?.();
          } else if (paymentStatus.status === "expired" || paymentStatus.status === "cancelled") {
            clearInterval(interval);
            setCryptoPollingInterval(null);
            setStatus("expired");
          }
        } catch {
          // Ignore polling errors
        }
      }, 3000);

      setCryptoPollingInterval(interval);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create renewal");
      setStatus("failed");
    } finally {
      setIsLoading(false);
    }
  }, [planId, planName, months, totalPrice, onSuccess]);

  const handleCreateCardRenewal = useCallback(async () => {
    setIsLoading(true);
    setStatus("creating");
    setError(null);

    try {
      const response = await cardPaymentsAPI.createPayment({
        amount: totalPrice,
        currency: "RUB",
        plan_id: planId,
        description: `${planName} Subscription Renewal (${months} mo)`,
        months,
        payment_method: "BANK_CARD",
      });

      setCardPaymentData(response);
      setPaymentAmount(totalPrice);
      setStatus("pending");

      // Automatically open payment URL
      if (response.payment_url) {
        window.open(response.payment_url, "_blank", "noopener,noreferrer");
      }

      // Start polling for payment status
      const interval = setInterval(async () => {
        try {
          const paymentStatus = await cardPaymentsAPI.getPaymentStatus(response.payment_id);
          if (paymentStatus.status === "paid" || paymentStatus.status === "completed") {
            clearInterval(interval);
            setCardPollingInterval(null);
            setStatus("paid");
            onSuccess?.();
          } else if (paymentStatus.status === "expired" || paymentStatus.status === "cancelled" || paymentStatus.status === "failed") {
            clearInterval(interval);
            setCardPollingInterval(null);
            setStatus("expired");
          }
        } catch {
          // Ignore polling errors
        }
      }, 3000);

      setCardPollingInterval(interval);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create card renewal");
      setStatus("failed");
    } finally {
      setIsLoading(false);
    }
  }, [planId, planName, months, totalPrice, onSuccess]);

  const handleCreateRenewal = useCallback(async () => {
    if (paymentMethod === "card") {
      await handleCreateCardRenewal();
    } else {
      await handleCreateCryptoRenewal();
    }
  }, [paymentMethod, handleCreateCardRenewal, handleCreateCryptoRenewal]);

  const handleCopyLink = useCallback(() => {
    if (paymentUrl) {
      navigator.clipboard.writeText(paymentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [paymentUrl]);

  const handleOpenPayment = useCallback(() => {
    if (paymentUrl) {
      window.open(paymentUrl, "_blank", "noopener,noreferrer");
    }
  }, [paymentUrl]);

  const handleCheckPayment = useCallback(async () => {
    if (paymentMethod === "card" && cardPaymentData?.payment_id) {
      setIsLoading(true);
      try {
        const paymentStatus = await cardPaymentsAPI.getPaymentStatus(cardPaymentData.payment_id);
        if (paymentStatus.status === "paid" || paymentStatus.status === "completed") {
          if (cardPollingInterval) {
            clearInterval(cardPollingInterval);
            setCardPollingInterval(null);
          }
          setStatus("paid");
          onSuccess?.();
        }
      } catch {
        // Ignore check errors
      } finally {
        setIsLoading(false);
      }
    } else if (cryptoPaymentData?.payment_id) {
      setIsLoading(true);
      try {
        const paymentStatus = await paymentsAPI.getPaymentStatus(cryptoPaymentData.payment_id);
        if (paymentStatus.status === "paid" || paymentStatus.status === "completed") {
          if (cryptoPollingInterval) {
            clearInterval(cryptoPollingInterval);
            setCryptoPollingInterval(null);
          }
          setStatus("paid");
          onSuccess?.();
        }
      } catch {
        // Ignore check errors
      } finally {
        setIsLoading(false);
      }
    }
  }, [paymentMethod, cardPaymentData?.payment_id, cryptoPaymentData?.payment_id, cardPollingInterval, cryptoPollingInterval, onSuccess]);

  const handleRetry = useCallback(() => {
    if (cryptoPollingInterval) {
      clearInterval(cryptoPollingInterval);
      setCryptoPollingInterval(null);
    }
    if (cardPollingInterval) {
      clearInterval(cardPollingInterval);
      setCardPollingInterval(null);
    }
    setStatus("idle");
    setCryptoPaymentData(null);
    setCardPaymentData(null);
    setPaymentAmount(0);
    setError(null);
  }, [cryptoPollingInterval, cardPollingInterval]);

  const handleClose = useCallback(() => {
    if (cryptoPollingInterval) {
      clearInterval(cryptoPollingInterval);
      setCryptoPollingInterval(null);
    }
    if (cardPollingInterval) {
      clearInterval(cardPollingInterval);
      setCardPollingInterval(null);
    }
    onClose();
  }, [cryptoPollingInterval, cardPollingInterval, onClose]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
    }).format(price);
  };

  if (!isOpen) return null;

  const statusConfig = getStatusConfig(status, paymentMethod);
  const StatusIcon = statusConfig.icon;
  const isTerminalState = ["paid", "failed", "expired"].includes(status);
  const isSuccess = status === "paid";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="text-lg font-semibold text-foreground">
            Extend Subscription
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Status Display */}
          <div
            className={cn(
              "flex flex-col items-center text-center p-5 rounded-xl mb-5",
              statusConfig.bgClass
            )}
          >
            <div className="mb-3">
              <StatusIcon className={cn("h-10 w-10", statusConfig.iconClass)} />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1">
              {statusConfig.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {statusConfig.description}
            </p>
          </div>

          {/* Plan Info */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl mb-5">
            <div>
              <p className="text-xs text-muted-foreground">Current Plan</p>
              <p className="font-medium text-foreground">{planName}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Base Price</p>
              <p className="font-semibold text-foreground">
                {formatPrice(basePrice)}/mo
              </p>
            </div>
          </div>

          {/* Period Selector (only in idle state) */}
          {status === "idle" && (
            <>
              <PeriodSelector
                months={months}
                onChange={setMonths}
                basePrice={basePrice}
                currency={currency}
                className="mb-5"
              />

              {/* Payment Method Selector */}
              <div className="mb-5">
                <p className="text-sm font-medium text-foreground mb-3">
                  Select payment method
                </p>
                <PaymentMethodSelector
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                  disabled={isLoading}
                />
              </div>
            </>
          )}

          {/* Creating state */}
          {status === "creating" && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {/* QR Code and Payment Actions (when pending) */}
          {status === "pending" && paymentUrl && (
            <div className="space-y-4">
              {/* Payment Info */}
              <div className="p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Duration</span>
                  <span className="font-semibold text-foreground">
                    {months} {months === 1 ? "month" : "months"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Amount</span>
                  <span className="font-bold text-lg text-foreground">
                    {formatPrice(paymentAmount)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">Discount Applied</span>
                    <span className="font-semibold text-green-500">-{discount}%</span>
                  </div>
                )}
              </div>

              {/* QR Code - only for crypto */}
              {paymentMethod === "crypto" && (
                <div className="flex justify-center">
                  <div className="p-4 bg-white rounded-xl">
                    <QRCode value={paymentUrl} size={180} level="M" />
                  </div>
                </div>
              )}

              {/* Card payment info */}
              {paymentMethod === "card" && (
                <div className="p-4 bg-muted/50 rounded-xl text-center">
                  <CreditCard className="h-12 w-12 text-primary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Complete your payment on the secure payment page
                  </p>
                  <p className="text-xs text-muted-foreground">
                    The payment page should have opened in a new tab
                  </p>
                </div>
              )}

              {/* Payment Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleCopyLink}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Link
                    </>
                  )}
                </Button>
                <Button
                  variant="glow"
                  className="flex-1"
                  onClick={handleOpenPayment}
                >
                  <ExternalLink className="h-4 w-4" />
                  Open Payment
                </Button>
              </div>

              {/* I have paid button */}
              <Button
                variant="outline"
                className="w-full"
                onClick={handleCheckPayment}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" />
                )}
                I have paid
              </Button>

              {/* Polling indicator */}
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
                Checking payment status automatically...
              </div>
            </div>
          )}

          {/* Success state */}
          {isSuccess && (
            <div className="p-4 bg-primary/10 rounded-xl text-center">
              <p className="text-sm text-foreground">
                Payment successful! Your subscription has been extended.
              </p>
              <p className="text-lg font-bold text-primary mt-1">
                +{months} {months === 1 ? "month" : "months"}
              </p>
            </div>
          )}

          {/* Error Display */}
          {error && !isSuccess && (
            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 mb-4">
              <p className="text-sm text-destructive text-center">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-5">
            {status === "idle" && (
              <Button
                variant="glow"
                className="w-full"
                onClick={handleCreateRenewal}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {paymentMethod === "card" ? (
                      <CreditCard className="h-4 w-4" />
                    ) : (
                      <QrCode className="h-4 w-4" />
                    )}
                    Pay {formatPrice(totalPrice)}
                  </>
                )}
              </Button>
            )}

            {isTerminalState && !isSuccess && (
              <Button
                variant="outline"
                className="w-full"
                onClick={handleRetry}
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            )}

            {isSuccess && (
              <Button variant="glow" className="w-full" onClick={handleClose}>
                <CheckCircle2 className="h-4 w-4" />
                Done
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
