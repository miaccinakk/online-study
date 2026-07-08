"use client";

import { cn } from "@/lib/utils";

interface PeriodSelectorProps {
  months: number;
  onChange: (months: number) => void;
  basePrice: number;
  currency?: string;
  className?: string;
}

// Discount tiers
const getDiscount = (months: number): number => {
  if (months >= 6) return 20;
  if (months >= 3) return 15;
  if (months >= 2) return 10;
  return 0;
};

// Export helper function for calculating price with discount
export function calculatePriceWithDiscount(basePrice: number, months: number): {
  totalPrice: number;
  discount: number;
  pricePerMonth: number;
  savings: number;
} {
  const discount = getDiscount(months);
  const totalWithoutDiscount = basePrice * months;
  const discountAmount = totalWithoutDiscount * (discount / 100);
  const totalPrice = totalWithoutDiscount - discountAmount;
  const pricePerMonth = totalPrice / months;
  
  return {
    totalPrice,
    discount,
    pricePerMonth,
    savings: discountAmount,
  };
}

const getDiscountColor = (months: number): string => {
  if (months >= 6) return "text-green-500";
  if (months >= 3) return "text-emerald-500";
  if (months >= 2) return "text-primary";
  return "text-muted-foreground";
};

const getDiscountBgColor = (months: number): string => {
  if (months >= 6) return "bg-green-500/20 border-green-500/30";
  if (months >= 3) return "bg-emerald-500/20 border-emerald-500/30";
  if (months >= 2) return "bg-primary/20 border-primary/30";
  return "bg-muted border-border";
};

const getSliderColor = (months: number): string => {
  if (months >= 6) return "bg-green-500";
  if (months >= 3) return "bg-emerald-500";
  if (months >= 2) return "bg-primary";
  return "bg-muted-foreground";
};

export function PeriodSelector({
  months,
  onChange,
  basePrice,
  currency = "USD",
  className,
}: PeriodSelectorProps) {
  const discount = getDiscount(months);
  const totalWithoutDiscount = basePrice * months;
  const discountAmount = totalWithoutDiscount * (discount / 100);
  const totalPrice = totalWithoutDiscount - discountAmount;
  const pricePerMonth = totalPrice / months;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
    }).format(price);
  };

  // Tick marks for the slider
  const ticks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className={cn("w-full", className)}>
      {/* Main container */}
      <div className="p-5 bg-card/50 border border-border rounded-2xl">
        {/* Header with period and discount badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-foreground">
              {months} {months === 1 ? "month" : "months"}
            </span>
            {discount > 0 && (
              <span
                className={cn(
                  "px-2.5 py-1 text-xs font-bold rounded-full border",
                  getDiscountBgColor(months),
                  getDiscountColor(months)
                )}
              >
                -{discount}%
              </span>
            )}
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-foreground">
              {formatPrice(totalPrice)}
            </div>
            {discount > 0 && (
              <div className="text-xs text-muted-foreground line-through">
                {formatPrice(totalWithoutDiscount)}
              </div>
            )}
          </div>
        </div>

        {/* Slider */}
        <div className="relative mb-3">
          <input
            type="range"
            min={1}
            max={12}
            value={months}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 appearance-none cursor-pointer rounded-full bg-muted"
            style={{
              background: `linear-gradient(to right, ${
                months >= 6
                  ? "#22c55e"
                  : months >= 3
                  ? "#10b981"
                  : months >= 2
                  ? "hsl(var(--primary))"
                  : "hsl(var(--muted-foreground))"
              } 0%, ${
                months >= 6
                  ? "#22c55e"
                  : months >= 3
                  ? "#10b981"
                  : months >= 2
                  ? "hsl(var(--primary))"
                  : "hsl(var(--muted-foreground))"
              } ${((months - 1) / 11) * 100}%, hsl(var(--muted)) ${
                ((months - 1) / 11) * 100
              }%, hsl(var(--muted)) 100%)`,
            }}
          />
          <style jsx>{`
            input[type="range"]::-webkit-slider-thumb {
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: white;
              border: 3px solid ${months >= 6 ? "#22c55e" : months >= 3 ? "#10b981" : months >= 2 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"};
              cursor: pointer;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
              transition: transform 0.15s ease;
            }
            input[type="range"]::-webkit-slider-thumb:hover {
              transform: scale(1.1);
            }
            input[type="range"]::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: white;
              border: 3px solid ${months >= 6 ? "#22c55e" : months >= 3 ? "#10b981" : months >= 2 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"};
              cursor: pointer;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            }
          `}</style>
        </div>

        {/* Tick marks */}
        <div className="flex justify-between px-1">
          {ticks.map((tick) => (
            <button
              key={tick}
              onClick={() => onChange(tick)}
              className={cn(
                "text-xs font-medium transition-colors",
                tick === months
                  ? getDiscountColor(months)
                  : "text-muted-foreground/50 hover:text-muted-foreground"
              )}
            >
              {tick}
            </button>
          ))}
        </div>

        {/* Discount info */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Price per month</span>
            <span className={cn("font-semibold", discount > 0 ? getDiscountColor(months) : "text-foreground")}>
              {formatPrice(pricePerMonth)}/mo
            </span>
          </div>
          {discount > 0 && (
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-muted-foreground">You save</span>
              <span className={cn("font-semibold", getDiscountColor(months))}>
                {formatPrice(discountAmount)}
              </span>
            </div>
          )}
        </div>

        {/* Discount tiers legend */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
            1 mo: 0%
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
            2 mo: -10%
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-500">
            3-5 mo: -15%
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-500">
            6-12 mo: -20%
          </span>
        </div>
      </div>
    </div>
  );
}

export { getDiscount, getDiscountColor };
