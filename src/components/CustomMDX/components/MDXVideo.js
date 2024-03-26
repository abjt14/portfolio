export default function MDXVideo(props) {
  return (
    <div className="w-full h-auto flex flex-col justify-center items-center my-2 sm:my-6">
      <div
        className="w-full h-auto rounded-xl border border-neutral-300 dark:border-neutral-850 relative overflow-hidden"
        style={{
          aspectRatio: `${props.width} / ${props.height}`,
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
          className="w-full h-auto"
          loading="lazy"
          style={{
            aspectRatio: `${props.width} / ${props.height}`,
          }}
        />
      </div>
      <p className="text-xs text-neutral-500 text-center text-balance pt-2 px-2">
        {props.alt}
      </p>
    </div>
  );
}
