"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages, Mail, MessageCircle, Video, Award, Mic, Users } from "lucide-react";
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
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.64_0.18_46_/_0.06),transparent_60%)]" />

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

              {/* Right side - Desktop lesson screen */}
              <div className="relative flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-md">
                  {/* Desktop app window */}
                  <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-card shadow-[0_30px_70px_-30px_rgba(0,0,0,0.35)]">
                    {/* Window title bar */}
                    <div className="flex items-center gap-2 border-b border-border/40 bg-muted/40 px-4 py-3">
                      <span className="h-3 w-3 rounded-full bg-destructive/60" />
                      <span className="h-3 w-3 rounded-full bg-hero/60" />
                      <span className="h-3 w-3 rounded-full bg-primary/60" />
                      <div className="ml-3 flex items-center gap-1.5 rounded-md bg-background/70 px-2.5 py-1">
                        <Languages className="h-3 w-3 text-primary" />
                        <span className="text-xs font-medium text-muted-foreground">
                          linguahub.app/lesson
                        </span>
                      </div>
                      <span className="ml-auto flex items-center gap-1.5 rounded-full bg-destructive/10 px-2 py-1 text-xs font-semibold text-destructive">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" />
                        LIVE
                      </span>
                    </div>

                    {/* Window body */}
                    <div className="p-4">
                      {/* Video call area */}
                      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/15 via-card to-accent/10 p-4">
                        <div className="flex items-center justify-between">
                          <span className="rounded-md bg-background/70 px-2 py-1 text-xs font-medium text-foreground">
                            French · Conversation
                          </span>
                          <span className="rounded-md bg-background/70 px-2 py-1 font-mono text-xs text-muted-foreground">
                            24:10
                          </span>
                        </div>

                        {/* Participant tiles */}
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          <div className="flex aspect-square flex-col items-center justify-center rounded-lg bg-primary/20">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                              <Users className="h-4 w-4" />
                            </div>
                            <span className="mt-1 text-[10px] font-medium text-foreground">
                              Emma
                            </span>
                          </div>
                          <div className="flex aspect-square flex-col items-center justify-center rounded-lg bg-accent/20">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
                              <Users className="h-4 w-4" />
                            </div>
                            <span className="mt-1 text-[10px] font-medium text-foreground">
                              You
                            </span>
                          </div>
                          <div className="flex aspect-square flex-col items-center justify-center rounded-lg bg-muted">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-muted-foreground">
                              <Users className="h-4 w-4" />
                            </div>
                            <span className="mt-1 text-[10px] font-medium text-muted-foreground">
                              +3
                            </span>
                          </div>
                        </div>

                        {/* Call controls */}
                        <div className="mt-4 flex items-center justify-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Mic className="h-4 w-4" />
                          </span>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-foreground">
                            <Video className="h-4 w-4" />
                          </span>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-foreground">
                            <MessageCircle className="h-4 w-4" />
                          </span>
                        </div>
                      </div>

                      {/* Bottom info blocks */}
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <div className="rounded-lg border border-border/50 bg-background/60 p-3">
                          <div className="text-xs text-muted-foreground">
                            Today&apos;s topic
                          </div>
                          <div className="mt-1 text-sm font-semibold text-foreground">
                            Ordering at a café
                          </div>
                        </div>
                        <div className="rounded-lg border border-border/50 bg-background/60 p-3">
                          <div className="flex items-center gap-1.5">
                            <Award className="h-3.5 w-3.5 text-primary" />
                            <span className="text-xs text-muted-foreground">
                              Progress
                            </span>
                          </div>
                          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                            <div className="h-full w-[68%] rounded-full bg-primary" />
                          </div>
                          <div className="mt-1 text-[11px] text-muted-foreground">
                            Level B1 · 68%
                          </div>
                        </div>
                      </div>
                    </div>
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
                Online language school with live lessons and expert teachers.
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
              &copy; {new Date().getFullYear()} LinguaHub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
