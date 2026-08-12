import React from "react";
import { createHighlighter, type Highlighter } from "shiki";
import { code_theme_dark, code_theme_light } from "./code_theme";

const THEME_LIGHT = "lambda-whiteout";
const THEME_DARK = "lambda-blackout";

const LANGS = ["jsx", "js", "css"];

let highlighterPromise: Promise<Highlighter> | undefined;
function getHighlighter() {
  highlighterPromise ??= createHighlighter({
    themes: [code_theme_light, code_theme_dark],
    langs: LANGS,
  });
  return highlighterPromise;
}

function readCodeElement(children: React.ReactNode): { code: string; lang: string } {
  if (
    !React.isValidElement<{ className?: string; children?: React.ReactNode }>(
      children
    )
  ) {
    return { code: typeof children === "string" ? children : "", lang: "text" };
  }

  const { className, children: content } = children.props;
  const lang = className?.match(/language-(\w+)/)?.[1] ?? "text";

  return { code: typeof content === "string" ? content : "", lang };
}

export default async function MDXCode({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { code, lang } = readCodeElement(children);

  const highlighter = await getHighlighter();
  const html = highlighter.codeToHtml(code.replace(/\n$/, ""), {
    lang: LANGS.includes(lang) ? lang : "text",
    themes: { light: THEME_LIGHT, dark: THEME_DARK },
    defaultColor: false,
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
