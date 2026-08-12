import DashedLine from "@/components/DashedLine";
import Link from "next/link";
import {
  findExperiment,
  labPageExperiments,
  type Experiment,
} from "@/data/experiments";
import ExperimentExport from "@/app/lab/[slug]/experiments/ExperimentExport";
import CustomMDX from "@/components/CustomMDX";
import ProjectLink from "@/app/lab/[slug]/components/ProjectLink";
import VideoPreview from "@/app/lab/[slug]/components/VideoPreview";
import { formatDate } from "@/helpers/date";
import TechnologiesList from "@/components/TechnologiesList";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata(
  props: PageProps<"/lab/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;

  const experiment = findExperiment(slug);
  if (!experiment) notFound();

  return {
    title: `${experiment.name} | Lab`,
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return labPageExperiments.map((experiment) => ({
    slug: experiment.slug,
  }));
}

export default async function Experiment(props: PageProps<"/lab/[slug]">) {
  const params = await props.params;
  const index = labPageExperiments.findIndex(
    (experiment) => experiment.slug === params.slug
  );
  const experiment = labPageExperiments[index];
  // unreachable while dynamicParams is false, but it narrows the destructure
  if (!experiment) notFound();

  const {
    slug,
    name,
    date,
    type,
    preview,
    mdx,
    technologies,
    href,
    attributes,
  } = experiment;

  const previousExperiment = labPageExperiments[index - 1] ?? null;
  const nextExperiment = labPageExperiments[index + 1] ?? null;

  return (
    <main className="relative w-full flex justify-center items-start sm:items-center lg:items-start pt-16 sm:pt-8 lg:pt-[9.6875rem] pb-28 lg:pb-16 px-4 sm:px-8 xl:px-0">
      <div className="max-w-screen-xl w-full h-full flex justify-center items-start">
        <div className="flex-1 hidden lg:flex justify-start items-start">
          <Link
            prefetch={true}
            href="/lab"
            target="_self"
            className="pr-2 flex items-center gap-1 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors duration-150 rounded-full outline-none focus-visible:ring-1 ring-neutral-950 dark:ring-neutral-50"
            aria-label="go to lab page"
          >
            <BackIcon />
            <span className="font-medium">Lab</span>
          </Link>
        </div>
        <div className="max-w-screen-sm w-full flex flex-col justify-start items-center gap-4 sm:gap-8 relative">
          <div className="w-full grid grid-cols-2">
            <div className="flex flex-col gap-0.5">
              <h1 className="w-full text-left text-neutral-700 dark:text-neutral-200 font-medium">
                {name}
              </h1>
              <p className="text-neutral-500 text-sm">{formatDate(date)}</p>
            </div>
            <div className="flex justify-end items-center">
              {href !== null && (
                <ProjectLink href={href.url} name={name} type={href.type} />
              )}
            </div>
          </div>
          {type === "internal" ? (
            <ExperimentExport
              slug={slug}
              desktopOnly={attributes?.pointerDeviceOnly}
            />
          ) : (
            <VideoPreview slug={slug} preview={preview.base} />
          )}
          {attributes?.pointerDeviceOnly && (
            <VideoPreview slug={slug} preview={preview.base} mobileOnly />
          )}
          <TechnologiesList technologies={technologies} label="Tech Stack" />
          {attributes?.pointerDeviceOnly && <PointerDeviceWarning />}
          {mdx && <CustomMDX slug={slug} type="lab" />}
          <PreviousNextSection
            previousExperiment={previousExperiment}
            nextExperiment={nextExperiment}
          />
        </div>
        <div className="flex-1 hidden lg:flex"></div>
      </div>
    </main>
  );
}

function BackIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="size-5"
    >
      <path
        fillRule="evenodd"
        d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PreviousNextSection({
  previousExperiment,
  nextExperiment,
}: {
  previousExperiment: Experiment | null;
  nextExperiment: Experiment | null;
}) {
  return (
    <div className="w-full flex justify-between items-start text-sm relative pt-4 sm:pt-8">
      <DashedLine direction="horizontal" className="top-0" />
      <div>
        {previousExperiment && (
          <Link
            prefetch={true}
            href={`/lab/${previousExperiment.slug}`}
            target="_self"
            className="flex flex-col gap-1 transition-colors duration-150 outline-none focus-visible:ring-1 ring-neutral-950 dark:ring-neutral-50 ring-offset-8 ring-offset-neutral-200 dark:ring-offset-neutral-925"
            aria-label={`go to previous experiment: ${previousExperiment.name}`}
          >
            <span className="text-neutral-500">Previous</span>
            <span className="text-neutral-700 dark:text-neutral-300 font-medium">
              {previousExperiment.name}
            </span>
          </Link>
        )}
      </div>
      <div>
        {nextExperiment && (
          <Link
            prefetch={true}
            href={`/lab/${nextExperiment.slug}`}
            target="_self"
            className="flex flex-col gap-1 text-right transition-colors duration-150 outline-none focus-visible:ring-1 ring-neutral-950 dark:ring-neutral-50 ring-offset-8 ring-offset-neutral-200 dark:ring-offset-neutral-925"
            aria-label={`go to next experiment: ${nextExperiment.name}`}
          >
            <span className="text-neutral-500">Next</span>
            <span className="text-neutral-700 dark:text-neutral-300 font-medium">
              {nextExperiment.name}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

function PointerDeviceWarning() {
  return (
    <div className="flex justify-start items-center gap-1 sm:hidden w-full bg-yellow-400 bg-opacity-25 dark:bg-yellow-700 dark:bg-opacity-20 border border-amber-700 border-opacity-15 text-yellow-700 dark:text-yellow-500 text-sm p-2 rounded-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.25}
        stroke="currentColor"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        />
      </svg>

      <span> This demo requires a pointer device.</span>
    </div>
  );
}
