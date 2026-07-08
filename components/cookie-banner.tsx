"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem("cookie-consent");
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-card/95 p-4 shadow-2xl backdrop-blur-xl sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md sm:rounded-xl sm:border">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <p className="text-sm leading-relaxed text-card-foreground">
            We use cookies to improve site performance and analytics.
            By continuing to use this site, you agree to our use of cookies.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button size="sm" variant="glow" onClick={handleAccept}>
              Accept
            </Button>
            <Button size="sm" variant="outline" onClick={handleDecline}>
              Decline
            </Button>
          </div>
        </div>
        <button
          onClick={handleDecline}
          className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
