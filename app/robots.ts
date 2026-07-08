import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Private user areas
          "/dashboard/",
          "/api/",
          // Auth/payment pages with tokens
          "/reset-password/",
          "/auth/mobile-bridge",
          "/payment/",
          // Search results pages (dynamic content)
          "/problems/search",
          // Query parameters that create duplicate content
          "/*?ref=*",
          "/*?page=*",
          "/*?token=*",
          "/*?q=*",
          "/*?utm_*",
        ],
      },
    ],
    sitemap: "https://ai4car.app/sitemap.xml",
  };
}
