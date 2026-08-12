import clsx from "clsx";

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
        className={clsx("relative z-20 rounded-[inherit]", className)}
        style={{ aspectRatio }}
      />
      {placeholder && (
        <div
          className={clsx(
            "absolute top-0 left-0 h-full w-full bg-no-repeat bg-cover z-10 rounded-[inherit]",
            placeholderClassName
          )}
          style={{ backgroundImage: `url(${placeholder})` }}
        />
      )}
    </>
  );
}
