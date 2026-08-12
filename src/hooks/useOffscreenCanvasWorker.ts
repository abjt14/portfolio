"use client";

import React from "react";

/** Basenames under src/workers, compiled to public/workers by `build:workers`. */
type WorkerName = "nameCanvas" | "consumingStars";

type TypedWorker<TMessage> = {
  post(message: TMessage, transfer?: Transferable[]): void;
  terminate(): void;
};

function createTypedWorker<TMessage>(name: WorkerName): TypedWorker<TMessage> {
  const worker = new Worker(`/workers/${name}.worker.js`, { type: "module" });

  // A missing or broken worker is otherwise silent: the canvas just stays blank.
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

/**
 * Hands a <canvas> off to a worker via OffscreenCanvas and owns the lifecycle.
 * Sends go through `post` so they are checked against the message contract --
 * `Worker.postMessage` itself accepts `any`. `onWorker` runs after init is
 * posted and may return a cleanup.
 */
export function useOffscreenCanvasWorker<TMessage>({
  name,
  init,
  onWorker,
}: {
  name: WorkerName;
  /** Built once the canvas is transferred. Must include the OffscreenCanvas. */
  init: (canvas: OffscreenCanvas) => TMessage;
  onWorker?: (
    worker: TypedWorker<TMessage>,
    canvas: HTMLCanvasElement
  ) => (() => void) | void;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Read once, inside the effect below, so inline closures do not re-run it.
  const initRef = React.useRef(init);
  const onWorkerRef = React.useRef(onWorker);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let worker: TypedWorker<TMessage> | undefined;
    let teardown: (() => void) | void;

    // Deferred by a task so StrictMode's double invoke collapses to one setup:
    // the first pass schedules, its cleanup cancels before anything runs, and
    // the second pass schedules again. transferControlToOffscreen() is
    // once-per-element and posting the result detaches it, so running twice
    // would throw. Same path in dev and production.
    const scheduled = setTimeout(() => {
      const offscreenCanvas = canvas.transferControlToOffscreen();
      worker = createTypedWorker<TMessage>(name);
      worker.post(initRef.current(offscreenCanvas), [offscreenCanvas]);
      teardown = onWorkerRef.current?.(worker, canvas);
    }, 0);

    return () => {
      clearTimeout(scheduled);
      teardown?.();
      // terminate() discards queued work, so a graceful cleanUp message would
      // not be delivered anyway; the worker's GL context dies with it.
      worker?.terminate();
    };
  }, [name]);

  return canvasRef;
}
