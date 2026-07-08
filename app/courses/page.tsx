import type { Metadata } from "next";
import Link from "next/link";
import { Search, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseCatalog } from "@/components/course-catalog";
import { courses, getFeaturedCourses } from "@/lib/courses-data";

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

export default function CoursesPage() {
  const featured = getFeaturedCourses();
  const totalCount = courses.length;

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

      {/* Catalog: category filters + all courses */}
      <section className="py-16 sm:py-20" aria-labelledby="all-courses-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 id="all-courses-heading" className="text-2xl font-bold sm:text-3xl">
              All Courses
            </h2>
            <p className="mt-2 text-muted-foreground">
              Filter by category to find the perfect course for you.
            </p>
          </div>

          <CourseCatalog courses={courses} />
        </div>
      </section>

      {/* Most Popular Courses */}
      <section className="py-16 sm:py-20 border-t border-border/50" aria-labelledby="featured-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 id="featured-heading" className="text-2xl font-bold sm:text-3xl">
              Most Popular Courses
            </h2>
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
    </div>
  );
}
