import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Smartphone,
  Download,
  CheckCircle,
  Bluetooth,
  Wifi,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  alternates: {
    canonical: "/downloads",
  },
  title: "Download LinguaHub - Language Learning App",
  description:
    "Download the LinguaHub app for Android and learn languages anywhere. Available on Google Play or direct APK.",
};

// Android icon SVG component
function AndroidIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.523 2.082a.75.75 0 0 0-1.046 1.076l1.2 1.166A7.5 7.5 0 0 0 12 3a7.5 7.5 0 0 0-5.677 1.324l1.2-1.166a.75.75 0 1 0-1.046-1.076l-2 1.945a.75.75 0 0 0 0 1.076l.003.003A7.5 7.5 0 0 0 4.5 10.5v6A4.5 4.5 0 0 0 9 21h6a4.5 4.5 0 0 0 4.5-4.5v-6a7.5 7.5 0 0 0-.02-5.394l.003-.003a.75.75 0 0 0 0-1.076l-1.96-1.945ZM9 9.75a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
    </svg>
  );
}

// Apple icon SVG component
function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
    </svg>
  );
}

const downloadOptions = [
  {
    platform: "Android APK",
    icon: Download,
    platformIcon: AndroidIcon,
    description: "Direct APK download for manual installation",
    buttonText: "Download APK",
    href: "https://github.com/linguahub/linguahub/raw/main/linguahub.apk",
    recommended: true,
    disabled: false,
    size: "80+ MB",
    platformNote: "Available only for Android",
  },
  {
    platform: "iPhone / iOS",
    icon: Smartphone,
    platformIcon: AppleIcon,
    description: "Native iOS app for iPhone users",
    buttonText: "Coming Soon",
    href: "#",
    recommended: false,
    disabled: true,
    size: null,
    platformNote: "In development",
  },
];

const requirements = [
  "Android 8.0 or newer",
  "Stable internet connection",
  "Microphone for speaking practice",
  "80+ MB free space",
];

const steps = [
  {
    step: 1,
    title: "Download the App",
    description: "Get LinguaHub from Google Play or install the APK",
  },
  {
    step: 2,
    title: "Create Your Account",
    description: "Sign up and choose the language you want to learn",
  },
  {
    step: 3,
    title: "Take a Placement Test",
    description: "Find your level and get a personalized learning path",
  },
  {
    step: 4,
    title: "Start Learning",
    description: "Join live lessons and practice with native teachers",
  },
];

export default function DownloadsPage() {
  return (
    <div className="relative py-16 sm:py-24">
      {/* Background */}
      <div className="absolute inset-0 isometric-grid opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-foreground">Download </span>
            <span className="gradient-text">AI4Car</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Choose your installation method and start diagnosing your vehicle
            today.
          </p>
        </div>

        {/* Download options */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {downloadOptions.map((option) => (
            <div
              key={option.platform}
              className={`relative flex flex-col rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 sm:p-8 ${
                option.disabled
                  ? "border-border/30 bg-card/30 opacity-70"
                  : option.recommended
                    ? "border-primary/50 bg-gradient-to-b from-primary/10 to-card glow-primary"
                    : "border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card"
              }`}
            >
              {option.disabled && (
                <div className="absolute -top-3 left-6 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                  Coming Soon
                </div>
              )}

              <div className="flex items-start justify-between">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                    option.disabled
                      ? "bg-muted text-muted-foreground"
                      : option.recommended
                        ? "bg-primary text-primary-foreground glow-primary"
                        : "bg-primary/10 text-primary"
                  }`}
                >
                  <option.icon className="h-7 w-7" />
                </div>

                {/* Platform icon badge */}
                <div
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                    option.disabled
                      ? "bg-muted/50 text-muted-foreground"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <option.platformIcon className="h-4 w-4" />
                  <span>{option.platformNote}</span>
                </div>
              </div>

              <h2 className="mt-5 text-xl font-semibold text-card-foreground">
                {option.platform}
              </h2>
              <p className="mt-2 flex-1 text-muted-foreground">
                {option.description}
              </p>

              {option.size && (
                <p className="mt-3 text-sm text-muted-foreground">
                  File size:{" "}
                  <span className="font-medium text-foreground">
                    {option.size}
                  </span>
                </p>
              )}

              {option.disabled ? (
                <Button
                  className="mt-6 cursor-not-allowed opacity-50"
                  variant="outline"
                  disabled
                >
                  {option.buttonText}
                </Button>
              ) : (
                <Button
                  asChild
                  className="mt-6"
                  variant={option.recommended ? "glow" : "outline"}
                >
                  <a href={option.href}>
                    {option.buttonText}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Requirements */}
        <div className="mt-24">
          <h2 className="text-left text-2xl font-bold sm:text-3xl">
            <span className="text-foreground">System </span>
            <span className="gradient-text">Requirements</span>
          </h2>

          <div className="mt-8 max-w-xl">
            <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
              <ul className="space-y-4">
                {requirements.map((req) => (
                  <li key={req} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-card-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex items-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-card/30 px-4 py-2">
                <Bluetooth className="h-5 w-5 text-accent" />
                <span className="text-sm">Bluetooth</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-card/30 px-4 py-2">
                <Wifi className="h-5 w-5 text-accent" />
                <span className="text-sm">Wi-Fi</span>
              </div>
            </div>
          </div>
        </div>

        {/* How to get started */}
        <div className="mt-24">
          <h2 className="text-left text-2xl font-bold sm:text-3xl">
            <span className="text-foreground">How to </span>
            <span className="gradient-text">Get Started</span>
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, index) => (
              <div key={item.step} className="group text-left">
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground transition-all duration-300 group-hover:glow-primary">
                    {item.step}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute left-full top-1/2 hidden h-px w-full -translate-y-1/2 bg-gradient-to-r from-primary/50 to-transparent lg:block" />
                  )}
                </div>
                <h3 className="mt-5 font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
