import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://bitlog.netlify.app";
  const localePaths = routing.locales.map((locale) => `/${locale}`);

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", ...localePaths, "/blog"],
        disallow: [],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
