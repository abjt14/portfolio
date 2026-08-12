import Link from "next/link";
import {
  ArtStationIcon,
  CodePenIcon,
  GithubIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/icons";

export type SocialType =
  | "github"
  | "linkedin"
  | "codepen"
  | "artstation"
  | "x";

export default function MobileSocialLink({ type }: { type: SocialType }) {
  let href = "";
  let label = "";

  switch (type) {
    case "github":
      href = "https://github.com/abjt14";
      label = "GitHub";
      break;
    case "linkedin":
      href = "https://www.linkedin.com/in/abjt14/";
      label = "LinkedIn";
      break;
    case "codepen":
      href = "https://codepen.io/abjt14";
      label = "CodePen";
      break;
    case "artstation":
      href = "https://www.artstation.com/abjt14";
      label = "ArtStation";
      break;
    case "x":
      href = "https://x.com/abjt14";
      label = "X";
      break;
  }

  return (
    <Link
      href={href}
      target="_blank"
      className="h-full w-full relative flex justify-center items-center text-neutral-700 dark:text-neutral-200"
      aria-label={label}
    >
      {type === "github" && <GithubIcon className="size-8" />}
      {type === "linkedin" && <LinkedInIcon className="size-8" />}
      {type === "codepen" && <CodePenIcon className="size-8" />}
      {type === "artstation" && <ArtStationIcon className="size-8" />}
      {type === "x" && <XIcon className="size-8" />}
    </Link>
  );
}
