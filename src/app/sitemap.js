import { experiments } from "@/data/experiments";

export default async function sitemap() {
  let routes = ["", "/lab", "/about"].map((route) => ({
    url: `https://abjt.dev${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const filteredExperiments = experiments.filter(
    (experiment) => experiment.type === "internal" || experiment.mdx
  );

  let experimentPages = filteredExperiments.map((experiment) => ({
    url: `https://abjt.dev/lab/${experiment.slug}`,
    lastModified: experiment.publishedAt,
  }));

  return [...routes, ...experimentPages];
}
