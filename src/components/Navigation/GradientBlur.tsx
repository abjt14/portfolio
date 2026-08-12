"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function GradientBlur() {
  const layerCount = 5;

  const blurStep = 100 / (layerCount + 1);

  const path = usePathname();

  // check if path is a lab/[slug] page
  const isLabExperiement = path.includes("/lab/");

  return (
    <div className="fixed -bottom-8 lg:-top-8 left-1/2 w-lvw h-14 -translate-x-1/2 z-40">
      {/* this div acts as a good fade out effect for the textual content */}
      {/* but the main reason to use it is that it can hide the artifacts and flickers */}
      {/* we see on text when using backdropm filter blur */}
      {isLabExperiement && (
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t lg:bg-gradient-to-b from-neutral-200 dark:from-neutral-925 to-transparent"></div>
      )}
      {[...Array(layerCount)].map((_, i) => {
        const backdropFilter = `blur(${i + 1}px)`;
        const maskDesktop = `linear-gradient(to top, rgba(0, 0, 0, 0) ${
          0 + i * blurStep
        }%, rgba(0, 0, 0, 1) ${blurStep + i * blurStep}%, rgba(0, 0, 0, 1) ${
          blurStep * 2 + i * blurStep
        }%, rgba(0, 0, 0, 0) ${blurStep * 3 + i * blurStep}%)`;
        const maskMobile = `linear-gradient(to bottom, rgba(0, 0, 0, 0) ${
          0 + i * blurStep
        }%, rgba(0, 0, 0, 1) ${blurStep + i * blurStep}%, rgba(0, 0, 0, 1) ${
          blurStep * 2 + i * blurStep
        }%, rgba(0, 0, 0, 0) ${blurStep * 3 + i * blurStep}%)`;
        const styles = {
          zIndex: i,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
        };
        return (
          <React.Fragment key={i}>
            <div
              className="hidden lg:block absolute inset-0"
              style={{
                ...styles,
                mask: maskDesktop,
                WebkitMask: maskDesktop,
              }}
            />
            <div
              className="lg:hidden block absolute inset-0"
              style={{
                ...styles,
                mask: maskMobile,
                WebkitMask: maskMobile,
              }}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}

// original code for the "gradient blur" by codepen.io/silas
// https://codepen.io/silas/pen/rNYqZoz
