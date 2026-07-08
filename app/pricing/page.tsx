import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, X, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: {
    canonical: "/pricing",
  },
  title: "Pricing - LinguaHub Online Language School",
  description:
    "Choose the right LinguaHub plan. Free, Pro ($15/mo), or Premium ($25/mo) with live group lessons, native teachers, one-on-one classes, and certificates.",
};

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: null,
    description: "Everything you need to try your first language lessons",
    buttonText: "Start Free",
    buttonVariant: "outline" as const,
    highlighted: false,
    disabled: false,
    href: "/dashboard",
    features: [
      "Access to 1 language",
      "2 live group lessons per month",
      "Interactive practice exercises",
      "Basic progress tracking",
      "Community study groups",
    ],
  },
  {
    name: "Pro",
    price: "$15",
    period: "month",
    description: "For motivated learners who want steady progress",
    buttonText: "Choose Pro",
    buttonVariant: "glow" as const,
    highlighted: true,
    disabled: false,
    href: "/dashboard/subscription",
    features: [
      "All Free plan features",
      "Access to all 4 languages",
      "Unlimited live group lessons",
      "Downloadable lesson materials",
      "Detailed progress tracking",
      "Course completion certificates",
    ],
  },
  {
    name: "Premium",
    price: "$25",
    period: "month",
    description: "Fastest results with personal one-on-one attention",
    buttonText: "Choose Premium",
    buttonVariant: "accent" as const,
    highlighted: false,
    disabled: false,
    href: "/dashboard/subscription",
    features: [
      "All Pro plan features",
      "4 one-on-one lessons per month",
      "Personalized learning plan",
      "Priority teacher support",
      "Exam preparation courses",
    ],
  },
];

const features = [
  {
    name: "Live group lessons per month",
    free: "2",
    pro: "Unlimited",
    premium: "Unlimited",
  },
  {
    name: "One-on-one lessons per month",
    free: false,
    pro: false,
    premium: "4",
  },
  {
    name: "Languages available",
    free: "1",
    pro: "All 4",
    premium: "All 4",
  },
  {
    name: "Interactive practice exercises",
    free: true,
    pro: true,
    premium: true,
  },
  {
    name: "Downloadable lesson materials",
    free: false,
    pro: true,
    premium: true,
  },
  {
    name: "Progress tracking",
    free: "Basic",
    pro: "Detailed",
    premium: "Detailed",
  },
  {
    name: "Course completion certificates",
    free: false,
    pro: true,
    premium: true,
  },
  {
    name: "Exam preparation courses",
    free: false,
    pro: false,
    premium: true,
  },
  {
    name: "Priority teacher support",
    free: false,
    pro: false,
    premium: true,
  },
  {
    name: "Community study groups",
    free: true,
    pro: true,
    premium: true,
  },
];

const faqs = [
  {
    question: "What do I need to join lessons?",
    answer:
      "Just a stable internet connection and a device with a camera and microphone, such as a laptop, tablet, or phone. Lessons run right in your browser, so there is nothing to install.",
  },
  {
    question: "Can I change my plan?",
    answer:
      "Yes, you can switch plans at any time. When upgrading, changes take effect immediately. When downgrading, changes apply in the next billing period.",
  },
  {
    question: "Do I need any experience to start?",
    answer:
      "Not at all. Our courses welcome complete beginners as well as learners who want to improve. During sign-up we help you find the right level so you feel comfortable from your first lesson.",
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
              <p className="text-sm font-medium text-foreground">About Live Lessons</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Live lessons are hosted online with native teachers in small groups. Group lesson allowances reset monthly with your billing cycle, and Premium members can book one-on-one lessons for personalized practice.
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
