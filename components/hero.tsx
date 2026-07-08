"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scan, Sparkles, Smartphone, Bluetooth, Wifi, ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-background -mt-16 pt-16">
      {/* Grid background - extends under header */}
      <div className="absolute inset-0 isometric-grid opacity-50" />

      {/* Soft gradient overlay - starts below header area */}
      <div className="absolute inset-0 top-20 bg-gradient-to-b from-transparent via-background/30 to-background/80" />

      {/* Soft radial accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,oklch(0.55_0.14_165_/_0.06),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,oklch(0.55_0.12_240_/_0.04),transparent)]" />

      {/* Decorative horizontal lines */}
      <div className="absolute left-0 right-0 top-1/3 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <div className="absolute left-0 right-0 top-2/3 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

      {/* Subtle car silhouette background - mobile only */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none lg:hidden" aria-hidden="true">
        <svg
          className="w-[120%] max-w-[500px] h-auto opacity-[0.06]"
          viewBox="0 0 300 200"
          fill="none"
        >
          {/* Car body outline */}
          <path
            d="M40 120 L60 100 L100 90 L140 80 L200 80 L240 90 L260 110 L260 130 L40 130 Z"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          />
          {/* Roof */}
          <path
            d="M100 90 L110 60 L190 60 L200 80"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          />
          {/* Windows */}
          <path
            d="M105 88 L112 65 L150 65 L150 85"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-accent"
          />
          <path
            d="M155 65 L188 65 L195 85 L155 85"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-accent"
          />
          {/* Wheels */}
          <circle
            cx="80"
            cy="135"
            r="20"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          />
          <circle
            cx="80"
            cy="135"
            r="12"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-accent"
          />
          <circle
            cx="220"
            cy="135"
            r="20"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          />
          <circle
            cx="220"
            cy="135"
            r="12"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-accent"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left content */}
          <div className="flex flex-col items-start text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>OBD2 Scanner App for Android</span>
            </div>

            {/* SEO-optimized H1 Heading */}
            <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-foreground">The Best</span>
              <br />
              <span className="gradient-text">OBD2 Scanner App</span>
              <br />
              <span className="text-foreground">for Your Car</span>
            </h1>

            {/* SEO-optimized subtitle with keywords */}
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Turn your smartphone into a powerful car diagnostic app. Scan car errors instantly, 
              read fault codes, and get AI-powered recommendations. Works with any OBD2 Bluetooth 
              or Wi-Fi scanner on Android.
            </p>

            {/* Quick benefits list */}
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-primary" />
                <span>Android</span>
              </li>
              <li className="flex items-center gap-2">
                <Bluetooth className="h-4 w-4 text-primary" />
                <span>Bluetooth & Wi-Fi</span>
              </li>
              <li className="flex items-center gap-2">
                <Scan className="h-4 w-4 text-primary" />
                <span>Real-time diagnostics</span>
              </li>
            </ul>

            {/* CTA Buttons */}
            <div className="relative mt-10 flex flex-col gap-4 sm:flex-row">
              {/* Android icon background - large, green, semi-transparent */}
              <svg
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 text-green-500 sm:h-72 sm:w-72"
                style={{ opacity: 0.3 }}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.84 5.84 0 0012 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31A5.983 5.983 0 006 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
              </svg>
              <Button asChild size="lg" variant="glow">
                <Link href="/downloads" className="flex items-center gap-2">
                  Download OBD2 App
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline-glow-accent" size="lg">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>

            {/* Subtle link to how it works */}
            <Link 
              href="/how-it-works" 
              className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Read how it works
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Right - Isometric car visualization - hidden on mobile, shown on lg+ */}
          <div className="relative hidden items-center justify-center lg:flex">
            <div className="relative h-72 w-72 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
              {/* Outer subtle ring */}
              <div className="absolute inset-0 animate-pulse rounded-full border border-primary/10" />

              {/* Data flow lines */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 400 400"
                aria-hidden="true"
              >
                {/* Curved data lines */}
                <path
                  d="M50 300 Q 100 250, 200 200 T 350 100"
                  fill="none"
                  stroke="url(#gradient1)"
                  strokeWidth="1.5"
                  className="glow-line animate-pulse"
                  strokeDasharray="10 5"
                />
                <path
                  d="M30 350 Q 150 300, 200 200 T 380 150"
                  fill="none"
                  stroke="url(#gradient2)"
                  strokeWidth="1.5"
                  className="glow-line"
                  style={{ animationDelay: "0.5s" }}
                  strokeDasharray="8 4"
                />
                <path
                  d="M80 380 Q 180 320, 220 220 T 370 80"
                  fill="none"
                  stroke="url(#gradient3)"
                  strokeWidth="1"
                  className="glow-line animate-pulse"
                  style={{ animationDelay: "1s" }}
                  strokeDasharray="6 6"
                />

                <defs>
                  <linearGradient
                    id="gradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="oklch(0.55 0.14 165)" />
                    <stop offset="100%" stopColor="oklch(0.55 0.12 240)" />
                  </linearGradient>
                  <linearGradient
                    id="gradient2"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="oklch(0.55 0.12 240)" />
                    <stop offset="100%" stopColor="oklch(0.55 0.14 165)" />
                  </linearGradient>
                  <linearGradient
                    id="gradient3"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="oklch(0.60 0.12 165)" />
                    <stop offset="100%" stopColor="oklch(0.55 0.12 240)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Isometric car wireframe */}
              <div className="group absolute inset-8 flex items-center justify-center">
                <svg
                  className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-1"
                  viewBox="0 0 300 200"
                  fill="none"
                  aria-hidden="true"
                >
                  {/* Car body outline */}
                  <path
                    d="M40 120 L60 100 L100 90 L140 80 L200 80 L240 90 L260 110 L260 130 L40 130 Z"
                    stroke="oklch(0.55 0.12 240)"
                    strokeWidth="1.5"
                    className="glow-line"
                  />
                  {/* Roof */}
                  <path
                    d="M100 90 L110 60 L190 60 L200 80"
                    stroke="oklch(0.55 0.12 240)"
                    strokeWidth="1.5"
                    className="glow-line"
                  />
                  {/* Windows */}
                  <path
                    d="M105 88 L112 65 L150 65 L150 85"
                    stroke="oklch(0.55 0.14 165)"
                    strokeWidth="1"
                  />
                  <path
                    d="M155 65 L188 65 L195 85 L155 85"
                    stroke="oklch(0.55 0.14 165)"
                    strokeWidth="1"
                  />
                  {/* Wheels */}
                  <circle
                    cx="80"
                    cy="135"
                    r="20"
                    stroke="oklch(0.55 0.12 240)"
                    strokeWidth="1.5"
                    className="glow-line"
                  />
                  <circle
                    cx="80"
                    cy="135"
                    r="12"
                    stroke="oklch(0.55 0.14 165)"
                    strokeWidth="1"
                  />
                  <circle
                    cx="220"
                    cy="135"
                    r="20"
                    stroke="oklch(0.55 0.12 240)"
                    strokeWidth="1.5"
                    className="glow-line"
                  />
                  <circle
                    cx="220"
                    cy="135"
                    r="12"
                    stroke="oklch(0.55 0.14 165)"
                    strokeWidth="1"
                  />
                  {/* OBD port indicator */}
                  <circle
                    cx="150"
                    cy="120"
                    r="8"
                    fill="oklch(0.55 0.14 165 / 0.15)"
                    stroke="oklch(0.55 0.14 165)"
                    strokeWidth="1.5"
                    className="animate-pulse"
                  />
                </svg>
              </div>

              {/* Floating data badges */}
              <div className="absolute -right-2 top-8 rounded-xl border border-primary/15 bg-card/90 px-4 py-3 shadow-lg backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 sm:-right-6 sm:top-12">
                <div className="text-xs text-muted-foreground">Fault Code</div>
                <div className="font-mono text-lg font-bold text-primary">
                  P0420
                </div>
              </div>

              <div className="absolute -left-2 bottom-12 rounded-xl border border-accent/15 bg-card/90 px-4 py-3 shadow-lg backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 sm:-left-10 sm:bottom-16">
                <div className="text-xs text-muted-foreground">AI Analysis</div>
                <div className="text-sm font-semibold text-accent">
                  Catalytic Converter
                </div>
              </div>

              <div className="absolute bottom-2 right-6 rounded-xl border border-border/50 bg-card/90 px-3 py-2 shadow-lg backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl sm:bottom-4 sm:right-8">
                <div className="flex items-center gap-2">
                  <Scan className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-foreground">
                    Scanning...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
