import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, AlertTriangle, Wrench, Lightbulb, Link2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { problems, getProblemBySlug, categories } from "@/lib/problems-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return problems.map((problem) => ({
    slug: problem.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);
  
  if (!problem) {
    return {
      title: "Problem Not Found | AI4Car",
    };
  }

  return {
    alternates: {
      canonical: `/problems/${slug}`,
    },
    title: `${problem.title} | AI4Car`,
    description: problem.description,
    keywords: [
      problem.code || "",
      "obd2 code",
      "car diagnostic",
      "error code",
      problem.category,
      ...problem.relatedCodes,
    ].filter(Boolean),
    openGraph: {
      title: problem.title,
      description: problem.description,
      type: "article",
    },
  };
}

export default async function ProblemPage({ params }: PageProps) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);

  if (!problem) {
    notFound();
  }

  const category = categories[problem.category];
  const relatedProblems = problems
    .filter((p) => p.slug !== slug && (p.category === problem.category || problem.relatedCodes.includes(p.code || "")))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border/50 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/problems" className="hover:text-primary transition-colors">
              Problems
            </Link>
            <span>/</span>
            <Link 
              href={`/problems/category/${problem.category}`} 
              className="hover:text-primary transition-colors"
            >
              {category.name}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{problem.code || problem.slug}</span>
          </nav>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Back link */}
        <Link 
          href="/problems"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all problems
        </Link>

        {/* Header */}
        <header className="mb-12">
          {problem.code && (
            <span className="inline-block font-mono text-2xl font-bold text-primary mb-4">
              {problem.code}
            </span>
          )}
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
            {problem.title.includes(":") ? problem.title.split(":")[1]?.trim() : problem.title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {problem.description}
          </p>
          
          {/* Category badge */}
          <div className="mt-6 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {category.name}
            </span>
          </div>
        </header>

        {/* Symptoms Section */}
        <section className="mb-12" aria-labelledby="symptoms-heading">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-destructive/10 text-destructive">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h2 id="symptoms-heading" className="text-xl font-bold">Symptoms</h2>
          </div>
          <ul className="space-y-3">
            {problem.symptoms.map((symptom, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-foreground">{symptom}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Causes Section */}
        <section className="mb-12" aria-labelledby="causes-heading">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Lightbulb className="h-5 w-5" />
            </div>
            <h2 id="causes-heading" className="text-xl font-bold">Common Causes</h2>
          </div>
          <ul className="space-y-3">
            {problem.causes.map((cause, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-foreground">{cause}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Solutions Section */}
        <section className="mb-12" aria-labelledby="solutions-heading">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Wrench className="h-5 w-5" />
            </div>
            <h2 id="solutions-heading" className="text-xl font-bold">How to Fix</h2>
          </div>
          <ul className="space-y-3">
            {problem.solutions.map((solution, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-foreground">{solution}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Content Section */}
        <section className="mb-12 prose prose-gray max-w-none">
          <div 
            className="p-6 rounded-xl border border-border bg-card"
            dangerouslySetInnerHTML={{ __html: problem.content.replace(/\n/g, '<br />').replace(/## /g, '<h2 class="text-xl font-bold mt-6 mb-3 text-foreground">').replace(/<br \/><br \/>/g, '</h2>') }}
          />
        </section>

        {/* Related Codes Section */}
        {problem.relatedCodes.length > 0 && (
          <section className="mb-12" aria-labelledby="related-codes-heading">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Link2 className="h-5 w-5" />
              </div>
              <h2 id="related-codes-heading" className="text-xl font-bold">Related Codes</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {problem.relatedCodes.map((code) => {
                const relatedProblem = problems.find((p) => p.code === code);
                return relatedProblem ? (
                  <Link
                    key={code}
                    href={`/problems/${relatedProblem.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all font-mono text-sm font-medium"
                  >
                    {code}
                  </Link>
                ) : (
                  <span
                    key={code}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-muted font-mono text-sm font-medium text-muted-foreground"
                  >
                    {code}
                  </span>
                );
              })}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="mb-12 p-8 rounded-xl border border-primary/20 bg-primary/5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground">Diagnose with AI4Car</h3>
              <p className="mt-2 text-muted-foreground">
                Get personalized diagnostics for your specific vehicle. Our AI analyzes your car&apos;s data 
                in real-time to provide accurate recommendations.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Button asChild variant="glow">
                  <Link href="/downloads" className="flex items-center gap-2">
                    Open AI Diagnostic Tool
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedProblems.length > 0 && (
          <section aria-labelledby="related-articles-heading">
            <h2 id="related-articles-heading" className="text-xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProblems.map((related) => (
                <Link
                  key={related.slug}
                  href={`/problems/${related.slug}`}
                  className="group p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
                >
                  {related.code && (
                    <span className="font-mono text-sm font-bold text-primary">
                      {related.code}
                    </span>
                  )}
                  <h3 className="mt-1 text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {related.title.includes(":") ? related.title.split(":")[1]?.trim() : related.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
