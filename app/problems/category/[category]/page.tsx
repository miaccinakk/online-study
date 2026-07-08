import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, AlertTriangle, Leaf, Fuel, Cpu, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, getProblemsByCategory, type ProblemCategory } from "@/lib/problems-data";

interface PageProps {
  params: Promise<{ category: string }>;
}

const categoryIcons: Record<ProblemCategory, React.ElementType> = {
  engine: AlertTriangle,
  emissions: Leaf,
  fuel: Fuel,
  sensors: Cpu,
  transmission: Cog,
};

export async function generateStaticParams() {
  return Object.keys(categories).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryData = categories[category as ProblemCategory];
  
  if (!categoryData) {
    return {
      title: "Category Not Found | AI4Car",
    };
  }

  return {
    alternates: {
      canonical: `/problems/category/${category}`,
    },
    title: `${categoryData.name} - OBD2 Error Codes | AI4Car`,
    description: `${categoryData.description}. Browse all ${categoryData.name.toLowerCase()} related OBD2 codes with AI-powered diagnostics.`,
    openGraph: {
      title: `${categoryData.name} - OBD2 Error Codes | AI4Car`,
      description: categoryData.description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  
  if (!categories[category as ProblemCategory]) {
    notFound();
  }

  const categoryKey = category as ProblemCategory;
  const categoryData = categories[categoryKey];
  const problems = getProblemsByCategory(categoryKey);
  const Icon = categoryIcons[categoryKey];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border/50 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/problems" className="hover:text-primary transition-colors">
              Problems
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{categoryData.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
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
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                {categoryData.name}
              </h1>
              <p className="mt-1 text-muted-foreground">{categoryData.description}</p>
            </div>
          </div>
          <p className="text-muted-foreground">
            {problems.length} {problems.length === 1 ? "article" : "articles"} in this category
          </p>
        </header>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem) => (
            <article
              key={problem.slug}
              className="group relative flex flex-col p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="mb-4">
                {problem.code && (
                  <span className="inline-block font-mono text-lg font-bold text-primary mb-2">
                    {problem.code}
                  </span>
                )}
                <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {problem.title.includes(":") ? problem.title.split(":")[1]?.trim() : problem.title}
                </h2>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                {problem.description}
              </p>
              
              <Link
                href={`/problems/${problem.slug}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Read more
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <section className="mt-16 text-center p-8 rounded-xl border border-border bg-muted/30">
          <h2 className="text-xl font-bold sm:text-2xl">
            <span className="text-foreground">Need Help Diagnosing </span>
            <span className="gradient-text">{categoryData.name}?</span>
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-muted-foreground">
            Download AI4Car to scan your vehicle and get AI-powered diagnostics for any error code.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="glow">
              <Link href="/downloads" className="flex items-center gap-2">
                Download App
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/problems">Browse All Codes</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
