import clsx from "clsx";

export default function VideoPreview({ slug, preview, mobileOnly = false }) {
  const { width, height, placeholder } = preview;
  const aspectRatio = width / height;
  return (
    <div
      className={clsx(
        mobileOnly ? "block sm:hidden" : "block",
        "w-full relative overflow-hidden rounded-xl border border-neutral-300 dark:border-neutral-850"
      )}
      style={{
        aspectRatio,
      }}
    >
      <video
        autoPlay
        muted
        playsInline
        loop
        src={`/lab/${slug}/base.mp4`}
        width={width}
        height={height}
        type="video/mp4"
        className="w-full h-auto relative z-20"
        preload="auto"
        style={{
          aspectRatio,
        }}
      />
      <div
        className="absolute top-0 left-0 h-full w-full bg-no-repeat bg-cover blur-xl z-10"
        style={{
          backgroundImage: `url(${placeholder})`,
          aspectRatio,
        }}
      />
    </div>
  );
}
