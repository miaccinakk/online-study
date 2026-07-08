import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Search, AlertTriangle, Leaf, Fuel, Cpu, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { searchProblems, type ProblemCategory } from "@/lib/problems-data";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q } = await searchParams;
  
  return {
    title: q ? `Search Results for "${q}" | AI4Car` : "Search OBD2 Codes | AI4Car",
    description: "Search for OBD2 error codes and car problems. Get AI-powered diagnostics with causes, symptoms, and solutions.",
    robots: {
      index: false,
      follow: true,
    },
  };
}

const categoryIcons: Record<ProblemCategory, React.ElementType> = {
  engine: AlertTriangle,
  emissions: Leaf,
  fuel: Fuel,
  sensors: Cpu,
  transmission: Cog,
};

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = q || "";
  const results = query ? searchProblems(query) : [];

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
            <span className="text-foreground font-medium">Search</span>
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

        {/* Search Header */}
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground mb-6">
            Search OBD2 Codes
          </h1>
          
          {/* Search Bar */}
          <form action="/problems/search" method="GET" className="max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                name="q"
                defaultValue={query}
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
        </header>

        {/* Results */}
        {query && (
          <div>
            <p className="text-muted-foreground mb-8">
              {results.length} {results.length === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
            </p>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((problem) => {
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
                          <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {problem.title.includes(":") ? problem.title.split(":")[1]?.trim() : problem.title}
                          </h2>
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
            ) : (
              <div className="text-center py-16">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">No results found</h2>
                <p className="text-muted-foreground mb-6">
                  Try searching for a different error code or browse our categories.
                </p>
                <Button asChild variant="outline">
                  <Link href="/problems">Browse All Codes</Link>
                </Button>
              </div>
            )}
          </div>
        )}

        {!query && (
          <div className="text-center py-16">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Enter a search term</h2>
            <p className="text-muted-foreground">
              Search for OBD2 codes like P0304, P0171, or P0420 to find detailed diagnostics.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
