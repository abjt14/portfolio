import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: "https://abjt.dev/sitemap.xml",
    host: "https://abjt.dev",
  };
}
