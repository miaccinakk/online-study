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
        {/* Section heading, consistent with the other sections */}
        <div className="max-w-2xl">
          <h2
            id="teacher-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            <span className="text-foreground">Meet your </span>
            <span className="gradient-text">teacher</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every LinguaHub course is built and taught by an experienced native
            teacher who cares about your progress.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Left: author info directly on the section background */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Emma Laurent
            </h3>
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

            {/* UTP cards sitting on the common background */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.value}
                    className="rounded-xl border border-border/40 bg-card/70 p-4"
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
