"use client";

import React from "react";
import { ThemeContext } from "@/context/ThemeProvider";
import clsx from "clsx";

const ConsumingStarsOffScreenCanvas = ({ environment = "production" }) => {
  const canvasRef = React.useRef(null);
  const [counter, setCounter] = React.useState(0);

  const { theme } = React.useContext(ThemeContext);

  React.useEffect(() => {
    if (environment === "development" && counter === 0) {
      setCounter((prev) => prev + 1);
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;

    // set up webgl canvas worker
    const offscreenCanvas = canvas.transferControlToOffscreen();
    const consumingStarsCanvasWorker = new Worker(
      "workers/consumingStarsCanvasWorker.js",
      {}
    );
    consumingStarsCanvasWorker.postMessage(
      {
        command: "init",
        canvas: offscreenCanvas,
      },
      [offscreenCanvas]
    );

    return () => {
      consumingStarsCanvasWorker.postMessage({ command: "cleanUp" });
      consumingStarsCanvasWorker.terminate();
    };
  }, [environment, counter]);

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
