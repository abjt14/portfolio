"use client";

import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { ThemeContext } from "@/context/ThemeProvider";

export default function RadioInput() {
  const checkboxItems = [
    { name: "Next.js", value: "nextjs" },
    { name: "SvelteKit", value: "sveltekit" },
    { name: "Nuxt.js", value: "nuxtjs" },
    { name: "Remix", value: "remix" },
  ];

  const [spirit, setSpirit] = React.useState("nextjs");
  const pillId = React.useId();

  return (
    <>
      <div className="relative z-10">
        {checkboxItems.map((item, index) => {
          return (
            <CustomRadio
              key={index}
              name={item.name}
              value={item.value}
              checked={item.value === spirit}
              handleChange={(e) => setSpirit(e.target.value)}
              pillId={pillId}
            />
          );
        })}
        <div
          className={clsx(
            "absolute top-1/2 left-[calc(.475rem-.15px)] -translate-y-1/2 h-[calc(100%+6rem)] w-px z-0 pointer-events-none",
            "[background:linear-gradient(0deg,rgba(212,211,210,0)_0%,rgba(212,211,210,0.5)_20%,rgba(212,211,210,0.5)_80%,rgba(212,211,210,0)_100%)]",
            "dark:[background:linear-gradient(0deg,rgba(38,38,38,0)_0%,rgba(38,38,38,0.5)_20%,rgba(38,38,38,0.5)_80%,rgba(38,38,38,0)_100%)]"
          )}
        />
      </div>
      <div className="absolute top-0 left-0 h-full w-full">
        <SVGBackground
          activeIndex={checkboxItems.findIndex((item) => item.value === spirit)}
        />
      </div>
    </>
  );
}

function CustomRadio({ value, name, checked, handleChange, pillId }) {
  return (
    <div className="flex gap-0 justify-start items-center py-2">
      <div
        className={clsx(
          "flex justify-center items-center relative",
          checked ? "z-10" : "z-20"
        )}
      >
        <input
          type="radio"
          name="radio"
          id={value}
          value={value}
          checked={checked}
          onChange={handleChange}
          className="size-4 rounded-full opacity-0 z-20 cursor-pointer"
        />
        {checked && <RadioPill pillId={pillId} />}
        <RadioBrackets checked={checked} />
      </div>
      <CustomLabel value={value} name={name} checked={checked} />
    </div>
  );
}

