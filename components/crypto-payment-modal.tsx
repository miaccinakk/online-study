"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  useCryptoPayment,
  type PaymentStatus,
} from "@/hooks/use-crypto-payment";
import { PaymentMethodSelector, type PaymentMethod } from "@/components/payment-method-selector";
import { cardPaymentsAPI, type CardPaymentResponse } from "@/lib/api";
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
  Wallet,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import QRCode from "react-qr-code";

interface CryptoPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currency?: string;
  planId: string;
  planName: string;
  months?: number;
  discount?: number;
  onSuccess?: () => void;
}

// Currency is now selected in Helio payment page, not here
const DEFAULT_CURRENCY = "USD";

function getStatusConfig(status: PaymentStatus, paymentMethod: PaymentMethod) {
  const methodLabel = paymentMethod === "card" ? "Card" : "Crypto";
  
  switch (status) {
    case "creating":
      return {
        icon: Loader2,
        iconClass: "animate-spin text-primary",
        title: "Creating Payment",
        description: `Setting up your ${methodLabel.toLowerCase()} payment...`,
        bgClass: "bg-primary/10",
      };
    case "pending":
    case "waiting":
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
    case "completed":
      return {
        icon: CheckCircle2,
        iconClass: "text-primary",
        title: "Payment Successful!",
        description: "Your subscription has been activated",
        bgClass: "bg-primary/10",
      };
    case "failed":
      return {
        icon: XCircle,
        iconClass: "text-destructive",
        title: "Payment Failed",
        description: "Something went wrong. Please try again.",
        bgClass: "bg-destructive/10",
      };
    case "expired":
      return {
        icon: XCircle,
        iconClass: "text-destructive",
        title: "Payment Expired",
        description: "The payment window has expired. Please try again.",
        bgClass: "bg-destructive/10",
      };
    case "cancelled":
      return {
        icon: XCircle,
        iconClass: "text-destructive",
        title: "Payment Cancelled",
        description: "The payment was cancelled.",
        bgClass: "bg-destructive/10",
      };
    default:
      return {
        icon: paymentMethod === "card" ? CreditCard : Wallet,
        iconClass: "text-primary",
        title: "Choose Payment Method",
        description: "Select how you want to pay",
        bgClass: "bg-muted",
      };
  }
}

