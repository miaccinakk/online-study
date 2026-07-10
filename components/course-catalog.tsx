"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, Briefcase, GraduationCap, SlidersHorizontal } from "lucide-react";
import { categories, type Course, type CourseCategory } from "@/lib/courses-data";

const categoryIcons: Record<CourseCategory, React.ElementType> = {
  conversation: MessageCircle,
  business: Briefcase,
  exam: GraduationCap,
};

// Per-category accent hues so the catalog isn't a wall of orange.
const categoryColors: Record<
  CourseCategory,
  {
    chip: string;
    text: string;
    hoverTitle: string;
    hoverBorder: string;
    hoverShadow: string;
  }
> = {
  conversation: {
    chip: "bg-primary/10 text-primary",
    text: "text-primary",
    hoverTitle: "group-hover:text-primary",
    hoverBorder: "hover:border-primary/50",
    hoverShadow: "hover:shadow-primary/10",
  },
  business: {
    chip: "bg-accent/10 text-accent",
    text: "text-accent",
    hoverTitle: "group-hover:text-accent",
    hoverBorder: "hover:border-accent/50",
    hoverShadow: "hover:shadow-accent/10",
  },
  exam: {
    chip: "bg-berry/10 text-berry",
    text: "text-berry",
    hoverTitle: "group-hover:text-berry",
    hoverBorder: "hover:border-berry/50",
    hoverShadow: "hover:shadow-berry/10",
  },
};

interface CourseCatalogProps {
  courses: Course[];
}

export function CourseCatalog({ courses }: CourseCatalogProps) {
  const categoryKeys = Object.keys(categories) as CourseCategory[];
  const [selected, setSelected] = useState<CourseCategory[]>([]);

  const toggleCategory = (key: CourseCategory) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key],
    );
  };

  const filteredCourses = useMemo(() => {
    if (selected.length === 0) return courses;
    return courses.filter((c) => selected.includes(c.category));
  }, [courses, selected]);

  const countFor = (key: CourseCategory) =>
    courses.filter((c) => c.category === key).length;

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Sidebar filters */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-foreground">Categories</h3>
          </div>

          <div className="flex flex-col gap-1">
            {categoryKeys.map((key) => {
              const Icon = categoryIcons[key];
              const checked = selected.includes(key);
              return (
                <label
                  key={key}
                  className="group flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-muted transition-colors"
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                      checked
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background"
                    }`}
                  >
                    {checked && (
                      <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 6l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => toggleCategory(key)}
                  />
                  <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="flex-1 text-sm font-medium text-foreground">
                    {categories[key].name}
                  </span>
                  <span className="text-xs text-muted-foreground">{countFor(key)}</span>
                </label>
              );
            })}
          </div>

          {selected.length > 0 && (
            <button
              type="button"
              onClick={() => setSelected([])}
              className="mt-4 text-sm font-medium text-primary hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </aside>

      {/* Course grid */}
      <div>
        <p className="mb-6 text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredCourses.length}</span>{" "}
          {filteredCourses.length === 1 ? "course" : "courses"}
        </p>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {filteredCourses.map((course) => {
            const Icon = categoryIcons[course.category];
            const c = categoryColors[course.category];
            return (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className={`group flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg ${c.hoverBorder} ${c.hoverShadow}`}
              >
                <div className="mb-3 flex items-start gap-4">
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${c.chip}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {course.code && (
                        <span className={`font-mono text-sm font-bold ${c.text}`}>
                          {course.code}
                        </span>
                      )}
                      <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {categories[course.category].name}
                      </span>
                    </div>
                    <h3 className={`mt-1 font-semibold text-foreground transition-colors ${c.hoverTitle}`}>
                      {course.title.split(":")[0]?.trim() || course.title}
                    </h3>
                  </div>
                </div>

                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                  {course.description}
                </p>

                <div className="relative mb-4 h-40 w-full overflow-hidden rounded-lg">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={`${course.title.split(":")[0]?.trim() || course.title} course`}
                    fill
                    sizes="(max-width: 1280px) 100vw, 40vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <span className={`mt-auto inline-flex items-center gap-1 text-sm font-medium ${c.text}`}>
                  View course
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">No courses match the selected categories.</p>
          </div>
        )}
      </div>
    </div>
  );
}
