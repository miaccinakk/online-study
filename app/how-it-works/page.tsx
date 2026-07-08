import type { Metadata } from "next";
import Link from "next/link";
import {
  Languages,
  Video,
  MessageSquare,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  Globe,
  CalendarClock,
  CheckCircle2,
  UserPlus,
  GraduationCap,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  alternates: {
    canonical: "/how-it-works",
  },
  title: "How LinguaHub Works - Online Language Lessons Explained",
  description:
    "Learn how LinguaHub works. Create a free account, choose your language, join live online lessons with native teachers, and track your progress. Complete guide for new students.",
  keywords: [
    "how online language lessons work",
    "language learning guide",
    "live language classes online",
    "learn english french spanish german",
    "native language teachers",
    "online language school guide",
    "conversation lessons",
    "language course levels",
  ],
  openGraph: {
    title: "How LinguaHub Works - Complete Guide",
    description: "Step-by-step guide on learning a language with LinguaHub. Live lessons, native teachers, and a clear path to fluency.",
  },
};

export default function HowItWorksPage() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Grid background */}
      <div className="absolute inset-0 isometric-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground mb-6">
            <Languages className="h-4 w-4 text-primary" />
            <span>Complete Guide</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-foreground">How </span>
            <span className="gradient-text">LinguaHub</span>
            <span className="text-foreground"> Works</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            LinguaHub is an online language school that helps you start speaking
            a new language from your very first lesson. Create your account,
            choose a course, and join live classes with friendly native teachers.
          </p>
        </div>
      </section>

      {/* Getting Started Steps */}
      <section className="relative py-16 sm:py-20" id="getting-started">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
            Getting Started
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Beginning your language journey with LinguaHub takes just a few
            minutes. Here is everything you need to know to get started.
          </p>

          <div className="mt-10 space-y-6">
            {[
              {
                icon: UserPlus,
                title: "1. Create Your Free Account",
                description:
                  "Sign up in seconds and tell us which language you want to learn and your current level. It is completely free to get started, with no card required.",
              },
              {
                icon: BookOpen,
                title: "2. Choose Your Course",
                description:
                  "Pick from English, French, Spanish, or German. Each course is organized by level and focus, so you always know exactly where to begin.",
              },
              {
                icon: Video,
                title: "3. Join Live Lessons",
                description:
                  "Attend interactive online lessons with native teachers and a small group of classmates. You practice speaking in real situations from your first class.",
              },
              {
                icon: GraduationCap,
                title: "4. Track Your Progress",
                description:
                  "Follow your improvement with clear milestones and certificates. Keep going at your own pace and watch your confidence grow week after week.",
              },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="flex gap-6 items-start rounded-xl border border-border/30 bg-card/50 p-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How Lessons Work */}
      <section className="relative py-16 sm:py-20 bg-muted/20" id="lessons">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
            How Lessons Work
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our lessons are live, interactive, and focused on getting you
            talking. All you need is an internet connection and a device with a
            camera and microphone.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {/* Live Group Lessons */}
            <div className="rounded-xl border border-border/30 bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Live Group Lessons</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>Small classes so everyone gets speaking time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>Led by experienced native-speaking teachers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>Real conversations and practical vocabulary</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>Personal feedback on your speaking and pronunciation</span>
                </li>
              </ul>
            </div>

            {/* Practice Between Lessons */}
            <div className="rounded-xl border border-border/30 bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Practice Between Lessons</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>Interactive exercises you complete at your own pace</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>Downloadable lesson materials and audio</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>Short, focused homework that fits a busy schedule</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>Progress tracking so you always know what is next</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Schedule note */}
          <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
            <div className="flex items-start gap-3">
              <CalendarClock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">Flexible Scheduling</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Choose lesson times that fit your life and reschedule when you
                  need to. Missed a class? You can catch up with recordings and
                  materials so you never fall behind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses and Levels */}
      <section className="relative py-16 sm:py-20" id="courses">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
            Courses and Levels
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We offer courses in four languages, each organized into clear levels
            so you can progress step by step from beginner to confident speaker.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { code: "EN", name: "English" },
              { code: "FR", name: "French" },
              { code: "ES", name: "Spanish" },
              { code: "DE", name: "German" },
            ].map((lang) => (
              <Link
                key={lang.code}
                href={`/courses/${lang.name.toLowerCase()}-course`}
                className="group rounded-xl border border-border/30 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <span className="font-mono text-lg font-bold text-primary">{lang.code}</span>
                </div>
                <h3 className="mt-4 font-semibold text-foreground group-hover:text-primary transition-colors">
                  {lang.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">Live courses for all levels</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="relative py-16 sm:py-20 bg-muted/20" id="what-you-get">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
            What You Get with LinguaHub
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Everything you need to go from your first words to real conversations.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: MessageSquare,
                title: "Speaking From Day One",
                description: "Every lesson focuses on real conversation, so you build confidence fast instead of memorizing endless rules.",
              },
              {
                icon: Globe,
                title: "Native Teachers",
                description: "Learn authentic pronunciation, natural expressions, and cultural context from experienced native speakers.",
              },
              {
                icon: Award,
                title: "Certificates & Progress",
                description: "Follow a clear path with milestones and certificates, so you always know how far you have come.",
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-xl border border-border/30 bg-card p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ / Help */}
      <section className="relative py-16 sm:py-20" id="faq">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
            Common Questions
          </h2>

          <div className="mt-10 space-y-4">
            {[
              {
                title: "Do I need any experience to start?",
                answer:
                  "Not at all. Our courses welcome complete beginners as well as learners who want to improve. During sign-up we help you find the right level so you feel comfortable from your first lesson.",
              },
              {
                title: "What do I need to join a lesson?",
                answer:
                  "Just a stable internet connection and a device with a camera and microphone, such as a laptop, tablet, or phone. Lessons run right in your browser, so there is nothing to install.",
              },
              {
                title: "Can I change my schedule or language?",
                answer:
                  "Yes. You can pick lesson times that fit your life, reschedule when needed, and explore different languages whenever you like from your dashboard.",
              },
            ].map((issue) => (
              <div
                key={issue.title}
                className="rounded-xl border border-border/30 bg-card p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{issue.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{issue.answer}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl border border-primary/15 bg-gradient-to-r from-primary/5 via-card/80 to-accent/5 p-8 text-center">
            <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
              Ready to start speaking a new language?
            </h3>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
              Create your free LinguaHub account and book your first live lesson
              with an expert teacher. No card required to get started.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" variant="glow">
                <Link href="/register" className="flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline-glow-accent">
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
