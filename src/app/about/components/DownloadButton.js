import clsx from "clsx";
import Link from "next/link";

export default function DownloadButton() {
  return (
    <a
      href="/resume.pdf"
      target="_blank"
      className=" bg-neutral-200 dark:bg-neutral-800 p-px rounded-full relative shadow-sm shadow-neutral-400 dark:shadow-black group outline-none focus-visible:ring-1 ring-neutral-950 dark:ring-neutral-50"
      aria-label="download resume"
    >
      <div
        className={clsx(
          "w-full h-full flex justify-center items-center gap-1 py-3 px-4 rounded-full relative z-20",
          "bg-gradient-to-tl from-neutral-50 dark:from-neutral-925 via-neutral-200 dark:via-neutral-900 to-neutral-50 dark:to-neutral-925",
          "text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-neutral-50 transition-colors duration-150"
        )}
      >
        <span
          className={clsx(
            "text-sm font-medium",
            "[text-shadow:_0_0_1.25rem_rgba(10,10,10,0)] dark:[text-shadow:0_0_0.75rem_rgba(250,250,250,0)]",
            "group-hover:[text-shadow:_0_0_1.25rem_rgba(10,10,10,1)] dark:group-hover:[text-shadow:0_0_0.75rem_rgba(250,250,250,1)]",
            "transition-[text-shadow] duration-150"
          )}
        >
          Resume
        </span>
        <DownloadIcon />
      </div>
      <div className="absolute top-0 left-0 h-full w-full rounded-full bg-gradient-to-br from-transparent from-30% via-neutral-300 dark:via-neutral-750 to-60% to-transparent z-10" />
    </a>
  );
}

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className={clsx(
        "size-3 transition-[filter] duration-150",
        "drop-shadow-none group-hover:[filter:drop-shadow(0px_0px_4px_rgba(10,_10,_10,_.5))] dark:group-hover:[filter:drop-shadow(0px_0px_4px_rgba(250,250,250,1))]"
      )}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
      />
    </svg>
  );
}
