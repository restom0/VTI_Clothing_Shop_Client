import { useMemo } from "react";

export const sortRows = (rows, sort) => {
  const sortIndex = sort?.id ?? 0;
  const direction = sort?.type === "DESC" ? -1 : 1;

  return [...rows].sort((firstRow, secondRow) => {
    const firstValue = Object.values(firstRow)[sortIndex];
    const secondValue = Object.values(secondRow)[sortIndex];

    if (firstValue === secondValue) return 0;

    return firstValue > secondValue ? direction : -direction;
  });
};

const useSortedRows = (rows, sort) => useMemo(() => sortRows(rows, sort), [rows, sort]);

export default useSortedRows;
