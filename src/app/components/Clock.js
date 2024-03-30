"use client";

import React from "react";
import clsx from "clsx";

export default function Clock({ className = "" }) {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const raw = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "America/Vancouver",
  });

  const hour = raw.slice(0, 2);
  const minute = raw.slice(3, 5);
  const second = raw.slice(6, 8);

  return (
    <div
      className={clsx(
        "text-base sm:text-sm font-geistmono font-medium text-center flex flex-row sm:flex-col gap-2 sm:gap-0 lg:gap-2 lg:flex-row justify-center items-center",
        className
      )}
    >
      <p>
        {" "}
        <span suppressHydrationWarning>{hour}</span>
        <span className="text-neutral-500">:</span>
        <span suppressHydrationWarning>{minute}</span>
        <span className="text-neutral-500">:</span>
        <span suppressHydrationWarning>{second}</span>
      </p>
      <span className="text-neutral-500 block sm:hidden lg:block"> PST</span>
      <span className="text-neutral-500 hidden sm:block lg:hidden">
        {" "}
        Vancouver
      </span>
    </div>
  );
}
