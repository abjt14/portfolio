import Link from "next/link";
import { getExperiment, type ExperimentSlug } from "@/data/experiments";
import clsx from "clsx";
import VideoWithPlaceholder from "@/components/VideoWithPlaceholder";

export default function VideoLink({
  slug,
  variant = "base",
  className = "",
}: {
  slug: ExperimentSlug;
  variant?: "base" | "square";
  className?: string;
}) {
  const { name, preview } = getExperiment(slug);

  // `square` only exists on a few experiments, so fall back to `base` rather
  // than throwing on a slug that has no square variant.
  const media =
    variant === "square" && preview.square ? preview.square : preview.base;
  const { width, height, placeholder } = media;
  const aspectRatio = width / height;

  const videoSrc = `/lab/${slug}/${variant}.mp4`;

  return (
    <Link
      href={`/lab/${slug}`}
      prefetch={true}
      target="_self"
      aria-label={name}
      className={clsx(
        "h-auto w-full block rounded-xl dark:rounded-[calc(0.75rem-1px)] outline-none focus-visible:ring-4 dark:focus-visible:ring-1 ring-neutral-500 dark:ring-neutral-50",
        className
      )}
      style={{
        aspectRatio,
      }}
    >
      <div className="h-full w-full relative overflow-hidden clip-radius rounded-xl">
        <VideoWithPlaceholder
          src={videoSrc}
          width={width}
          height={height}
          placeholder={placeholder}
          placeholderClassName="blur-xl"
          className="h-auto w-auto grayscale-0 sm:grayscale sm:hover:grayscale-0 transition-all duration-500"
        />
      </div>
    </Link>
  );
}
