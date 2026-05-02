import { describe, expect, it } from "vitest";
import {
  COLORS,
  MATERIALS,
  SIZES,
  getColorOptions,
  getMaterialOptions,
  getProductFilterLabels,
  toggleSelection,
} from "./productFilter.config";

describe("product filter config", () => {
  it("keeps filter option config stable", () => {
    expect(MATERIALS.map(({ value }) => value)).toEqual([
      "cotton",
      "polyester",
      "wool",
      "silk",
      "linen",
      "denim",
    ]);
    expect(SIZES).toEqual(["S", "M", "L", "XL", "XXL", "XXXL"]);
    expect(COLORS).toHaveLength(4);
  });

  it("toggles selected values", () => {
    expect(toggleSelection(null, "S")).toBe("S");
    expect(toggleSelection("S", "S")).toBeNull();
    expect(toggleSelection("S", "M")).toBe("M");
  });

  it("maps translation keys to render-ready labels", () => {
    const t = (key) => `translated:${key}`;

    expect(getProductFilterLabels(t)).toEqual({
      material: "translated:product_filter.material",
      size: "translated:product_filter.size",
      color: "translated:product_filter.color",
    });
    expect(getMaterialOptions(t)[0]).toEqual({
      value: "cotton",
      label: "translated:material.cotton",
    });
    expect(getColorOptions(t)[0]).toEqual({
      color: "var(--product-swatch-gray)",
      label: "translated:color.gray",
    });
  });
});
