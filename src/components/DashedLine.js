import clsx from "clsx";

export default function DashedLine({
  direction,
  className = "",
  gradient = false,
}) {
  const gradientDirection =
    direction === "horizontal"
      ? "to right"
      : direction === "vertical" && "to bottom";

  const thicknessClass =
    direction === "horizontal" ? "h-px" : direction === "vertical" && "w-px";

  let lengthClass = "";
  if (!gradient) {
    if (direction === "horizontal") {
      lengthClass = "w-full";
    } else if (direction === "vertical") {
      lengthClass = "h-full";
    }
  } else {
    if (direction === "horizontal") {
      lengthClass = "w-[calc(100%+3.5rem)]";
    } else if (direction === "vertical") {
      lengthClass = "h-[calc(100%+7rem)] sm:h-[calc(100%+3.5rem)]";
    }
  }

  let backgroundClass = "";
  if (!gradient) {
    backgroundClass = "bg-black dark:bg-white opacity-30 dark:opacity-10";
  } else {
    if (direction === "horizontal") {
      backgroundClass =
        "opacity-30 dark:opacity-10 bg-[linear-gradient(to_right,transparent_0%,rgb(0,0,0)_5%,rgb(0,0,0)_95%,transparent_100%)] dark:bg-[linear-gradient(to_right,transparent_0%,rgb(255,255,255)_5%,rgb(255,255,255)_95%,transparent_100%)]";
    } else if (direction === "vertical") {
      backgroundClass =
        "opacity-30 dark:opacity-10 bg-[linear-gradient(to_bottom,transparent_0%,rgb(0,0,0)_5%,rgb(0,0,0)_95%,transparent_100%)] dark:bg-[linear-gradient(to_bottom,transparent_0%,rgb(255,255,255)_5%,rgb(255,255,255)_95%,transparent_100%)]";
    }
  }

  return (
    <div
      className={clsx(
        "absolute -z-10 pointer-events-none select-none",
        backgroundClass,
        thicknessClass,
        lengthClass,
        className
      )}
      style={{
        maskImage: `repeating-linear-gradient(${gradientDirection}, transparent, transparent 2px, black 0px, black 4.5px)`,
      }}
    />
  );
}