export function CryptoPaymentModal({
  isOpen,
  onClose,
  amount,
  currency: initialCurrency = "USDT",
  planId,
  planName,
  months = 1,
  discount = 0,
  onSuccess,
}: CryptoPaymentModalProps) {
  const [copied, setCopied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("crypto");
  
  // Card payment state
  const [cardPayment, setCardPayment] = useState<CardPaymentResponse | null>(null);
  const [cardStatus, setCardStatus] = useState<PaymentStatus>("idle");
  const [cardError, setCardError] = useState<string | null>(null);
  const [cardPollingInterval, setCardPollingInterval] = useState<NodeJS.Timeout | null>(null);
  const [isCardLoading, setIsCardLoading] = useState(false);

  const {
    status: cryptoStatus,
    payment: cryptoPayment,
    isLoading: isCryptoLoading,
    error: cryptoError,
    createPayment: createCryptoPayment,
    checkStatus: checkCryptoStatus,
    reset: resetCrypto,
    openPaymentUrl: openCryptoPaymentUrl,
  } = useCryptoPayment({
    onSuccess: () => {
      onSuccess?.();
    },
  });

  // Determine current status based on payment method
  const status = paymentMethod === "card" ? cardStatus : cryptoStatus;
  const payment = paymentMethod === "card" 
    ? (cardPayment ? { payment_id: cardPayment.payment_id, payment_url: cardPayment.payment_url, status: cardPayment.status } : null)
    : cryptoPayment;
  const isLoading = paymentMethod === "card" ? isCardLoading : isCryptoLoading;
  const error = paymentMethod === "card" ? cardError : cryptoError;

  // Cleanup card polling on unmount
  useEffect(() => {
    return () => {
      if (cardPollingInterval) {
        clearInterval(cardPollingInterval);
      }
    };
  }, [cardPollingInterval]);

  // Reset state when modal opens fresh
  useEffect(() => {
    if (isOpen && status === "idle") {
      setCopied(false);
    }
  }, [isOpen, status]);

  // Reset local UI state when modal closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle create card payment
  const handleCreateCardPayment = useCallback(async () => {
    setIsCardLoading(true);
    setCardStatus("creating");
    setCardError(null);

    try {
      const response = await cardPaymentsAPI.createPayment({
        amount,
        currency: "RUB",
        plan_id: planId,
        description: `${planName} Subscription (${months} mo)`,
        months,
        payment_method: "BANK_CARD",
      });

      setCardPayment(response);
      setCardStatus("pending");

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
            setCardStatus("paid");
            onSuccess?.();
          } else if (paymentStatus.status === "expired" || paymentStatus.status === "cancelled" || paymentStatus.status === "failed") {
            clearInterval(interval);
            setCardPollingInterval(null);
            setCardStatus(paymentStatus.status as PaymentStatus);
          }
        } catch {
          // Ignore polling errors
        }
      }, 3000);

      setCardPollingInterval(interval);
    } catch (err) {
      setCardError(err instanceof Error ? err.message : "Failed to create card payment");
      setCardStatus("failed");
    } finally {
      setIsCardLoading(false);
    }
  }, [amount, planId, planName, months, onSuccess]);

  // Handle create payment - use USD, currency selection happens in Helio
  const handleCreateCryptoPayment = useCallback(async () => {
    await createCryptoPayment(amount, DEFAULT_CURRENCY, `${planName} Subscription (${months} mo)`, planId, months);
  }, [createCryptoPayment, amount, planName, planId, months]);

  const handleCreatePayment = useCallback(async () => {
    if (paymentMethod === "card") {
      await handleCreateCardPayment();
    } else {
      await handleCreateCryptoPayment();
    }
  }, [paymentMethod, handleCreateCardPayment, handleCreateCryptoPayment]);

  // Handle copy link
  const handleCopyLink = useCallback(() => {
    if (payment?.payment_url) {
      navigator.clipboard.writeText(payment.payment_url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [payment?.payment_url]);

  // Manual status check
  const handleCheckPayment = useCallback(async () => {
    if (paymentMethod === "card" && cardPayment?.payment_id) {
      setIsCardLoading(true);
      try {
        const paymentStatus = await cardPaymentsAPI.getPaymentStatus(cardPayment.payment_id);
        if (paymentStatus.status === "paid" || paymentStatus.status === "completed") {
          if (cardPollingInterval) {
            clearInterval(cardPollingInterval);
            setCardPollingInterval(null);
          }
          setCardStatus("paid");
          onSuccess?.();
        }
      } catch {
        // Ignore check errors
      } finally {
        setIsCardLoading(false);
      }
    } else {
      await checkCryptoStatus();
    }
  }, [paymentMethod, cardPayment?.payment_id, cardPollingInterval, onSuccess, checkCryptoStatus]);

  // Handle open payment URL
  const handleOpenPayment = useCallback(() => {
    if (paymentMethod === "card" && cardPayment?.payment_url) {
      window.open(cardPayment.payment_url, "_blank", "noopener,noreferrer");
    } else {
      openCryptoPaymentUrl();
    }
  }, [paymentMethod, cardPayment?.payment_url, openCryptoPaymentUrl]);

  // Handle retry
  const handleRetry = useCallback(() => {
    if (paymentMethod === "card") {
      if (cardPollingInterval) {
        clearInterval(cardPollingInterval);
        setCardPollingInterval(null);
      }
      setCardStatus("idle");
      setCardPayment(null);
      setCardError(null);
    } else {
      resetCrypto();
    }
  }, [paymentMethod, cardPollingInterval, resetCrypto]);

  // Handle close
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  const statusConfig = getStatusConfig(status, paymentMethod);
  const StatusIcon = statusConfig.icon;
  const isTerminalState = [
    "paid",
    "completed",
    "failed",
    "expired",
    "cancelled",
  ].includes(status);
  const isPendingPayment = status === "pending" || status === "waiting";
  const isSuccess = status === "paid" || status === "completed";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="text-lg font-semibold text-foreground">
            Payment
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
              statusConfig.bgClass,
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
          <div className="p-4 bg-muted/50 rounded-xl mb-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-xs text-muted-foreground">Plan</p>
                <p className="font-medium text-foreground">{planName}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="font-medium text-foreground">
                  {months} {months === 1 ? "month" : "months"}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground">Total Amount</p>
                <p className="text-lg font-bold text-foreground">
                  ${amount.toFixed(2)}{" "}
                  <span className="text-sm text-muted-foreground font-normal">
                    USD
                  </span>
                </p>
              </div>
              {discount > 0 && (
                <span className={cn(
                  "px-2.5 py-1 text-xs font-bold rounded-full",
                  discount >= 20 ? "bg-green-500/20 text-green-500" :
                  discount >= 15 ? "bg-emerald-500/20 text-emerald-500" :
                  "bg-primary/20 text-primary"
                )}>
                  -{discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Payment Method Selector (only in idle state) */}
          {status === "idle" && (
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
          )}

          {/* Creating state */}
          {status === "creating" && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {/* QR Code and Payment Actions (when pending) */}
          {isPendingPayment && payment?.payment_url && (
            <div className="space-y-4">
              {/* QR Code - only show for crypto */}
              {paymentMethod === "crypto" && (
                <div className="flex justify-center">
                  <div className="p-4 bg-white rounded-xl">
                    <QRCode value={payment.payment_url} size={180} level="M" />
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
                onClick={handleCreatePayment}
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
                    Pay ${amount.toFixed(2)}
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
