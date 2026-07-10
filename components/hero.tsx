"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";

function scrollToNext() {
  const target = document.getElementById("after-hero");
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  }
}

export function Hero() {
  return (
    <section className="relative -mt-16 overflow-hidden bg-primary pb-24 pt-28 text-primary-foreground sm:pb-28 sm:pt-32">
      {/* Soft decorative accents */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,oklch(1_0_0_/_0.12),transparent)]" />
      <div className="pointer-events-none absolute -left-10 top-1/3 h-40 w-40 rounded-full bg-primary-foreground/10 blur-2xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Centered heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Learn a new language with real teachers
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/85">
            Live, conversation-first lessons that get you speaking from day one.
          </p>

          <div className="mt-9 flex justify-center">
            <Button asChild size="lg" variant="secondary" className="shadow-lg">
              <Link href="/register" className="flex items-center gap-2">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Photo + info cards */}
        <div className="mt-14 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Photo */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative flex aspect-square w-full max-w-md items-end justify-center overflow-hidden rounded-full bg-primary-foreground/10">
              <img
                src="/images/hero-student.png"
                alt="Smiling LinguaHub student"
                className="h-[92%] w-auto object-contain object-bottom"
              />
            </div>
          </div>

          {/* Info cards */}
          <div className="flex flex-col gap-5">
            <div className="rounded-3xl bg-accent p-6 text-accent-foreground shadow-lg sm:p-8">
              <p className="text-base leading-relaxed sm:text-lg">
                Small live groups with friendly native teachers, so you actually
                practice speaking every single lesson.
              </p>
            </div>
            <div className="rounded-3xl bg-primary-foreground p-6 text-foreground shadow-lg sm:p-8">
              <p className="text-base leading-relaxed sm:text-lg">
                English, French, Spanish and German. Flexible schedules, real
                progress, from any device, wherever you are.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rounded bottom transition + scroll-down button */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 rounded-t-[3rem] bg-background sm:h-20" />
      <button
        type="button"
        onClick={scrollToNext}
        aria-label="Scroll to content"
        className="absolute bottom-3 left-1/2 z-10 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background transition-transform hover:translate-y-0.5 sm:h-16 sm:w-16"
      >
        <ArrowDown className="h-6 w-6 animate-bounce" />
      </button>
    </section>
  );
}
