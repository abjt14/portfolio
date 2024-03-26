export default class PaintingTexture {
  constructor(height, width, isMobile, options = {}) {
    this.points = [];
    this.height = height / 16;
    this.width = width / 16;
    this.radius = this.width * (!isMobile ? 0.0384 : 0.0768);
    this.maxAge = 32;
    this.intensityFactor = 1.0;
    this.options = options;
    this.mousePosition = { x: -10000, y: -10000 };
    this.id = Math.random();

    this.initTexture();
  }

  initTexture() {
    this.canvas = new OffscreenCanvas(this.width, this.height);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");
    this.clear();
  }

  clear() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  addPoint(point) {
    this.points.push({ x: point.x, y: point.y, age: 0 });
  }

  drawPoint(point) {
    // Convert normalized position into canvas coordinates and scale
    const pos = {
      x: point.x * this.width,
      y: (1 - point.y) * this.height,
    };
    const radius = this.radius;
    const ctx = this.ctx;

    let intensity = 1;
    intensity = 1 - point.age / this.maxAge;

    let color = "255,255,255";

    // 1. Give the shadow a high offset.
    let offset = this.width * 5;
    ctx.shadowOffsetX = offset;
    ctx.shadowOffsetY = offset;
    ctx.shadowBlur = radius * 1;
    ctx.shadowColor = `rgba(${color},${this.intensityFactor * intensity})`;

    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(255,255,255,1)";

    // 2. Move the point to the other direction of the offset
    this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  update() {
    this.clear();

    this.points.forEach((point, i) => {
      point.age += 1;
      if (point.age > this.maxAge) {
        this.points.splice(i, 1);
      }
    });
    this.points.forEach((point) => {
      this.drawPoint(point);
    });

    // add new point
    let pos = {
      x: this.mousePosition.x,
      y: this.mousePosition.y,
    };

    this.addPoint(pos);

    // console.log(this.id);
  }

  cleanUp() {
    this.canvas = null;
    this.ctx = null;
    this.points = [];
  }
}
