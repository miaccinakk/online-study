"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserPlus, BookOpen, Video, TrendingUp, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Free Account",
    description:
      "Sign up in seconds and tell us which language you want to learn and your current level. It's completely free to get started, no card required.",
  },
  {
    icon: BookOpen,
    title: "Choose Your Course",
    description:
      "Pick from English, French, Spanish, or German. Each course is organized by level and focus, so you always know exactly where to begin.",
  },
  {
    icon: Video,
    title: "Join Live Lessons",
    description:
      "Attend interactive online lessons with native teachers and a small group of classmates. You practice speaking in real situations from the very first class.",
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    description:
      "Follow your improvement with clear milestones and certificates. Keep going at your own pace and watch your confidence grow week after week.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" aria-labelledby="how-it-works-heading">
      {/* Animated digital background */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Base grid */}
        <div className="absolute inset-0 isometric-grid opacity-20" />
        
        {/* Animated data flow particles */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="dataGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.55 0.14 165)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="oklch(0.55 0.12 240)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="dataGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.55 0.12 240)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="oklch(0.55 0.14 165)" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Animated horizontal data lines */}
          <g className="animate-pulse" style={{ animationDuration: '3s' }}>
            <line x1="0" y1="20%" x2="100%" y2="20%" stroke="url(#dataGradient1)" strokeWidth="1" strokeDasharray="8 16" opacity="0.5">
              <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="2s" repeatCount="indefinite" />
            </line>
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="url(#dataGradient2)" strokeWidth="1" strokeDasharray="12 24" opacity="0.4">
              <animate attributeName="stroke-dashoffset" from="0" to="72" dur="3s" repeatCount="indefinite" />
            </line>
            <line x1="0" y1="80%" x2="100%" y2="80%" stroke="url(#dataGradient1)" strokeWidth="1" strokeDasharray="6 12" opacity="0.3">
              <animate attributeName="stroke-dashoffset" from="0" to="-36" dur="2.5s" repeatCount="indefinite" />
            </line>
          </g>
          
          {/* Floating data points */}
          <g>
            <circle cx="10%" cy="30%" r="2" fill="oklch(0.55 0.14 165)" opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="30%;28%;30%" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="25%" cy="60%" r="1.5" fill="oklch(0.55 0.12 240)" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="cy" values="60%;62%;60%" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="75%" cy="25%" r="2" fill="oklch(0.55 0.14 165)" opacity="0.35">
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
              <animate attributeName="cy" values="25%;27%;25%" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="85%" cy="70%" r="1.5" fill="oklch(0.55 0.12 240)" opacity="0.3">
              <animate attributeName="opacity" values="0.25;0.45;0.25" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="70%;68%;70%" dur="4.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="50%" cy="45%" r="2.5" fill="oklch(0.55 0.14 165)" opacity="0.25">
              <animate attributeName="opacity" values="0.15;0.4;0.15" dur="4s" repeatCount="indefinite" />
              <animate attributeName="r" values="2.5;3;2.5" dur="3s" repeatCount="indefinite" />
            </circle>
          </g>
          
          {/* Connection arcs */}
          <g opacity="0.15">
            <path d="M 10% 70% Q 30% 50% 50% 55%" stroke="oklch(0.55 0.14 165)" strokeWidth="1" fill="none">
              <animate attributeName="stroke-dasharray" values="0 1000;200 1000;0 1000" dur="4s" repeatCount="indefinite" />
            </path>
            <path d="M 90% 30% Q 70% 50% 50% 45%" stroke="oklch(0.55 0.12 240)" strokeWidth="1" fill="none">
              <animate attributeName="stroke-dasharray" values="0 1000;200 1000;0 1000" dur="5s" repeatCount="indefinite" />
            </path>
          </g>
        </svg>
        
        {/* Soft radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,oklch(0.55_0.14_165_/_0.03),transparent)]" />
      </div>
      
      {/* Content overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/70" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header with SEO content */}
        <div className="text-left">
          <h2 id="how-it-works-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-foreground">How </span>
            <span className="gradient-text">LinguaHub</span>
            <span className="text-foreground"> Works</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Getting started is simple. Create your free account, choose your
            language, and join your first live lesson in minutes. Learn from
            anywhere, on any device.
          </p>
        </div>

        {/* Steps grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="group relative rounded-2xl border border-border/30 bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-card/95 hover:shadow-lg hover:shadow-primary/5 lg:p-8"
              >
                {/* Step number */}
                <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary ring-4 ring-background">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Learn more link */}
        <div className="mt-12 text-left">
          <Button asChild variant="link" className="text-primary px-0">
            <Link href="/courses">
              Explore all our courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* CTA Section */}
        <div className="mt-10 rounded-2xl border border-primary/15 bg-gradient-to-r from-primary/5 via-card/80 to-accent/5 p-8 backdrop-blur-sm sm:p-10">
          <div className="flex flex-col items-center text-center gap-6 sm:flex-row sm:text-left sm:justify-between">
            <div className="max-w-xl">
              <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                Ready to start speaking a new language?
              </h3>
              <p className="mt-2 text-muted-foreground">
                Create your free LinguaHub account today and book your first live
                lesson with an expert teacher. No card required to get started.
              </p>
            </div>
            <Button asChild size="lg" variant="glow" className="shrink-0">
              <Link href="/register" className="flex items-center gap-2">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
