import clsx from "clsx";
import type { SurfaceTheme } from "@/context/ThemeProvider";

const surface: Record<SurfaceTheme, string> = {
  light: "border-neutral-300 bg-neutral-250",
  dark: "border-neutral-850 bg-neutral-900",
  both: "border-neutral-300 bg-neutral-250 dark:border-neutral-850 dark:bg-neutral-900",
};

export default function ExperimentFrame({
  children,
  theme = "both",
  className = "",
  desktopOnly = false,
  spacing = true,
}: {
  children: React.ReactNode;
  theme?: SurfaceTheme;
  className?: string;
  desktopOnly?: boolean;
  spacing?: boolean;
}) {
  return (
    <div
      className={clsx(
        desktopOnly ? "hidden sm:flex" : "flex",
        "w-full min-h-80 rounded-xl border justify-center items-center p-8 relative overflow-hidden clip-radius",
        spacing && "my-4",
        surface[theme],
        className
      )}
    >
      {children}
    </div>
  );
}
