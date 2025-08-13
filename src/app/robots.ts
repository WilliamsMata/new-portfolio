import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/es", "/en"],
      disallow: ["/api"],
    },
    sitemap: ["https://williamsmata.com/sitemap.xml"],
  };
}
