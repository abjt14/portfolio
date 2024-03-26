import clsx from "clsx";

export default function MenuWrapper({ children, showOnMobile = true }) {
  return (
    <div
      className={clsx(
        "bg-neutral-200 dark:bg-neutral-800 p-px rounded-full overflow-hidden relative shadow-sm shadow-neutral-400 dark:shadow-black z-0 shrink-0",
        showOnMobile ? "block" : "hidden sm:block"
      )}
    >
      <div className="bg-neutral-50 dark:bg-neutral-925 px-1 rounded-full relative flex justify-between items-center gap-4">
        {children}
      </div>
    </div>
  );
}
