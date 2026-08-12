"use client";

import React from "react";

type WorkerName = "nameCanvas" | "consumingStars";

type TypedWorker<TMessage> = {
  post(message: TMessage, transfer?: Transferable[]): void;
  terminate(): void;
};

function createTypedWorker<TMessage>(name: WorkerName): TypedWorker<TMessage> {
  const worker = new Worker(`/workers/${name}.worker.js`, { type: "module" });

  worker.onerror = (event) => {
    console.error(`[${name}.worker] failed to load or threw`, event);
  };

  return {
    post(message, transfer) {
      worker.postMessage(message, transfer ?? []);
    },
    terminate() {
      worker.terminate();
    },
  };
}

export function useOffscreenCanvasWorker<TMessage>({
  name,
  init,
  onWorker,
}: {
  name: WorkerName;
  init: (canvas: OffscreenCanvas) => TMessage;
  onWorker?: (
    worker: TypedWorker<TMessage>,
    canvas: HTMLCanvasElement
  ) => (() => void) | void;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const initRef = React.useRef(init);
  const onWorkerRef = React.useRef(onWorker);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let worker: TypedWorker<TMessage> | undefined;
    let teardown: (() => void) | void;

    const scheduled = setTimeout(() => {
      const offscreenCanvas = canvas.transferControlToOffscreen();
      worker = createTypedWorker<TMessage>(name);
      worker.post(initRef.current(offscreenCanvas), [offscreenCanvas]);
      teardown = onWorkerRef.current?.(worker, canvas);
    }, 0);

    return () => {
      clearTimeout(scheduled);
      teardown?.();
      worker?.terminate();
    };
  }, [name]);

  return canvasRef;
}
