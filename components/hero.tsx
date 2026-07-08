"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Globe, Video, ChevronRight } from "lucide-react";

const languages = [
  { code: "EN", name: "English" },
  { code: "FR", name: "French" },
  { code: "ES", name: "Spanish" },
  { code: "DE", name: "German" },
];

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

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left content */}
          <div className="flex flex-col items-start text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Online Language School</span>
            </div>

            {/* Heading */}
            <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-foreground">Learn a New</span>
              <br />
              <span className="gradient-text">Language Online</span>
              <br />
              <span className="text-foreground">with Real Teachers</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Join live, conversation-first lessons and start speaking from day one.
              English, French, Spanish, and German taught by friendly native teachers,
              wherever you are.
            </p>

            {/* Quick benefits list */}
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Video className="h-4 w-4 text-primary" />
                <span>Live lessons</span>
              </li>
              <li className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span>Small groups</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                <span>Native teachers</span>
              </li>
            </ul>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" variant="glow">
                <Link href="/register" className="flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline-glow-accent" size="lg">
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>

            {/* Quick links to individual courses */}
            <div className="mt-8 flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Explore courses
              </span>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <Link
                    key={lang.code}
                    href={`/courses/${lang.name.toLowerCase()}-course`}
                    className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-card/60 px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {lang.name}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Language cards visualization - hidden on mobile */}
          <div className="relative hidden items-center justify-center lg:flex">
            <div className="relative w-full max-w-md">
              <div className="grid grid-cols-2 gap-4">
                {languages.map((lang, index) => (
                  <div
                    key={lang.code}
                    className={`rounded-2xl border border-border/50 bg-card/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 ${
                      index % 2 === 1 ? "mt-8" : ""
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <span className="font-mono text-lg font-bold text-primary">
                        {lang.code}
                      </span>
                    </div>
                    <h3 className="mt-4 font-semibold text-foreground">
                      {lang.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Live courses
                    </p>
                  </div>
                ))}
              </div>

              {/* Floating badge */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-xl border border-primary/15 bg-card/90 px-4 py-3 shadow-lg backdrop-blur-sm">
                <div className="text-xs text-muted-foreground">Students</div>
                <div className="text-lg font-bold text-primary">10,000+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
