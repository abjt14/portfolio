import Link from "next/link";
import MenuWrapper from "./MenuWrapper";
import clsx from "clsx";

export default function SocialMenu() {
  return (
    <MenuWrapper showOnMobile={false}>
      <div className="flex items-center justify-between gap-2 sm:gap-4 rounded-full py-1 px-3 sm:px-4 text-neutral-600 dark:text-neutral-400">
        <LinkWrapper href="https://github.com/abjt14" label="github">
          <GithubIcon />
        </LinkWrapper>
        <LinkWrapper href="https://codepen.io/abjt14" label="codepen">
          <CodePenIcon />
        </LinkWrapper>
        <LinkWrapper href="https://x.com/abjt14" label="x">
          <XIcon />
        </LinkWrapper>
        <LinkWrapper
          href="https://bsky.app/profile/abjt.bsky.social"
          label="bluesky"
        >
          <BlueskyIcon />
        </LinkWrapper>
        <BottomStaticGlare />
      </div>
    </MenuWrapper>
  );
}

function LinkWrapper({ children, href, label }) {
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

function GithubIcon() {
  return (
    <svg
      className={clsx(
        "size-4 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-neutral-50 transition-all duration-150 pointer-events-none",
        "drop-shadow-none group-hover:[filter:drop-shadow(0px_0px_4px_rgba(10,_10,_10,_.5))] dark:group-hover:[filter:drop-shadow(0px_0px_4px_rgba(250,250,250,1))]"
      )}
      fill="currentColor"
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: "translateZ(0)",
      }}
    >
      <title>GitHub</title>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      className={clsx(
        "size-4 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-neutral-50 transition-all duration-150",
        "drop-shadow-none group-hover:[filter:drop-shadow(0px_0px_4px_rgba(10,_10,_10,_.5))] dark:group-hover:[filter:drop-shadow(0px_0px_4px_rgba(250,250,250,1))]"
      )}
      fill="currentColor"
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: "translateZ(0)",
      }}
    >
      <title>LinkedIn</title>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function CodePenIcon() {
  return (
    <svg
      className={clsx(
        "size-4 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-neutral-50 transition-all duration-150",
        "drop-shadow-none group-hover:[filter:drop-shadow(0px_0px_4px_rgba(10,_10,_10,_.5))] dark:group-hover:[filter:drop-shadow(0px_0px_4px_rgba(250,250,250,1))]"
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      style={{
        transform: "translateZ(0)",
      }}
      strokeLinejoin="round"
      role="img"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>CodePen</title>
      <path d="M3.06 41.732L32 60.932l28.94-19.2V22.268L32 3.068l-28.94 19.2zm57.878 0L32 22.268 3.06 41.732m0-19.463L32 41.47l28.94-19.2M32 3.068v19.2m0 19.463v19.2" />
    </svg>
  );
}

function ArtStationIcon() {
  return (
    <svg
      className={clsx(
        "size-4 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-neutral-50 transition-all duration-150",
        "drop-shadow-none group-hover:[filter:drop-shadow(0px_0px_4px_rgba(10,_10,_10,_.5))] dark:group-hover:[filter:drop-shadow(0px_0px_4px_rgba(250,250,250,1))]"
      )}
      fill="currentColor"
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: "translateZ(0)",
      }}
    >
      <title>ArtStation</title>
      <path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24 .025c0-.484-.143-.935-.388-1.314L15.728 2.728a2.424 2.424 0 0 0-2.142-1.289H9.419L21.598 22.54l1.92-3.325c.378-.637.482-.919.482-1.467zm-11.129-3.462L7.428 4.858l-5.444 9.428h10.887z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      className={clsx(
        "size-4 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-neutral-50 transition-all duration-150",
        "drop-shadow-none group-hover:[filter:drop-shadow(0px_0px_4px_rgba(10,_10,_10,_.5))] dark:group-hover:[filter:drop-shadow(0px_0px_4px_rgba(250,250,250,1))]"
      )}
      fill="currentColor"
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: "translateZ(0)",
      }}
    >
      <title>X</title>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function BlueskyIcon() {
  return (
    <svg
      className={clsx(
        "size-4 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-neutral-50 transition-all duration-150",
        "drop-shadow-none group-hover:[filter:drop-shadow(0px_0px_4px_rgba(10,_10,_10,_.5))] dark:group-hover:[filter:drop-shadow(0px_0px_4px_rgba(250,250,250,1))]"
      )}
      fill="currentColor"
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: "translateZ(0)",
      }}
    >
      <title>Bluesky</title>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M5.202 2.92198C7.9545 4.98748 10.914 9.17698 12 11.424C13.0875 9.17698 16.047 4.98898 18.798 2.92198C20.7825 1.43248 24 0.278976 24 3.94798C24 4.68148 23.58 10.1055 23.334 10.986C22.476 14.046 19.3545 14.8275 16.578 14.355C21.432 15.1815 22.668 17.9175 19.9995 20.655C14.9355 25.851 12.7215 19.35 12.1545 17.685C12.0495 17.379 12 17.235 12 17.358C12 17.2365 11.9505 17.379 11.847 17.685C11.2785 19.35 9.0645 25.851 4.0005 20.655C1.3335 17.9175 2.568 15.18 7.4205 14.355C4.6455 14.8275 1.5225 14.0475 0.666 10.986C0.42 10.1055 0 4.67998 0 3.94798C0 0.278976 3.2175 1.43248 5.202 2.92198Z"
      />
    </svg>
  );
}

function BottomStaticGlare() {
  return (
    <div className="absolute top-full left-0 h-px w-1/2 bg-gradient-to-r from-transparent from-20% via-neutral-300 dark:via-neutral-700 to-transparent" />
  );
}
