"use client";

import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const FALLBACK_VIDEO =
  "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export function CoursePreview({ video }: { video?: string }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const src = video || FALLBACK_VIDEO;

  // Lock body scroll, focus close button, and close on Escape while open.
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const handleClose = () => {
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    setOpen(false);
  };

  return (
    <>
      {/* Trigger: text on the left, big round play button on the right */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex items-center gap-5 text-left"
        aria-label={t("coursePreview.play")}
      >
        <span className="leading-tight">
          <span className="block text-sm font-medium text-primary-foreground/80 drop-shadow">
            {t("coursePreview.hint")}
          </span>
          <span className="block text-lg font-semibold text-primary-foreground drop-shadow">
            {t("coursePreview.watch")}
          </span>
        </span>

        {/* Cutout notch — background-colored ring makes the button look carved
            out of the hero, matching the homepage scroll-down button. */}
        <span className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-background shadow-xl">
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-105">
            <span className="absolute inset-0 rounded-full bg-primary/40 transition-transform duration-1000 group-hover:animate-ping" />
            <Play className="relative ml-1 h-7 w-7 fill-current" />
          </span>
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t("coursePreview.modalTitle")}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label={t("coursePreview.close")}
            onClick={handleClose}
            className="absolute inset-0 bg-foreground/70 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-3xl">
            <button
              ref={closeRef}
              type="button"
              onClick={handleClose}
              aria-label={t("coursePreview.close")}
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg transition-colors hover:bg-background"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="overflow-hidden rounded-2xl bg-card shadow-2xl ring-1 ring-border">
              <video
                ref={videoRef}
                className="aspect-video w-full bg-foreground"
                src={src}
                controls
                autoPlay
                playsInline
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
