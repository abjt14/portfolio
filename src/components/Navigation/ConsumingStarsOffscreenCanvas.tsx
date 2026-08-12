"use client";

import React from "react";
import { useTheme } from "@/context/ThemeProvider";
import clsx from "clsx";
import type { ConsumingStarsMessage } from "@/workers/consumingStars.messages";
import { useOffscreenCanvasWorker } from "@/hooks/useOffscreenCanvasWorker";

const ConsumingStarsOffScreenCanvas = () => {
  const { theme } = useTheme();

  const canvasRef = useOffscreenCanvasWorker<ConsumingStarsMessage>({
    name: "consumingStars",
    init: (canvas) => ({ command: "init", canvas }),
  });

  return (
    <canvas
      ref={canvasRef}
      className={clsx(
        "w-full h-full z-50",
        theme === "light" ? "invert" : "invert-0"
      )}
    />
  );
};

export default React.memo(ConsumingStarsOffScreenCanvas);
