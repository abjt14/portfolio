import clsx from "clsx";

export default function TechnologiesList({
  technologies,
  label,
}: {
  technologies: string[];
  /** Renders a heading above the chips; omit for a bare row. */
  label?: string;
}) {
  const chips = (
    <div
      className={clsx(
        "w-full flex justify-start items-center gap-2 flex-wrap",
        !label && "py-2"
      )}
    >
      {technologies.map((technology) => (
        <span
          key={technology}
          className="text-xs text-neutral-500 dark:text-neutral-400 font-geistmono bg-neutral-250 dark:bg-neutral-850 px-2 py-1 rounded-md"
        >
          {technology}
        </span>
      ))}
    </div>
  );

  if (!label) return chips;

  return (
    <div className="w-full flex flex-col justify-start items-start gap-2">
      <h2 className="text-sm text-neutral-500 dark:text-neutral-400">{label}</h2>
      {chips}
    </div>
  );
}
