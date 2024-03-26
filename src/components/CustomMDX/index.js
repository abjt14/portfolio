import path from "path";
import fs from "fs";
import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import "./styles.css";
import Link from "next/link";
import MDXImage from "./components/MDXImage";
import MDXVideo from "./components/MDXVideo";
import Tooltip from "./components/Tooltip";
import MDXHeading from "./components/MDXHeading";
import DashedLine from "../DashedLine";
import MDXCode from "./components/MDXCode";

const components = {
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
};

function getPost(slug, type) {
  const markdownFile = fs.readFileSync(
    path.join(process.cwd(), `content/${type}/`, slug + ".mdx"),
    "utf-8"
  );
  const { frontMatter, content } = matter(markdownFile);

  return { slug, metadata: frontMatter, content };
}

export default function CustomMDX({ slug, type }) {
  const { content } = getPost(slug, type);
  return (
    <article className="w-full flex flex-col gap-2 text-neutral-700 dark:text-neutral-300 leading-7 pt-4 sm:pt-8 relative">
      <DashedLine direction="horizontal" className="top-0" />
      <MDXRemote source={content} components={components} />
    </article>
  );
}
