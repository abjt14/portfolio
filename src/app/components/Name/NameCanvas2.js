"use client";

import React from "react";
import clsx from "clsx";

export default function NameCanvas2({ isMobile = false, setIsLoaded }) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.height = !isMobile ? 384 : 329;
    canvas.width = !isMobile ? 2304 : 700;
    const ctx = canvas.getContext("2d", { antialias: true });

    // set up webgl canvas worker
    const nameCanvasWorker = new Worker("workers/nameCanvasWorker.js", {});
    nameCanvasWorker.postMessage({
      command: "init",
      isMobile: isMobile,
    });
    let img = new Image();
    img.src = !isMobile
      ? "name-canvas/name_big.svg"
      : "name-canvas/name_small.svg";
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      nameCanvasWorker.postMessage({
        command: "setNameTexture",
        image: imageData,
      });
    };
    function renderNameCanvas(time) {
      nameCanvasWorker.postMessage({ command: "update", time: time });
    }

    // set painting texture worker
    const paintingTextureWorker = new Worker(
      "workers/paintingTextureWorker.js"
    );
    paintingTextureWorker.postMessage({
      command: "init",
      isMobile: isMobile,
      options: {},
    });
    paintingTextureWorker.onmessage = (event) => {
      const { bitmap } = event.data;
      nameCanvasWorker.postMessage({ command: "setPaintingTexture", bitmap });
    };
    function renderPaintingTexture() {
      paintingTextureWorker.postMessage({ command: "update" });
    }
    function handleMouseMove(event) {
      const canvasRect = canvas.getBoundingClientRect();
      // normalize position into [0, 1] and flip y
      const x = (event.clientX - canvasRect.left) / canvasRect.width;
      const y = 1 - (event.clientY - canvasRect.top) / canvasRect.height;
      const point = {
        x: x,
        y: y,
      };
      paintingTextureWorker.postMessage({ command: "addPoint", point: point });
      paintingTextureWorker.postMessage({
        command: "updateMousePosition",
        mousePosition: { x, y },
      });
    }
    function handleMouseLeave() {
      paintingTextureWorker.postMessage({
        command: "updateMousePosition",
        mousePosition: { x: -10000, y: -10000 },
      });
    }
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    // simulate mouse events on touch devices
    function handleTouchStart(event) {
      const touch = event.touches[0];
      const mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvas.dispatchEvent(mouseEvent);
    }
    function handleTouchMove(event) {
      const touch = event.touches[0];
      const mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvas.dispatchEvent(mouseEvent);
    }
    function handleTouchEnd() {
      const mouseEvent = new MouseEvent("mouseup", {});
      canvas.dispatchEvent(mouseEvent);
    }
    document.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchmove", handleTouchMove, false);
    canvas.addEventListener("touchend", handleTouchEnd, false);

    // set mode uniform
    let mode = 0;
    function handleModeChange() {
      if (mode === 1) {
        mode = 0;
        nameCanvasWorker.postMessage({ command: "setModeUniform", mode });
      } else {
        mode = 1;
        nameCanvasWorker.postMessage({ command: "setModeUniform", mode });
      }
    }
    canvas.addEventListener("click", handleModeChange);

    let render_raf_id = false;
    function render(timestamp) {
      renderNameCanvas(timestamp / 1000);
      renderPaintingTexture();
      render_raf_id = requestAnimationFrame(render);
    }
    render_raf_id = requestAnimationFrame(render);

    nameCanvasWorker.onmessage = (event) => {
      const { bitmap } = event.data;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    };

    setIsLoaded(true);

    return () => {
      window.cancelAnimationFrame(render_raf_id);
      canvas.removeEventListener("click", handleModeChange);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      paintingTextureWorker.postMessage({ command: "cleanUp" });
      paintingTextureWorker.terminate();
      nameCanvasWorker.postMessage({ command: "cleanUp" });
      nameCanvasWorker.terminate();
    };
  }, [isMobile, setIsLoaded]);

  return (
    <canvas
      ref={canvasRef}
      className={clsx(
        "w-full h-auto cursor-pointer aspect-[700/329] sm:aspect-[2304/384] touch-none",
        isMobile ? "block sm:hidden" : "hidden sm:block"
      )}
    />
  );
}
