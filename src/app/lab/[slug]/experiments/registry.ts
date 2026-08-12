import type { ComponentType } from "react";
import type { SurfaceTheme } from "@/context/ThemeProvider";
import { experiments } from "@/data/experiments";

import BorderHighlight from "./BorderHighlight";
import CardStack from "./CardStack";
import HoldToSubmit from "./HoldToSubmit";
import LaserProgressBeam from "./LaserProgressBeam";
import MagneticButton from "./MagneticButton";
import RadioInput from "./RadioInput";
import Searchlight from "./Searchlight";

type InternalSlug = Extract<
  (typeof experiments)[number],
  { type: "internal" }
>["slug"];

export type ExperimentDemo = {
  Component: ComponentType<Record<string, unknown>>;
  theme: SurfaceTheme;
  className?: string;
  mdxTag?: string;
};

export const experimentDemos = {
  "card-stack": {
    Component: CardStack,
    theme: "both",
    className: "!p-0",
    mdxTag: "CardStack",
  },
  "hold-to-submit": {
    Component: HoldToSubmit,
    theme: "both",
    className: "px-8 pb-8 pt-48 sm:px-16 sm:pb-16",
  },
  "radio-input": {
    Component: RadioInput,
    theme: "both",
    className: "!bg-neutral-150 dark:!bg-neutral-950",
  },
  "magnetic-button": { Component: MagneticButton, theme: "both" },
  searchlight: { Component: Searchlight, theme: "dark" },
  "laser-progress-beam": { Component: LaserProgressBeam, theme: "both" },
  "border-highlight": { Component: BorderHighlight, theme: "dark" },
} satisfies Record<InternalSlug, ExperimentDemo>;

const demos: Partial<Record<string, ExperimentDemo>> = experimentDemos;

export function getExperimentDemo(slug: string): ExperimentDemo | undefined {
  return demos[slug];
}
