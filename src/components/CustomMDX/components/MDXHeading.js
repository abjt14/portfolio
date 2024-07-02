import React from "react";
import { slugify } from "../index";

export default function MDXHeading(level) {
  const HeadingComponent = ({ children }) => {
    const slug = slugify(children);
    return React.createElement(
      `h${level}`,
      {
        id: slug,
      },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
          "aria-label": `go to ${children} section`,
        }),
      ],
      children
    );
  };
  HeadingComponent.displayName = `mdx_h${level}`;

  return HeadingComponent;
}
