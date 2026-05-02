import { useEffect, useState } from "react";

export const DEFAULT_COLUMN_BREAKPOINTS = Object.freeze([
  { minWidth: 1024, columns: 3 },
  { minWidth: 640, columns: 2 },
  { minWidth: 0, columns: 1 },
]);

export const getColumnCountForWidth = (
  width,
  breakpoints = DEFAULT_COLUMN_BREAKPOINTS
) =>
  breakpoints.find(({ minWidth }) => width >= minWidth)?.columns ??
  breakpoints.at(-1)?.columns ??
  1;

const getInitialColumns = (breakpoints) => {
  if (typeof window === "undefined") {
    return breakpoints[0]?.columns ?? 1;
  }

  return getColumnCountForWidth(window.innerWidth, breakpoints);
};

const useResponsiveColumns = (breakpoints = DEFAULT_COLUMN_BREAKPOINTS) => {
  const [columns, setColumns] = useState(() => getInitialColumns(breakpoints));

  useEffect(() => {
    let frame = 0;

    const updateColumns = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setColumns(getColumnCountForWidth(window.innerWidth, breakpoints));
      });
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateColumns);
    };
  }, [breakpoints]);

  return columns;
};

export default useResponsiveColumns;
