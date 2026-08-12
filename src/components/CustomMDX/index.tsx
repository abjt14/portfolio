import path from "path";
import fs from "fs";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";

type MDXComponents = NonNullable<MDXRemoteProps["components"]>;
import "./styles.css";
import Link from "next/link";
import MDXImage from "./components/MDXImage";
import MDXVideo from "./components/MDXVideo";
import Tooltip from "./components/Tooltip";
import MDXHeading from "./components/MDXHeading";
import DashedLine from "../DashedLine";
import MDXCode from "./components/MDXCode";
import ExperimentFrame from "@/components/ExperimentFrame";
import { TweetComponent } from "./components/Tweet";
import { getExperimentDemo } from "@/app/lab/[slug]/experiments/registry";
import Information from "./components/Information";

const mdxComponents: MDXComponents = {
  h1: MDXHeading(1),
  h2: MDXHeading(2),
  h3: MDXHeading(3),
  h4: MDXHeading(4),
  h5: MDXHeading(5),
  h6: MDXHeading(6),
  Link,
  MDXImage,
  MDXVideo,
  Tooltip,
  pre: MDXCode,
  Tweet: TweetComponent,
  ComponentWrapper: ExperimentFrame,
  Information,
};

type ContentType = "lab";

// https://leerob.io/blog/2023#remark-and-rehype
export function slugify(str: unknown): string {
  return String(str)
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function getPost(slug: string, type: ContentType) {
  const file = path.join(process.cwd(), `content/${type}/`, slug + ".mdx");

  if (!fs.existsSync(file)) {
    throw new Error(
      `Experiment "${slug}" is marked mdx: true but content/${type}/${slug}.mdx does not exist.`
    );
  }

  return fs.readFileSync(file, "utf-8");
}

function addSlugComponents(slug: string): MDXComponents {
  const demo = getExperimentDemo(slug);
  if (!demo?.mdxTag) return mdxComponents;

  return { ...mdxComponents, [demo.mdxTag]: demo.Component };
}

export default function CustomMDX({
  slug,
  type,
}: {
  slug: string;
  type: ContentType;
}) {
  const content = getPost(slug, type);

  const customComponents = addSlugComponents(slug);

  return (
    <article className="w-full flex flex-col gap-2 text-neutral-700 dark:text-neutral-200 leading-7 pt-4 sm:pt-8 relative">
      <DashedLine direction="horizontal" className="top-0" />
      <MDXRemote
        source={content}
        components={customComponents}
        options={{
          blockJS: false,
        }}
      />
    </article>
  );
}
