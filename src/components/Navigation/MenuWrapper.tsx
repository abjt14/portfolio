import clsx from "clsx";

export default function MenuWrapper({
  children,
  showOnMobile = true,
}: {
  children: React.ReactNode;
  showOnMobile?: boolean;
}) {
  return (
    // The shadow sits out here because `clip-radius` masks the element it's on,
    // and a mask would clip the shadow away with it.
    <div
      className={clsx(
        "rounded-full relative shadow-sm shadow-neutral-400 dark:shadow-black z-50 shrink-0",
        showOnMobile ? "block" : "hidden sm:block"
      )}
    >
      <div className="bg-neutral-200 dark:bg-neutral-800 p-px rounded-full overflow-hidden clip-radius relative">
        <div className="bg-neutral-50 dark:bg-neutral-925 px-1 rounded-full relative flex justify-between items-center gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}
