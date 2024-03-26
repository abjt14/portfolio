import clsx from "clsx";

export default function VideoPreview({ slug, resolution, mobileOnly = false }) {
  return (
    <div
      className={clsx(
        mobileOnly ? "block sm:hidden" : "block",
        "w-full relative overflow-hidden rounded-xl border border-neutral-300 dark:border-neutral-850"
      )}
      style={{
        aspectRatio: `${resolution.width} / ${resolution.height}`,
      }}
    >
      <video
        autoPlay
        muted
        playsInline
        loop
        src={`/lab/${slug}/optimized.mp4`}
        width={resolution.width}
        height={resolution.height}
        type="video/mp4"
        className="w-full h-auto relative z-20"
        preload="auto"
        style={{
          aspectRatio: `${resolution.width} / ${resolution.height}`,
        }}
      />
      <div
        className="absolute top-0 left-0 h-full w-full bg-no-repeat bg-cover blur-xl z-10"
        style={{
          backgroundImage: `url(/lab/${slug}/placeholder.webp)`,
          aspectRatio: `${resolution.width} / ${resolution.height}`,
        }}
      />
    </div>
  );
}
