"use client";

import { Button } from "@/components/ui/button";
import {
  XCircle,
  RefreshCw,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

export default function PaymentFailPage() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Fail Card */}
        <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
          {/* Fail Header */}
          <div className="p-8 text-center bg-gradient-to-b from-destructive/10 to-transparent">
            <div className="w-20 h-20 mx-auto mb-6 bg-destructive/10 rounded-full flex items-center justify-center">
              <XCircle className="h-10 w-10 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Payment Failed
            </h1>
            <p className="text-muted-foreground">
              Unfortunately, your payment could not be processed. Please try again or choose a different payment method.
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Possible Reasons */}
            <div className="p-4 bg-muted/50 rounded-xl">
              <p className="text-sm font-medium text-foreground mb-2">
                Possible reasons for failure:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                <li>Insufficient funds on your card</li>
                <li>Card declined by your bank</li>
                <li>Payment session expired</li>
                <li>Network or connection issues</li>
              </ul>
            </div>

            {/* Info */}
            <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl">
              <p className="text-sm text-muted-foreground">
                No charges have been made to your account. You can try again with the same or a different payment method.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Link href="/dashboard/subscription" className="block">
                <Button variant="glow" className="w-full">
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
              </Link>

              <Link href="/dashboard" className="block">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>

              <Link href="/dashboard/support" className="block">
                <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
                  <MessageSquare className="h-4 w-4" />
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
