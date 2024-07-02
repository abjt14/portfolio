import clsx from "clsx";
import BorderHighlight from "./BorderHighlight";
import LaserProgressBeam from "./LaserProgressBeam";
import Searchlight from "./Searchlight";
import MagneticButton from "./MagneticButton";
import RadioInput from "./RadioInput";
import HoldToSubmit from "./HoldToSubmit";
import CardStack from "./CardStack";

export default function ExperimentExport({ slug, desktopOnly = false }) {
  if (slug === "card-stack") {
    return (
      <ExperimentWrapper
        className="!p-0"
        theme="both"
        desktopOnly={desktopOnly}
      >
        <CardStack />
      </ExperimentWrapper>
    );
  }
  if (slug === "hold-to-submit") {
    return (
      <ExperimentWrapper
        theme="both"
        className="px-8 pb-8 pt-48 sm:px-16 sm:pb-16"
        desktopOnly={desktopOnly}
      >
        <HoldToSubmit />
      </ExperimentWrapper>
    );
  }
  if (slug === "radio-input") {
    return (
      <ExperimentWrapper
        theme="both"
        className="!bg-neutral-150 dark:!bg-neutral-950"
        desktopOnly={desktopOnly}
      >
        <RadioInput />
      </ExperimentWrapper>
    );
  }
  if (slug === "magnetic-button") {
    return (
      <ExperimentWrapper theme="both" desktopOnly={desktopOnly}>
        <MagneticButton />
      </ExperimentWrapper>
    );
  }
  if (slug === "searchlight") {
    return (
      <ExperimentWrapper theme="dark" desktopOnly={desktopOnly}>
        <Searchlight />
      </ExperimentWrapper>
    );
  }
  if (slug === "laser-progress-beam") {
    return (
      <ExperimentWrapper theme="both" desktopOnly={desktopOnly}>
        <LaserProgressBeam />
      </ExperimentWrapper>
    );
  }
  if (slug === "border-highlight") {
    return (
      <ExperimentWrapper theme="dark" desktopOnly={desktopOnly}>
        <BorderHighlight />
      </ExperimentWrapper>
    );
  }
}

function ExperimentWrapper({
  children,
  theme,
  className = "",
  desktopOnly = false,
}) {
  return (
    <div
      className={clsx(
        desktopOnly ? "hidden sm:flex" : "flex",
        "w-full min-h-80 rounded-xl border justify-center items-center p-8 relative overflow-hidden",
        theme === "light" && "border border-neutral-300 bg-neutral-250",
        theme === "dark" && "border border-neutral-850 bg-neutral-900",
        theme === "both" &&
          "border border-neutral-300 bg-neutral-250 dark:border-neutral-850 dark:bg-neutral-900",
        className
      )}
    >
      {children}
    </div>
  );
}
