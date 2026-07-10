"use client";

import { MessageCircle, Users, Video, CalendarClock, Award, Globe } from "lucide-react";
import { useI18n, type TranslationKey } from "@/lib/i18n";

const features: {
  icon: React.ElementType;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  tone: string;
}[] = [
  {
    icon: MessageCircle,
    titleKey: "features.conversation.title",
    descKey: "features.conversation.desc",
    tone: "orange",
  },
  {
    icon: Globe,
    titleKey: "features.teachers.title",
    descKey: "features.teachers.desc",
    tone: "violet",
  },
  {
    icon: Users,
    titleKey: "features.groups.title",
    descKey: "features.groups.desc",
    tone: "berry",
  },
  {
    icon: Video,
    titleKey: "features.live.title",
    descKey: "features.live.desc",
    tone: "violet",
  },
  {
    icon: CalendarClock,
    titleKey: "features.flexible.title",
    descKey: "features.flexible.desc",
    tone: "coral",
  },
  {
    icon: Award,
    titleKey: "features.progress.title",
    descKey: "features.progress.desc",
    tone: "berry",
  },
];

const toneStyles: Record<string, string> = {
  orange: "bg-primary/12 text-primary",
  violet: "bg-accent/12 text-accent",
  berry: "bg-berry/12 text-berry",
  coral: "bg-hero/12 text-hero",
};

export function Features() {
  const { t } = useI18n();
  return (
    <section
      className="relative overflow-hidden py-24 sm:py-32"
      aria-labelledby="features-heading"
    >
      {/* Soft warm background blobs for a friendly feel */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-hero/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-hero/12 px-4 py-1.5 text-sm font-semibold text-hero">
            {t("features.badge")}
          </span>
          <h2
            id="features-heading"
            className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {t("features.title")}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {t("features.subtitle")}
          </p>
        </div>

        {/* Soft rounded cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.titleKey}
                className="group rounded-3xl bg-card p-8 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.18)] ring-1 ring-border/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.22)]"
              >
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${toneStyles[feature.tone]}`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {t(feature.titleKey)}
                </h3>
                <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                  {t(feature.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
