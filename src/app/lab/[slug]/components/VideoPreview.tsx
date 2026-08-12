import clsx from "clsx";
import VideoWithPlaceholder from "@/components/VideoWithPlaceholder";
import type { PreviewMedia } from "@/data/experiments";

export default function VideoPreview({
  slug,
  preview,
  mobileOnly = false,
}: {
  slug: string;
  preview: PreviewMedia;
  mobileOnly?: boolean;
}) {
  const { width, height, placeholder } = preview;
  const aspectRatio = width / height;
  return (
    <div
      className={clsx(
        mobileOnly ? "block sm:hidden" : "block",
        "w-full relative overflow-hidden clip-radius rounded-xl border border-neutral-300 dark:border-neutral-850"
      )}
      style={{
        aspectRatio,
      }}
    >
      <VideoWithPlaceholder
        src={`/lab/${slug}/base.mp4`}
        width={width}
        height={height}
        placeholder={placeholder}
        placeholderClassName="blur-xl"
        preload="auto"
        className="w-full h-auto"
      />
    </div>
  );
}
