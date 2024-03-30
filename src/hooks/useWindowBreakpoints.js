"use client";

import React from "react";

export default function useWindowBreakpoints(options = {}) {
  const [breakpoint, setBreakpoint] = React.useState(false);
  const isMobile = options.isMobile || false;

  React.useEffect(() => {
    const handleResize = () => {
      if (!isMobile) {
        if (window.innerWidth < 640 && breakpoint !== "xs") {
          setBreakpoint("xs");
        } else if (
          window.innerWidth >= 640 &&
          window.innerWidth < 768 &&
          breakpoint !== "sm"
        ) {
          setBreakpoint("sm");
        } else if (
          window.innerWidth >= 768 &&
          window.innerWidth < 1024 &&
          breakpoint !== "md"
        ) {
          setBreakpoint("md");
        } else if (
          window.innerWidth >= 1024 &&
          window.innerWidth < 1280 &&
          breakpoint !== "lg"
        ) {
          setBreakpoint("lg");
        } else if (window.innerWidth >= 1280 && breakpoint !== "xl") {
          setBreakpoint("xl");
        }
      } else {
        if (window.innerWidth < 640 && breakpoint !== "xs") {
          setBreakpoint("xs");
        } else if (window.innerWidth >= 640 && breakpoint !== "sm") {
          setBreakpoint("sm");
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint, isMobile]);

  return breakpoint;
}
