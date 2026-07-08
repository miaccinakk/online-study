import type { Metadata } from "next";
import Link from "next/link";
import { Search, MessageCircle, Briefcase, GraduationCap, ArrowRight, Sparkles, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courses, categories, getFeaturedCourses, getPaginatedCourses, type CourseCategory } from "@/lib/courses-data";

export const metadata: Metadata = {
  alternates: {
    canonical: "/courses",
  },
  title: "Language Courses | LinguaHub Online School",
  description:
    "Browse our online language courses. Learn English, French, Spanish, and German with native teachers through live, conversation-first lessons.",
  keywords: [
    "online language courses",
    "learn english online",
    "learn french online",
    "learn spanish online",
    "learn german online",
    "language school",
  ],
  openGraph: {
    title: "Language Courses | LinguaHub Online School",
    description: "Learn English, French, Spanish, and German online with native teachers.",
  },
};

const categoryIcons: Record<CourseCategory, React.ElementType> = {
  conversation: MessageCircle,
  business: Briefcase,
  exam: GraduationCap,
};

interface CoursesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const { courses: paginatedCourses, totalPages, totalCount } = getPaginatedCourses(currentPage);
  const featured = getFeaturedCourses();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 isometric-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground mb-6">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Live lessons with native teachers</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="text-foreground">Our Language</span>
                <br />
                <span className="gradient-text">Courses</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                Choose a language and start speaking from your very first lesson.
                Every course is built around real conversation, small groups, and
                friendly, expert teachers.
              </p>
            </div>

            <div className="hidden lg:flex items-end justify-end gap-8">
              <div className="text-right">
                <div className="text-4xl font-bold text-primary">{totalCount}</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-primary">Live</div>
                <div className="text-sm text-muted-foreground">Classes</div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-10">
            <form action="/courses/search" method="GET" className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  name="q"
                  placeholder="Search a language (e.g. English, Spanish)"
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

      {/* Featured Courses - Only show on first page */}
      {currentPage === 1 && (
        <section className="py-16 sm:py-20" aria-labelledby="featured-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 id="featured-heading" className="text-2xl font-bold">Most Popular Courses</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((course) => (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="group relative p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block font-mono text-lg font-bold text-primary mb-2">
                        {course.code}
                      </span>
                      <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {course.title.split(":")[0]?.trim() || course.title}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(Object.keys(categories) as CourseCategory[]).map((key) => {
                const category = categories[key];
                const Icon = categoryIcons[key];
                const count = courses.filter((c) => c.category === key).length;

                return (
                  <Link
                    key={key}
                    href={`/courses/category/${key}`}
                    className="group flex flex-col items-center p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 text-center"
                  >
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {count} {count === 1 ? "course" : "courses"}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Courses Grid */}
      <section className="py-16 sm:py-20 border-t border-border/50" aria-labelledby="all-courses-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 id="all-courses-heading" className="text-2xl font-bold">
              All Courses
              <span className="ml-2 text-base font-normal text-muted-foreground">
                ({totalCount})
              </span>
            </h2>
            {currentPage > 1 && (
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedCourses.map((course) => {
              const Icon = categoryIcons[course.category];

              return (
                <article
                  key={course.slug}
                  className="group relative flex flex-col p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      {course.code && (
                        <span className="inline-block font-mono text-sm font-bold text-primary mb-1">
                          {course.code}
                        </span>
                      )}
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {course.title.split(":")[0]?.trim() || course.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                    {course.description}
                  </p>

                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    View course
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </article>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
              {currentPage > 1 ? (
                <Link
                  href={currentPage === 2 ? "/courses" : `/courses?page=${currentPage - 1}`}
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

              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={pageNum === 1 ? "/courses" : `/courses?page=${pageNum}`}
                    className={`inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-lg border transition-colors ${
                      pageNum === currentPage
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:bg-muted"
                    }`}
                    aria-current={pageNum === currentPage ? "page" : undefined}
                  >
                    {pageNum}
                  </Link>
                ))}
              </div>

              <span className="sm:hidden text-sm text-muted-foreground px-4">
                {currentPage} / {totalPages}
              </span>

              {currentPage < totalPages ? (
                <Link
                  href={`/courses?page=${currentPage + 1}`}
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
            <span className="text-foreground">Ready to Start </span>
            <span className="gradient-text">Learning?</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Join thousands of students learning a new language with LinguaHub.
            Create your free account and book your first lesson today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="glow">
              <Link href="/register" className="flex items-center gap-2">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline-glow-accent" size="lg">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
