"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";
import MenuWrapper from "./MenuWrapper";
import { usePathname } from "next/navigation";
import ConsumingStarsOffscreenCanvas from "./ConsumingStarsOffscreenCanvas";

export default function MainMenu() {
  const links = React.useMemo(
    () => [
      {
        href: "/",
        label: "Home",
      },
      {
        href: "/lab",
        label: "Lab",
      },
      {
        href: "/about",
        label: "About",
      },
    ],
    []
  );

  const path = usePathname();
  const isActive = React.useCallback(
    (href) => {
      if (path === "/") {
        return href === path;
      }
      if (href !== links[0].href) {
        return path.includes(href);
      }
    },
    [links, path]
  );

  const linkLightLayoutId = React.useId();
  const environment = process.env.NODE_ENV;

  return (
    <MenuWrapper>
      <div className="flex items-center justify-between rounded-full w-full sm:w-fit">
        {links.map((link, index) => (
          <Link
            key={index}
            prefetch={true}
            href={link.href}
            className={clsx(
              "relative py-[calc(.5rem+1px)] px-4 hover:text-neutral-950 dark:hover:text-neutral-50 focus-visible:text-neutral-950 dark:focus-visible:text-neutral-50 duration-150 transition-colors rounded-full group outline-none",
              isActive(link.href)
                ? "text-neutral-950 dark:text-neutral-50"
                : "text-neutral-500 dark:text-neutral-400"
            )}
          >
            <span
              className={clsx(
                "text-sm sm:text-sm z-30",
                "[text-shadow:_0_0_1.25rem_rgba(10,10,10,0)] dark:[text-shadow:0_0_0.75rem_rgba(250,250,250,0)]",
                "group-hover:[text-shadow:_0_0_1.25rem_rgba(10,10,10,1)] dark:group-hover:[text-shadow:0_0_0.75rem_rgba(250,250,250,1)]",
                "transition-[text-shadow] duration-300",
                isActive(link.href) &&
                  "[text-shadow:_0_0_1.25rem_rgba(10,10,10,1)] dark:[text-shadow:0_0_0.75rem_rgba(250,250,250,1)]"
              )}
            >
              {link.label}
            </span>
            <motion.div
              layout
              layoutRoot
              className="flex justify-center items-center absolute top-0 left-1/2 -translate-x-1/2 h-full z-20 pointer-events-none"
            >
              {isActive(link.href) && (
                <>
                  <LinkLight layoutId={linkLightLayoutId + "link_light"} />
                  <ConsumingStarsWrapper environment={environment} />
                </>
              )}
            </motion.div>
            {isActive(link.href) && (
              <motion.div
                key={linkLightLayoutId + "link_background"}
                layoutId={linkLightLayoutId + "link_background"}
                layout
                className={clsx(
                  "absolute top-0 left-0 w-full h-[calc(100%-.5rem)] my-1 bg-[rgba(0,0,0,0.025)] dark:bg-[rgba(255,255,255,0.025)] border border-neutral-200 dark:border-neutral-800 rounded-full"
                )}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  damping: 11.5,
                }}
                style={{
                  originY: "top",
                }}
              />
            )}
          </Link>
        ))}
        <LinkGlare links={links} isActive={isActive} />
        <TopStaticGlare />
      </div>
    </MenuWrapper>
  );
}

function ConsumingStarsWrapper({ environment = "production" }) {
  return (
    <div className="absolute h-32 w-32 -top-1/4">
      <ConsumingStarsOffscreenCanvas environment={environment} />
    </div>
  );
}

function LinkLight({ layoutId }) {
  return (
    <motion.div
      key={layoutId}
      layoutId={layoutId}
      layout
      className={clsx(
        "absolute h-36 w-36 top-[-1rem] pointer-events-none blur-lg",
        "bg-[radial-gradient(circle,rgba(0,0,0,0.33)_0%,transparent_50%)]",
        "dark:bg-[radial-gradient(circle,rgba(255,255,255,0.5)_0%,transparent_50%)]"
      )}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 12.5,
      }}
      style={{
        originY: "top",
      }}
    />
  );
}

function LinkGlare({ links, isActive }) {
  return (
    <motion.div
      className={clsx(
        "absolute left-0 top-1/2 h-16 w-16 bg-gradient-to-r from-transparent via-black dark:via-white to-transparent blur-sm -z-10"
      )}
      initial={false}
      animate={{
        left: isActive(links[0].href)
          ? "0"
          : isActive(links[1].href)
          ? "33%"
          : isActive(links[2].href)
          ? "66%"
          : "0",
      }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 13.5,
      }}
    />
  );
}

function TopStaticGlare() {
  return (
    <div
      className={clsx(
        "absolute right-[10%] top-[-1px] h-px w-32 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent"
      )}
    />
  );
}
