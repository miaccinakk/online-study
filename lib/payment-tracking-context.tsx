"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { paymentsAPI, type PaymentResponse, type PaymentStatusResponse } from "./api";

export type PaymentStatus =
  | "idle"
  | "creating"
  | "pending"
  | "waiting"
  | "paid"
  | "completed"
  | "failed"
  | "expired"
  | "cancelled";

interface TrackedPayment {
  payment: PaymentResponse;
  createdAt: number;
  lastCheckedAt: number;
  checkCount: number;
}

interface PaymentTrackingContextType {
  // Current tracking state
  trackedPayment: TrackedPayment | null;
  paymentStatus: PaymentStatus;
  paymentDetails: PaymentStatusResponse | null;
  isChecking: boolean;
  
  // Actions
  startTracking: (payment: PaymentResponse) => void;
  stopTracking: () => void;
  forceCheck: () => Promise<void>;
  
  // Callbacks registration
  onPaymentSuccess: (callback: (details: PaymentStatusResponse) => void) => () => void;
  onPaymentFailed: (callback: (status: string) => void) => () => void;
}

const PaymentTrackingContext = createContext<PaymentTrackingContextType | undefined>(undefined);

const STORAGE_KEY = "payment_tracking_state";
const MAX_PAYMENT_AGE = 60 * 60 * 1000; // 1 hour
const BASE_POLL_INTERVAL = 5000; // 5 seconds
const MAX_POLL_INTERVAL = 60000; // 60 seconds
const POLL_BACKOFF_MULTIPLIER = 1.2; // Increase interval by 20% each check

interface StoredPaymentState {
  payment: PaymentResponse;
  createdAt: number;
  lastCheckedAt: number;
  checkCount: number;
}

