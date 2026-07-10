"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, Trophy, Sparkles, GraduationCap, MessageCircle } from "lucide-react";

function scrollToNext() {
  const target = document.getElementById("after-hero");
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  }
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  // Normalized mouse offset from center, range roughly [-1, 1]
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setOffset({ x, y });
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
  }

  // Helper to build a parallax transform with a given strength (px)
  const move = (strength: number) => ({
    transform: `translate3d(${offset.x * strength}px, ${offset.y * strength}px, 0)`,
  });

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative -mt-16 overflow-hidden bg-hero pb-24 pt-28 text-hero-foreground sm:pb-28 sm:pt-32"
    >
      {/* Concentric rounded rings, offset to the right like the reference */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute right-[-10%] top-1/2 aspect-square w-[120%] -translate-y-1/2 rounded-full border border-hero-foreground/10 sm:w-[85%]"
          style={move(-18)}
        />
        <div
          className="absolute right-[-6%] top-1/2 aspect-square w-[95%] -translate-y-1/2 rounded-full border border-hero-foreground/10 sm:w-[65%]"
          style={move(-30)}
        />
        <div
          className="absolute right-[-2%] top-1/2 aspect-square w-[70%] -translate-y-1/2 rounded-full border border-hero-foreground/10 bg-hero-ring/40 sm:w-[45%]"
          style={move(-42)}
        />
        <div
          className="absolute right-[6%] top-[18%] h-40 w-40 rounded-full bg-hero-foreground/10 blur-3xl"
          style={move(24)}
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* Left: copy */}
        <div className="max-w-xl">
          <h1 className="text-balance text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Learn a new language with real teachers
          </h1>

          <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-hero-foreground/85">
            Live, conversation-first lessons that get you speaking from day one.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-hero-foreground px-8 text-base font-semibold text-hero shadow-lg hover:bg-hero-foreground/90"
            >
              <Link href="/register" className="flex items-center gap-2">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-hero-foreground/40 bg-transparent px-8 text-base font-semibold text-hero-foreground hover:bg-hero-foreground/10 hover:text-hero-foreground"
            >
              <Link href="/courses">Explore Courses</Link>
            </Button>
          </div>
        </div>

        {/* Right: photo with floating feature chips */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Photo */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm" style={move(14)}>
            <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] bg-hero-ring/50 shadow-2xl ring-1 ring-hero-foreground/10">
              <img
                src="/images/hero-student.png"
                alt="Smiling LinguaHub language student"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Floating chips */}
          <FloatingChip
            className="left-0 top-6 sm:-left-6"
            style={move(38)}
            icon={<Trophy className="h-5 w-5 text-hero" />}
            title="12 lessons"
            subtitle="completed"
          />
          <FloatingChip
            className="right-0 top-1/4 sm:-right-4"
            style={move(52)}
            icon={<Sparkles className="h-5 w-5 text-accent" />}
            title="+250 XP"
            subtitle="bonus earned"
          />
          <FloatingChip
            className="left-0 bottom-16 sm:-left-8"
            style={move(46)}
            icon={<MessageCircle className="h-5 w-5 text-hero" />}
            title="B1 level"
            subtitle="speaking"
          />
          <FloatingChip
            className="right-2 bottom-6 sm:-right-6"
            style={move(30)}
            icon={<GraduationCap className="h-5 w-5 text-accent" />}
            title="4 languages"
            subtitle="available"
          />
        </div>
      </div>

      {/* Wave bottom transition */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="h-16 w-full sm:h-24"
          aria-hidden="true"
        >
          <path
            d="M0,52 C 360,96 500,96 720,64 C 940,32 1080,32 1440,60 L1440,120 L0,120 Z"
            fill="var(--color-background)"
          />
        </svg>
      </div>

      {/* Center notch: white cutout with round scroll-down button nested inside */}
      <div className="absolute bottom-1 left-1/2 z-10 flex h-24 w-24 -translate-x-1/2 items-center justify-center rounded-full bg-background sm:bottom-2">
        <button
          type="button"
          onClick={scrollToNext}
          aria-label="Scroll to content"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-hero text-hero-foreground shadow-lg transition-transform hover:translate-y-0.5"
        >
          <ArrowDown className="h-6 w-6 animate-bounce" />
        </button>
      </div>
    </section>
  );
}

function FloatingChip({
  className,
  style,
  icon,
  title,
  subtitle,
}: {
  className?: string;
  style?: React.CSSProperties;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      className={`absolute flex items-center gap-3 rounded-2xl bg-card px-4 py-3 text-card-foreground shadow-xl ring-1 ring-black/5 transition-transform duration-100 ${className ?? ""}`}
      style={style}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
        {icon}
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-bold">{title}</span>
        <span className="block text-xs text-muted-foreground">{subtitle}</span>
      </span>
    </div>
  );
}
