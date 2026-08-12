"use client";

import React from "react";
import { motion } from "motion/react";

type Proximity = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export default function MagneticButton({
  threshhold = 32,
  attraction = 0.32,
  trailLength = 8,
}: {
  threshhold?: number;
  attraction?: number;
  trailLength?: number;
}) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [buttonProximity, setButtonProximity] = React.useState<Proximity>({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });
  const [isAttracted, setIsAttracted] = React.useState(false);

  React.useLayoutEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  React.useLayoutEffect(() => {
    if (!buttonRef.current) return;

    const { x, y, width, height } = buttonRef.current.getBoundingClientRect();

    const distance = {
      left: x - mousePosition.x,
      right: mousePosition.x - (x + width),
      top: y - mousePosition.y,
      bottom: mousePosition.y - (y + height),
    };

    if (Object.values(distance).every((value) => value < threshhold)) {
      setIsAttracted(true);
    } else {
      setIsAttracted(false);
    }

    setButtonProximity(distance);

    return () => {};
  }, [mousePosition, threshhold]);

  return (
    <div className="w-fit relative z-10">
      <motion.button
        ref={buttonRef}
        layout="position"
        className="text-neutral-800 dark:text-neutral-300 bg-neutral-200 dark:bg-neutral-925 border border-neutral-300 dark:border-neutral-850 rounded-md py-2 px-4"
        initial={false}
        animate={{
          x: isAttracted
            ? (buttonProximity.right - buttonProximity.left) * attraction
            : 0,
          y: isAttracted
            ? (buttonProximity.bottom - buttonProximity.top) * attraction
            : 0,
        }}
      >
        Magnetized
      </motion.button>
      {Array.from({ length: trailLength }).map((_, index) => (
        <motion.div
          key={index}
          layout
          className="absolute top-0 left-0 w-full h-full bg-neutral-925 dark:bg-neutral-200 rounded-md -z-10 pointer-events-none"
          initial={false}
          animate={{
            x: isAttracted
              ? (buttonProximity.right - buttonProximity.left) *
                attraction *
                (1 - 0.1 * index)
              : 0,
            y: isAttracted
              ? (buttonProximity.bottom - buttonProximity.top) *
                attraction *
                (1 - 0.1 * index)
              : 0,
            scale: 0.975,
          }}
          style={{
            opacity: 0.5 - (1 / (trailLength * 2)) * index,
          }}
        />
      ))}
    </div>
  );
}