export function PaymentTrackingProvider({ children }: { children: ReactNode }) {
  const [trackedPayment, setTrackedPayment] = useState<TrackedPayment | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [paymentDetails, setPaymentDetails] = useState<PaymentStatusResponse | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  
  const pollingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);
  const successCallbacksRef = useRef<Set<(details: PaymentStatusResponse) => void>>(new Set());
  const failedCallbacksRef = useRef<Set<(status: string) => void>>(new Set());

  // Calculate next poll interval with exponential backoff
  const getNextPollInterval = useCallback((checkCount: number): number => {
    const interval = BASE_POLL_INTERVAL * Math.pow(POLL_BACKOFF_MULTIPLIER, checkCount);
    return Math.min(interval, MAX_POLL_INTERVAL);
  }, []);

  // Save state to localStorage
  const saveToStorage = useCallback((state: TrackedPayment | null) => {
    if (state) {
      const toStore: StoredPaymentState = {
        payment: state.payment,
        createdAt: state.createdAt,
        lastCheckedAt: state.lastCheckedAt,
        checkCount: state.checkCount,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Clear polling timeout
  const clearPolling = useCallback(() => {
    if (pollingTimeoutRef.current) {
      clearTimeout(pollingTimeoutRef.current);
      pollingTimeoutRef.current = null;
    }
  }, []);

  // Check payment status
  const checkPaymentStatus = useCallback(async (payment: TrackedPayment): Promise<void> => {
    if (!payment.payment.payment_id) return;

    setIsChecking(true);

    try {
      const statusResponse = await paymentsAPI.getPaymentStatus(payment.payment.payment_id);
      
      if (!isMountedRef.current) return;

      setPaymentDetails(statusResponse);

      const normalizedStatus = statusResponse.status.toLowerCase() as PaymentStatus;

      if (normalizedStatus === "paid" || normalizedStatus === "completed") {
        setPaymentStatus(normalizedStatus);
        setTrackedPayment(null);
        saveToStorage(null);
        clearPolling();
        
        // Notify success callbacks
        successCallbacksRef.current.forEach(cb => cb(statusResponse));
      } else if (normalizedStatus === "failed" || normalizedStatus === "expired" || normalizedStatus === "cancelled") {
        setPaymentStatus(normalizedStatus);
        setTrackedPayment(null);
        saveToStorage(null);
        clearPolling();
        
        // Notify failed callbacks
        failedCallbacksRef.current.forEach(cb => cb(normalizedStatus));
      } else {
        // Still pending - update state and schedule next check
        setPaymentStatus(normalizedStatus);
        
        const updatedPayment: TrackedPayment = {
          ...payment,
          lastCheckedAt: Date.now(),
          checkCount: payment.checkCount + 1,
        };
        setTrackedPayment(updatedPayment);
        saveToStorage(updatedPayment);

        // Schedule next check with backoff
        const nextInterval = getNextPollInterval(updatedPayment.checkCount);
        pollingTimeoutRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            checkPaymentStatus(updatedPayment);
          }
        }, nextInterval);
      }
    } catch (err) {
      console.error("[PaymentTracking] Failed to check status:", err);
      
      if (!isMountedRef.current) return;
      
      // On error, still schedule next check but with longer interval
      const updatedPayment: TrackedPayment = {
        ...payment,
        lastCheckedAt: Date.now(),
        checkCount: payment.checkCount + 1,
      };
      setTrackedPayment(updatedPayment);
      saveToStorage(updatedPayment);

      const nextInterval = getNextPollInterval(updatedPayment.checkCount) * 2; // Double interval on error
      pollingTimeoutRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          checkPaymentStatus(updatedPayment);
        }
      }, nextInterval);
    } finally {
      if (isMountedRef.current) {
        setIsChecking(false);
      }
    }
  }, [clearPolling, getNextPollInterval, saveToStorage]);

  // Load saved payment from localStorage on mount
  useEffect(() => {
    isMountedRef.current = true;

    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsed: StoredPaymentState = JSON.parse(savedState);
        
        // Check if payment is still valid (not too old)
        if (Date.now() - parsed.createdAt < MAX_PAYMENT_AGE) {
          const restoredPayment: TrackedPayment = {
            payment: parsed.payment,
            createdAt: parsed.createdAt,
            lastCheckedAt: parsed.lastCheckedAt,
            checkCount: parsed.checkCount,
          };
          
          setTrackedPayment(restoredPayment);
          setPaymentStatus("pending");
          
          // Start checking immediately
          checkPaymentStatus(restoredPayment);
        } else {
          // Payment expired, clear storage
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    return () => {
      isMountedRef.current = false;
      clearPolling();
    };
  }, []); // Only run on mount

  // Start tracking a new payment
  const startTracking = useCallback((payment: PaymentResponse) => {
    clearPolling();
    
    const newTrackedPayment: TrackedPayment = {
      payment,
      createdAt: Date.now(),
      lastCheckedAt: Date.now(),
      checkCount: 0,
    };
    
    setTrackedPayment(newTrackedPayment);
    setPaymentStatus("pending");
    setPaymentDetails(null);
    saveToStorage(newTrackedPayment);
    
    // Start checking after initial delay
    pollingTimeoutRef.current = setTimeout(() => {
      if (isMountedRef.current) {
        checkPaymentStatus(newTrackedPayment);
      }
    }, BASE_POLL_INTERVAL);
  }, [checkPaymentStatus, clearPolling, saveToStorage]);

  // Stop tracking current payment
  const stopTracking = useCallback(() => {
    clearPolling();
    setTrackedPayment(null);
    setPaymentStatus("idle");
    setPaymentDetails(null);
    saveToStorage(null);
  }, [clearPolling, saveToStorage]);

  // Force an immediate status check
  const forceCheck = useCallback(async () => {
    if (!trackedPayment) return;
    
    clearPolling();
    await checkPaymentStatus(trackedPayment);
  }, [trackedPayment, checkPaymentStatus, clearPolling]);

  // Register success callback
  const onPaymentSuccess = useCallback((callback: (details: PaymentStatusResponse) => void) => {
    successCallbacksRef.current.add(callback);
    return () => {
      successCallbacksRef.current.delete(callback);
    };
  }, []);

  // Register failed callback
  const onPaymentFailed = useCallback((callback: (status: string) => void) => {
    failedCallbacksRef.current.add(callback);
    return () => {
      failedCallbacksRef.current.delete(callback);
    };
  }, []);

  return (
    <PaymentTrackingContext.Provider
      value={{
        trackedPayment,
        paymentStatus,
        paymentDetails,
        isChecking,
        startTracking,
        stopTracking,
        forceCheck,
        onPaymentSuccess,
        onPaymentFailed,
      }}
    >
      {children}
    </PaymentTrackingContext.Provider>
  );
}

export function usePaymentTracking() {
  const context = useContext(PaymentTrackingContext);
  if (context === undefined) {
    throw new Error("usePaymentTracking must be used within a PaymentTrackingProvider");
  }
  return context;
}
