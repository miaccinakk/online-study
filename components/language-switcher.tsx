"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useI18n, type Locale } from "@/lib/i18n";

const options: { value: Locale; label: string; short: string }[] = [
  { value: "en", label: "English", short: "EN" },
  { value: "ru", label: "Русский", short: "RU" },
];

export function LanguageSwitcher({ scrolled = true }: { scrolled?: boolean }) {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = options.find((o) => o.value === locale) ?? options[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          scrolled
            ? "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            : "text-white/90 hover:bg-white/15 hover:text-white"
        }`}
      >
        <Globe className="h-4 w-4" />
        <span>{current.short}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-border bg-card py-2 shadow-lg z-50">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setLocale(option.value);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted/80"
            >
              <span>{option.label}</span>
              {locale === option.value && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
