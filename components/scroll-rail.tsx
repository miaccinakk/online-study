"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollRailProps {
  children: React.ReactNode;
  ariaLabel?: string;
  /** When true, the rail aligns to the page gutter on the left and bleeds off the right edge of the screen. */
  bleed?: boolean;
}

// Left gutter that matches a centered max-w-6xl (72rem) container, so the rail
// starts in line with the section heading but runs off the right edge.
// Use margin (not padding) so the scroller's initial scrollLeft stays at 0 and
// the "scroll left" arrow only appears after the user scrolls/swipes right.
const bleedLeftGutter =
  "ml-[max(1rem,calc((100vw_-_72rem)/2_+_1rem))] sm:ml-[max(1.5rem,calc((100vw_-_72rem)/2_+_1.5rem))] lg:ml-[max(2rem,calc((100vw_-_72rem)/2_+_2rem))]";
const bleedRightPad = "pr-6 sm:pr-8 lg:pr-10";

export function ScrollRail({ children, ariaLabel, bleed = false }: ScrollRailProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const [thumbPct, setThumbPct] = useState(100); // width of the indicator thumb, %
  const [active, setActive] = useState(false); // indicator visible while scrolling

  const measure = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    setCanLeft(scrollLeft > 8);
    setCanRight(scrollLeft < maxScroll - 8);
    setOverflowing(maxScroll > 8);
    setProgress(maxScroll > 0 ? scrollLeft / maxScroll : 0);
    setThumbPct(scrollWidth > 0 ? Math.max(12, (clientWidth / scrollWidth) * 100) : 100);
  }, []);

  const handleScroll = useCallback(() => {
    measure();
    setActive(true);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setActive(false), 900);
  }, [measure]);

  useEffect(() => {
    measure();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measure);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [measure, handleScroll]);

  const scrollBy = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.8);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  // Indicator thumb position across the available track.
  const thumbLeft = progress * (100 - thumbPct);

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        aria-label={ariaLabel}
        className={`flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          bleed ? `${bleedLeftGutter} ${bleedRightPad}` : ""
        }`}
      >
        {children}
      </div>

      {/* Left button - aligned to the page gutter */}
      <button
        type="button"
        onClick={() => scrollBy("left")}
        aria-label="Scroll left"
        className={`absolute top-1/2 z-10 hidden h-[4.5rem] w-[4.5rem] -translate-y-1/2 items-center justify-center rounded-full border border-border/40 bg-background/40 text-foreground shadow-lg backdrop-blur-md transition-all hover:bg-background/70 hover:text-primary sm:flex ${
          bleed
            ? "left-[max(1rem,calc((100vw_-_72rem)/2_+_1rem))] sm:left-[max(1.5rem,calc((100vw_-_72rem)/2_+_1.5rem))] lg:left-[max(2rem,calc((100vw_-_72rem)/2_+_2rem))]"
            : "left-2"
        } ${canLeft ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      {/* Right button - sits over the last visible slide, near the screen edge */}
      <button
        type="button"
        onClick={() => scrollBy("right")}
        aria-label="Scroll right"
        className={`absolute top-1/2 z-10 hidden h-[4.5rem] w-[4.5rem] -translate-y-1/2 items-center justify-center rounded-full border border-border/40 bg-background/40 text-foreground shadow-lg backdrop-blur-md transition-all hover:bg-background/70 hover:text-primary sm:flex ${
          bleed ? "right-4 sm:right-6 lg:right-8" : "right-2"
        } ${canRight ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Scroll indicator - fades in while scrolling (helpful on touch/mobile) */}
      {overflowing && (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div
            className={`h-1.5 w-full overflow-hidden rounded-full bg-border/60 transition-opacity duration-300 ${
              active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width,left] duration-150"
              style={{ width: `${thumbPct}%`, marginLeft: `${thumbLeft}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
