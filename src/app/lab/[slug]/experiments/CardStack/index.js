"use client";

import React from "react";
import clsx from "clsx";
import Cards from "./Cards";
import DashedLine from "@/components/DashedLine";

export default function CardStack({ demo = false }) {
  // for the demo, we are toggling the card styles using options
  const [options, setOptions] = React.useState({
    scrollSnap: {
      enabled: true,
      title: "Scroll Snap",
    },
    translateX: {
      enabled: true,
      title: "translateX",
    },
    scale: {
      enabled: true,
      title: "scale",
    },
    zIndex: {
      enabled: true,
      title: "z-index",
    },
    rotateY: {
      enabled: true,
      title: "rotateY",
    },
    perspective: {
      enabled: true,
      title: "perspective",
    },
  });

  return (
    <>
      <Cards options={options}>
        {[...Array(7)].map((_, index) => (
          <div
            key={"card-content-" + index}
            className="bg-cover bg-center w-32 h-40 shadow-lg shadow-neutral-350 dark:shadow-neutral-950 rounded-2xl bg-black dark:bg-white"
            style={{
              backgroundImage: `url(/lab/card-stack/assets/images/${
                index + 1
              }.jpeg)`,
            }}
          />
        ))}
      </Cards>
      {demo && (
        <div className="h-full w-full sm:w-[calc(100%-24rem)] relative pt-14 sm:pt-0">
          <DashedLine
            direction="vertical"
            className="hidden sm:block !h-[200%] -top-1/2 left-0 z-50"
          />
          <DashedLine
            direction="horizontal"
            className="block sm:hidden top-4 z-50"
          />
          <OptionsControl options={options} setOptions={setOptions} />
        </div>
      )}
    </>
  );
}

function OptionsControl({ options, setOptions }) {
  // divide the options object into an array of objects with 2 key-value pairs
  // this way we can stack them verticall on desktop
  // and in rows of 2 on mobile
  const optionsArray = Object.entries(options).reduce(
    (acc, [key, value], index) => {
      if (index % 2 === 0) {
        acc.push({ [key]: value });
      } else {
        acc[acc.length - 1] = { ...acc[acc.length - 1], [key]: value };
      }
      return acc;
    },
    []
  );
  return (
    <div className="flex flex-col gap-2 sm:gap-4 justify-center items-center flex-wrap pb-8 sm:pb-0">
      {optionsArray.map((options, index) => (
        <div
          key={index}
          className="flex flex-row sm:flex-col gap-2 sm:gap-4 justify-center items-center"
        >
          {Object.keys(options).map((option) => (
            <button
              key={option}
              className={clsx(
                "flex-auto border px-4 py-1 rounded-full bg-neutral-300 dark:bg-neutral-850 flex gap-2 items-center justify-between outline-none focus-visible:ring-1 ring-neutral-950 dark:ring-neutral-50 transition-[border]",
                options[option].enabled
                  ? "border-neutral-350 dark:border-neutral-800 duration-75"
                  : "border-transparent dark:border-transparent duration-150"
              )}
              onClick={() =>
                setOptions((prevOptions) => ({
                  ...prevOptions,
                  [option]: {
                    ...prevOptions[option],
                    enabled: !prevOptions[option].enabled,
                  },
                }))
              }
            >
              <div
                className={clsx(
                  "p-1 rounded-full transition-all",
                  options[option].enabled
                    ? "bg-neutral-950 dark:bg-neutral-50 [box-shadow:0px_0px_8px_rgba(10,_10,_10,_0.75)] dark:[box-shadow:0px_0px_8px_rgba(250,250,250,0.5)] duration-75"
                    : "bg-neutral-400 dark:bg-neutral-600 duration-150"
                )}
              ></div>
              <span
                className={clsx(
                  "text-base sm:text-sm transition-all",
                  options[option].enabled
                    ? "text-neutral-950 dark:text-neutral-50 duration-75"
                    : "text-neutral-450 dark:text-neutral-600 duration-150"
                )}
              >
                {option}
              </span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
