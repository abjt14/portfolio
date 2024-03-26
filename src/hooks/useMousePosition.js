"use client";

import React from "react";

export default function useMousePosition() {
  const [position, setPosition] = React.useState({ x: -10000, y: -10000 });

  React.useEffect(() => {
    function setPositionFromEvent(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("mousemove", setPositionFromEvent);

    return () => window.removeEventListener("mousemove", setPositionFromEvent);
  }, []);

  return position;
}
