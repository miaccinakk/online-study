"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bluetooth, Wifi, Cpu, Activity, Download, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Download,
    title: "Download the OBD2 App",
    description:
      "Get started by downloading AI4Car from the App Store or Google Play. Our OBD2 scanner app is available for both Android and iPhone, making vehicle diagnostics accessible to everyone.",
  },
  {
    icon: Bluetooth,
    title: "Connect Your OBD2 Scanner",
    description:
      "Plug your OBD2 Bluetooth scanner or Wi-Fi adapter into your car's diagnostic port (located under the dashboard). The app automatically detects and pairs with your scanner in seconds.",
  },
  {
    icon: Activity,
    title: "Scan Car Errors Instantly",
    description:
      "Tap scan to read all fault codes from your vehicle's computer. Our check engine scanner app retrieves error codes, pending codes, and live sensor data in real time.",
  },
  {
    icon: Cpu,
    title: "Get AI-Powered Analysis",
    description:
      "Our car diagnostic app uses advanced AI to analyze your fault codes. Receive clear explanations of what each error means and get actionable repair recommendations instantly.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" aria-labelledby="how-it-works-heading">
      {/* Animated digital background */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Base grid */}
        <div className="absolute inset-0 isometric-grid opacity-20" />
        
        {/* Animated data flow particles */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="dataGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.55 0.14 165)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="oklch(0.55 0.12 240)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="dataGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.55 0.12 240)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="oklch(0.55 0.14 165)" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Animated horizontal data lines */}
          <g className="animate-pulse" style={{ animationDuration: '3s' }}>
            <line x1="0" y1="20%" x2="100%" y2="20%" stroke="url(#dataGradient1)" strokeWidth="1" strokeDasharray="8 16" opacity="0.5">
              <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="2s" repeatCount="indefinite" />
            </line>
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="url(#dataGradient2)" strokeWidth="1" strokeDasharray="12 24" opacity="0.4">
              <animate attributeName="stroke-dashoffset" from="0" to="72" dur="3s" repeatCount="indefinite" />
            </line>
            <line x1="0" y1="80%" x2="100%" y2="80%" stroke="url(#dataGradient1)" strokeWidth="1" strokeDasharray="6 12" opacity="0.3">
              <animate attributeName="stroke-dashoffset" from="0" to="-36" dur="2.5s" repeatCount="indefinite" />
            </line>
          </g>
          
          {/* Floating data points */}
          <g>
            <circle cx="10%" cy="30%" r="2" fill="oklch(0.55 0.14 165)" opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="30%;28%;30%" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="25%" cy="60%" r="1.5" fill="oklch(0.55 0.12 240)" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="cy" values="60%;62%;60%" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="75%" cy="25%" r="2" fill="oklch(0.55 0.14 165)" opacity="0.35">
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
              <animate attributeName="cy" values="25%;27%;25%" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="85%" cy="70%" r="1.5" fill="oklch(0.55 0.12 240)" opacity="0.3">
              <animate attributeName="opacity" values="0.25;0.45;0.25" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="70%;68%;70%" dur="4.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="50%" cy="45%" r="2.5" fill="oklch(0.55 0.14 165)" opacity="0.25">
              <animate attributeName="opacity" values="0.15;0.4;0.15" dur="4s" repeatCount="indefinite" />
              <animate attributeName="r" values="2.5;3;2.5" dur="3s" repeatCount="indefinite" />
            </circle>
          </g>
          
          {/* Connection arcs */}
          <g opacity="0.15">
            <path d="M 10% 70% Q 30% 50% 50% 55%" stroke="oklch(0.55 0.14 165)" strokeWidth="1" fill="none">
              <animate attributeName="stroke-dasharray" values="0 1000;200 1000;0 1000" dur="4s" repeatCount="indefinite" />
            </path>
            <path d="M 90% 30% Q 70% 50% 50% 45%" stroke="oklch(0.55 0.12 240)" strokeWidth="1" fill="none">
              <animate attributeName="stroke-dasharray" values="0 1000;200 1000;0 1000" dur="5s" repeatCount="indefinite" />
            </path>
          </g>
        </svg>
        
        {/* Soft radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,oklch(0.55_0.14_165_/_0.03),transparent)]" />
      </div>
      
      {/* Content overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/70" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header with SEO content */}
        <div className="text-left">
          <h2 id="how-it-works-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-foreground">How Our </span>
            <span className="gradient-text">OBD2 Scanner App</span>
            <span className="text-foreground"> Works</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Getting started with AI4Car is simple. Download the app, connect your OBD2 Bluetooth 
            or Wi-Fi scanner, and start diagnosing your vehicle in minutes. Works on both 
            Android and iPhone.
          </p>
        </div>

        {/* Steps grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="group relative rounded-2xl border border-border/30 bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-card/95 hover:shadow-lg hover:shadow-primary/5 lg:p-8"
              >
                {/* Step number */}
                <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary ring-4 ring-background">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Learn more link */}
        <div className="mt-12 text-left">
          <Button asChild variant="link" className="text-primary px-0">
            <Link href="/how-it-works">
              Learn more about how it works
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* CTA Section */}
        <div className="mt-10 rounded-2xl border border-primary/15 bg-gradient-to-r from-primary/5 via-card/80 to-accent/5 p-8 backdrop-blur-sm sm:p-10">
          <div className="flex flex-col items-center text-center gap-6 sm:flex-row sm:text-left sm:justify-between">
            <div className="max-w-xl">
              <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                Ready to diagnose your car?
              </h3>
              <p className="mt-2 text-muted-foreground">
                Download AI4Car now and turn your smartphone into a powerful OBD2 scanner. 
                Available for Android and iPhone. Start your free trial today.
              </p>
            </div>
            <Button asChild size="lg" variant="glow" className="shrink-0">
              <Link href="/downloads" className="flex items-center gap-2">
                Download Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
