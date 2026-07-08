import type { Metadata } from "next";
import Link from "next/link";
import { problems, categories, type ProblemCategory } from "@/lib/problems-data";

export const metadata: Metadata = {
  alternates: {
    canonical: "/sitemap-page",
  },
  title: "Site Map - AI4Car OBD2 Scanner",
  description:
    "Complete site map of AI4Car - navigate to all pages including downloads, pricing, how it works, contact, and more.",
  openGraph: {
    title: "Site Map - AI4Car",
    description: "Navigate to all pages of AI4Car OBD2 Scanner application.",
  },
};

const siteMapSections = [
  {
    title: "Main",
    links: [
      { href: "/", label: "Home", description: "Welcome to AI4Car - AI-powered OBD2 scanner" },
      { href: "/about", label: "About", description: "Learn more about AI4Car and our mission" },
      { href: "/contact", label: "Contact", description: "Get in touch with our support team" },
    ],
  },
  {
    title: "Product",
    links: [
      { href: "/downloads", label: "Downloads", description: "Download AI4Car app for Android" },
      { href: "/how-it-works", label: "How It Works", description: "Learn how AI4Car diagnoses your vehicle" },
      { href: "/pricing", label: "Pricing", description: "View our subscription plans and features" },
      { href: "/how-to-pay", label: "How to Pay", description: "Payment methods and subscription guide" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Login", description: "Sign in to your AI4Car account" },
      { href: "/register", label: "Register", description: "Create a new AI4Car account" },
      { href: "/forgot-password", label: "Forgot Password", description: "Reset your account password" },
    ],
  },

  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy", description: "How we handle your data" },
      { href: "/terms", label: "Terms of Service", description: "Terms and conditions of use" },
    ],
  },
];

export default function SiteMapPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="absolute inset-0 isometric-grid opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Site <span className="gradient-text">Map</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Navigate to any page on AI4Car. Find downloads, pricing, support, and more.
              </p>
            </div>
          </div>
        </section>

        {/* Site Map Content */}
        <section className="pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {siteMapSections.map((section) => (
                <div key={section.title}>
                  <h2 className="mb-4 text-lg font-semibold text-foreground">
                    {section.title}
                  </h2>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="group block rounded-lg border border-transparent p-3 transition-all hover:border-border/50 hover:bg-card/50"
                        >
                          <span className="font-medium text-foreground transition-colors group-hover:text-primary">
                            {link.label}
                          </span>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {link.description}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problems Section */}
        <section className="pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              Popular Problems & OBD2 Codes
            </h2>
            
            {/* Main Problems Page */}
            <div className="mb-8">
              <Link
                href="/problems"
                className="group block rounded-lg border border-border/50 p-4 transition-all hover:border-primary/50 hover:bg-card/50"
              >
                <span className="font-medium text-foreground transition-colors group-hover:text-primary">
                  All Problems & Error Codes
                </span>
                <p className="mt-1 text-sm text-muted-foreground">
                  Browse all {problems.length} OBD2 error codes with AI-powered explanations
                </p>
              </Link>
            </div>

            {/* Categories */}
            <h3 className="mb-4 text-lg font-semibold text-foreground">Browse by Category</h3>
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(Object.keys(categories) as ProblemCategory[]).map((key) => {
                const category = categories[key];
                const count = problems.filter((p) => p.category === key).length;
                return (
                  <Link
                    key={key}
                    href={`/problems/category/${key}`}
                    className="group block rounded-lg border border-transparent p-3 transition-all hover:border-border/50 hover:bg-card/50"
                  >
                    <span className="font-medium text-foreground transition-colors group-hover:text-primary">
                      {category.name}
                    </span>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {count} articles
                    </p>
                  </Link>
                );
              })}
            </div>

            {/* All Problem Articles */}
            <h3 className="mb-4 text-lg font-semibold text-foreground">All Error Code Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {problems.map((problem) => (
                <Link
                  key={problem.slug}
                  href={`/problems/${problem.slug}`}
                  className="group block rounded-lg border border-transparent px-3 py-2 transition-all hover:border-border/50 hover:bg-card/50"
                >
                  <span className="font-mono text-sm font-bold text-primary">
                    {problem.code}
                  </span>
                  <span className="ml-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {problem.title.split(":")[1]?.trim().slice(0, 30) || problem.title.slice(0, 30)}...
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
