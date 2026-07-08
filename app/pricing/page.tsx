import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, X, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: {
    canonical: "/pricing",
  },
  title: "Pricing - AI4Car OBD2 Scanner",
  description:
    "Choose the right AI4Car plan. Free, Pro ($15/mo), or Premium ($25/mo) with token-based AI diagnostics, live vehicle data, and OBD2 scanner features.",
};

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: null,
    description: "Basic features to get started with OBD2 diagnostics",
    buttonText: "Start Free",
    buttonVariant: "outline" as const,
    highlighted: false,
    disabled: false,
    href: "/dashboard",
    features: [
      "Basic error scanning",
      "Read OBD2 codes",
      "Reset Check Engine light",
      "3 full scans per month",
      "4 visible Live Data PIDs",
      "1K AI tokens",
    ],
  },
  {
    name: "Pro",
    price: "$15",
    period: "month",
    description: "Advanced tools for car enthusiasts",
    buttonText: "Choose Pro",
    buttonVariant: "glow" as const,
    highlighted: true,
    disabled: false,
    href: "/dashboard/subscription",
    features: [
      "All Free plan features",
      "Unlimited full scans",
      "20 visible Live Data PIDs",
      "1M AI tokens",
      "20 sec voice messages",
      "3 vehicles in garage",
    ],
  },
  {
    name: "Premium",
    price: "$25",
    period: "month",
    description: "Maximum AI analytics capabilities for professionals",
    buttonText: "Choose Premium",
    buttonVariant: "accent" as const,
    highlighted: false,
    disabled: false,
    href: "/dashboard/subscription",
    features: [
      "All Pro plan features",
      "Unlimited Live Data PIDs",
      "5M AI tokens",
      "30 sec voice messages",
      "5 vehicles in garage",
    ],
  },
];

const features = [
  {
    name: "Basic error scanning",
    free: true,
    pro: true,
    premium: true,
  },
  {
    name: "Read OBD2 codes",
    free: true,
    pro: true,
    premium: true,
  },
  {
    name: "Reset Check Engine light",
    free: true,
    pro: true,
    premium: true,
  },
  {
    name: "Full scans per month",
    free: "3",
    pro: "Unlimited",
    premium: "Unlimited",
  },
  {
    name: "Live Data / PID monitoring",
    free: true,
    pro: true,
    premium: true,
  },
  {
    name: "Visible Live Data PIDs",
    free: "4",
    pro: "20",
    premium: "Unlimited",
  },
  {
    name: "AI assistant token budget",
    free: "1K",
    pro: "1M",
    premium: "5M",
  },
  {
    name: "Voice message duration",
    free: "10 sec",
    pro: "20 sec",
    premium: "30 sec",
  },
  {
    name: "Diagnostic console",
    free: true,
    pro: true,
    premium: true,
  },
  {
    name: "Vehicles in garage",
    free: "1",
    pro: "3",
    premium: "5",
  },
];

const faqs = [
  {
    question: "What adapter do I need?",
    answer:
      "AI4Car is compatible with any ELM327-compatible OBD2 adapter. We recommend using Bluetooth 4.0+ adapters for best performance.",
  },
  {
    question: "Can I change my plan?",
    answer:
      "Yes, you can switch plans at any time. When upgrading, changes take effect immediately. When downgrading, changes apply in the next billing period.",
  },
  {
    question: "What is the AI token budget?",
    answer:
      "AI features use token-based usage instead of request limits. Tokens are consumed when you use AI diagnostics, error code explanations, and the AI assistant. Higher plans include more tokens for extended AI usage.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Yes, we offer a full refund within 14 days of subscription if you are not satisfied with the service.",
  },
  {
    question: "How can I get help or support?",
    answer:
      "Once logged in, you can access our Support section from your Dashboard. Create a support ticket and our team will respond to you as soon as possible. We typically respond within 24 hours.",
  },
];

function FeatureValue({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm font-medium text-primary">{value}</span>;
  }
  if (value) {
    return (
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
        <Check className="h-3.5 w-3.5 text-primary" />
      </div>
    );
  }
  return <X className="h-5 w-5 text-muted-foreground/30" />;
}

