import type { Metadata } from "next";
import { Languages, Users, Video, MessageCircle, Globe, Heart } from "lucide-react";

export const metadata: Metadata = {
  alternates: {
    canonical: "/about",
  },
  title: "About Us",
  description:
    "Learn about LinguaHub - an online language school with expert teachers and live lessons, on a mission to help everyone speak a new language with confidence.",
  openGraph: {
    title: "About LinguaHub",
    description: "Learn about our mission to make language learning simple, social, and accessible for everyone.",
  },
};

const teamValues = [
  {
    icon: MessageCircle,
    title: "Conversation First",
    description:
      "We believe you learn a language by speaking it. Every lesson gets you talking from day one.",
  },
  {
    icon: Globe,
    title: "Expert Teachers",
    description:
      "Our teachers are experienced educators who make a new language feel natural and fun.",
  },
  {
    icon: Users,
    title: "Small Groups",
    description:
      "Classes stay small so every student gets real speaking time and personal attention.",
  },
  {
    icon: Video,
    title: "Learn Anywhere",
    description:
      "Join live online lessons from any device, wherever you are in the world.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-160px)] px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Languages className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4 sm:text-4xl">
            About LinguaHub
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are an online language school built by teachers and language
            lovers who believe everyone can learn to speak a new language with
            the right guidance and plenty of real practice.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Our Mission
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            At LinguaHub, our mission is to make language learning simple,
            social, and accessible. We believe that anyone can become a
            confident speaker without expensive courses or years of grammar
            drills.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            By combining live online lessons with friendly expert teachers and a
            conversation-first approach, we help students in English, French,
            Spanish, and German start speaking from their very first class and
            keep improving week after week.
          </p>
        </div>

        {/* Values Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Our Values
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {teamValues.map((value) => (
              <div
                key={value.title}
                className="bg-card border border-border rounded-2xl p-6 shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Our Teachers
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            LinguaHub was founded by a diverse group of language teachers and
            education specialists who share a passion for helping people connect
            through language.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our teachers are experienced educators with years of classroom and
            online teaching experience. They know how to keep lessons engaging, correct
            you kindly, and build the confidence you need to use your new
            language in the real world.
          </p>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted/30 rounded-2xl p-8">
          <div className="flex justify-center mb-4">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Join Our Community
          </h2>
          <p className="text-muted-foreground">
            Thank you for choosing LinguaHub. Together, we are making language
            learning simple, social, and accessible for everyone.
          </p>
        </div>
      </div>
    </div>
  );
}
