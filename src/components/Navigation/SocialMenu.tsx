import Link from "next/link";
import MenuWrapper from "./MenuWrapper";
import clsx from "clsx";
import { CodePenIcon, GithubIcon, XIcon } from "@/components/icons";

const navIconClass = clsx(
  "size-4 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-neutral-50 transition-all duration-150",
  "drop-shadow-none group-hover:[filter:drop-shadow(0px_0px_4px_rgba(10,_10,_10,_.5))] dark:group-hover:[filter:drop-shadow(0px_0px_4px_rgba(250,250,250,1))]"
);

export default function SocialMenu() {
  return (
    <MenuWrapper showOnMobile={false}>
      <div className="flex items-center justify-between gap-2 sm:gap-4 rounded-full py-1 px-3 sm:px-4 text-neutral-600 dark:text-neutral-400">
        <LinkWrapper href="https://x.com/abjt14" label="x">
          <XIcon className={navIconClass} />
        </LinkWrapper>
        <LinkWrapper href="https://github.com/abjt14" label="github">
          <GithubIcon className={navIconClass} />
        </LinkWrapper>
        <LinkWrapper href="https://codepen.io/abjt14" label="codepen">
          <CodePenIcon className={navIconClass} />
        </LinkWrapper>
        <BottomStaticGlare />
      </div>
    </MenuWrapper>
  );
}

function LinkWrapper({
  children,
  href,
  label,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="p-px relative rounded-full shadow-sm shadow-neutral-400 dark:shadow-black overflow-hidden group outline-none focus-visible:ring-1 ring-neutral-500 dark:ring-neutral-50"
      aria-label={label}
    >
      <div className="bg-gradient-to-tl from-neutral-50 dark:from-neutral-925 via-neutral-200 dark:via-neutral-800 to-neutral-50 dark:to-neutral-925 p-2 rounded-full z-20 relative">
        {children}
      </div>
      <div className="absolute top-0 left-0 h-full w-full rounded-full z-10 bg-gradient-to-tr from-neutral-100 dark:from-neutral-900 via-neutral-200 dark:via-neutral-800 to-neutral-100 dark:to-neutral-900 pointer-events-none" />
    </Link>
  );
}

function BottomStaticGlare() {
  return (
    <div className="absolute top-full left-0 h-px w-1/2 bg-gradient-to-r from-transparent from-20% via-neutral-300 dark:via-neutral-700 to-transparent" />
  );
}
