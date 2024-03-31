"use client";

import React from "react";

export default function ConsumingStarsCanvas() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dimension = 192;
    canvas.width = dimension;
    canvas.height = dimension;

    class Circle {
      constructor() {
        const angle = Math.random() * Math.PI + Math.PI;
        const distance = (dimension / 2) * Math.random();
        this.x = canvas.width / 2 + distance * Math.cos(angle);
        this.y = canvas.height / 2 + distance * Math.sin(angle);
        this.originalX = this.x;
        this.originalY = this.y;
        this.radius = (Math.random() * dimension) / 100;
        this.color = "rgba(255, 255, 255, 0)";
        this.timestamp = 0;
        this.speed = ((0.03125 + Math.random()) * dimension) / 100;
        this.delay = Math.random() * Math.random() * 5000;
      }

      draw(timestamp) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        this.timestamp = timestamp;
        this.update();
      }

      update() {
        if (this.timestamp < this.delay) {
          return;
        }

        // move towards center of the canvas
        const dx = canvas.width / 2 - this.x;
        const dy = canvas.height / 2 - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ux = dx / dist;
        const uy = dy / dist;
        this.x += ux * this.speed;
        this.y += uy * this.speed;

        if (
          parseInt(this.x.toFixed(0)) === dimension / 2 &&
          parseInt(this.y.toFixed(0)) === dimension / 2
        ) {
          this.x = this.originalX;
          this.y = this.originalY;
          this.timestamp = 0;
        }

        // update alpha
        const initialRelativeDistanceFromCenter =
          1 - this.originalY / (dimension / 2);
        const relativeDistanceFromCenter = 1 - this.y / (dimension / 2);
        this.color = `rgba(255, 255, 255, ${
          (initialRelativeDistanceFromCenter - relativeDistanceFromCenter) /
          initialRelativeDistanceFromCenter
        })`;
      }
    }

    let circles = [];
    for (let i = 0; i < 64; i++) {
      const newCircle = new Circle();
      circles.push(newCircle);
    }

    let raf_id = null;
    function animate(timestamp) {
      raf_id = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      circles.forEach((circle) => {
        circle.draw(timestamp);
      });
    }
    raf_id = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf_id);
      circles = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full z-50" />;
}
