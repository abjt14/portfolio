/**
 * Separate from the worker implementation so the app can import it without
 * pulling worker-only globals into a DOM-lib program.
 */
export type ConsumingStarsMessage = { command: "init"; canvas: OffscreenCanvas };
