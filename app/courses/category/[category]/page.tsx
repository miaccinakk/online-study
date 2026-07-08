import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MessageCircle, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, getCoursesByCategory, type CourseCategory } from "@/lib/courses-data";

interface PageProps {
  params: Promise<{ category: string }>;
}

const categoryIcons: Record<CourseCategory, React.ElementType> = {
  conversation: MessageCircle,
  business: Briefcase,
  exam: GraduationCap,
};

export async function generateStaticParams() {
  return Object.keys(categories).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryData = categories[category as CourseCategory];

  if (!categoryData) {
    return {
      title: "Category Not Found | LinguaHub",
    };
  }

  return {
    alternates: {
      canonical: `/courses/category/${category}`,
    },
    title: `${categoryData.name} Courses | LinguaHub`,
    description: `${categoryData.description}. Browse all ${categoryData.name.toLowerCase()} language courses at LinguaHub.`,
    openGraph: {
      title: `${categoryData.name} Courses | LinguaHub`,
      description: categoryData.description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  if (!categories[category as CourseCategory]) {
    notFound();
  }

  const categoryKey = category as CourseCategory;
  const categoryData = categories[categoryKey];
  const courses = getCoursesByCategory(categoryKey);
  const Icon = categoryIcons[categoryKey];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border/50 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/courses" className="hover:text-primary transition-colors">
              Courses
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{categoryData.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
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
            {courses.length} {courses.length === 1 ? "course" : "courses"} in this category
          </p>
        </header>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <article
              key={course.slug}
              className="group relative flex flex-col p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="mb-4">
                {course.code && (
                  <span className="inline-block font-mono text-lg font-bold text-primary mb-2">
                    {course.code}
                  </span>
                )}
                <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {course.title.split(":")[0]?.trim() || course.title}
                </h2>
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
          ))}
        </div>

        {/* CTA Section */}
        <section className="mt-16 text-center p-8 rounded-xl border border-border bg-muted/30">
          <h2 className="text-xl font-bold sm:text-2xl">
            <span className="text-foreground">Ready to Learn </span>
            <span className="gradient-text">{categoryData.name}?</span>
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-muted-foreground">
            Create your free LinguaHub account and book your first live lesson with an expert teacher.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="glow">
              <Link href="/register" className="flex items-center gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/courses">Browse All Courses</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
