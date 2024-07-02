export default function Information({ title, children }) {
  return (
    <div className="w-full h-auto flex flex-col justify-start items-start gap-2 my-2 rounded-xl bg-neutral-250 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-850 p-4">
      <div className="flex justify-start items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>

        <span className="font-medium">{title}</span>
      </div>
      <div className="text-neutral-500 dark:text-neutral-400 flex flex-col justify-start items-start gap-2">
        {children}
      </div>
    </div>
  );
}
