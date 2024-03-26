"use client";

import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ThemeContext } from "@/context/ThemeProvider";
import { SoundContext } from "@/context/SoundProvider";
import useSound from "use-sound";

export default function ThemeControl() {
  const { theme, handleChange } = React.useContext(ThemeContext);

  const { soundEnabled } = React.useContext(SoundContext);
  const [playSwitchOn] = useSound("/sounds/theme-switch/on.mp3", {
    volume: 0.5,
  });
  const [playSwitchOff] = useSound("/sounds/theme-switch/off.mp3", {
    volume: 0.5,
  });

  function handleClick() {
    handleChange();
    if (soundEnabled) {
      if (theme === "dark") {
        playSwitchOff();
      } else {
        playSwitchOn();
      }
    }
  }

  return (
    <div className="bg-neutral-200 dark:bg-neutral-800 p-px rounded-full relative shadow-sm shadow-neutral-400 dark:shadow-black z-0 shrink-0">
      <button
        className="bg-gradient-to-tl from-neutral-50 dark:from-neutral-925 via-neutral-200 dark:via-neutral-900 to-neutral-50 dark:to-neutral-925 p-2 rounded-full relative z-20 group  outline-none focus-visible:ring-1 ring-neutral-950 dark:ring-neutral-50"
        aria-label="Theme Control"
        onClick={handleClick}
      >
        <ThemeIcon theme={theme} />
      </button>
      <div className="absolute top-0 left-0 h-full w-full rounded-full bg-gradient-to-br from-transparent from-30% via-neutral-300 dark:via-neutral-750 to-60% to-transparent -z-10" />
    </div>
  );
}

function ThemeIcon({ theme }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="currentColor"
      className={clsx(
        "h-6 w-6 m-px text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-neutral-50 group-active:scale-75 transition-all duration-150",
        "drop-shadow-none group-hover:[filter:drop-shadow(0px_0px_4px_rgba(10,_10,_10,_.5))] dark:group-hover:[filter:drop-shadow(0px_0px_4px_rgba(250,250,250,1))]"
      )}
      style={{
        transform: "translateZ(0)",
      }}
    >
      <defs>
        <mask id="moon-mask">
          <rect width="100%" height="100%" fill="white" />
          <motion.circle
            fill="black"
            initial={false}
            animate={{
              cx: theme === "dark" ? 75 : 80,
              cy: theme === "dark" ? 30 : 20,
              r: theme === "dark" ? 35 : 0,
            }}
            transition={{
              duration: 0.5,
            }}
          />
        </mask>
      </defs>
      <motion.circle
        fill="currentColor"
        mask="url(#moon-mask)"
        initial={false}
        animate={{
          cx: theme === "dark" ? 52.5 : 50,
          cy: theme === "dark" ? 47.5 : 50,
          r: theme === "dark" ? 35 : 25,
        }}
      />
      <g>
        {[...Array(6)].map((_, index) => {
          const rayRadius = 6;
          return (
            <motion.circle
              key={`ray-${index}`}
              cy="50"
              fill="currentColor"
              transform={`rotate(${index * 60 + 30} 50 50)`}
              initial={false}
              animate={{
                cx: theme === "light" ? rayRadius * 2 : -rayRadius,
                r: theme === "light" ? rayRadius : 0,
                fillOpacity: theme === "light" ? 1 : 0,
                rotate: index * 60 + 30,
              }}
              transition={{
                delay: 0.025 * index,
              }}
              style={{
                originX: "50%",
                originY: "50%",
              }}
            />
          );
        })}
      </g>
    </svg>
  );
}
