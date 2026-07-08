"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { paymentsAPI, type PaymentResponse, type PaymentStatusResponse } from "@/lib/api";
import { usePaymentTracking, type PaymentStatus } from "@/lib/payment-tracking-context";

export type { PaymentStatus } from "@/lib/payment-tracking-context";

interface UseCryptoPaymentOptions {
  onSuccess?: (payment: PaymentStatusResponse) => void;
  onError?: (error: string) => void;
}

interface UseCryptoPaymentReturn {
  status: PaymentStatus;
  payment: PaymentResponse | null;
  paymentDetails: PaymentStatusResponse | null;
  isLoading: boolean;
  error: string | null;
  createPayment: (amount: number, currency: string, description: string, planId: string, months?: number) => Promise<void>;
  checkStatus: () => Promise<void>;
  reset: () => void;
  openPaymentUrl: () => void;
}

function generateOrderId(): string {
  return `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function useCryptoPayment(options: UseCryptoPaymentOptions = {}): UseCryptoPaymentReturn {
  const { onSuccess, onError } = options;
  
  // Use global payment tracking
  const {
    trackedPayment,
    paymentStatus: globalStatus,
    paymentDetails: globalDetails,
    startTracking,
    stopTracking,
    forceCheck,
    onPaymentSuccess,
    onPaymentFailed,
  } = usePaymentTracking();

  const [localPayment, setLocalPayment] = useState<PaymentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isMountedRef = useRef(true);

  // Register callbacks for success/failure
  useEffect(() => {
    const unsubscribeSuccess = onPaymentSuccess((details) => {
      onSuccess?.(details);
    });
    
    const unsubscribeFailed = onPaymentFailed((status) => {
      setError(`Payment ${status}`);
      onError?.(`Payment ${status}`);
    });

    return () => {
      unsubscribeSuccess();
      unsubscribeFailed();
    };
  }, [onPaymentSuccess, onPaymentFailed, onSuccess, onError]);

  // Sync local payment with global tracked payment
  useEffect(() => {
    if (trackedPayment) {
      setLocalPayment(trackedPayment.payment);
    }
  }, [trackedPayment]);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Open payment URL in new tab
  const openPaymentUrl = useCallback(() => {
    const paymentUrl = localPayment?.payment_url || trackedPayment?.payment.payment_url;
    if (paymentUrl) {
      window.open(paymentUrl, "_blank", "noopener,noreferrer");
    }
  }, [localPayment?.payment_url, trackedPayment?.payment.payment_url]);

  // Create a new payment
  const createPayment = useCallback(async (
    amount: number, 
    currency: string, 
    description: string = "Subscription payment",
    planId: string,
    months: number = 1
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const orderId = generateOrderId();

      const response = await paymentsAPI.createPayment({
        amount,
        currency,
        order_id: orderId,
        description,
        plan_id: planId,
        months,
      });

      if (!isMountedRef.current) return;

      // Validate response has required fields
      if (!response.payment_id || !response.payment_url) {
        throw new Error("Invalid payment response from server");
      }

      // Update local state
      setLocalPayment(response);
      setIsLoading(false);

      // Start global tracking
      startTracking(response);

      // Automatically open payment URL in new tab
      window.open(response.payment_url, "_blank", "noopener,noreferrer");
    } catch (err) {
      if (!isMountedRef.current) return;
      
      const errorMessage = err instanceof Error ? err.message : "Failed to create payment";
      setError(errorMessage);
      setIsLoading(false);
      onError?.(errorMessage);
    }
  }, [startTracking, onError]);

  // Manual status check
  const checkStatus = useCallback(async () => {
    await forceCheck();
  }, [forceCheck]);

  // Reset payment state (but don't stop global tracking unless explicitly needed)
  const reset = useCallback(() => {
    setLocalPayment(null);
    setError(null);
    setIsLoading(false);
    // Note: We don't stop global tracking here - that continues independently
  }, []);

  // Derive status from global tracking
  const status: PaymentStatus = trackedPayment ? globalStatus : (localPayment ? "pending" : "idle");
  
  // Get payment from either local or global state
  const payment = localPayment || trackedPayment?.payment || null;
  const paymentDetails = globalDetails;

  return {
    status,
    payment,
    paymentDetails,
    isLoading,
    error,
    createPayment,
    checkStatus,
    reset,
    openPaymentUrl,
  };
}
