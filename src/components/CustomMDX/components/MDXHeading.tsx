import React from "react";
import { slugify } from "../index";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export default function MDXHeading(level: HeadingLevel) {
  const Tag = `h${level}` as const;

  const HeadingComponent = ({ children }: { children?: React.ReactNode }) => {
    const slug = slugify(children);
    return (
      <Tag id={slug}>
        <a href={`#${slug}`} className="anchor" aria-label={`go to ${slug} section`} />
        {children}
      </Tag>
    );
  };
  HeadingComponent.displayName = `mdx_h${level}`;

  return HeadingComponent;
}
