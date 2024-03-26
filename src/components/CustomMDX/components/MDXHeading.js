import React from "react";

export default function MDXHeading(level) {
  const HeadingComponent = ({ children }) => {
    return React.createElement(
      `h${level}`,
      {
        id: slugify(children),
      },
      children
    );
  };
  HeadingComponent.displayName = `mdx_h${level}`;

  return HeadingComponent;
}

// https://leerob.io/blog/2023#remark-and-rehype
function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}
