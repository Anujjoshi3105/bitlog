import { pages } from "@/config/site";
import { routing } from "@/i18n/routing";
import type { MetadataRoute } from "next";

type ChangeFreq = "daily" | "weekly" | "monthly";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bitlog.netlify.app";

  const sitemap = Object.keys(pages).flatMap((page) => {
    const pagePath = page ? `/${page}` : "";

    return routing.locales.map((locale) => {
      const localePath = locale === routing.defaultLocale ? "" : `/${locale}`;
      const url = `${baseUrl}${localePath}${pagePath}`;

      let changeFrequency: ChangeFreq = "monthly";
      if (page === "trending") {
        changeFrequency = "daily";
      } else if (page === "blog") {
        changeFrequency = "weekly";
      }

      let priority = 0.7;
      if (page === "trending") {
        priority = 0.9;
      } else if (page === "blog") {
        priority = 0.8;
      }

      return {
        url,
        lastModified: new Date(),
        changeFrequency,
        priority,
      };
    });
  });

  return sitemap;
}
