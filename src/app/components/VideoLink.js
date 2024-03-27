import Link from "next/link";
import clsx from "clsx";
import { experiments } from "@/data/experiments";
import Image from "next/image";

export default function VideoLink({
  slug,
  width = 0,
  height = 0,
  videoSrc = "",
  backgroundSrc = "",
  className = "",
}) {
  const { name, resolution } = experiments.find(
    (experiment) => experiment.slug === slug
  );
  const aspectWidth = width !== 0 ? width : resolution.width;
  const aspectHeight = height !== 0 ? height : resolution.height;
  const aspectRatio = aspectWidth / aspectHeight;

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
          width={aspectWidth}
          height={aspectHeight}
          className="h-auto w-auto relative z-20 grayscale-0 sm:grayscale sm:hover:grayscale-0 transition-all duration-150"
          src={videoSrc !== "" ? videoSrc : `/lab/${slug}/optimized.mp4`}
          style={{
            aspectRatio,
          }}
        />
        <Image
          src={
            backgroundSrc !== ""
              ? `${backgroundSrc}`
              : `/lab/${slug}/placeholder.webp`
          }
          alt={"placeholder for " + name}
          width={aspectWidth}
          height={aspectHeight}
          priority={true}
          className="absolute top-0 left-0 h-full w-full blur-xl z-10"
          style={{
            aspectRatio,
          }}
        />
      </div>
    </Link>
  );
}
