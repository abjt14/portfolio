import Link from "next/link";
import clsx from "clsx";

export default function ProjectLink({ href, name }) {
  return (
    <Link
      href={href}
      target="_blank"
      className=" bg-neutral-200 dark:bg-neutral-800 p-px rounded-full relative shadow-sm shadow-neutral-400 dark:shadow-black group outline-none focus-visible:ring-1 ring-neutral-950 dark:ring-neutral-50"
      aria-label={`visit ${name}`}
    >
      <div
        className={clsx(
          "w-full h-full flex justify-center items-center gap-0 py-3 pl-4 pr-3 rounded-full relative z-20",
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
          Visit
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className={clsx(
            "size-4 transition-[filter] duration-150",
            "drop-shadow-none group-hover:[filter:drop-shadow(0px_0px_4px_rgba(10,_10,_10,_.5))] dark:group-hover:[filter:drop-shadow(0px_0px_4px_rgba(250,250,250,1))]"
          )}
        >
          <path
            fillRule="evenodd"
            d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="absolute top-0 left-0 h-full w-full rounded-full bg-gradient-to-br from-transparent from-30% via-neutral-300 dark:via-neutral-750 to-60% to-transparent z-10" />
    </Link>
  );
}
