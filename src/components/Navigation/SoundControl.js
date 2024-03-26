"use client";

import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { SoundContext } from "@/context/SoundProvider";
import useSound from "use-sound";

export default function SoundControl() {
  const { soundEnabled, setSoundEnabled } = React.useContext(SoundContext);

  const [playSwitchOn] = useSound("/sounds/sound-switch/on.mp3", {
    volume: 0.5,
  });
  const [playSwitchOff] = useSound("/sounds/sound-switch/off.mp3", {
    volume: 0.5,
  });

  function handleClick() {
    setSoundEnabled((prev) => !prev);
    if (soundEnabled) {
      playSwitchOff();
    } else {
      playSwitchOn();
    }
  }

  return (
    <div className="hidden sm:block bg-neutral-200 dark:bg-neutral-800 p-px rounded-full relative shadow-sm shadow-neutral-400 dark:shadow-black z-0 shrink-0">
      <button
        className="bg-gradient-to-tl from-neutral-50 dark:from-neutral-925 via-neutral-200 dark:via-neutral-900 to-neutral-50 dark:to-neutral-925 p-2 rounded-full relative z-20 group outline-none focus-visible:ring-1 ring-neutral-950 dark:ring-neutral-50"
        aria-label="Sound Control"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 18"
          fill="none"
          className={clsx(
            "h-6 w-6 m-px text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-neutral-50 group-active:scale-75 transition-all duration-150",
            "drop-shadow-none group-hover:[filter:drop-shadow(0px_0px_4px_rgba(10,_10,_10,_.5))] dark:group-hover:[filter:drop-shadow(0px_0px_4px_rgba(250,250,250,1))]"
          )}
          style={{
            transform: "translateZ(0)",
          }}
        >
          <motion.path
            d="M8.25 3.75L4.5 6.75H1.5V11.25H4.5L8.25 14.25V3.75Z"
            fill="currentColor"
            initial={false}
            animate={{
              x: soundEnabled ? [0, 0, -1.5, 0, 0] : 0,
            }}
          />
          <motion.path
            d=" M11.655 6.34501 C12.358 7.04824 12.753 8.00189 12.753 8.99626 C12.753 9.99063 12.358 10.9443 11.655 11.6475 "
            stroke="currentColor"
            initial={false}
            animate={{
              strokeOpacity: soundEnabled ? 0.75 : 0.25,
              x: soundEnabled ? [0, 1, 0] : 0,
            }}
            transition={{
              delay: soundEnabled ? 0 : 0.15,
            }}
          />
          <motion.path
            d=" M14.3025 3.69751 C15.7086 5.10397 16.4984 7.01128 16.4984 9.00001 C16.4984 10.9887 15.7086 12.8961 14.3025 14.3025 "
            stroke="currentColor"
            initial={false}
            animate={{
              strokeOpacity: soundEnabled ? 1 : 0.25,
              x: soundEnabled ? [0, 1, 0] : 0,
            }}
            transition={{
              delay: soundEnabled ? 0.15 : 0,
            }}
          />
        </svg>
      </button>
      <div className="absolute top-0 left-0 h-full w-full rounded-full bg-gradient-to-br from-transparent from-30% via-neutral-300 dark:via-neutral-750 to-60% to-transparent -z-10" />
    </div>
  );
}
