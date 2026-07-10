"use client";

import Image from "next/image";
import { GraduationCap, Users, Globe, Award } from "lucide-react";
import { useI18n, type TranslationKey } from "@/lib/i18n";

const stats: {
  icon: React.ElementType;
  valueKey: TranslationKey;
  labelKey: TranslationKey;
}[] = [
  {
    icon: GraduationCap,
    valueKey: "teacher.stat1.value",
    labelKey: "teacher.stat1.label",
  },
  {
    icon: Users,
    valueKey: "teacher.stat2.value",
    labelKey: "teacher.stat2.label",
  },
  {
    icon: Award,
    valueKey: "teacher.stat3.value",
    labelKey: "teacher.stat3.label",
  },
  {
    icon: Globe,
    valueKey: "teacher.stat4.value",
    labelKey: "teacher.stat4.label",
  },
];

export function HowItWorks() {
  const { t } = useI18n();
  return (
    <section
      className="relative py-20 sm:py-28 overflow-hidden"
      aria-labelledby="teacher-heading"
    >
      {/* Subtle background consistent with the rest of the page */}
      <div className="absolute inset-0 isometric-grid opacity-20" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/70" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading, consistent with the other sections */}
        <div className="max-w-2xl">
          <h2
            id="teacher-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            <span className="text-foreground">{t("teacher.titleA")}</span>
            <span className="gradient-text">{t("teacher.titleB")}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("teacher.subtitle")}
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Left: author info directly on the section background */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {t("teacher.name")}
            </h3>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {t("teacher.role")}
            </p>

            <p className="mt-5 max-w-xl text-pretty leading-relaxed text-foreground/90">
              {t("teacher.quote")}
            </p>

            {/* UTP cards sitting on the common background */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.valueKey}
                    className="rounded-xl border border-border/40 bg-card/70 p-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-base font-bold text-foreground">
                        {t(stat.valueKey)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {t(stat.labelKey)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right photo block */}
          <div className="relative min-h-72 overflow-hidden rounded-2xl border border-border/30 bg-card/40">
            <Image
              src="/images/teacher-portrait.png"
              alt="Emma Laurent, lead teacher at LinguaHub"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
