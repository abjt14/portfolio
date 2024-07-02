import path from "path";
import fs from "fs";
import { MDXRemote } from "next-mdx-remote/rsc";
import "./styles.css";
import Link from "next/link";
import MDXImage from "./components/MDXImage";
import MDXVideo from "./components/MDXVideo";
import Tooltip from "./components/Tooltip";
import MDXHeading from "./components/MDXHeading";
import DashedLine from "../DashedLine";
import MDXCode from "./components/MDXCode";
import MDXComponentWrapper from "./components/MDXComponentWrapper";
import { TweetComponent } from "./components/Tweet";
import CardStack from "@/app/lab/[slug]/experiments/CardStack";
import Information from "./components/Information";

let mdxComponents = {
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
  ComponentWrapper: MDXComponentWrapper,
  Information,
};

// https://leerob.io/blog/2023#remark-and-rehype
export function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function getPost(slug, type) {
  const content = fs.readFileSync(
    path.join(process.cwd(), `content/${type}/`, slug + ".mdx"),
    "utf-8"
  );

  return content;
}

function addSlugComponents(slug) {
  let updatedComponents = mdxComponents;
  if (slug === "card-stack") {
    updatedComponents = {
      ...updatedComponents,
      CardStack,
    };
  }
  return updatedComponents;
}

export default function CustomMDX({ slug, type }) {
  const content = getPost(slug, type);

  const customComponents = addSlugComponents(slug);

  return (
    <article className="w-full flex flex-col gap-2 text-neutral-700 dark:text-neutral-200 leading-7 pt-4 sm:pt-8 relative">
      <DashedLine direction="horizontal" className="top-0" />
      <MDXRemote source={content} components={customComponents} />
    </article>
  );
}
