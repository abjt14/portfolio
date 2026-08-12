export type Point = { x: number; y: number };

/**
 * Separate from the worker implementation so the app can import it without
 * pulling worker-only globals into a DOM-lib program.
 */
export type NameCanvasMessage =
  | { command: "init"; canvas: OffscreenCanvas; isMobile: boolean }
  | { command: "setNameTexture"; image: ImageData }
  | { command: "toggleModeUniform" }
  | { command: "addPoint"; point: Point }
  | { command: "updateMousePosition"; mousePosition: Point };
