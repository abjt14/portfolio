import Link from "next/link";
import { experiments } from "@/data/experiments";
import clsx from "clsx";

export default function VideoLink({
  slug,
  variant = "base", // base, square
  className = "",
}) {
  const { name, preview } = experiments.find(
    (experiment) => experiment.slug === slug
  );

  const { width, height } = preview[variant];
  const aspectRatio = width / height;

  let videoSrc = "";
  if (variant === "base") {
    videoSrc = `/lab/${slug}/base.mp4`;
  } else if (variant === "square") {
    videoSrc = `/lab/${slug}/square.mp4`;
  }

  let backgroundSrc = "";
  if (variant === "base") {
    backgroundSrc = preview.base.placeholder;
  } else if (variant === "square") {
    backgroundSrc = preview.square.placeholder;
  }

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
      <div className="h-full w-full relative overflow-hidden rounded-xl">
        <video
          autoPlay
          muted
          playsInline
          loop
          width={width}
          height={height}
          className="h-auto w-auto relative z-20 grayscale-0 sm:grayscale sm:hover:grayscale-0 transition-all duration-500"
          src={videoSrc}
          style={{
            aspectRatio,
          }}
        />
        <div
          className="absolute top-0 left-0 h-full w-full bg-no-repeat bg-cover blur-xl z-10"
          style={{
            backgroundImage: `url(${backgroundSrc})`,
            aspectRatio,
          }}
        />
      </div>
    </Link>
  );
}
