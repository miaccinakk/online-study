import Image from "next/image";
import { GraduationCap, Users, Globe, Award } from "lucide-react";

const stats = [
  {
    icon: GraduationCap,
    value: "8+ years",
    label: "Teaching languages online and in the classroom",
  },
  {
    icon: Users,
    value: "2,000+",
    label: "Students guided from beginner to confident speaker",
  },
  {
    icon: Award,
    value: "CELTA · C2",
    label: "Certified teacher with a master's in linguistics",
  },
  {
    icon: Globe,
    value: "4 languages",
    label: "Teaches English, French, Spanish and German",
  },
];

export function HowItWorks() {
  return (
    <section
      className="relative py-20 sm:py-28 overflow-hidden"
      aria-labelledby="teacher-heading"
    >
      {/* Subtle background consistent with the rest of the page */}
      <div className="absolute inset-0 isometric-grid opacity-20" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/70" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Small eyebrow label instead of a big heading */}
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Who teaches you
        </p>

        <div className="mt-6 grid items-stretch gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-8">
          {/* Left colored panel with author info */}
          <div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/10 via-card/80 to-accent/10 p-6 backdrop-blur-sm sm:p-8 lg:p-10">
            <h2
              id="teacher-heading"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              <span className="gradient-text">Emma Laurent</span>
            </h2>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              Lead teacher &amp; head of curriculum at LinguaHub
            </p>

            <p className="mt-5 max-w-xl text-pretty leading-relaxed text-foreground/90">
              &ldquo;I built every LinguaHub course around real conversation.
              You won&apos;t memorize endless grammar tables here &mdash;
              you&apos;ll be speaking from your very first lesson. My goal is
              simple: to help you feel confident using your new language in the
              real world, with people, not just on paper.&rdquo;
            </p>

            {/* Small info cards */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.value}
                    className="rounded-xl border border-border/40 bg-card/70 p-4 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-base font-bold text-foreground">
                        {stat.value}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right photo block, height matches the left panel */}
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
