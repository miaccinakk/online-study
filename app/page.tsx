import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { PricingPreview } from "@/components/pricing-preview";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  title: "AI4Car - OBD2 Scanner App for Android | Car Diagnostic App",
  description:
    "AI4Car is the best OBD2 scanner app for Android. Scan car errors instantly, read fault codes, and get AI-powered vehicle diagnostics via Bluetooth or Wi-Fi. Download the car diagnostic app now.",
  keywords: [
    "obd2 scanner app",
    "car diagnostic app",
    "obd2 scanner for android",
    "scan car errors",
    "check engine scanner app",
    "car fault code reader",
    "obd2 bluetooth scanner app",
    "vehicle diagnostics app",
    "obd2 app download",
  ],
  openGraph: {
    title: "AI4Car - Best OBD2 Scanner App for Android",
    description: "Scan car errors, read fault codes, and get AI-powered diagnostics. The #1 OBD2 scanner app for Android. Download free today.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <PricingPreview />
    </>
  );
}
