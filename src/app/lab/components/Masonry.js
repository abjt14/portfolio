"use client";

import React from "react";
import { experiments } from "@/data/experiments";
import ExperimentPreview from "@/app/lab/components/ExperimentPreview";
import useWindowBreakpoints from "@/hooks/useWindowBreakpoints";

export default function Masonry() {
  const windowBreakpoint = useWindowBreakpoints();

  if (windowBreakpoint === "sm" || windowBreakpoint === "xs") {
    return <OneColumn />;
  }
  if (windowBreakpoint === "md") {
    return <TwoColumns />;
  }
  if (windowBreakpoint === "lg" || windowBreakpoint === "xl") {
    return <ThreeColumns />;
  }
}

function OneColumn() {
  return (
    <div className="flex flex-col justify-center items-start gap-4">
      {experiments.map((experiment, index) => (
        <ExperimentPreview key={index} experiments={experiment} />
      ))}
    </div>
  );
}

function TwoColumns() {
  const leftColumn = experiments.filter(
    (experiment, index) => index % 2 === 0 && experiment
  );
  const rightColumn = experiments.filter(
    (experiment, index) => index % 2 !== 0 && experiment
  );

  return (
    <div className="flex flex-row justify-center items-start gap-1">
      <div className="flex-1 flex flex-col gap-1">
        {leftColumn.map((experiment, index) => (
          <ExperimentPreview key={index} experiments={experiment} />
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-1">
        {rightColumn.map((experiment, index) => (
          <ExperimentPreview key={index} experiments={experiment} />
        ))}
      </div>
    </div>
  );
}

function ThreeColumns() {
  const leftColumn = experiments.filter(
    (experiment, index) => index % 3 === 0 && experiment
  );
  const middleColumn = experiments.filter(
    (experiment, index) => index % 3 === 1 && experiment
  );
  const rightColumn = experiments.filter(
    (experiment, index) => index % 3 === 2 && experiment
  );

  return (
    <div className="flex flex-row justify-center items-start gap-1">
      <div className="flex-1 flex flex-col gap-1">
        {leftColumn.map((experiment, index) => (
          <ExperimentPreview key={index} experiments={experiment} />
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-1">
        {middleColumn.map((experiment, index) => (
          <ExperimentPreview key={index} experiments={experiment} />
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-1">
        {rightColumn.map((experiment, index) => (
          <ExperimentPreview key={index} experiments={experiment} />
        ))}
      </div>
    </div>
  );
}
