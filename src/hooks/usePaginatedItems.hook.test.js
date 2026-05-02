import { describe, expect, it } from "vitest";
import { getPageCount, getPageItems } from "./usePaginatedItems.hook";

describe("pagination helpers", () => {
  it("calculates page count and slices page items", () => {
    const items = [1, 2, 3, 4, 5];

    expect(getPageCount(items.length, 2)).toBe(3);
    expect(getPageItems(items, 2, 2)).toEqual([3, 4]);
  });
});
