"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, Trophy, Sparkles, GraduationCap, MessageCircle, Star, Flame } from "lucide-react";
import { useI18n } from "@/lib/i18n";

function scrollToNext() {
  const target = document.getElementById("after-hero");
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  }
}

export function Hero() {
  const { t } = useI18n();
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
      className="relative -mt-16 flex min-h-screen items-center overflow-hidden bg-hero pb-32 pt-28 text-hero-foreground sm:pb-36 sm:pt-32"
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
            {t("hero.title")}
          </h1>

          <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-hero-foreground/85">
            {t("hero.subtitle")}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-hero-foreground px-8 text-base font-semibold text-hero shadow-lg hover:bg-hero-foreground/90"
            >
              <Link href="/register" className="flex items-center gap-2">
                {t("hero.getStartedFree")}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-hero-foreground/40 bg-transparent px-8 text-base font-semibold text-hero-foreground hover:bg-hero-foreground/10 hover:text-hero-foreground"
            >
              <Link href="/courses">{t("hero.exploreCourses")}</Link>
            </Button>
          </div>
        </div>

        {/* Right: photo with floating feature chips */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          {/* Soft glow behind the cutout */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hero-foreground/15 blur-3xl"
            aria-hidden="true"
          />
          {/* Cutout photo (transparent PNG) */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md" style={move(14)}>
            <img
              src="/images/hero-student.png"
              alt="Smiling LinguaHub language student"
              className="h-full w-full object-contain drop-shadow-2xl"
            />
          </div>

          {/* Floating chips — balanced 3 left / 3 right, clear of the face */}
          <FloatingChip
            className="left-0 top-8 sm:-left-8"
            style={move(38)}
            icon={<Trophy className="h-5 w-5 text-hero" />}
            title={t("hero.chip.lessonsTitle")}
            subtitle={t("hero.chip.lessonsSub")}
          />
          <FloatingChip
            className="left-0 top-[44%] hidden sm:-left-12 sm:flex"
            style={move(52)}
            icon={<MessageCircle className="h-5 w-5 text-hero" />}
            title={t("hero.chip.levelTitle")}
            subtitle={t("hero.chip.levelSub")}
          />
          <FloatingChip
            className="left-0 bottom-16 sm:-left-6"
            style={move(46)}
            icon={<Flame className="h-5 w-5 text-accent" />}
            title={t("hero.chip.streakTitle")}
            subtitle={t("hero.chip.streakSub")}
          />
          <FloatingChip
            className="right-0 top-8 sm:-right-8"
            style={move(58)}
            icon={<Star className="h-5 w-5 text-hero" />}
            title={t("hero.chip.ratingTitle")}
            subtitle={t("hero.chip.ratingSub")}
          />
          <FloatingChip
            className="right-0 top-[44%] hidden sm:-right-12 sm:flex"
            style={move(30)}
            icon={<Sparkles className="h-5 w-5 text-accent" />}
            title={t("hero.chip.xpTitle")}
            subtitle={t("hero.chip.xpSub")}
          />
          <FloatingChip
            className="right-0 bottom-16 sm:-right-6"
            style={move(42)}
            icon={<GraduationCap className="h-5 w-5 text-accent" />}
            title={t("hero.chip.langTitle")}
            subtitle={t("hero.chip.langSub")}
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
      className={`absolute flex items-center gap-3 rounded-2xl bg-card px-4 py-3 text-card-foreground shadow-[0_18px_50px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.03] transition-transform duration-100 ${className ?? ""}`}
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
