"use client";

import React from "react";
import { useLongPress } from "@uidotdev/usehooks";
import { LayoutGroup, cubicBezier, motion } from "framer-motion";
import clsx from "clsx";
import { SoundContext } from "@/context/SoundProvider";
import useSound from "use-sound";

const layoutTransition = {
  type: "spring",
  damping: 20,
  stiffness: 350,
};

export default function HoldToSubmit() {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);
  const [isTriggered, setIsTriggered] = React.useState(false);
  const [showStars, setShowStars] = React.useState(false);

  const { soundEnabled } = React.useContext(SoundContext);
  const [playSucess] = useSound("/lab/hold-to-submit/sounds/success.mp3", {
    volume: 0.25,
    playbackRate: 0.5,
  });

  const handleSubmitted = React.useCallback(() => {
    setIsTriggered(true);
    setShowStars(true);
    if (soundEnabled) {
      playSucess();
    }
  }, [setIsTriggered, setShowStars, soundEnabled, playSucess]);

  function handleReset() {
    setIsTriggered(false);
    setShowStars(false);
  }

  function handleSoftBlur() {
    setIsPressed(false);
    setIsHovered(false);
  }

  const attrs = useLongPress(
    () => {
      handleSubmitted();
      handleSoftBlur();
    },
    {
      onStart: () => setIsPressed(true),
      onFinish: () => {},
      onCancel: () => setIsPressed(false),
      threshold: 1500,
    }
  );

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      handleReset();
    }, 2000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isTriggered]);

  React.useEffect(() => {
    let timeoutId;

    if (isPressed) {
      timeoutId = window.setTimeout(() => {
        handleSubmitted();
        handleSoftBlur();
      }, 1500);
    } else {
      timeoutId && window.clearTimeout(timeoutId);
    }

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [handleSubmitted, isPressed]);

  React.useEffect(() => {
    function handleKeyboardUnfocus(event) {
      if (event.key === "Escape") {
        handleSoftBlur();
      }
    }

    window.addEventListener("keydown", handleKeyboardUnfocus);

    return () => {
      window.removeEventListener("keydown", handleKeyboardUnfocus);
    };
  }, []);

  return (
    <LayoutGroup>
      <motion.div
        layout={true}
        transition={layoutTransition}
        className="w-full relative flex flex-col justify-center items-center gap-2 select-none"
      >
        <motion.button
          layout={true}
          transition={layoutTransition}
          className={clsx(
            "text-neutral-800 dark:text-neutral-300 text-xl font-light outline-none",
            "w-fit h-fit rounded-md relative overflow-hidden z-10",
            isTriggered && "pointer-events-none touch-none"
          )}
          aria-label={
            isTriggered
              ? "Submitted Successfully"
              : "press and hold the enter key for 1.5 seconds to confirm submission"
          }
          aria-live="assertive"
          {...attrs}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsPressed(false);
          }}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          disabled={isTriggered}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setIsPressed(true);
            }
          }}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              setIsPressed(false);
            }
          }}
        >
          <motion.div
            layout={true}
            transition={layoutTransition}
            className={clsx(
              "bg-neutral-200 dark:bg-neutral-925 w-fit h-fit rounded-md border-[1.5px] border-neutral-300 dark:border-neutral-700 shadow-lg shadow-black"
            )}
          >
            <motion.div
              layout={true}
              transition={layoutTransition}
              className={clsx(
                "px-6 py-3 relative z-10 flex justify-center items-center"
              )}
            >
              {!isTriggered && (isHovered || isPressed) ? (
                <ProgressCircleSVG isPressed={isPressed} />
              ) : null}
              {isTriggered ? <CheckmarkSVG /> : null}
              <ButtonTextAnimation trigger={isTriggered} />
            </motion.div>
          </motion.div>

          <motion.div
            layout={true}
            className="absolute top-0 right-0 w-11/12 h-[1.5px] bg-gradient-to-l from-neutral-300 dark:from-neutral-700 from-15% via-neutral-400 dark:via-neutral-400 via-45% to-neutral-300 dark:to-neutral-700 to-85%"
            animate={{
              x: isHovered || isPressed ? -30 : 0,
            }}
          />
          <motion.div
            layout
            className="absolute bottom-0 left-0 w-8/12 h-[1.5px] bg-gradient-to-l from-neutral-300 dark:from-neutral-700 from-15% via-neutral-400 dark:via-neutral-400 via-45% to-neutral-300 dark:to-neutral-700 to-85%"
            animate={{
              x: isHovered || isPressed ? 50 : 0,
            }}
          />
        </motion.button>
        {/* disabling this for the demo */}
        {/* {!isTriggered && (isHovered || isPressed) ? <Hint /> : null} */}
        <Hint />
        {showStars && <AnimatedStars />}
      </motion.div>
    </LayoutGroup>
  );
}

function ButtonTextAnimation({ trigger }) {
  return (
    <motion.div
      className="flex px-2"
      layout="position"
      transition={layoutTransition}
    >
      <span>Submit</span>
      {trigger
        ? ["t", "e", "d"].map((char, index) => {
            return (
              <motion.span
                key={char + index}
                layout={true}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...layoutTransition,
                  delay: 0.1 * index,
                }}
              >
                {char}
              </motion.span>
            );
          })
        : null}
    </motion.div>
  );
}

function ProgressCircleSVG({ isPressed }) {
  return (
    <motion.div
      layout={true}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={layoutTransition}
    >
      <svg
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-6"
      >
        <circle
          cx="30"
          cy="30"
          r="25"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="4"
          className="stroke-neutral-400 dark:stroke-neutral-700"
        />
        <motion.circle
          cx="30"
          cy="30"
          r="25"
          fill="transparent"
          strokeWidth="4"
          strokeLinecap="round"
          className="origin-center -rotate-90"
          stroke="currentColor"
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: isPressed ? 1 : 0,
          }}
          transition={{
            duration: isPressed ? 1.5 : 0.25,
            ease: cubicBezier(0.65, 0, 0.35, 1),
          }}
        />
      </svg>
    </motion.div>
  );
}

function CheckmarkSVG() {
  return (
    <motion.div
      layout={true}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={layoutTransition}
    >
      <motion.svg
        layout={true}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="size-6"
      >
        <motion.path
          layout={true}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 1,
          }}
          transition={{
            delay: 0.1,
          }}
        />
      </motion.svg>
    </motion.div>
  );
}

function Hint() {
  return (
    <motion.p
      layout={true}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={layoutTransition}
      className="text-neutral-500 text-xs text-center absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-full"
    >
      Click/Press and Hold to confirm
    </motion.p>
  );
}

function StarSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="size-4 fill-neutral-700 dark:fill-neutral-300"
    >
      <path
        fillRule="evenodd"
        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function AnimatedStars({ count = 25 }) {
  return [...Array(count)].map((_, index) => {
    return (
      <motion.div
        key={"star-" + index}
        className="absolute top-0"
        animate={{
          opacity: [0, 1, 0],
          rotate: [0, randomNumber(-360, 360)],
          y: [0, randomNumber(-100, -200)],
          x: [0, randomNumber(-100, 100)],
        }}
        transition={{
          ease: cubicBezier(0.16, 1, 0.3, 1),
          duration: 1.25,
          delay: Math.random() * 0.5,
        }}
        style={{
          transformOrigin: "center center",
          left: "50%",
        }}
      >
        <StarSVG />
      </motion.div>
    );
  });
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
