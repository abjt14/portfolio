import clsx from "clsx";

/**
 * An autoplaying muted video over a blurred still of itself, which fills the
 * frame while the video buffers. `blur` is required because call sites
 * deliberately differ.
 */
export default function VideoWithPlaceholder({
  src,
  width,
  height,
  placeholder,
  placeholderClassName,
  className = "",
  preload,
}: {
  src: string;
  width: number;
  height: number;
  placeholder?: string;
  /** Classes for the blurred still, e.g. "blur-xl". */
  placeholderClassName?: string;
  className?: string;
  preload?: "auto" | "metadata" | "none";
}) {
  const aspectRatio = width / height;

  return (
    <>
      <video
        autoPlay
        muted
        playsInline
        loop
        src={src}
        width={width}
        height={height}
        preload={preload}
        // Safari won't clip a composited <video> to an ancestor's radius, so
        // carry the wrapper's own radius. Every call site makes the video a
        // direct child of the rounded wrapper, so `inherit` matches it exactly.
        className={clsx("relative z-20 rounded-[inherit]", className)}
        style={{ aspectRatio }}
      />
      {placeholder && (
        <div
          className={clsx(
            // Rounded for the same reason as the video: `blur` composites it.
            "absolute top-0 left-0 h-full w-full bg-no-repeat bg-cover z-10 rounded-[inherit]",
            placeholderClassName
          )}
          style={{ backgroundImage: `url(${placeholder})`, aspectRatio }}
        />
      )}
    </>
  );
}
