import { MessageCircle, Users, Video, CalendarClock, Award, Globe } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Conversation First",
    description:
      "You start speaking from your very first lesson. Our teachers focus on real conversations, not endless grammar drills, so you build confidence fast.",
    tone: "coral",
  },
  {
    icon: Globe,
    title: "Native Teachers",
    description:
      "Learn from friendly, experienced native speakers who know how to make a new language feel natural, clear, and fun to practice.",
    tone: "sky",
  },
  {
    icon: Users,
    title: "Small Groups",
    description:
      "Classes stay small so everyone gets plenty of speaking time and personal attention. Learn together with students at your level.",
    tone: "mint",
  },
  {
    icon: Video,
    title: "Live Online Lessons",
    description:
      "Join interactive lessons from anywhere. All you need is an internet connection to learn with your teacher and classmates in real time.",
    tone: "sky",
  },
  {
    icon: CalendarClock,
    title: "Flexible Schedule",
    description:
      "Pick times that fit your life and learn at your own pace. Reschedule when you need to and never miss the material.",
    tone: "mint",
  },
  {
    icon: Award,
    title: "Track Your Progress",
    description:
      "Follow a clear path with progress tracking and certificates, so you always know how far you've come and what's next.",
    tone: "coral",
  },
];

const toneStyles: Record<string, string> = {
  coral: "bg-hero/12 text-hero",
  sky: "bg-accent/12 text-accent",
  mint: "bg-primary/12 text-primary",
};

export function Features() {
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
            Why LinguaHub
          </span>
          <h2
            id="features-heading"
            className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Learning a language, made warm and simple
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Live lessons, native teachers, and a focus on real conversation help
            you make progress you can actually feel — without the pressure.
          </p>
        </div>

        {/* Soft rounded cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-3xl bg-card p-8 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.18)] ring-1 ring-border/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.22)]"
              >
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${toneStyles[feature.tone]}`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
