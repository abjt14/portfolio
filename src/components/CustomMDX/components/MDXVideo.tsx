import clsx from "clsx";
import VideoWithPlaceholder from "@/components/VideoWithPlaceholder";

type MDXVideoProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  poster?: string;
  className?: string;
  parentClassName?: string;
};

export default function MDXVideo(props: MDXVideoProps) {
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
          "w-full h-auto rounded-xl border border-neutral-300 dark:border-neutral-850 relative overflow-hidden clip-radius",
          props.className ? props.className : ""
        )}
        style={{
          aspectRatio,
        }}
      >
        <VideoWithPlaceholder
          src={props.src}
          width={props.width}
          height={props.height}
          placeholder={props.poster}
          placeholderClassName="blur-xl"
          className="w-full h-auto"
        />
      </div>
      <p className="text-xs text-neutral-500 text-center text-balance pt-2 px-2">
        {props.alt}
      </p>
    </div>
  );
}
