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

const name_big_svg =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDYwOCIgaGVpZ2h0PSI3NjgiIHZpZXdCb3g9IjAgMCAyMzA0IDM4NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNODAuMDMxIDI4MkwxNDUuNTY3IDEwMC4yNEgxOTcuMDIzTDI2Mi41NTkgMjgySDIxNi45OTFMMjA0Ljk1OSAyNDcuNjk2SDEzNy4zNzVMMTI1LjU5OSAyODJIODAuMDMxWk0xNDkuNDA3IDIxMi4zNjhIMTkzLjE4M0wxNzEuNDIzIDE0OC4zNjhMMTQ5LjQwNyAyMTIuMzY4Wk0yODIuMjgzIDI4MlYxMDAuMjRIMzQ5LjYxMUM0MDEuNTc5IDEwMC4yNCA0MjcuMTc5IDExNS42IDQyNy4xNzkgMTUwLjY3MkM0MjcuMTc5IDE3Mi40MzIgNDEzLjM1NSAxODUuNDg4IDM4OC41MjMgMTg4LjA0OEM0MTguOTg3IDE5MC42MDggNDM0Ljg1OSAyMDQuOTQ0IDQzNC44NTkgMjMwLjU0NEM0MzQuODU5IDI2NC4zMzYgNDA5LjUxNSAyODIgMzU5Ljg1MSAyODJIMjgyLjI4M1pNMzI2LjgyNyAyNDYuOTI4SDM2MS4zODdDMzc4LjAyNyAyNDYuOTI4IDM5MC4wNTkgMjQwLjI3MiAzOTAuMDU5IDIyNS45MzZDMzkwLjA1OSAyMTEuODU2IDM3OC4yODMgMjA0Ljk0NCAzNjEuMzg3IDIwNC45NDRIMzI2LjgyN1YyNDYuOTI4Wk0zMjYuODI3IDE3NC4yMjRIMzU0LjIxOUMzNzAuODU5IDE3NC4yMjQgMzgyLjM3OSAxNjguMDggMzgyLjM3OSAxNTUuMDI0QzM4Mi4zNzkgMTQxLjIgMzcxLjM3MSAxMzUuMzEyIDM1NC4yMTkgMTM1LjMxMkgzMjYuODI3VjE3NC4yMjRaTTQ2NC4wMzMgMjgyVjEwMC4yNEg1MDguNTc3VjE3Mi4xNzZINTY5LjUwNVYxMDAuMjRINjE0LjA0OVYyODJINTY5LjUwNVYyMDguNzg0SDUwOC41NzdWMjgySDQ2NC4wMzNaTTY0Mi41MzMgMTAwLjI0SDY4Ny4wNzdWMjgySDY0Mi41MzNWMTAwLjI0Wk03NTkuOTI3IDIxMy4zOTJDNzYwLjE4MyAyMzcuMiA3NjguODg3IDI0OS43NDQgNzg0LjUwMyAyNDkuNzQ0QzgwMC42MzEgMjQ5Ljc0NCA4MDkuMDc5IDIzNy45NjggODA5LjA3OSAyMTUuOTUyVjEwMC4yNEg4NTMuODc5VjIxNS45NTJDODUzLjg3OSAyNTcuOTM2IDgyNS4yMDcgMjg2LjA5NiA3ODMuMjIzIDI4Ni4wOTZDNzQzLjU0MyAyODYuMDk2IDcxNS42MzkgMjU3LjE2OCA3MTUuMzgzIDIxNS42OTZMNzU5LjkyNyAyMTMuMzkyWk04ODQuNzgzIDEwMC4yNEgxMDE1LjM0VjEzNi41OTJIOTI5LjMyN1YxNzIuNjg4SDEwMTIuMjdWMjA5LjA0SDkyOS4zMjdWMjQ1LjY0OEgxMDE3LjM5VjI4Mkg4ODQuNzgzVjEwMC4yNFpNMTA0NS41MyAxMDAuMjRIMTE3Ni4wOVYxMzYuNTkySDEwOTAuMDhWMTcyLjY4OEgxMTczLjAyVjIwOS4wNEgxMDkwLjA4VjI0NS42NDhIMTE3OC4xNFYyODJIMTA0NS41M1YxMDAuMjRaTTEzNDguMzYgMTAwLjI0VjEzNi41OTJIMTI5NC42VjI4MkgxMjQ5LjhWMTM2LjU5MkgxMTk2LjA0VjEwMC4yNEgxMzQ4LjM2Wk0xNDY4LjcxIDIxOS41MzZDMTQ3MS41MiAyMzcuMiAxNDg0LjMyIDI0OC43MiAxNTA1LjMyIDI0OC43MkMxNTIwLjQyIDI0OC43MiAxNTMwLjkyIDI0Mi41NzYgMTUzMC45MiAyMzEuMDU2QzE1MzAuNCAyMTkuMjggMTUyMC42OCAyMTMuMTM2IDE0OTUuMDggMjA2Ljk5MkMxNDUyLjA3IDE5Ni43NTIgMTQyNy40OSAxODAuMzY4IDE0MjcuNDkgMTUxLjE4NEMxNDI3LjQ5IDExNy4zOTIgMTQ1Ni4xNiA5Ni4xNDQgMTQ5OS42OCA5Ni4xNDRDMTU0MC45IDk2LjE0NCAxNTY5LjA2IDEyMS4yMzIgMTU3My40MSAxNTguODY0TDE1MjkuMTIgMTYwLjkxMkMxNTI3LjU5IDE0Mi45OTIgMTUxNS44MSAxMzEuOTg0IDE0OTguNjYgMTMxLjk4NEMxNDgyLjc5IDEzMS45ODQgMTQ3MS43OCAxMzkuOTIgMTQ3Mi44IDE1MS45NTJDMTQ3My41NyAxNjUuMDA4IDE0ODguOTMgMTY5LjYxNiAxNTA3LjExIDE3My45NjhDMTU1MC4xMiAxODIuOTI4IDE1NzUuOTcgMjAwLjU5MiAxNTc1Ljk3IDIzMC4wMzJDMTU3NS45NyAyNjQuODQ4IDE1NDUuNzYgMjg1LjA3MiAxNTA0LjI5IDI4NS4wNzJDMTQ1OC40NyAyODUuMDcyIDE0MjYuNzIgMjYwLjQ5NiAxNDI0LjE2IDIyMS41ODRMMTQ2OC43MSAyMTkuNTM2Wk0xNjAxLjAzIDEwMC4yNEgxNjQ1LjU4VjI4MkgxNjAxLjAzVjEwMC4yNFpNMTY4MC4yOCAxMDAuMjRIMTcyNy4xM0wxNzkzLjE4IDIxNC40MTZWMTAwLjI0SDE4MzcuOThWMjgySDE3ODkuNkwxNzI0LjgzIDE3Mi40MzJWMjgySDE2ODAuMjhWMTAwLjI0Wk0yMDM0Ljg0IDI4MkgyMDA4LjQ3TDIwMDYuNDIgMjU2LjkxMkMxOTk3LjIxIDI3NS4wODggMTk3Ni43MyAyODYuMDk2IDE5NTEuMzggMjg2LjA5NkMxOTAwLjE4IDI4Ni4wOTYgMTg2NC44NSAyNDUuNjQ4IDE4NjQuODUgMTkxLjM3NkMxODY0Ljg1IDEzNi44NDggMTg5OS45MyA5Ni4xNDQgMTk1NC40NSA5Ni4xNDRDMTk5Ni40NCA5Ni4xNDQgMjAyNS42MiAxMjAuNDY0IDIwMzQuMzMgMTYxLjE2OEwxOTg3Ljk5IDE2My4yMTZDMTk4My42NCAxNDMuNzYgMTk3MS42MSAxMzIuNDk2IDE5NTMuNDMgMTMyLjQ5NkMxOTI0LjI1IDEzMi40OTYgMTkxMC42OCAxNTcuMDcyIDE5MTAuNjggMTkxLjM3NkMxOTEwLjY4IDIyNS40MjQgMTkyNC41IDI0OS43NDQgMTk1My40MyAyNDkuNzQ0QzE5NzMuOTEgMjQ5Ljc0NCAxOTg1Ljk0IDIzNi45NDQgMTk4OS41MyAyMTcuNDg4SDE5NTIuOTJWMTg2LjUxMkgyMDM0Ljg0VjI4MlpNMjA2My4yOCAyODJWMTAwLjI0SDIxMDcuODNWMTcyLjE3NkgyMTY4Ljc2VjEwMC4yNEgyMjEzLjNWMjgySDIxNjguNzZWMjA4Ljc4NEgyMTA3LjgzVjI4MkgyMDYzLjI4WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==";
const name_small_svg =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQwMCIgaGVpZ2h0PSI2NTgiIHZpZXdCb3g9IjAgMCAxNDAwIDY1OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMTA1LjMwMyAyNjRMMTY2Ljc0MyA5My42SDIxNC45ODNMMjc2LjQyMyAyNjRIMjMzLjcwM0wyMjIuNDIyIDIzMS44NEgxNTkuMDYyTDE0OC4wMjMgMjY0SDEwNS4zMDNaTTE3MC4zNDMgMTk4LjcySDIxMS4zODNMMTkwLjk4MyAxMzguNzJMMTcwLjM0MyAxOTguNzJaTTI5NC45MTQgMjY0VjkzLjZIMzU4LjAzNEM0MDYuNzU0IDkzLjYgNDMwLjc1NCAxMDggNDMwLjc1NCAxNDAuODhDNDMwLjc1NCAxNjEuMjggNDE3Ljc5NCAxNzMuNTIgMzk0LjUxNCAxNzUuOTJDNDIzLjA3NCAxNzguMzIgNDM3Ljk1NCAxOTEuNzYgNDM3Ljk1NCAyMTUuNzZDNDM3Ljk1NCAyNDcuNDQgNDE0LjE5NCAyNjQgMzY3LjYzNCAyNjRIMjk0LjkxNFpNMzM2LjY3NCAyMzEuMTJIMzY5LjA3NEMzODQuNjc0IDIzMS4xMiAzOTUuOTU0IDIyNC44OCAzOTUuOTU0IDIxMS40NEMzOTUuOTU0IDE5OC4yNCAzODQuOTE0IDE5MS43NiAzNjkuMDc0IDE5MS43NkgzMzYuNjc0VjIzMS4xMlpNMzM2LjY3NCAxNjIuOTZIMzYyLjM1NEMzNzcuOTU0IDE2Mi45NiAzODguNzU0IDE1Ny4yIDM4OC43NTQgMTQ0Ljk2QzM4OC43NTQgMTMyIDM3OC40MzQgMTI2LjQ4IDM2Mi4zNTQgMTI2LjQ4SDMzNi42NzRWMTYyLjk2Wk00NjUuMzA0IDI2NFY5My42SDUwNy4wNjRWMTYxLjA0SDU2NC4xODRWOTMuNkg2MDUuOTQ0VjI2NEg1NjQuMTg0VjE5NS4zNkg1MDcuMDY0VjI2NEg0NjUuMzA0Wk02MzIuNjQ4IDkzLjZINjc0LjQwOFYyNjRINjMyLjY0OFY5My42Wk03NDIuNzA1IDE5OS42OEM3NDIuOTQ1IDIyMiA3NTEuMTA1IDIzMy43NiA3NjUuNzQ1IDIzMy43NkM3ODAuODY1IDIzMy43NiA3ODguNzg1IDIyMi43MiA3ODguNzg1IDIwMi4wOFY5My42SDgzMC43ODVWMjAyLjA4QzgzMC43ODUgMjQxLjQ0IDgwMy45MDUgMjY3Ljg0IDc2NC41NDUgMjY3Ljg0QzcyNy4zNDUgMjY3Ljg0IDcwMS4xODUgMjQwLjcyIDcwMC45NDUgMjAxLjg0TDc0Mi43MDUgMTk5LjY4Wk04NTkuNzU4IDkzLjZIOTgyLjE1OFYxMjcuNjhIOTAxLjUxOFYxNjEuNTJIOTc5LjI3OFYxOTUuNkg5MDEuNTE4VjIyOS45Mkg5ODQuMDc4VjI2NEg4NTkuNzU4VjkzLjZaTTEwMTAuNDYgOTMuNkgxMTMyLjg2VjEyNy42OEgxMDUyLjIyVjE2MS41MkgxMTI5Ljk4VjE5NS42SDEwNTIuMjJWMjI5LjkySDExMzQuNzhWMjY0SDEwMTAuNDZWOTMuNlpNMTI5NC4zNiA5My42VjEyNy42OEgxMjQzLjk2VjI2NEgxMjAxLjk2VjEyNy42OEgxMTUxLjU2VjkzLjZIMTI5NC4zNlpNMzY5LjQ5MSA1MDMuNDRDMzcyLjEzMSA1MjAgMzg0LjEzMSA1MzAuOCA0MDMuODExIDUzMC44QzQxNy45NzEgNTMwLjggNDI3LjgxMSA1MjUuMDQgNDI3LjgxMSA1MTQuMjRDNDI3LjMzMSA1MDMuMiA0MTguMjExIDQ5Ny40NCAzOTQuMjExIDQ5MS42OEMzNTMuODkxIDQ4Mi4wOCAzMzAuODUxIDQ2Ni43MiAzMzAuODUxIDQzOS4zNkMzMzAuODUxIDQwNy42OCAzNTcuNzMxIDM4Ny43NiAzOTguNTMxIDM4Ny43NkM0MzcuMTcxIDM4Ny43NiA0NjMuNTcxIDQxMS4yOCA0NjcuNjUxIDQ0Ni41Nkw0MjYuMTMxIDQ0OC40OEM0MjQuNjkxIDQzMS42OCA0MTMuNjUxIDQyMS4zNiAzOTcuNTcxIDQyMS4zNkMzODIuNjkxIDQyMS4zNiAzNzIuMzcxIDQyOC44IDM3My4zMzEgNDQwLjA4QzM3NC4wNTEgNDUyLjMyIDM4OC40NTEgNDU2LjY0IDQwNS40OTEgNDYwLjcyQzQ0NS44MTEgNDY5LjEyIDQ3MC4wNTEgNDg1LjY4IDQ3MC4wNTEgNTEzLjI4QzQ3MC4wNTEgNTQ1LjkyIDQ0MS43MzEgNTY0Ljg4IDQwMi44NTEgNTY0Ljg4QzM1OS44OTEgNTY0Ljg4IDMzMC4xMzEgNTQxLjg0IDMyNy43MzEgNTA1LjM2TDM2OS40OTEgNTAzLjQ0Wk00OTMuNTQ3IDM5MS42SDUzNS4zMDdWNTYySDQ5My41NDdWMzkxLjZaTTU2Ny44NDMgMzkxLjZINjExLjc2M0w2NzMuNjgzIDQ5OC42NFYzOTEuNkg3MTUuNjgzVjU2Mkg2NzAuMzIzTDYwOS42MDMgNDU5LjI4VjU2Mkg1NjcuODQzVjM5MS42Wk05MDAuMjM4IDU2Mkg4NzUuNTE4TDg3My41OTggNTM4LjQ4Qzg2NC45NTggNTU1LjUyIDg0NS43NTggNTY1Ljg0IDgyMS45OTggNTY1Ljg0Qzc3My45OTggNTY1Ljg0IDc0MC44NzggNTI3LjkyIDc0MC44NzggNDc3LjA0Qzc0MC44NzggNDI1LjkyIDc3My43NTggMzg3Ljc2IDgyNC44NzggMzg3Ljc2Qzg2NC4yMzggMzg3Ljc2IDg5MS41OTggNDEwLjU2IDg5OS43NTggNDQ4LjcyTDg1Ni4zMTggNDUwLjY0Qzg1Mi4yMzggNDMyLjQgODQwLjk1OCA0MjEuODQgODIzLjkxOCA0MjEuODRDNzk2LjU1OCA0MjEuODQgNzgzLjgzOCA0NDQuODggNzgzLjgzOCA0NzcuMDRDNzgzLjgzOCA1MDguOTYgNzk2Ljc5OCA1MzEuNzYgODIzLjkxOCA1MzEuNzZDODQzLjExOCA1MzEuNzYgODU0LjM5OCA1MTkuNzYgODU3Ljc1OCA1MDEuNTJIODIzLjQzOFY0NzIuNDhIOTAwLjIzOFY1NjJaTTkyNi45MDYgNTYyVjM5MS42SDk2OC42NjZWNDU5LjA0SDEwMjUuNzlWMzkxLjZIMTA2Ny41NVY1NjJIMTAyNS43OVY0OTMuMzZIOTY4LjY2NlY1NjJIOTI2LjkwNloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=";

export default function NameCanvas({ isMobile = false, setIsLoaded }) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.height = !isMobile ? 384 : 329;
    canvas.width = !isMobile ? 2304 : 700;
    const gl = canvas.getContext("webgl", { antialias: true });

    const imageSrc = !isMobile ? name_big_svg : name_small_svg;

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
