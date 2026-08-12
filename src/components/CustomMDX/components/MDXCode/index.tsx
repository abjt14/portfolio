import React from "react";
import { createHighlighter, type Highlighter } from "shiki";
import { code_theme_dark, code_theme_light } from "./code_theme";

// Slugs, not display names — shiki copies the theme name straight into the
// wrapper's class attribute, so spaces would split into bogus classes.
const THEME_LIGHT = "lambda-whiteout";
const THEME_DARK = "lambda-blackout";

// Only the languages actually used across content/lab/*.mdx. Anything else
// falls back to plaintext rather than throwing on a missing grammar.
const LANGS = ["jsx", "js", "css"];

// createHighlighter loads grammars + themes, so it must not run per code block.
let highlighterPromise: Promise<Highlighter> | undefined;
function getHighlighter() {
  highlighterPromise ??= createHighlighter({
    themes: [code_theme_light, code_theme_dark],
    langs: LANGS,
  });
  return highlighterPromise;
}

// MDX renders ```jsx as <pre><code className="language-jsx">…</code></pre>,
// so `children` is the <code> element rather than the raw source.
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
    // emit both theme's variables so the manual toggle can switch via CSS
    defaultColor: false,
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
