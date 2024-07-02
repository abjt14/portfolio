import clsx from "clsx";

export default function MDXComponentWrapper({
  children,
  theme = "both",
  className = "",
  desktopOnly = false,
}) {
  return (
    <div
      className={clsx(
        desktopOnly ? "hidden sm:flex" : "flex",
        "w-full min-h-80 rounded-xl border justify-center items-center p-8 relative overflow-hidden my-4",
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
