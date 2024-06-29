import clsx from "clsx";

export default function MDXVideo(props) {
  const aspectRatio = `${props.width} / ${props.height}`;
  return (
    <div
      className={clsx(
        "w-full h-auto flex flex-col justify-center items-center my-2 sm:my-6",
        props.parentClassName ? props.parentClassName : ""
      )}
    >
      <div
        className={clsx(
          "w-full h-auto rounded-xl border border-neutral-300 dark:border-neutral-850 relative overflow-hidden",
          props.className ? props.className : ""
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
          src={props.src}
          width={props.width}
          height={props.height}
          type="video/mp4"
          className="w-full h-auto z-20 relative"
          loading="lazy"
          style={{
            aspectRatio,
          }}
        />
        {props.poster && (
          <div
            className="absolute top-0 left-0 h-full w-full bg-no-repeat bg-cover blur-xl z-10"
            style={{
              backgroundImage: `url(${props.poster})`,
              aspectRatio,
            }}
          />
        )}
      </div>
      <p className="text-xs text-neutral-500 text-center text-balance pt-2 px-2">
        {props.alt}
      </p>
    </div>
  );
}
