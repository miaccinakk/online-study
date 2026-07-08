import type { Metadata } from "next";
import Link from "next/link";
import {
  User,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Clock,
  Mail,
  DollarSign,
  Calendar,
  Wallet,
} from "lucide-react";

export const metadata: Metadata = {
  alternates: {
    canonical: "/how-to-pay",
  },
  title: "How to Pay",
  description:
    "Learn how to subscribe to AI4Car plans. Free, Pro ($15/mo), or Premium ($25/mo) with token-based AI diagnostics. Payment guide and refund policy.",
  openGraph: {
    title: "How to Pay - AI4Car",
    description: "Complete guide to payment process, subscription plans (Free, Pro $15/mo, Premium $25/mo), and refund conditions for AI4Car.",
  },
};

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: null,
    description: "Basic features to get started",
  },
  {
    name: "Pro",
    price: "$15",
    period: "month",
    description: "Advanced tools for enthusiasts",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "$25",
    period: "month",
    description: "Maximum AI analytics capabilities",
  },
];

const paymentSystems = [
  { name: "Bank Card", icon: CreditCard, description: "Visa, Mastercard, MIR via Cent.app" },
  { name: "Cryptocurrency", icon: Wallet, description: "USDT, BTC, ETH via Heleket" },
];

export default function HowToPayPage() {
  return (
    <div className="min-h-[calc(100vh-160px)] px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-3">
            How to Pay
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This page explains the payment process, available plans, payment methods, and refund conditions. All payments are made through your account dashboard.
          </p>
        </div>

        {/* Step 1: Authorization */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
              1
            </div>
            <h2 className="text-xl font-semibold text-foreground">Authorization</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
              <User className="h-6 w-6 text-primary shrink-0" />
              <div>
                <h4 className="font-medium text-foreground mb-1">Account Required</h4>
                <p className="text-sm text-muted-foreground">
                  To make a payment and subscribe to a plan, you must be logged into your AI4Car account. If you don&apos;t have an account yet, you can register on the{" "}
                  <Link href="/register" className="text-primary hover:underline">registration page</Link>.
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              After logging in, you will have access to your personal dashboard where you can manage your subscription and payment methods.
            </p>
          </div>
        </div>

        {/* Step 2: Available Plans */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
              2
            </div>
            <h2 className="text-xl font-semibold text-foreground">Available Plans</h2>
          </div>

          <p className="text-muted-foreground mb-6">
            We offer three subscription plans to meet different needs. You can view full details and compare features on the{" "}
            <Link href="/pricing" className="text-primary hover:underline">pricing page</Link>.
          </p>

          {/* Plans Info */}
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`p-4 rounded-xl border-2 ${
                  plan.highlighted
                    ? "border-primary/50 bg-primary/5"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-foreground">{plan.name}</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {plan.price}
                  {plan.period && (
                    <span className="text-sm font-normal text-muted-foreground">
                      /{plan.period}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
              </div>
            ))}
          </div>

          {/* Billing Periods Info */}
          <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
            <Calendar className="h-6 w-6 text-primary shrink-0" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Billing Period Options</h4>
              <p className="text-sm text-muted-foreground">
                For paid plans (Pro and Premium), you can choose between <strong>monthly</strong> or <strong>yearly</strong> billing. Yearly subscriptions include a <strong>20% discount</strong> compared to monthly payments.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3: Payment Methods */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
              3
            </div>
            <h2 className="text-xl font-semibold text-foreground">Payment Methods</h2>
          </div>

          <p className="text-muted-foreground mb-6">
            We accept the following payment methods for your convenience:
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {paymentSystems.map((payment) => {
              const Icon = payment.icon;
              return (
                <div
                  key={payment.name}
                  className="p-4 rounded-xl border border-border bg-muted/30 flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{payment.name}</span>
                    <p className="text-sm text-muted-foreground">{payment.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-muted/50 rounded-xl">
            <p className="text-sm text-muted-foreground">
              All payment transactions are processed securely. Your payment information is encrypted and never stored on our servers. After successful payment, your subscription activates immediately.
            </p>
          </div>
        </div>

        {/* Step 4: Payment Process */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
              4
            </div>
            <h2 className="text-xl font-semibold text-foreground">Payment Process</h2>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-3">How to Complete Your Payment</h3>
            <ol className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium shrink-0">1</span>
                <span>Log in to your account or create a new one on the registration page</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium shrink-0">2</span>
                <span>Navigate to the pricing page and select your desired plan</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium shrink-0">3</span>
                <span>Choose your billing period (monthly or yearly for paid plans)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium shrink-0">4</span>
                <span>Select your preferred payment method and enter payment details</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium shrink-0">5</span>
                <span>Review your order and confirm the payment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium shrink-0">6</span>
                <span>Your subscription activates immediately after successful payment</span>
              </li>
            </ol>
          </div>
        </div>

        {/* Step 5: Refund Policy */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
              5
            </div>
            <h2 className="text-xl font-semibold text-foreground">Refund Policy & Conditions</h2>
          </div>

          <div className="space-y-6">
            {/* Refund Policy */}
            <div>
              <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Refund Conditions
              </h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-start gap-3 p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm">
                    <strong className="text-foreground">No refunds</strong> will be issued if you have selected an incorrect payment method or if any AI tokens/tools have been used during your subscription.
                  </p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm">
                    <strong className="text-foreground">Refunds are available</strong> only if you have not used any AI tokens or AI-powered features during your subscription period.
                  </p>
                </div>
              </div>
            </div>

            {/* Refund Period */}
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
              <Clock className="h-6 w-6 text-primary shrink-0" />
              <div>
                <h4 className="font-medium text-foreground mb-1">Refund Request Period</h4>
                <p className="text-sm text-muted-foreground">
                  You may request a refund within <strong>7 days</strong> of purchase (in compliance with EU/US consumer protection laws), provided no AI tokens or features have been used.
                </p>
              </div>
            </div>

            {/* How to Request Refund */}
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
              <Mail className="h-6 w-6 text-primary shrink-0" />
              <div>
                <h4 className="font-medium text-foreground mb-1">How to Request a Refund</h4>
                <p className="text-sm text-muted-foreground">
                  To request a refund, please contact our support team through the{" "}
                  <Link href="/contact" className="text-primary hover:underline">Contact page</Link>{" "}
                  or send an email to{" "}
                  <a href="mailto:support@ai4car.com" className="text-primary hover:underline">support@ai4car.com</a>.
                  Include your account email and order details in your request.
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                By completing a purchase, you agree to our{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                . For any questions regarding payments or refunds, please visit our{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Contact page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
