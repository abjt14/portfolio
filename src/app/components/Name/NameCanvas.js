"use client";

import React from "react";
import clsx from "clsx";
import { fragmentShaderSource, vertexShaderSource } from "./shaders";

import {
  compileShader,
  createProgram,
  createVerticesAndIndices,
  setAttributes,
  setBuffer,
} from "./webglHelpers";
import PaintingTexture from "./PaintingTexture";

export default function NameCanvas({ isMobile = false, setIsLoaded }) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.height = !isMobile ? 384 : 329;
    canvas.width = !isMobile ? 2304 : 700;
    const gl = canvas.getContext("webgl", { antialias: true });
    const imageSrc = !isMobile
      ? "./name-canvas/name_big.svg"
      : "./name-canvas/name_small.svg";

    /* COMPILE SHADERS */
    const vertexShader = compileShader(
      gl,
      vertexShaderSource,
      gl.VERTEX_SHADER
    );
    const fragmentShader = compileShader(
      gl,
      fragmentShaderSource,
      gl.FRAGMENT_SHADER
    );

    /* LINK SHADERS INTO A PROGRAM */
    const program = createProgram(gl, vertexShader, fragmentShader);
    /* Use the program */
    gl.useProgram(program);

    /* SET VERTICES AND INDICES */
    const cellSize = canvas.height * 0.0368;
    const { vertices, indices } = createVerticesAndIndices(
      canvas.width,
      canvas.height,
      cellSize
    );

    /* SET BUFFER */
    const { vertexBuffer, indexBuffer } = setBuffer(gl, vertices, indices);

    /* SET ATTRIBUTES */
    setAttributes(gl, program);

    /* SET TEXTURES */
    let texture1 = gl.createTexture();
    let img = new Image();
    img.src = imageSrc;
    img.onload = function () {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      // Set the texture parameters
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      // Set the texture uniform
      const u_nameTextureLocation = gl.getUniformLocation(
        program,
        "u_nameTexture"
      );
      gl.uniform1i(u_nameTextureLocation, 0);
    };
    // Set painting texture
    const paintingTexture = new PaintingTexture(
      canvas.height,
      canvas.width,
      isMobile
    );
    const paintingTextureCanvas = paintingTexture.canvas;
    let paintingTextureCanvas_raf_id = false;
    function renderPaintingTexture() {
      paintingTexture.update();
      paintingTextureCanvas_raf_id = requestAnimationFrame(
        renderPaintingTexture
      );
    }
    paintingTextureCanvas_raf_id = requestAnimationFrame(renderPaintingTexture);
    const texture2 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGB,
      gl.RGB,
      gl.UNSIGNED_BYTE,
      paintingTextureCanvas
    );
    // Set the texture parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.uniform1i(gl.getUniformLocation(program, "u_PaintingTexture"), 1);
    function updatePaintingTexture() {
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, texture2);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        paintingTextureCanvas
      );
    }
    function handleMouseMove(event) {
      const canvasRect = canvas.getBoundingClientRect();
      // Normalize position into [0, 1] and flip y
      const x = (event.clientX - canvasRect.left) / canvasRect.width;
      const y = 1 - (event.clientY - canvasRect.top) / canvasRect.height;
      const point = {
        x: x,
        y: y,
      };
      paintingTexture.addPoint(point);
      paintingTexture.mousePosition = { x, y };
    }
    function handleMouseLeave() {
      paintingTexture.mousePosition = { x: -10000, y: -10000 };
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

    /* SET UNIFORMS */
    // set canvas resolution uniform
    const u_resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    gl.uniform2f(u_resolutionLocation, canvas.width, canvas.height);
    // set time uniform
    const u_timeLocation = gl.getUniformLocation(program, "u_time");
    let startTime = new Date().getTime();
    let u_time_raf_id = false;
    function incrementTime() {
      let currentTime = new Date().getTime();
      gl.uniform1f(u_timeLocation, (currentTime - startTime) / 1000);
      u_time_raf_id = window.requestAnimationFrame(incrementTime);
    }
    u_time_raf_id = window.requestAnimationFrame(incrementTime);
    // Set cell size uniform
    const cellSizeX = cellSize * (canvas.height / canvas.height);
    const cellSizeY = cellSize;
    const u_cellSizeXLocation = gl.getUniformLocation(program, "u_cellSizeX");
    gl.uniform1f(u_cellSizeXLocation, cellSizeX);
    const u_cellSizeYLocation = gl.getUniformLocation(program, "u_cellSizeY");
    gl.uniform1f(u_cellSizeYLocation, cellSizeY);
    // set mode uniform
    let mode = 0;
    const u_modeLocation = gl.getUniformLocation(program, "u_mode");
    gl.uniform1f(u_modeLocation, mode);
    function handleModeChange() {
      if (mode === 1) {
        mode = 0;
        gl.uniform1f(u_modeLocation, mode);
      } else {
        mode = 1;
        gl.uniform1f(u_modeLocation, mode);
      }
    }
    canvas.addEventListener("click", handleModeChange);

    let render_raf_id = false;
    function render() {
      updatePaintingTexture();
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
      render_raf_id = requestAnimationFrame(render);
    }
    render_raf_id = requestAnimationFrame(render);

    setIsLoaded(true);

    return () => {
      window.cancelAnimationFrame(u_time_raf_id);
      window.cancelAnimationFrame(render_raf_id);
      window.cancelAnimationFrame(paintingTextureCanvas_raf_id);
      canvas.removeEventListener("click", handleModeChange);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      paintingTexture.cleanUp();
      img.src = "";
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(vertexBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteTexture(texture1);
      gl.deleteTexture(texture2);
      gl.deleteProgram(program);
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
