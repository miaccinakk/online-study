import type { Metadata } from "next";
import Link from "next/link";
import { Search, AlertTriangle, Leaf, Fuel, Cpu, Cog, ArrowRight, Sparkles, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { problems, categories, getMostSearchedProblems, getPaginatedProblems, PROBLEMS_PER_PAGE, type ProblemCategory } from "@/lib/problems-data";

export const metadata: Metadata = {
  alternates: {
    canonical: "/problems",
  },
  title: "Popular Car Problems & OBD2 Error Codes | AI4Car",
  description: "AI-powered explanations for common vehicle issues. Search OBD2 error codes like P0304, P0171, P0420 and get instant diagnostics with causes, symptoms, and solutions.",
  keywords: [
    "obd2 error codes",
    "car problems",
    "check engine light codes",
    "p0304",
    "p0171", 
    "p0420",
    "car diagnostic codes",
    "engine error codes",
    "vehicle fault codes",
  ],
  openGraph: {
    title: "Popular Car Problems & OBD2 Error Codes | AI4Car",
    description: "AI-powered explanations for common vehicle issues. Search any OBD2 code and get instant diagnostics.",
  },
};

const categoryIcons: Record<ProblemCategory, React.ElementType> = {
  engine: AlertTriangle,
  emissions: Leaf,
  fuel: Fuel,
  sensors: Cpu,
  transmission: Cog,
};

interface ProblemsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ProblemsPage({ searchParams }: ProblemsPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const { problems: paginatedProblems, totalPages, totalCount } = getPaginatedProblems(currentPage);
  const mostSearched = getMostSearchedProblems();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 isometric-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          {/* Two-column layout on desktop */}
          <div className="grid items-end gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Left: Title and description */}
            <div className="flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground mb-6">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>AI-Powered Diagnostics</span>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="text-foreground">Popular Car Problems</span>
                <br />
                <span className="gradient-text">& OBD2 Error Codes</span>
              </h1>
              
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                AI-powered explanations for common vehicle issues. Search any error code 
                and get instant diagnostics with causes, symptoms, and solutions.
              </p>
            </div>

            {/* Right: Stats or quick info (desktop only) */}
            <div className="hidden lg:flex items-end justify-end gap-8">
              <div className="text-right">
                <div className="text-4xl font-bold text-primary">{totalCount}+</div>
                <div className="text-sm text-muted-foreground">Error Codes</div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-primary">5</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-primary">AI</div>
                <div className="text-sm text-muted-foreground">Powered</div>
              </div>
            </div>
          </div>

          {/* Search Bar - full width */}
          <div className="mt-10">
            <form action="/problems/search" method="GET" className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  name="q"
                  placeholder="Search error code (e.g. P0304, P0171)"
                  className="w-full h-14 pl-12 pr-32 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
                <Button 
                  type="submit" 
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  variant="glow"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Most Searched Section - Only show on first page */}
      {currentPage === 1 && (
        <section className="py-16 sm:py-20" aria-labelledby="most-searched-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 id="most-searched-heading" className="text-2xl font-bold">Most Searched Issues</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mostSearched.slice(0, 8).map((problem) => (
                <Link
                  key={problem.slug}
                  href={`/problems/${problem.slug}`}
                  className="group relative p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block font-mono text-lg font-bold text-primary mb-2">
                        {problem.code}
                      </span>
                      <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {problem.title.split(":")[1]?.trim() || problem.title}
                      </h3>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Section - Only show on first page */}
      {currentPage === 1 && (
        <section className="py-16 sm:py-20 border-t border-border/50" aria-labelledby="categories-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 id="categories-heading" className="text-2xl font-bold mb-8">Browse by Category</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {(Object.keys(categories) as ProblemCategory[]).map((key) => {
                const category = categories[key];
                const Icon = categoryIcons[key];
                const count = problems.filter((p) => p.category === key).length;
                
                return (
                  <Link
                    key={key}
                    href={`/problems/category/${key}`}
                    className="group flex flex-col items-center p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 text-center"
                  >
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {count} {count === 1 ? "article" : "articles"}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Articles Grid */}
      <section className="py-16 sm:py-20 border-t border-border/50" aria-labelledby="all-articles-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 id="all-articles-heading" className="text-2xl font-bold">
              All Error Codes & Problems
              <span className="ml-2 text-base font-normal text-muted-foreground">
                ({totalCount} articles)
              </span>
            </h2>
            {currentPage > 1 && (
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProblems.map((problem) => {
              const Icon = categoryIcons[problem.category];
              
              return (
                <article
                  key={problem.slug}
                  className="group relative flex flex-col p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      {problem.code && (
                        <span className="inline-block font-mono text-sm font-bold text-primary mb-1">
                          {problem.code}
                        </span>
                      )}
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {problem.title.split(":")[1]?.trim() || problem.title}
                      </h3>
                    </div>
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
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
              {/* Previous Button */}
              {currentPage > 1 ? (
                <Link
                  href={currentPage === 2 ? "/problems" : `/problems?page=${currentPage - 1}`}
                  className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg border border-border bg-card hover:bg-muted transition-colors"
                  rel="prev"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg border border-border bg-card text-muted-foreground cursor-not-allowed">
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </span>
              )}

              {/* Page Numbers */}
              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  // Show first page, last page, and pages around current
                  const showPage = 
                    pageNum === 1 || 
                    pageNum === totalPages || 
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);
                  
                  const showEllipsis = 
                    (pageNum === 2 && currentPage > 3) ||
                    (pageNum === totalPages - 1 && currentPage < totalPages - 2);
                  
                  if (!showPage && !showEllipsis) return null;
                  
                  if (showEllipsis && !showPage) {
                    return (
                      <span key={pageNum} className="px-2 text-muted-foreground">
                        ...
                      </span>
                    );
                  }
                  
                  return (
                    <Link
                      key={pageNum}
                      href={pageNum === 1 ? "/problems" : `/problems?page=${pageNum}`}
                      className={`inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-lg border transition-colors ${
                        pageNum === currentPage
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card hover:bg-muted"
                      }`}
                      aria-current={pageNum === currentPage ? "page" : undefined}
                    >
                      {pageNum}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Page Indicator */}
              <span className="sm:hidden text-sm text-muted-foreground px-4">
                {currentPage} / {totalPages}
              </span>

              {/* Next Button */}
              {currentPage < totalPages ? (
                <Link
                  href={`/problems?page=${currentPage + 1}`}
                  className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg border border-border bg-card hover:bg-muted transition-colors"
                  rel="next"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg border border-border bg-card text-muted-foreground cursor-not-allowed">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </span>
              )}
            </nav>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 border-t border-border/50 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            <span className="text-foreground">Ready to </span>
            <span className="gradient-text">Diagnose Your Car?</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Download AI4Car and connect your OBD2 scanner to get real-time diagnostics, 
            AI-powered analysis, and personalized repair recommendations.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="glow">
              <Link href="/downloads" className="flex items-center gap-2">
                Open AI Diagnostic Tool
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline-glow-accent" size="lg">
              <Link href="/pricing">Scan Your Car Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
