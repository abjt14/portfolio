"use client";

import React from "react";
import clsx from "clsx";

const name_big_svg =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDYwOCIgaGVpZ2h0PSI3NjgiIHZpZXdCb3g9IjAgMCAyMzA0IDM4NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNODAuMDMxIDI4MkwxNDUuNTY3IDEwMC4yNEgxOTcuMDIzTDI2Mi41NTkgMjgySDIxNi45OTFMMjA0Ljk1OSAyNDcuNjk2SDEzNy4zNzVMMTI1LjU5OSAyODJIODAuMDMxWk0xNDkuNDA3IDIxMi4zNjhIMTkzLjE4M0wxNzEuNDIzIDE0OC4zNjhMMTQ5LjQwNyAyMTIuMzY4Wk0yODIuMjgzIDI4MlYxMDAuMjRIMzQ5LjYxMUM0MDEuNTc5IDEwMC4yNCA0MjcuMTc5IDExNS42IDQyNy4xNzkgMTUwLjY3MkM0MjcuMTc5IDE3Mi40MzIgNDEzLjM1NSAxODUuNDg4IDM4OC41MjMgMTg4LjA0OEM0MTguOTg3IDE5MC42MDggNDM0Ljg1OSAyMDQuOTQ0IDQzNC44NTkgMjMwLjU0NEM0MzQuODU5IDI2NC4zMzYgNDA5LjUxNSAyODIgMzU5Ljg1MSAyODJIMjgyLjI4M1pNMzI2LjgyNyAyNDYuOTI4SDM2MS4zODdDMzc4LjAyNyAyNDYuOTI4IDM5MC4wNTkgMjQwLjI3MiAzOTAuMDU5IDIyNS45MzZDMzkwLjA1OSAyMTEuODU2IDM3OC4yODMgMjA0Ljk0NCAzNjEuMzg3IDIwNC45NDRIMzI2LjgyN1YyNDYuOTI4Wk0zMjYuODI3IDE3NC4yMjRIMzU0LjIxOUMzNzAuODU5IDE3NC4yMjQgMzgyLjM3OSAxNjguMDggMzgyLjM3OSAxNTUuMDI0QzM4Mi4zNzkgMTQxLjIgMzcxLjM3MSAxMzUuMzEyIDM1NC4yMTkgMTM1LjMxMkgzMjYuODI3VjE3NC4yMjRaTTQ2NC4wMzMgMjgyVjEwMC4yNEg1MDguNTc3VjE3Mi4xNzZINTY5LjUwNVYxMDAuMjRINjE0LjA0OVYyODJINTY5LjUwNVYyMDguNzg0SDUwOC41NzdWMjgySDQ2NC4wMzNaTTY0Mi41MzMgMTAwLjI0SDY4Ny4wNzdWMjgySDY0Mi41MzNWMTAwLjI0Wk03NTkuOTI3IDIxMy4zOTJDNzYwLjE4MyAyMzcuMiA3NjguODg3IDI0OS43NDQgNzg0LjUwMyAyNDkuNzQ0QzgwMC42MzEgMjQ5Ljc0NCA4MDkuMDc5IDIzNy45NjggODA5LjA3OSAyMTUuOTUyVjEwMC4yNEg4NTMuODc5VjIxNS45NTJDODUzLjg3OSAyNTcuOTM2IDgyNS4yMDcgMjg2LjA5NiA3ODMuMjIzIDI4Ni4wOTZDNzQzLjU0MyAyODYuMDk2IDcxNS42MzkgMjU3LjE2OCA3MTUuMzgzIDIxNS42OTZMNzU5LjkyNyAyMTMuMzkyWk04ODQuNzgzIDEwMC4yNEgxMDE1LjM0VjEzNi41OTJIOTI5LjMyN1YxNzIuNjg4SDEwMTIuMjdWMjA5LjA0SDkyOS4zMjdWMjQ1LjY0OEgxMDE3LjM5VjI4Mkg4ODQuNzgzVjEwMC4yNFpNMTA0NS41MyAxMDAuMjRIMTE3Ni4wOVYxMzYuNTkySDEwOTAuMDhWMTcyLjY4OEgxMTczLjAyVjIwOS4wNEgxMDkwLjA4VjI0NS42NDhIMTE3OC4xNFYyODJIMTA0NS41M1YxMDAuMjRaTTEzNDguMzYgMTAwLjI0VjEzNi41OTJIMTI5NC42VjI4MkgxMjQ5LjhWMTM2LjU5MkgxMTk2LjA0VjEwMC4yNEgxMzQ4LjM2Wk0xNDY4LjcxIDIxOS41MzZDMTQ3MS41MiAyMzcuMiAxNDg0LjMyIDI0OC43MiAxNTA1LjMyIDI0OC43MkMxNTIwLjQyIDI0OC43MiAxNTMwLjkyIDI0Mi41NzYgMTUzMC45MiAyMzEuMDU2QzE1MzAuNCAyMTkuMjggMTUyMC42OCAyMTMuMTM2IDE0OTUuMDggMjA2Ljk5MkMxNDUyLjA3IDE5Ni43NTIgMTQyNy40OSAxODAuMzY4IDE0MjcuNDkgMTUxLjE4NEMxNDI3LjQ5IDExNy4zOTIgMTQ1Ni4xNiA5Ni4xNDQgMTQ5OS42OCA5Ni4xNDRDMTU0MC45IDk2LjE0NCAxNTY5LjA2IDEyMS4yMzIgMTU3My40MSAxNTguODY0TDE1MjkuMTIgMTYwLjkxMkMxNTI3LjU5IDE0Mi45OTIgMTUxNS44MSAxMzEuOTg0IDE0OTguNjYgMTMxLjk4NEMxNDgyLjc5IDEzMS45ODQgMTQ3MS43OCAxMzkuOTIgMTQ3Mi44IDE1MS45NTJDMTQ3My41NyAxNjUuMDA4IDE0ODguOTMgMTY5LjYxNiAxNTA3LjExIDE3My45NjhDMTU1MC4xMiAxODIuOTI4IDE1NzUuOTcgMjAwLjU5MiAxNTc1Ljk3IDIzMC4wMzJDMTU3NS45NyAyNjQuODQ4IDE1NDUuNzYgMjg1LjA3MiAxNTA0LjI5IDI4NS4wNzJDMTQ1OC40NyAyODUuMDcyIDE0MjYuNzIgMjYwLjQ5NiAxNDI0LjE2IDIyMS41ODRMMTQ2OC43MSAyMTkuNTM2Wk0xNjAxLjAzIDEwMC4yNEgxNjQ1LjU4VjI4MkgxNjAxLjAzVjEwMC4yNFpNMTY4MC4yOCAxMDAuMjRIMTcyNy4xM0wxNzkzLjE4IDIxNC40MTZWMTAwLjI0SDE4MzcuOThWMjgySDE3ODkuNkwxNzI0LjgzIDE3Mi40MzJWMjgySDE2ODAuMjhWMTAwLjI0Wk0yMDM0Ljg0IDI4MkgyMDA4LjQ3TDIwMDYuNDIgMjU2LjkxMkMxOTk3LjIxIDI3NS4wODggMTk3Ni43MyAyODYuMDk2IDE5NTEuMzggMjg2LjA5NkMxOTAwLjE4IDI4Ni4wOTYgMTg2NC44NSAyNDUuNjQ4IDE4NjQuODUgMTkxLjM3NkMxODY0Ljg1IDEzNi44NDggMTg5OS45MyA5Ni4xNDQgMTk1NC40NSA5Ni4xNDRDMTk5Ni40NCA5Ni4xNDQgMjAyNS42MiAxMjAuNDY0IDIwMzQuMzMgMTYxLjE2OEwxOTg3Ljk5IDE2My4yMTZDMTk4My42NCAxNDMuNzYgMTk3MS42MSAxMzIuNDk2IDE5NTMuNDMgMTMyLjQ5NkMxOTI0LjI1IDEzMi40OTYgMTkxMC42OCAxNTcuMDcyIDE5MTAuNjggMTkxLjM3NkMxOTEwLjY4IDIyNS40MjQgMTkyNC41IDI0OS43NDQgMTk1My40MyAyNDkuNzQ0QzE5NzMuOTEgMjQ5Ljc0NCAxOTg1Ljk0IDIzNi45NDQgMTk4OS41MyAyMTcuNDg4SDE5NTIuOTJWMTg2LjUxMkgyMDM0Ljg0VjI4MlpNMjA2My4yOCAyODJWMTAwLjI0SDIxMDcuODNWMTcyLjE3NkgyMTY4Ljc2VjEwMC4yNEgyMjEzLjNWMjgySDIxNjguNzZWMjA4Ljc4NEgyMTA3LjgzVjI4MkgyMDYzLjI4WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==";
const name_small_svg =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQwMCIgaGVpZ2h0PSI2NTgiIHZpZXdCb3g9IjAgMCAxNDAwIDY1OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2NC43NzIgMjcxTDIyMC4wNjggMTE3LjY0SDI2My40ODRMMzE4Ljc4IDI3MUgyODAuMzMyTDI3MC4xOCAyNDIuMDU2SDIxMy4xNTZMMjAzLjIyIDI3MUgxNjQuNzcyWk0yMjMuMzA4IDIxMi4yNDhIMjYwLjI0NEwyNDEuODg0IDE1OC4yNDhMMjIzLjMwOCAyMTIuMjQ4Wk0zMzUuNDIyIDI3MVYxMTcuNjRIMzkyLjIzQzQzNi4wNzggMTE3LjY0IDQ1Ny42NzggMTMwLjYgNDU3LjY3OCAxNjAuMTkyQzQ1Ny42NzggMTc4LjU1MiA0NDYuMDE0IDE4OS41NjggNDI1LjA2MiAxOTEuNzI4QzQ1MC43NjYgMTkzLjg4OCA0NjQuMTU4IDIwNS45ODQgNDY0LjE1OCAyMjcuNTg0QzQ2NC4xNTggMjU2LjA5NiA0NDIuNzc0IDI3MSA0MDAuODcgMjcxSDMzNS40MjJaTTM3My4wMDYgMjQxLjQwOEg0MDIuMTY2QzQxNi4yMDYgMjQxLjQwOCA0MjYuMzU4IDIzNS43OTIgNDI2LjM1OCAyMjMuNjk2QzQyNi4zNTggMjExLjgxNiA0MTYuNDIyIDIwNS45ODQgNDAyLjE2NiAyMDUuOTg0SDM3My4wMDZWMjQxLjQwOFpNMzczLjAwNiAxODAuMDY0SDM5Ni4xMThDNDEwLjE1OCAxODAuMDY0IDQxOS44NzggMTc0Ljg4IDQxOS44NzggMTYzLjg2NEM0MTkuODc4IDE1Mi4yIDQxMC41OSAxNDcuMjMyIDM5Ni4xMTggMTQ3LjIzMkgzNzMuMDA2VjE4MC4wNjRaTTQ4OC43NzQgMjcxVjExNy42NEg1MjYuMzU4VjE3OC4zMzZINTc3Ljc2NlYxMTcuNjRINjE1LjM1VjI3MUg1NzcuNzY2VjIwOS4yMjRINTI2LjM1OFYyNzFINDg4Ljc3NFpNNjM5LjM4MyAxMTcuNjRINjc2Ljk2N1YyNzFINjM5LjM4M1YxMTcuNjRaTTczOC40MzUgMjEzLjExMkM3MzguNjUxIDIzMy4yIDc0NS45OTUgMjQzLjc4NCA3NTkuMTcxIDI0My43ODRDNzcyLjc3OSAyNDMuNzg0IDc3OS45MDcgMjMzLjg0OCA3NzkuOTA3IDIxNS4yNzJWMTE3LjY0SDgxNy43MDdWMjE1LjI3MkM4MTcuNzA3IDI1MC42OTYgNzkzLjUxNSAyNzQuNDU2IDc1OC4wOTEgMjc0LjQ1NkM3MjQuNjExIDI3NC40NTYgNzAxLjA2NyAyNTAuMDQ4IDcwMC44NTEgMjE1LjA1Nkw3MzguNDM1IDIxMy4xMTJaTTg0My43ODIgMTE3LjY0SDk1My45NDJWMTQ4LjMxMkg4ODEuMzY2VjE3OC43NjhIOTUxLjM1VjIwOS40NEg4ODEuMzY2VjI0MC4zMjhIOTU1LjY3VjI3MUg4NDMuNzgyVjExNy42NFpNOTc5LjQxNSAxMTcuNjRIMTA4OS41N1YxNDguMzEySDEwMTdWMTc4Ljc2OEgxMDg2Ljk4VjIwOS40NEgxMDE3VjI0MC4zMjhIMTA5MS4zVjI3MUg5NzkuNDE1VjExNy42NFpNMTIzNC45MyAxMTcuNjRWMTQ4LjMxMkgxMTg5LjU3VjI3MUgxMTUxLjc3VjE0OC4zMTJIMTEwNi40MVYxMTcuNjRIMTIzNC45M1pNNDAyLjU0MiA0ODYuMjk2QzQwNC45MTggNTAxLjIgNDE1LjcxOCA1MTAuOTIgNDMzLjQzIDUxMC45MkM0NDYuMTc0IDUxMC45MiA0NTUuMDMgNTA1LjczNiA0NTUuMDMgNDk2LjAxNkM0NTQuNTk4IDQ4Ni4wOCA0NDYuMzkgNDgwLjg5NiA0MjQuNzkgNDc1LjcxMkMzODguNTAyIDQ2Ny4wNzIgMzY3Ljc2NiA0NTMuMjQ4IDM2Ny43NjYgNDI4LjYyNEMzNjcuNzY2IDQwMC4xMTIgMzkxLjk1OCAzODIuMTg0IDQyOC42NzggMzgyLjE4NEM0NjMuNDU0IDM4Mi4xODQgNDg3LjIxNCA0MDMuMzUyIDQ5MC44ODYgNDM1LjEwNEw0NTMuNTE4IDQzNi44MzJDNDUyLjIyMiA0MjEuNzEyIDQ0Mi4yODYgNDEyLjQyNCA0MjcuODE0IDQxMi40MjRDNDE0LjQyMiA0MTIuNDI0IDQwNS4xMzQgNDE5LjEyIDQwNS45OTggNDI5LjI3MkM0MDYuNjQ2IDQ0MC4yODggNDE5LjYwNiA0NDQuMTc2IDQzNC45NDIgNDQ3Ljg0OEM0NzEuMjMgNDU1LjQwOCA0OTMuMDQ2IDQ3MC4zMTIgNDkzLjA0NiA0OTUuMTUyQzQ5My4wNDYgNTI0LjUyOCA0NjcuNTU4IDU0MS41OTIgNDMyLjU2NiA1NDEuNTkyQzM5My45MDIgNTQxLjU5MiAzNjcuMTE4IDUyMC44NTYgMzY0Ljk1OCA0ODguMDI0TDQwMi41NDIgNDg2LjI5NlpNNTE0LjE5MiAzODUuNjRINTUxLjc3NlY1MzlINTE0LjE5MlYzODUuNjRaTTU4MS4wNTkgMzg1LjY0SDYyMC41ODdMNjc2LjMxNSA0ODEuOTc2VjM4NS42NEg3MTQuMTE1VjUzOUg2NzMuMjkxTDYxOC42NDMgNDQ2LjU1MlY1MzlINTgxLjA1OVYzODUuNjRaTTg4MC4yMTQgNTM5SDg1Ny45NjZMODU2LjIzOCA1MTcuODMyQzg0OC40NjIgNTMzLjE2OCA4MzEuMTgyIDU0Mi40NTYgODA5Ljc5OCA1NDIuNDU2Qzc2Ni41OTggNTQyLjQ1NiA3MzYuNzkgNTA4LjMyOCA3MzYuNzkgNDYyLjUzNkM3MzYuNzkgNDE2LjUyOCA3NjYuMzgyIDM4Mi4xODQgODEyLjM5IDM4Mi4xODRDODQ3LjgxNCAzODIuMTg0IDg3Mi40MzggNDAyLjcwNCA4NzkuNzgyIDQzNy4wNDhMODQwLjY4NiA0MzguNzc2QzgzNy4wMTQgNDIyLjM2IDgyNi44NjIgNDEyLjg1NiA4MTEuNTI2IDQxMi44NTZDNzg2LjkwMiA0MTIuODU2IDc3NS40NTQgNDMzLjU5MiA3NzUuNDU0IDQ2Mi41MzZDNzc1LjQ1NCA0OTEuMjY0IDc4Ny4xMTggNTExLjc4NCA4MTEuNTI2IDUxMS43ODRDODI4LjgwNiA1MTEuNzg0IDgzOC45NTggNTAwLjk4NCA4NDEuOTgyIDQ4NC41NjhIODExLjA5NFY0NTguNDMySDg4MC4yMTRWNTM5Wk05MDQuMjE1IDUzOVYzODUuNjRIOTQxLjc5OVY0NDYuMzM2SDk5My4yMDdWMzg1LjY0SDEwMzAuNzlWNTM5SDk5My4yMDdWNDc3LjIyNEg5NDEuNzk5VjUzOUg5MDQuMjE1WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==";

