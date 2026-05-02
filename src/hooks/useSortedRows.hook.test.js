import { describe, expect, it } from "vitest";
import { sortRows } from "./useSortedRows.hook";

describe("row sorting helper", () => {
  it("sorts rows by selected object-value index", () => {
    const rows = [
      { id: 1, name: "B" },
      { id: 2, name: "A" },
    ];

    expect(sortRows(rows, { id: 1, type: "ASC" }).map(({ id }) => id)).toEqual([
      2,
      1,
    ]);
    expect(
      sortRows(rows, { id: 1, type: "DESC" }).map(({ id }) => id)
    ).toEqual([1, 2]);
  });
});