function RadioPill({ pillId }) {
  return (
    <div>
      <motion.div
        layoutId={pillId + 1}
        className="absolute top-0 left-0 h-full w-full flex justify-center items-center z-30 pointer-events-none"
        transition={{
          type: "spring",
          stiffness: 75,
          damping: 12.5,
        }}
      >
        <div
          className="w-[.375rem] h-[.375rem] bg-black dark:bg-white relative z-20 [filter:drop-shadow(0px_0px_4px_black)] dark:[filter:drop-shadow(0px_0px_4px_white)]"
          style={{
            transform: "translateZ(0)",
          }}
        ></div>
      </motion.div>
      <motion.div
        layoutId={pillId + 2}
        className="absolute top-0 left-0 h-full w-full flex justify-center items-center z-20 pointer-events-none"
        transition={{
          type: "spring",
          stiffness: 75,
          damping: 17.5,
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-px rounded-full"
          style={{
            boxShadow: "0px 0px 30px 5px white",
            transform: "translate3d(-50%, -50%, 0)",
          }}
        ></div>
      </motion.div>
      <motion.div
        layoutId={pillId + 3}
        className="absolute top-0 left-0 h-full w-full flex justify-center items-center z-10 pointer-events-none"
        transition={{
          type: "spring",
          stiffness: 75,
          damping: 15,
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[calc(100%+2rem)] bg-gradient-to-b from-transparent via-neutral-500 to-transparent"></div>
      </motion.div>
    </div>
  );
}

function RadioBrackets({ checked }) {
  const { theme, themeSwitching } = React.useContext(ThemeContext);

  let color = "";
  let filter = "";
  if (theme === "light") {
    if (checked) {
      // neutral-950
      color = "rgb(10, 9, 7)";
      filter = "drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.75))";
    } else {
      // neutral-400
      color = "rgb(115, 114, 112)";
      filter = "drop-shadow(0px 0px 0px transparent)";
    }
  } else if (theme === "dark") {
    if (checked) {
      // neutral-50
      color = "rgb(250, 249, 247)";
      filter = "drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.75))";
    } else {
      // neutral-600
      color = "rgb(82, 81, 79)";
      filter = "drop-shadow(0px 0px 0px transparent)";
    }
  }

  return (
    <motion.div
      className="absolute top-0 left-0 h-full w-full flex justify-between items-center z-10 pointer-events-none"
      animate={{
        color,
        filter,
      }}
      transition={{
        duration: themeSwitching ? 0 : checked ? 0.6 : 0.3,
      }}
      initial={false}
      style={{
        transform: "translateZ(0)",
      }}
    >
      <motion.span
        className="relative"
        animate={{
          left: checked ? [0, -3, -3, -3, -3, 0, 0, 0] : 0,
        }}
        transition={{
          duration: themeSwitching ? 0 : checked ? 2 : 0.3,
        }}
        initial={false}
      >
        &#10098;
      </motion.span>
      <motion.span
        className="relative"
        animate={{
          right: checked ? [0, -3, -3, -3, -3, 0, 0, 0] : -0,
        }}
        transition={{
          duration: themeSwitching ? 0 : checked ? 2 : 0.3,
        }}
        initial={false}
      >
        &#10099;
      </motion.span>
    </motion.div>
  );
}

function CustomLabel({ value, name, checked }) {
  const { theme, themeSwitching } = React.useContext(ThemeContext);

  let color = "";
  let filter = "";
  if (theme === "light") {
    if (checked) {
      // neutral-950
      color = "rgb(10, 9, 7)";
      filter = "drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.75))";
    } else {
      // neutral-400
      color = "rgb(115, 114, 112)";
      filter = "drop-shadow(0px 0px 0px transparent)";
    }
  } else if (theme === "dark") {
    if (checked) {
      // neutral-50
      color = "rgb(250, 249, 247)";
      filter = "drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.75))";
    } else {
      // neutral-600
      color = "rgb(82, 81, 79)";
      filter = "drop-shadow(0px 0px 0px transparent)";
    }
  }

  return (
    <motion.label
      htmlFor={value}
      className="flex-1 px-3 flex justify-start items-center z-20 cursor-pointer"
      initial={false}
    >
      {name.split("").map((letter, index) => {
        return (
          <motion.span
            key={index}
            className="relative inline-block"
            animate={{
              color,
              filter,
            }}
            transition={{
              duration: themeSwitching ? 0 : checked ? 0.6 : 0.3,
              delay: themeSwitching
                ? 0
                : checked
                ? index * 0.06 + 0.3
                : index * 0.06,
            }}
            initial={false}
            style={{
              transform: "translateZ(0)",
            }}
          >
            {letter}
          </motion.span>
        );
      })}
    </motion.label>
  );
}

function SVGBackground({ activeIndex }) {
  const motionTransition = {
    type: "spring",
    stiffness: 75,
    damping: 25,
  };

  const gradientTopOffset = 31.13;
  const gradientHeight = 10;
  const increment = 12.58;
  const gradientTop = activeIndex * increment + gradientTopOffset;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      className="invert dark:invert-0"
    >
      <defs>
        <linearGradient id="linear-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <motion.stop
            stopColor="rgba(250, 250, 250, 0.06125)"
            initial={false}
            animate={{
              offset: gradientTop - gradientHeight + "%",
            }}
            transition={motionTransition}
          />
          <motion.stop
            stopColor="rgba(250, 250, 250, 0.5)"
            initial={false}
            animate={{
              offset: gradientTop + "%",
            }}
            transition={motionTransition}
          />
          <motion.stop
            stopColor="rgba(250, 250, 250, 0.06125)"
            initial={false}
            animate={{
              offset: gradientTop + gradientHeight + "%",
            }}
            transition={motionTransition}
          />
        </linearGradient>
        <pattern
          id="dots-pattern"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill="white" />
        </pattern>
        <mask id="mask-dots">
          <rect width="100%" height="100%" fill="url(#dots-pattern)" />
        </mask>
        <mask id="mask-dots-on-linear">
          <rect
            width="100%"
            height="100%"
            fill="url(#linear-gradient)"
            mask="url(#mask-dots)"
          />
        </mask>
        <radialGradient
          id="radial-gradient"
          cx="50%"
          cy="50%"
          r="40%"
          fx="50%"
          fy="50%"
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="rgba(250, 250, 250, 0.125)" />
        </radialGradient>
        <pattern
          id="radial-pattern"
          x="0"
          y="0"
          width="100%"
          height="100%"
          patternUnits="userSpaceOnUse"
        >
          <rect
            width="100%"
            height="100%"
            fill="url(#radial-gradient)"
            className="scale-x-[0.66] scale-y-[2] translate-x-[16.5%] -translate-y-1/2"
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#radial-pattern)"
        mask="url(#mask-dots-on-linear)"
      />
    </svg>
  );
}