function NameOffScreenCanvas({
  isMobile = false,
  isLoaded,
  setIsLoaded,
  environment = "production",
}) {
  const canvasRef = React.useRef(null);
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    if (environment === "development" && counter === 0) {
      setCounter((prev) => prev + 1);
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;

    // set up webgl canvas worker
    const offscreenCanvas = canvas.transferControlToOffscreen();
    const nameCanvasWorker = new Worker("/workers/nameCanvasWorker.js", {});
    nameCanvasWorker.postMessage(
      {
        command: "init",
        canvas: offscreenCanvas,
        isMobile: isMobile,
      },
      [offscreenCanvas]
    );

    // load name image and send to worker
    let img = new Image();
    img.src = !isMobile ? name_big_svg : name_small_svg;
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

    // toggle mode uniform's value
    function handleModeToggle() {
      nameCanvasWorker.postMessage({ command: "toggleModeUniform" });
    }
    canvas.addEventListener("click", handleModeToggle);

    // set up mouse and touch events
    let handleMouseMove = null;
    let handleMouseLeave = null;
    if (!isMobile) {
      handleMouseMove = (event) => {
        const canvasRect = canvas.getBoundingClientRect();
        // normalize position into [0, 1] and flip y
        const x = (event.clientX - canvasRect.left) / canvasRect.width;
        const y = 1 - (event.clientY - canvasRect.top) / canvasRect.height;
        const point = {
          x: x,
          y: y,
        };
        nameCanvasWorker.postMessage({ command: "addPoint", point: point });
        nameCanvasWorker.postMessage({
          command: "updateMousePosition",
          mousePosition: { x, y },
        });
      };
      handleMouseLeave = () => {
        nameCanvasWorker.postMessage({
          command: "updateMousePosition",
          mousePosition: { x: -10000, y: -10000 },
        });
      };
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }
    let handleTouchMove = null;
    let handleTouchEnd = null;
    if (isMobile) {
      handleTouchMove = (event) => {
        const touch = event.touches[0];
        const canvasRect = canvas.getBoundingClientRect();
        // normalize position into [0, 1] and flip y
        const x = (touch.clientX - canvasRect.left) / canvasRect.width;
        const y = 1 - (touch.clientY - canvasRect.top) / canvasRect.height;
        const point = {
          x: x,
          y: y,
        };
        nameCanvasWorker.postMessage({ command: "addPoint", point: point });
        nameCanvasWorker.postMessage({
          command: "updateMousePosition",
          mousePosition: { x, y },
        });
      };
      handleTouchEnd = () => {
        nameCanvasWorker.postMessage({
          command: "updateMousePosition",
          mousePosition: { x: -10000, y: -10000 },
        });
      };
      canvas.addEventListener("touchmove", handleTouchMove);
      canvas.addEventListener("touchend", handleTouchEnd);
    }

    setIsLoaded(true);

    return () => {
      setIsLoaded(false);
      canvas.removeEventListener("click", handleModeToggle);
      if (!isMobile) {
        handleMouseMove &&
          canvas.removeEventListener("mousemove", handleMouseMove);
        handleMouseLeave &&
          canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (isMobile) {
        handleTouchMove &&
          canvas.removeEventListener("touchmove", handleTouchMove);
        handleTouchEnd &&
          canvas.removeEventListener("touchend", handleTouchEnd);
      }
      nameCanvasWorker.postMessage({ command: "cleanUp" });
      nameCanvasWorker.terminate();
    };
  }, [isMobile, setIsLoaded, environment, counter]);

  return (
    <canvas
      ref={canvasRef}
      className={clsx(
        "w-full h-auto cursor-pointer aspect-[700/329] sm:aspect-[2304/384] touch-none select-none",
        isMobile ? "block sm:hidden" : "hidden sm:block",
        isLoaded ? "opacity-100" : "opacity-0"
      )}
    />
  );
}

const MemoizedNameOffScreenCanvas = React.memo(NameOffScreenCanvas);
export default MemoizedNameOffScreenCanvas;