export default function PricingPage() {
  return (
    <div className="relative py-16 sm:py-24">
      {/* Background */}
      <div className="absolute inset-0 isometric-grid opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-foreground">Choose Your </span>
            <span className="gradient-text">Plan</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Transparent pricing with no hidden fees. Start free and
            upgrade as needed.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 sm:p-8",
                tier.highlighted
                  ? "border-primary/50 bg-gradient-to-b from-primary/10 to-card glow-primary"
                  : "border-transparent bg-card/50 hover:border-primary/30 hover:bg-card",
                tier.disabled && "opacity-70"
              )}
            >
              {tier.highlighted && (
                <div className={cn(
                  "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-semibold",
                  tier.disabled 
                    ? "bg-muted text-muted-foreground" 
                    : "bg-primary text-primary-foreground"
                )}>
                  {tier.disabled ? "Coming Soon" : "Popular"}
                </div>
              )}

              <h2 className={cn(
                "text-xl font-semibold",
                tier.highlighted && !tier.disabled ? "text-primary" : "text-card-foreground"
              )}>
                {tier.name}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {tier.description}
              </p>

              <div className="mt-6 mb-6">
                <span className={cn(
                  "text-4xl font-bold",
                  tier.highlighted && !tier.disabled ? "gradient-text" : "text-card-foreground"
                )}>
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-muted-foreground">/{tier.period}</span>
                )}
              </div>

              {/* Features List */}
              <ul className="mb-8 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {tier.disabled ? (
                <Button
                  variant="outline"
                  className="w-full cursor-not-allowed opacity-50"
                  disabled
                >
                  {tier.buttonText}
                </Button>
              ) : (
                <Button
                  asChild
                  variant={tier.buttonVariant}
                  className="w-full"
                >
                  <Link href={tier.href || "#"}>{tier.buttonText}</Link>
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Feature comparison table */}
        <div className="mt-24">
          <h2 className="text-left text-2xl font-bold sm:text-3xl">
            <span className="text-foreground">Feature </span>
            <span className="gradient-text">Comparison</span>
          </h2>

          <div className="mt-12 overflow-x-auto rounded-2xl border border-border/50">
            <table className="w-full min-w-[480px]">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="px-3 py-3 text-left text-xs font-semibold text-foreground sm:px-6 sm:py-4 sm:text-sm">
                    Feature
                  </th>
                  <th className="px-2 py-3 text-center text-xs font-semibold text-muted-foreground sm:px-6 sm:py-4 sm:text-sm">
                    Free
                  </th>
                  <th className="px-2 py-3 text-center text-xs font-semibold text-primary sm:px-6 sm:py-4 sm:text-sm">
                    Pro
                  </th>
                  <th className="px-2 py-3 text-center text-xs font-semibold text-accent sm:px-6 sm:py-4 sm:text-sm">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {features.map((feature) => (
                  <tr key={feature.name} className="bg-card/30 transition-colors hover:bg-card/50">
                    <td className="px-3 py-3 text-xs text-card-foreground sm:px-6 sm:py-4 sm:text-sm">
                      {feature.name}
                    </td>
                    <td className="px-2 py-3 text-center sm:px-6 sm:py-4">
                      <div className="flex justify-center">
                        <FeatureValue value={feature.free} />
                      </div>
                    </td>
                    <td className="px-2 py-3 text-center sm:px-6 sm:py-4">
                      <div className="flex justify-center">
                        <FeatureValue value={feature.pro} />
                      </div>
                    </td>
                    <td className="px-2 py-3 text-center sm:px-6 sm:py-4">
                      <div className="flex justify-center">
                        <FeatureValue value={feature.premium} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Token-based AI usage note */}
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <HelpCircle className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">About AI Token Usage</p>
              <p className="mt-1 text-sm text-muted-foreground">
                AI features use token-based usage instead of request limits. Tokens are consumed when using AI diagnostics, error code explanations, and the AI assistant. Token budgets reset monthly with your billing cycle.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-24">
          <h2 className="text-left text-2xl font-bold sm:text-3xl">
            <span className="text-foreground">Frequently Asked </span>
            <span className="gradient-text">Questions</span>
          </h2>

          <div className="mt-12 divide-y divide-border/50 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm">
            {faqs.map((faq) => (
              <div key={faq.question} className="p-6">
                <h3 className="flex items-center gap-3 font-semibold text-foreground">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <HelpCircle className="h-4 w-4 text-primary" />
                  </div>
                  {faq.question}
                </h3>
                <p className="mt-3 pl-9 text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
