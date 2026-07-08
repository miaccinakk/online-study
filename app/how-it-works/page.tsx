import type { Metadata } from "next";
import Link from "next/link";
import { 
  Wifi, 
  Bluetooth, 
  Car, 
  MessageSquare, 
  Activity, 
  Cpu, 
  AlertTriangle, 
  Download,
  ArrowRight,
  Zap,
  Smartphone,
  CheckCircle2,
  HelpCircle,
  Key,
  Plus,
  Scan
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  alternates: {
    canonical: "/how-it-works",
  },
  title: "How AI4Car Works - OBD2 Scanner App Guide | Car Diagnostics Explained",
  description:
    "Learn how AI4Car OBD2 scanner app works. Connect via Bluetooth or Wi-Fi adapter, scan car errors, read fault codes, and get AI-powered diagnostics. Complete guide for Android & iPhone.",
  keywords: [
    "how obd2 scanner works",
    "obd2 app guide",
    "car diagnostic app tutorial",
    "obd2 bluetooth connection",
    "obd2 wifi adapter",
    "ai car assistant",
    "vehicle diagnostics guide",
    "read car fault codes",
    "obd2 scanner tutorial",
    "car error scanner guide",
  ],
  openGraph: {
    title: "How AI4Car OBD2 Scanner App Works - Complete Guide",
    description: "Step-by-step guide on using AI4Car for car diagnostics. Learn about OBD2 connections, AI analysis, and troubleshooting tips.",
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
            <Cpu className="h-4 w-4 text-primary" />
            <span>Complete Guide</span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-foreground">How </span>
            <span className="gradient-text">AI4Car</span>
            <span className="text-foreground"> Works</span>
          </h1>
          
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            AI4Car is a powerful OBD2 scanner app that turns your smartphone into a professional 
            car diagnostic tool. Connect your OBD2 adapter, scan vehicle errors, and get 
            AI-powered recommendations instantly.
          </p>
        </div>
      </section>

      {/* What the App Does */}
      <section className="relative py-16 sm:py-20" id="what-it-does">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
            What AI4Car Does
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            AI4Car is a comprehensive car diagnostic app available for Android and iPhone. 
            It connects to your vehicle through an OBD2 scanner (Bluetooth or Wi-Fi) and 
            reads data directly from your car&apos;s onboard computer. The app provides:
          </p>
          
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Scan, text: "Real-time error code scanning" },
              { icon: Cpu, text: "AI-powered fault code analysis" },
              { icon: Activity, text: "Live sensor data monitoring" },
              { icon: MessageSquare, text: "Intelligent chat assistant for car issues" },
              { icon: Car, text: "Multi-vehicle management" },
              { icon: Zap, text: "Instant diagnostic reports" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.text}
                  className="flex items-center gap-3 rounded-lg border border-border/30 bg-card/50 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OBD2 Connection Section */}
      <section className="relative py-16 sm:py-20 bg-muted/20" id="obd2-connection">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
            How OBD2 Connection Works
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            OBD2 (On-Board Diagnostics II) is a standardized system in all vehicles manufactured 
            since 1996. AI4Car connects to your car through an OBD2 adapter plugged into the 
            diagnostic port, usually located under the dashboard near the steering column.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {/* Wi-Fi Adapter */}
            <div className="rounded-xl border border-border/30 bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Wifi className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Wi-Fi OBD2 Adapter</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>Creates its own Wi-Fi network for connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>Works with both Android and iPhone devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>Connect to adapter&apos;s Wi-Fi in phone settings first</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>Faster data transfer for live sensor readings</span>
                </li>
              </ul>
            </div>

            {/* Bluetooth Adapter */}
            <div className="rounded-xl border border-border/30 bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Bluetooth className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Bluetooth OBD2 Adapter</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>Pairs directly with your smartphone via Bluetooth</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>More common and widely available adapters</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>Pair in phone Bluetooth settings before using app</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>Lower power consumption</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Important Note */}
          <div className="mt-8 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-6">
            <div className="flex items-start gap-3">
              <Key className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">Ignition Key Position</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  For the OBD2 adapter to communicate with your vehicle, the ignition key must be 
                  turned to the ON position (not necessarily engine running). Some vehicles may 
                  require the engine to be running for full diagnostics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle System */}
      <section className="relative py-16 sm:py-20" id="vehicle-system">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
            Vehicle Management System
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            AI4Car allows you to manage multiple vehicles and use vehicle-specific context 
            when chatting with the AI assistant for more accurate diagnostics.
          </p>

          <div className="mt-10 space-y-6">
            {/* Adding Vehicles */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <Plus className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Adding Vehicles</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Add your vehicles by entering the make, model, year, and engine specifications. 
                You can also input your VIN number for automatic vehicle identification. 
                Store multiple vehicles for different family cars or fleet management.
              </p>
            </div>

            {/* Selecting Active Vehicle */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <Car className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Selecting Active Vehicle</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Before scanning or chatting with the AI, select your active vehicle from the list. 
                This ensures all diagnostic data and AI responses are specific to your current 
                vehicle&apos;s make, model, and specifications.
              </p>
            </div>

            {/* Vehicle Context in AI */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <Cpu className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Vehicle Context in AI Assistant</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                When you ask the AI assistant about car issues, it automatically considers your 
                active vehicle&apos;s specifications. This means you get tailored advice about 
                common problems for your specific car model, correct part numbers, and 
                model-specific repair procedures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Features */}
      <section className="relative py-16 sm:py-20 bg-muted/20" id="ai-assistant">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
            AI Car Assistant Features
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our intelligent AI assistant helps you understand your vehicle&apos;s health and 
            provides expert guidance on car issues, repairs, and maintenance.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: MessageSquare,
                title: "Chat About Car Issues",
                description: "Describe symptoms like strange noises, warning lights, or performance problems. The AI provides possible causes and solutions.",
              },
              {
                icon: AlertTriangle,
                title: "Error Code Explanation",
                description: "Get detailed explanations of OBD2 fault codes in plain language. Understand what P0420, P0171, or any code means for your car.",
              },
              {
                icon: Activity,
                title: "Diagnostics Assistance",
                description: "The AI uses your vehicle context and scan results to provide accurate diagnostics and repair recommendations.",
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

      {/* OBD Scanning */}
      <section className="relative py-16 sm:py-20" id="obd-scanning">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
            OBD2 Scanning Features
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Comprehensive vehicle scanning capabilities to read error codes, monitor live data, 
            and get AI-powered interpretation of results.
          </p>

          <div className="mt-10 space-y-8">
            {/* Reading Errors */}
            <div className="flex gap-6 items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Reading Error Codes</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Scan and read all stored, pending, and permanent diagnostic trouble codes (DTCs) 
                  from your vehicle. The app displays codes like P0420, P0171, P0300 with detailed 
                  descriptions and severity levels. Clear codes after repairs to turn off the 
                  check engine light.
                </p>
              </div>
            </div>

            {/* Live Data */}
            <div className="flex gap-6 items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Live Sensor Data</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Monitor real-time data from your vehicle&apos;s sensors including engine RPM, 
                  coolant temperature, fuel system status, oxygen sensor readings, and more. 
                  Track sensor values in real-time graphs to identify intermittent issues.
                </p>
              </div>
            </div>

            {/* AI Interpretation */}
            <div className="flex gap-6 items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Cpu className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">AI Result Interpretation</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  After each scan, our AI analyzes the results considering your specific vehicle 
                  model. Get plain-language explanations of what the codes mean, potential causes, 
                  estimated repair costs, and whether it&apos;s safe to continue driving.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="relative py-16 sm:py-20 bg-muted/20" id="troubleshooting">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
            Connection Troubleshooting
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Having trouble connecting? Here are solutions to common OBD2 connection issues.
          </p>

          <div className="mt-10 space-y-4">
            {[
              {
                icon: HelpCircle,
                title: "Adapter Not Found",
                solutions: [
                  "Ensure the OBD2 adapter is firmly plugged into the port",
                  "Check if the adapter LED is lit (indicates power)",
                  "For Bluetooth: Pair the adapter in phone settings first",
                  "For Wi-Fi: Connect to the adapter's Wi-Fi network in phone settings",
                  "Try unplugging and re-plugging the adapter",
                ],
              },
              {
                icon: Wifi,
                title: "Connection Drops Frequently",
                solutions: [
                  "Move closer to the OBD2 port (under dashboard)",
                  "Check for other devices interfering with Bluetooth/Wi-Fi",
                  "Ensure the adapter is not loose in the port",
                  "Try restarting the app and reconnecting",
                  "Some cheap adapters have poor signal - consider upgrading",
                ],
              },
              {
                icon: Key,
                title: "Cannot Read Vehicle Data",
                solutions: [
                  "Turn ignition key to ON position (ACC is not enough)",
                  "Some vehicles require engine to be running",
                  "Wait 10-15 seconds after turning ignition on",
                  "Check if your vehicle is OBD2 compliant (1996+ for US)",
                  "Try a different OBD2 protocol in app settings",
                ],
              },
            ].map((issue) => {
              const Icon = issue.icon;
              return (
                <div 
                  key={issue.title}
                  className="rounded-xl border border-border/30 bg-card p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-500">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-foreground">{issue.title}</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {issue.solutions.map((solution, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary font-medium">{index + 1}.</span>
                        <span>{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Compatibility Note */}
          <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
            <div className="flex items-start gap-3">
              <Smartphone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">Works with Both Wi-Fi and Bluetooth</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  AI4Car is compatible with both Wi-Fi and Bluetooth OBD2 adapters. Whether you 
                  have an ELM327-based scanner or a more advanced adapter, our app will detect 
                  and connect to it automatically. Available for Android and iPhone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-primary/15 bg-gradient-to-r from-primary/5 via-card to-accent/5 p-8 sm:p-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
              Ready to Diagnose Your Car?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Download AI4Car now and turn your smartphone into a powerful OBD2 scanner. 
              Available for Android and iPhone.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="glow">
                <Link href="/downloads" className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Download App
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing" className="flex items-center gap-2">
                  View Pricing
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
