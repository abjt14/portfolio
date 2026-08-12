export type Point = { x: number; y: number };

export type NameCanvasMessage =
  | { command: "init"; canvas: OffscreenCanvas; isMobile: boolean }
  | { command: "setNameTexture"; image: ImageData }
  | { command: "toggleModeUniform" }
  | { command: "addPoint"; point: Point }
  | { command: "updateMousePosition"; mousePosition: Point };
