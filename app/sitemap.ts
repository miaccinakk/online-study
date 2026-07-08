import { MetadataRoute } from "next";
import { problems, categories, type ProblemCategory } from "@/lib/problems-data";

const BASE_URL = "https://ai4car.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  
  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/downloads`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/how-to-pay`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/how-it-works`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Problems index
  const problemsIndex: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/problems`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Problem categories
  const categoryPages: MetadataRoute.Sitemap = Object.keys(categories).map(
    (category) => ({
      url: `${BASE_URL}/problems/category/${category}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  // Individual problem pages
  const problemPages: MetadataRoute.Sitemap = problems.map((problem) => ({
    url: `${BASE_URL}/problems/${problem.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: problem.searchVolume === "high" ? 0.8 : problem.searchVolume === "medium" ? 0.7 : 0.6,
  }));

  // Secondary pages
  const secondaryPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/sitemap-page`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  return [
    ...mainPages,
    ...problemsIndex,
    ...categoryPages,
    ...problemPages,
    ...secondaryPages,
  ];
}
