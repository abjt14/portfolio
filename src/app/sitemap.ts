import type { MetadataRoute } from "next";
import { labPageExperiments } from "@/data/experiments";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/lab", "/about"].map((route) => ({
    url: `https://abjt.dev${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const experimentPages = labPageExperiments.map((experiment) => ({
    url: `https://abjt.dev/lab/${experiment.slug}`,
    lastModified: experiment.date,
  }));

  return [...routes, ...experimentPages];
}
