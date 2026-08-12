import ExperimentFrame from "@/components/ExperimentFrame";
import type { ExperimentSlug } from "@/data/experiments";
import { getExperimentDemo } from "./registry";

export default function ExperimentExport({
  slug,
  desktopOnly = false,
}: {
  slug: ExperimentSlug;
  desktopOnly?: boolean;
}) {
  const demo = getExperimentDemo(slug);
  if (!demo) return null;

  const { Component, theme, className } = demo;

  return (
    <ExperimentFrame
      spacing={false}
      theme={theme}
      className={className}
      desktopOnly={desktopOnly}
    >
      <Component />
    </ExperimentFrame>
  );
}
