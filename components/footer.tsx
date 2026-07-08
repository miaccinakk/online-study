"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Cpu, Mail, Smartphone, Zap, Shield, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

const footerLinksBase = {
  product: [
    { href: "/downloads", label: "Download" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/how-to-pay", label: "How to Pay" },
    { href: "/problems", label: "Problems & Codes" },
  ],
  companyGuest: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  companyAuth: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/dashboard/support", label: "Support" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/sitemap-page", label: "Site Map" },
  ],
};

// Android icon component
function AndroidIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.523 15.341c-.5 0-.906-.406-.906-.906s.406-.906.906-.906.906.406.906.906-.406.906-.906.906m-11.046 0c-.5 0-.906-.406-.906-.906s.406-.906.906-.906.906.406.906.906-.406.906-.906.906m11.4-6.057l1.959-3.391a.408.408 0 00-.706-.407l-1.983 3.435c-1.502-.686-3.189-1.07-4.999-1.07s-3.497.384-4.999 1.07L5.166 5.486a.408.408 0 00-.706.407l1.959 3.391C3.447 10.963 1.5 13.91 1.5 17.25h21c0-3.34-1.947-6.287-4.623-7.966" />
    </svg>
  );
}

interface FooterProps {
  hideCTA?: boolean;
}

export function Footer({ hideCTA = false }: FooterProps) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  // Hide CTA section on dashboard pages
  const isDashboard = pathname?.startsWith("/dashboard");
  const showCTA = !hideCTA && !isDashboard;
  
  // Use different company links based on auth state
  const companyLinks = isAuthenticated ? footerLinksBase.companyAuth : footerLinksBase.companyGuest;

  return (
    <footer className="relative">
      {/* CTA Section - 50/50 split like Raycast */}
      {showCTA && (
        <div className="relative overflow-hidden py-20 sm:py-28">
          {/* Continuous grid background - matches previous sections */}
          <div className="absolute inset-0 isometric-grid opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-muted/40" />

          {/* Subtle radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.55_0.14_165_/_0.06),transparent_60%)]" />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left side - Text and CTA */}
              <div className="text-left">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  <span className="text-foreground">Ready to </span>
                  <span className="gradient-text">Transform</span>
                  <br />
                  <span className="text-foreground">Your Car Diagnostics?</span>
                </h2>
                <p className="mt-6 max-w-md text-lg text-muted-foreground">
                  Join thousands of car owners already using AI4Car for
                  intelligent vehicle diagnostics.
                </p>
                <div className="mt-8">
                  <Button asChild size="lg" variant="glow">
                    <Link href="/downloads" className="flex items-center gap-2">
                      <AndroidIcon className="h-5 w-5" />
                      Download for Android
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right side - Simple infographic */}
              <div className="relative flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-sm">
                  {/* Phone mockup outline */}
                  <div className="relative mx-auto w-56 rounded-[2.5rem] border-2 border-border/30 bg-card/30 p-3 backdrop-blur-sm">
                    {/* Phone screen */}
                    <div className="overflow-hidden rounded-[2rem] bg-background/80 p-4">
                      {/* App header */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                          <Cpu className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          AI4Car
                        </span>
                      </div>

                      {/* Scan visualization */}
                      <div className="space-y-3">
                        {/* Connection status */}
                        <div className="flex items-center gap-2 rounded-lg bg-primary/10 p-3">
                          <Wifi className="h-4 w-4 text-primary" />
                          <span className="text-xs text-foreground">
                            Connected to OBD2
                          </span>
                          <div className="ml-auto h-2 w-2 animate-pulse rounded-full bg-primary" />
                        </div>

                        {/* Error code card */}
                        <div className="rounded-lg border border-border/50 bg-card/50 p-3">
                          <div className="text-xs text-muted-foreground mb-1">
                            Error Found
                          </div>
                          <div className="font-mono text-lg font-bold text-primary">
                            P0420
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Catalyst System Efficiency
                          </div>
                        </div>

                        {/* AI analysis indicator */}
                        <div className="flex items-center gap-2 rounded-lg bg-accent/10 p-3">
                          <Zap className="h-4 w-4 text-accent" />
                          <div className="flex-1">
                            <div className="text-xs font-medium text-foreground">
                              AI Analysis
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Processing...
                            </div>
                          </div>
                        </div>

                        {/* Features list */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Shield className="h-3 w-3 text-primary" />
                            <span>Secure</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Smartphone className="h-3 w-3 text-primary" />
                            <span>Android</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Phone notch */}
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -left-4 top-1/4 h-16 w-16 rounded-full border border-primary/20 opacity-60" />
                  <div className="absolute -right-6 bottom-1/4 h-12 w-12 rounded-full border border-accent/20 opacity-60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer links - subtle separator */}
      <div className="relative bg-muted/30">
        {/* Very subtle top line instead of hard border */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative h-10 w-10">
                  <Image
                    src="/logo.svg"
                    alt="AI4Car Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <span className="text-lg font-bold text-foreground">
                  AI4<span className="text-primary">Car</span>
                </span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Smart OBD2 scanner with AI analytics for vehicle diagnostics.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:support@ai4car.com"
                  className="transition-colors hover:text-primary"
                >
                  support@ai4car.com
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">Product</h3>
              <ul className="mt-4 space-y-3">
                {footerLinksBase.product.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">Company</h3>
              <ul className="mt-4 space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">Legal</h3>
              <ul className="mt-4 space-y-3">
                {footerLinksBase.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8">
            {/* Subtle separator */}
            <div className="mb-8 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
            <p className="text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} AI4Car. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
