"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages, Mail, MessageCircle, Video, Award, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

const footerLinksBase = {
  product: [
    { href: "/courses", label: "Courses" },
    { href: "/pricing", label: "Pricing" },
    { href: "/register", label: "Get Started" },
    { href: "/about", label: "About Us" },
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
                  <span className="gradient-text">Start</span>
                  <br />
                  <span className="text-foreground">Learning a Language?</span>
                </h2>
                <p className="mt-6 max-w-md text-lg text-muted-foreground">
                  Join thousands of students already learning with LinguaHub.
                  Your first lessons are free.
                </p>
                <div className="mt-8">
                  <Button asChild size="lg" variant="glow">
                    <Link href="/register" className="flex items-center gap-2">
                      <Languages className="h-5 w-5" />
                      Get Started Free
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
                          <Languages className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          LinguaHub
                        </span>
                      </div>

                      {/* Lesson visualization */}
                      <div className="space-y-3">
                        {/* Live status */}
                        <div className="flex items-center gap-2 rounded-lg bg-primary/10 p-3">
                          <Video className="h-4 w-4 text-primary" />
                          <span className="text-xs text-foreground">
                            Live lesson starting
                          </span>
                          <div className="ml-auto h-2 w-2 animate-pulse rounded-full bg-primary" />
                        </div>

                        {/* Course card */}
                        <div className="rounded-lg border border-border/50 bg-card/50 p-3">
                          <div className="text-xs text-muted-foreground mb-1">
                            Today&apos;s Course
                          </div>
                          <div className="font-mono text-lg font-bold text-primary">
                            FR
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            French - Conversation
                          </div>
                        </div>

                        {/* Progress indicator */}
                        <div className="flex items-center gap-2 rounded-lg bg-accent/10 p-3">
                          <Award className="h-4 w-4 text-accent" />
                          <div className="flex-1">
                            <div className="text-xs font-medium text-foreground">
                              Your Progress
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Level B1 - 68%
                            </div>
                          </div>
                        </div>

                        {/* Features list */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MessageCircle className="h-3 w-3 text-primary" />
                            <span>Speaking</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Globe className="h-3 w-3 text-primary" />
                            <span>Native</span>
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
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Languages className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold text-foreground">
                  Lingua<span className="text-primary">Hub</span>
                </span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Online language school with live lessons and native teachers.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:hello@linguahub.app"
                  className="transition-colors hover:text-primary"
                >
                  hello@linguahub.app
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
