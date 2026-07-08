import type { Metadata } from "next";
import { Cpu, Users, Shield, Zap, Globe, Heart } from "lucide-react";

export const metadata: Metadata = {
  alternates: {
    canonical: "/about",
  },
  title: "About Us",
  description:
    "Learn about AI4Car - a team of automotive enthusiasts and AI specialists dedicated to revolutionizing vehicle diagnostics with smart OBD2 technology.",
  openGraph: {
    title: "About AI4Car",
    description: "Learn about our mission to make vehicle diagnostics smarter and more accessible for everyone.",
  },
};

const teamValues = [
  {
    icon: Zap,
    title: "Innovation",
    description:
      "We leverage cutting-edge AI technology to make vehicle diagnostics accessible to everyone.",
  },
  {
    icon: Shield,
    title: "Reliability",
    description:
      "Our solutions are built with precision and accuracy, ensuring you can trust every diagnosis.",
  },
  {
    icon: Users,
    title: "User-Centric",
    description:
      "We design our products with the end user in mind, making complex diagnostics simple.",
  },
  {
    icon: Globe,
    title: "Accessibility",
    description:
      "We believe everyone should have access to professional-grade car diagnostics tools.",
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
              <Cpu className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4 sm:text-4xl">
            About AI4Car
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are a team of automotive enthusiasts and AI specialists dedicated
            to revolutionizing how people diagnose and understand their vehicles.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Our Mission
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            At AI4Car, our mission is to democratize vehicle diagnostics. We
            believe that every car owner should have access to professional-grade
            diagnostic tools without the need for expensive equipment or
            specialized knowledge.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            By combining OBD2 technology with advanced artificial intelligence,
            we transform complex error codes into clear, actionable insights that
            anyone can understand. Our goal is to empower car owners to make
            informed decisions about their vehicle maintenance and repairs.
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
            Our Team
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            AI4Car was founded by a diverse team of software engineers, AI
            researchers, and automotive experts who share a common passion for
            making technology more accessible.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our team combines decades of experience in automotive diagnostics,
            machine learning, and mobile application development. We work
            tirelessly to improve our algorithms and expand our database of
            diagnostic codes to provide you with the most accurate and helpful
            information possible.
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
            Thank you for choosing AI4Car. Together, we are making vehicle
            diagnostics smarter and more accessible for everyone.
          </p>
        </div>
      </div>
    </div>
  );
}
