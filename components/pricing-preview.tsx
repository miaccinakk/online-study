import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PricingCard, type PricingTier } from "@/components/pricing-card";
import { ArrowRight } from "lucide-react";

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$0",
    description: "Try your first lessons for free",
    features: [
      "Access to beginner materials",
      "1 group lesson per month",
      "Self-study exercises",
      "Community practice forum",
      "Progress tracking",
    ],
    buttonText: "Start Free",
    buttonVariant: "outline",
    href: "/register",
  },
  {
    name: "Standard",
    price: "$29",
    period: "month",
    description: "For steady, consistent learners",
    features: [
      "All Starter features",
      "4 live group lessons per month",
      "All course materials",
      "Homework feedback",
      "Certificates of completion",
    ],
    highlighted: true,
    buttonText: "Choose Standard",
    buttonVariant: "glow",
    href: "/register",
  },
  {
    name: "Premium",
    price: "$59",
    period: "month",
    description: "Fastest progress with 1-on-1 time",
    features: [
      "All Standard features",
      "Unlimited group lessons",
      "2 private lessons per month",
      "Personal learning plan",
      "Priority teacher support",
    ],
    buttonText: "Choose Premium",
    buttonVariant: "accent",
    href: "/register",
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
