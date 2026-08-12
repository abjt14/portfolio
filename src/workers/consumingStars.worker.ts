/// <reference lib="webworker" />
import type { ConsumingStarsMessage } from "./consumingStars.messages";

declare const self: DedicatedWorkerGlobalScope;

class ConsumingStarsCanvas {
  canvas: OffscreenCanvas;
  dimension: number;
  ctx: OffscreenCanvasRenderingContext2D | null = null;
  circles: Circle[] = [];

  constructor(canvas: OffscreenCanvas) {
    this.canvas = canvas;
    this.dimension = 256;
  }

  init() {
    this.canvas.width = this.dimension;
    this.canvas.height = this.dimension;
    this.ctx = this.canvas.getContext("2d");
    this.circles = [];
    this.createCircles();
  }

  createCircles() {
    if (!this.ctx) return;
    for (let i = 0; i < 100; i++) {
      this.circles.push(new Circle(this.ctx, this.dimension));
    }
  }

  draw(timestamp: number) {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.circles.forEach((circle) => {
      circle.draw(timestamp);
    });
  }

}

class Circle {
  ctx: OffscreenCanvasRenderingContext2D;
  dimension: number;
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  radius: number;
  color: string;
  timestamp: number;
  speed: number;
  delay: number;

  constructor(ctx: OffscreenCanvasRenderingContext2D, dimension: number) {
    this.ctx = ctx;
    this.dimension = dimension;
    const angle = Math.random() * Math.PI + Math.PI;
    const distance = (this.dimension / 2) * Math.random();
    this.x = this.dimension / 2 + distance * Math.cos(angle);
    this.y = this.dimension / 2 + distance * Math.sin(angle);
    this.originalX = this.x;
    this.originalY = this.y;
    this.radius = (Math.random() * this.dimension) / 100;
    this.color = "rgba(255, 255, 255, 0)";
    this.timestamp = 0;
    this.speed = ((0.03125 + Math.random()) * this.dimension) / 100;
    this.delay = Math.random() * Math.random() * 4 + 1;
  }

  draw(timestamp: number) {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.timestamp = timestamp;
    this.update();
  }

  update() {
    if (this.timestamp < this.delay) {
      return;
    }

    // move towards center of the canvas
    const dx = this.dimension / 2 - this.x;
    const dy = this.dimension / 2 - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / dist;
    const uy = dy / dist;
    this.x += ux * this.speed;
    this.y += uy * this.speed;

    // reset position and timestamp if it reaches the center
    if (
      parseInt(this.x.toFixed(0)) === this.dimension / 2 &&
      parseInt(this.y.toFixed(0)) === this.dimension / 2
    ) {
      this.x = this.originalX;
      this.y = this.originalY;
      this.timestamp = 0;
    }

    // update alpha
    const initialRelativeDistanceFromCenter =
      1 - this.originalY / (this.dimension / 2);
    const relativeDistanceFromCenter = 1 - this.y / (this.dimension / 2);
    this.color = `rgba(255, 255, 255, ${
      (initialRelativeDistanceFromCenter - relativeDistanceFromCenter) /
      initialRelativeDistanceFromCenter
    })`;
  }
}

let consumingStarsCanvas: ConsumingStarsCanvas | null = null;
let lastRender = 0;

function render(timestamp: number) {
  const delta = timestamp - lastRender;

  // limit to 60 fps
  if (delta >= 1000 / 60) {
    consumingStarsCanvas?.draw(timestamp / 1000);
    lastRender = timestamp;
  }

  self.requestAnimationFrame(render);
}

self.onmessage = (event: MessageEvent<ConsumingStarsMessage>) => {
  const message = event.data;

  if (message.command === "init") {
    consumingStarsCanvas = new ConsumingStarsCanvas(message.canvas);
    consumingStarsCanvas.init();
    self.requestAnimationFrame(render);
  }
};
