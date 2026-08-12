"use client";

import { experiments } from "@/data/experiments";
import ExperimentPreview from "@/app/lab/components/ExperimentPreview";
import useWindowBreakpoints, {
  type Breakpoint,
} from "@/hooks/useWindowBreakpoints";

const columnsAt: Record<Breakpoint, number> = {
  xs: 1,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 3,
};

export default function Masonry() {
  const windowBreakpoint = useWindowBreakpoints();

  // nothing to render until the first measurement lands
  if (!windowBreakpoint) return null;

  const count = columnsAt[windowBreakpoint];
  return count === 1 ? <SingleColumn /> : <Columns count={count} />;
}

/** Not a `<Columns count={1} />`: wider gap, no column wrappers. */
function SingleColumn() {
  return (
    <div className="flex flex-col justify-center items-start gap-4">
      {experiments.map((experiment) => (
        <ExperimentPreview key={experiment.slug} experiments={experiment} />
      ))}
    </div>
  );
}

function Columns({ count }: { count: number }) {
  // deal the experiments round-robin so each column stays in source order
  const columns = Array.from({ length: count }, (_, column) =>
    experiments.filter((_, index) => index % count === column)
  );

  return (
    <div className="flex flex-row justify-center items-start gap-1">
      {columns.map((column, index) => (
        <div key={index} className="flex-1 flex flex-col gap-1">
          {column.map((experiment) => (
            <ExperimentPreview key={experiment.slug} experiments={experiment} />
          ))}
        </div>
      ))}
    </div>
  );
}
