import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courses, categories, type CourseCategory } from "@/lib/courses-data";

const categoryIcons: Record<CourseCategory, React.ElementType> = {
  conversation: MessageCircle,
  business: Briefcase,
  exam: GraduationCap,
};

export function CoursesPreview() {
  const featured = courses.slice(0, 6);

  return (
    <section className="relative py-20 sm:py-28">
      {/* Seamless background continuation - no hard edges */}
      <div className="absolute inset-0 isometric-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background/70" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="text-left">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="text-foreground">Explore Our </span>
              <span className="gradient-text">Courses</span>
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Live, conversation-first lessons with native teachers.
              Pick your language and start speaking from day one.
            </p>
          </div>
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link href="/courses" className="flex items-center gap-2">
              View all courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Horizontal scroll rail */}
      <div className="relative mt-12">
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 sm:px-6 lg:px-[max(2rem,calc((100vw-72rem)/2))] [scrollbar-width:thin]">
          {featured.map((course) => {
            const Icon = categoryIcons[course.category];
            return (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="group flex w-[300px] flex-shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 sm:w-[340px]"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={`${course.title.split(":")[0]?.trim() || course.title} course`}
                    fill
                    sizes="340px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    {course.code && (
                      <span className="font-mono text-sm font-bold text-primary">
                        {course.code}
                      </span>
                    )}
                    <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      {categories[course.category].name}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                    {course.title.split(":")[0]?.trim() || course.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary">
                    View course
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="relative mx-auto mt-4 max-w-6xl px-4 sm:hidden">
        <Button asChild variant="link" className="text-primary px-0">
          <Link href="/courses" className="flex items-center gap-2">
            View all courses
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
