import { describe, expect, it } from "vitest";
import {
  SHOP_MOCK_PRODUCTS,
  SHOP_PRODUCT_COLORS,
  createShopMockProducts,
} from "./shop_products.mock";

describe("shop product mocks", () => {
  it("uses shared color swatches for mock products", () => {
    expect(SHOP_PRODUCT_COLORS[0]).toEqual({
      color: "var(--product-swatch-gray)",
      label: "Màu xám",
    });
    expect(SHOP_MOCK_PRODUCTS).toHaveLength(7);
    expect(SHOP_MOCK_PRODUCTS[0].colors).toBe(SHOP_PRODUCT_COLORS);
  });

  it("can generate a stable number of mock products", () => {
    expect(createShopMockProducts(2).map(({ id }) => id)).toEqual([0, 1]);
  });
});
