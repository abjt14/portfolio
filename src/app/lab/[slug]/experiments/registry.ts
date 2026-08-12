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

/**
 * Slugs the data marks as having an inline demo. Derived rather than restated,
 * so the registry below cannot drift from experiments.ts.
 */
type InternalSlug = Extract<
  (typeof experiments)[number],
  { type: "internal" }
>["slug"];

export type ExperimentDemo = {
  /** Loose enough to hold every demo's props, all of which are optional. */
  Component: ComponentType<Record<string, unknown>>;
  theme: SurfaceTheme;
  className?: string;
  /**
   * Tag exposed to this slug's MDX body, for pages that embed their own demo
   * inline. Explicit because a minifier is free to mangle Component.name.
   */
  mdxTag?: string;
};

/**
 * Every experiment with an inline demo, and how each is framed. Typed as a
 * total Record over InternalSlug, so adding an `internal` experiment without a
 * demo -- or a demo for a non-internal slug -- is a compile error.
 */
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
