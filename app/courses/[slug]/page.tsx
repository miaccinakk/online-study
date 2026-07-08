import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, ListChecks, Trophy, Link2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courses, getCourseBySlug, categories } from "@/lib/courses-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found | LinguaHub",
    };
  }

  return {
    alternates: {
      canonical: `/courses/${slug}`,
    },
    title: `${course.title} | LinguaHub`,
    description: course.description,
    keywords: [
      "online language course",
      "language school",
      course.category,
    ].filter(Boolean),
    openGraph: {
      title: course.title,
      description: course.description,
      type: "article",
    },
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const category = categories[course.category];
  const relatedCourses = courses
    .filter((c) => c.slug !== slug && (c.category === course.category || course.relatedCodes.includes(c.code || "")))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border/50 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/courses" className="hover:text-primary transition-colors">
              Courses
            </Link>
            <span>/</span>
            <Link
              href={`/courses/category/${course.category}`}
              className="hover:text-primary transition-colors"
            >
              {category.name}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{course.code || course.slug}</span>
          </nav>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Back link */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all courses
        </Link>

        {/* Header */}
        <header className="mb-12">
          {course.code && (
            <span className="inline-block font-mono text-2xl font-bold text-primary mb-4">
              {course.code}
            </span>
          )}
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
            {course.title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {course.description}
          </p>

          <div className="mt-6 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {category.name}
            </span>
          </div>
        </header>

        {/* What You'll Learn */}
        <section className="mb-12" aria-labelledby="learn-heading">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
            <h2 id="learn-heading" className="text-xl font-bold">What You&apos;ll Learn</h2>
          </div>
          <ul className="space-y-3">
            {course.learn.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Course Includes */}
        <section className="mb-12" aria-labelledby="includes-heading">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-accent/10 text-accent">
              <ListChecks className="h-5 w-5" />
            </div>
            <h2 id="includes-heading" className="text-xl font-bold">What&apos;s Included</h2>
          </div>
          <ul className="space-y-3">
            {course.includes.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Outcomes */}
        <section className="mb-12" aria-labelledby="outcomes-heading">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Trophy className="h-5 w-5" />
            </div>
            <h2 id="outcomes-heading" className="text-xl font-bold">By the End You&apos;ll Be Able To</h2>
          </div>
          <ul className="space-y-3">
            {course.outcomes.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Content Section */}
        <section className="mb-12 prose prose-gray max-w-none">
          <div
            className="p-6 rounded-xl border border-border bg-card"
            dangerouslySetInnerHTML={{ __html: course.content.replace(/\n/g, '<br />').replace(/## /g, '<h2 class="text-xl font-bold mt-6 mb-3 text-foreground">').replace(/<br \/><br \/>/g, '</h2>') }}
          />
        </section>

        {/* Related Languages */}
        {course.relatedCodes.length > 0 && (
          <section className="mb-12" aria-labelledby="related-codes-heading">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Link2 className="h-5 w-5" />
              </div>
              <h2 id="related-codes-heading" className="text-xl font-bold">Other Languages</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {course.relatedCodes.map((code) => {
                const relatedCourse = courses.find((c) => c.code === code);
                return relatedCourse ? (
                  <Link
                    key={code}
                    href={`/courses/${relatedCourse.slug}`}
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
              <h3 className="text-lg font-bold text-foreground">Start learning with LinguaHub</h3>
              <p className="mt-2 text-muted-foreground">
                Create your free account and book your first live lesson. Learn at
                your own pace with the support of expert teachers.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Button asChild variant="glow">
                  <Link href="/register" className="flex items-center gap-2">
                    Get Started Free
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

        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <section aria-labelledby="related-courses-heading">
            <h2 id="related-courses-heading" className="text-xl font-bold mb-6">Related Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedCourses.map((related) => (
                <Link
                  key={related.slug}
                  href={`/courses/${related.slug}`}
                  className="group p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
                >
                  {related.code && (
                    <span className="font-mono text-sm font-bold text-primary">
                      {related.code}
                    </span>
                  )}
                  <h3 className="mt-1 text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {related.title.split(":")[0]?.trim() || related.title}
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
