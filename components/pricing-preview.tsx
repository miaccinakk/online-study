import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PricingCard, type PricingTier } from "@/components/pricing-card";
import { ArrowRight } from "lucide-react";

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    description: "Basic features to get started",
    features: [
      "Basic error scanning",
      "Read OBD2 codes",
      "Reset Check Engine light",
      "3 full scans per month",
      "4 visible Live Data PIDs",
      "1K AI tokens",
    ],
    buttonText: "Start Free",
    buttonVariant: "outline",
    href: "/dashboard",
  },
  {
    name: "Pro",
    price: "$15",
    period: "month",
    description: "Advanced tools for enthusiasts",
    features: [
      "All Free plan features",
      "Unlimited full scans",
      "20 visible Live Data PIDs",
      "1M AI tokens",
      "20 sec voice messages",
      "3 vehicles in garage",
    ],
    highlighted: true,
    buttonText: "Choose Pro",
    buttonVariant: "glow",
    href: "/dashboard/subscription",
  },
  {
    name: "Premium",
    price: "$25",
    period: "month",
    description: "Maximum AI analytics capabilities",
    features: [
      "All Pro plan features",
      "Unlimited Live Data PIDs",
      "5M AI tokens",
      "30 sec voice messages",
      "5 vehicles in garage",
    ],
    buttonText: "Choose Premium",
    buttonVariant: "accent",
    href: "/dashboard/subscription",
  },
];

export function PricingPreview() {
  return (
    <section className="relative py-20 sm:py-28">
      {/* Seamless background continuation - no hard edges */}
      <div className="absolute inset-0 isometric-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background/70" />
      
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-left">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-foreground">Choose Your </span>
            <span className="gradient-text">Plan</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Start free and upgrade as needed. Transparent pricing
            with no hidden fees.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-left">
          <Button asChild variant="link" className="text-primary px-0">
            <Link href="/pricing">
              Learn more about pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
