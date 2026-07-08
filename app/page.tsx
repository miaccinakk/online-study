import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { CoursesPreview } from "@/components/courses-preview";
import { StudentStories } from "@/components/student-stories";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  title: "LinguaHub - Online Language School | Learn English, French, Spanish & German",
  description:
    "LinguaHub is an online language school with live lessons and native teachers. Learn English, French, Spanish, or German with conversation-first courses for every level. Start free today.",
  keywords: [
    "online language school",
    "learn english online",
    "learn french online",
    "learn spanish online",
    "learn german online",
    "live language lessons",
    "native language teachers",
    "online language courses",
    "language classes online",
  ],
  openGraph: {
    title: "LinguaHub - Online Language School",
    description: "Learn a new language online with live lessons and native teachers. Courses in English, French, Spanish, and German. Start free today.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <CoursesPreview />
      <StudentStories />
    </>
  );
}
