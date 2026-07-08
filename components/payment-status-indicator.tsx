"use client";

import { useEffect, useState } from "react";
import { usePaymentTracking } from "@/lib/payment-tracking-context";
import { Clock, CheckCircle2, XCircle, ExternalLink, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function PaymentStatusIndicator() {
  const router = useRouter();
  const { 
    trackedPayment, 
    paymentStatus, 
    stopTracking,
  } = usePaymentTracking();
  
  const [isVisible, setIsVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);

  // Show indicator when there's a tracked payment
  useEffect(() => {
    if (trackedPayment) {
      setIsVisible(true);
      setShowSuccess(false);
      setShowFailed(false);
    }
  }, [trackedPayment]);

  // Handle payment completion
  useEffect(() => {
    if (paymentStatus === "paid" || paymentStatus === "completed") {
      setShowSuccess(true);
      // Hide after 5 seconds and redirect
      const timer = setTimeout(() => {
        setIsVisible(false);
        setShowSuccess(false);
        router.push("/dashboard/payment/success");
      }, 5000);
      return () => clearTimeout(timer);
    }
    
    if (paymentStatus === "failed" || paymentStatus === "expired" || paymentStatus === "cancelled") {
      setShowFailed(true);
      // Hide after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setShowFailed(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [paymentStatus, router]);

  const handleOpenPayment = () => {
    if (trackedPayment?.payment.payment_url) {
      window.open(trackedPayment.payment.payment_url, "_blank", "noopener,noreferrer");
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    if (!showSuccess && !showFailed) {
      // If dismissing while pending, stop tracking
      stopTracking();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className={cn(
        "rounded-xl border p-4 shadow-lg backdrop-blur-sm",
        showSuccess 
          ? "bg-primary/10 border-primary/30" 
          : showFailed 
            ? "bg-destructive/10 border-destructive/30"
            : "bg-card border-border"
      )}>
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
            showSuccess 
              ? "bg-primary/20" 
              : showFailed 
                ? "bg-destructive/20"
                : "bg-accent/20"
          )}>
            {showSuccess ? (
              <CheckCircle2 className="h-5 w-5 text-primary" />
            ) : showFailed ? (
              <XCircle className="h-5 w-5 text-destructive" />
            ) : (
              <Clock className="h-5 w-5 text-accent animate-pulse" />
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground text-sm">
              {showSuccess 
                ? "Payment Successful!" 
                : showFailed 
                  ? "Payment Failed"
                  : "Payment Pending"}
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              {showSuccess 
                ? "Your subscription is being activated..." 
                : showFailed 
                  ? "Please try again"
                  : "Tracking in background..."}
            </p>
            
            {/* Action button for pending payments */}
            {!showSuccess && !showFailed && trackedPayment && (
              <button
                onClick={handleOpenPayment}
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
              >
                <ExternalLink className="h-3 w-3" />
                Open payment page
              </button>
            )}
          </div>
          
          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
