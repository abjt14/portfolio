"use client";

import React from "react";
import {
  useFloating,
  useFocus,
  useHover,
  useInteractions,
} from "@floating-ui/react";

export default function Tooltip({ children, text }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: "top",
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const hover = useHover(context, {
    delay: {
      open: 300,
      close: 0,
    },
  });

  const focus = useFocus(context, {
    delay: {
      open: 300,
      close: 0,
    },
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
  ]);

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="relative outline-none"
      >
        {children}
        <span className="relative text-xs text-neutral-500 font-semibold align-top">
          ?
        </span>
      </button>
      {isOpen && (
        <span
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="relative max-w-64 py-2 px-4 text-sm text-center text-balance text-neutral-50 bg-neutral-700 rounded-lg shadow-sm shadow-black animate-fade-in-150 after:content-[''] after:absolute after:h-2 after:w-2 after:bg-neutral-700 after:top-full after:left-1/2 after:rotate-45 after:-translate-y-1/2 after:shadow-sm after:shadow-black after:[clip-path:polygon(0_100%,100%_100%,100%_0)]"
        >
          {text}
        </span>
      )}
    </>
  );
}
