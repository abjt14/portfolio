"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ConsumingStars({
  layoutId = "",
  starCount = 128,
  starSize = 1,
  reverse = false,
  full = false,
}) {
  return (
    <motion.svg
      key={layoutId + "svg"}
      layoutId={layoutId + "svg"}
      layout
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 100"
      className="w-full h-full z-50"
      height={100}
      width={100}
    >
      {Array.from({ length: starCount }).map((_, i) => {
        return (
          <Star
            key={i}
            layoutId={layoutId + "circle"}
            starSize={starSize}
            reverse={reverse}
            full={full}
          />
        );
      })}
    </motion.svg>
  );
}

function Star({ layoutId, starSize, reverse, full }) {
  const [radius, setradius] = React.useState(0);
  const [cx, setcx] = React.useState(0);
  const [duration, setduration] = React.useState(0);
  const [rotate, setrotate] = React.useState(0);
  const [delay, setdelay] = React.useState(0);

  React.useEffect(() => {
    setradius(Math.random() * starSize);
    setcx(Math.random() * 50);
    setduration(1 + Math.random() * 4);
    setrotate(Math.random() * (!full ? 180 : 360));
    setdelay(Math.random() * 5);
  }, [starSize, full]);

  return (
    <motion.circle
      key={layoutId}
      layoutId={layoutId}
      layout
      className="fill-black dark:fill-white"
      cy={50}
      r={radius}
      transform={`rotate(${rotate})`}
      initial={false}
      animate={{
        cx: !reverse ? [cx, 50] : [50, cx],
        fillOpacity: !reverse ? [0, 1] : [1, 0],
      }}
      style={{
        originX: "50%",
        originY: "50%",
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        delay: delay,
      }}
    />
  );
}
