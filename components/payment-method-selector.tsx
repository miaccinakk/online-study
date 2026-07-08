"use client";

import { cn } from "@/lib/utils";
import { CreditCard, Wallet, AlertCircle } from "lucide-react";

export type PaymentMethod = "card" | "crypto";

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  disabled?: boolean;
  className?: string;
}

// Temporarily disable card payments
const CARD_PAYMENTS_DISABLED = true;

export function PaymentMethodSelector({
  value,
  onChange,
  disabled = false,
  className,
}: PaymentMethodSelectorProps) {
  // If card is currently selected but disabled, switch to crypto
  const effectiveValue = CARD_PAYMENTS_DISABLED && value === "card" ? "crypto" : value;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="grid grid-cols-2 gap-3">
        {/* Card Payment Option - Temporarily Disabled */}
        <button
          type="button"
          onClick={() => !CARD_PAYMENTS_DISABLED && onChange("card")}
          disabled={disabled || CARD_PAYMENTS_DISABLED}
          className={cn(
            "relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/50",
            CARD_PAYMENTS_DISABLED 
              ? "opacity-50 cursor-not-allowed border-border bg-muted/30 text-muted-foreground"
              : effectiveValue === "card"
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-card hover:border-primary/50 hover:bg-muted/50 text-muted-foreground",
            disabled && "opacity-50 cursor-not-allowed hover:border-border hover:bg-card"
          )}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              CARD_PAYMENTS_DISABLED
                ? "bg-muted text-muted-foreground"
                : effectiveValue === "card"
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
            )}
          >
            <CreditCard className="h-5 w-5" />
          </div>
          <div className="text-center">
            <p className={cn(
              "font-medium text-sm",
              CARD_PAYMENTS_DISABLED 
                ? "text-muted-foreground"
                : effectiveValue === "card" ? "text-foreground" : "text-muted-foreground"
            )}>
              Bank Card
            </p>
            <p className="text-xs text-muted-foreground">
              Visa, MC, MIR
            </p>
          </div>
          {!CARD_PAYMENTS_DISABLED && effectiveValue === "card" && (
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
          )}
        </button>

        {/* Crypto Payment Option */}
        <button
          type="button"
          onClick={() => onChange("crypto")}
          disabled={disabled}
          className={cn(
            "relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/50",
            effectiveValue === "crypto"
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border bg-card hover:border-primary/50 hover:bg-muted/50 text-muted-foreground",
            disabled && "opacity-50 cursor-not-allowed hover:border-border hover:bg-card"
          )}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              effectiveValue === "crypto"
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground"
            )}
          >
            <Wallet className="h-5 w-5" />
          </div>
          <div className="text-center">
            <p className={cn(
              "font-medium text-sm",
              effectiveValue === "crypto" ? "text-foreground" : "text-muted-foreground"
            )}>
              Cryptocurrency
            </p>
            <p className="text-xs text-muted-foreground">
              USDT, BTC, ETH
            </p>
          </div>
          {effectiveValue === "crypto" && (
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
          )}
        </button>
      </div>

      {/* Temporarily unavailable notice for card payments */}
      {CARD_PAYMENTS_DISABLED && (
        <div className="flex items-center gap-2 p-3 bg-muted/50 border border-border rounded-lg">
          <AlertCircle className="h-4 w-4 text-muted-foreground shrink-0" />
          <p className="text-xs text-muted-foreground">
            Bank card payments are temporarily unavailable. Please use cryptocurrency.
          </p>
        </div>
      )}
    </div>
  );
}
