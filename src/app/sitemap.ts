import type { MetadataRoute } from "next";

const base = "https://williamsmata.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["es", "en"] as const;

  const entries: MetadataRoute.Sitemap = locales.map((lang) => ({
    url: `${base}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: lang === "es" ? 1 : 0.8,
    alternates: {
      languages: {
        es: `${base}/es`,
        en: `${base}/en`,
      },
    },
  }));

  return entries;
}
