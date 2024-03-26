import clsx from "clsx";
import Image from "next/image";

export default function MDXImage(props) {
  return (
    <div
      className={clsx(
        "w-full h-auto flex flex-col justify-center items-center my-4",
        props.wrapperClassName
      )}
    >
      <Image
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
        className={clsx(
          "w-full h-auto rounded-xl border border-neutral-300 dark:border-neutral-850",
          props.className
        )}
        loading="lazy"
      />
      <p className="text-xs text-neutral-500 text-center text-balance pt-2 px-2">
        {props.alt}
      </p>
    </div>
  );
}
