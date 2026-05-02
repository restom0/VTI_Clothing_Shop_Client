import { describe, expect, it } from "vitest";
import { getColumnCountForWidth } from "./useResponsiveColumns.hook";

describe("responsive column helper", () => {
  it("maps viewport width to column count", () => {
    expect(getColumnCountForWidth(1280)).toBe(3);
    expect(getColumnCountForWidth(800)).toBe(2);
    expect(getColumnCountForWidth(375)).toBe(1);
  });
});
