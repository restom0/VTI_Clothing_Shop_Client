import { describe, expect, it } from "vitest";
import {
  getHomeErrorMessage,
  getHomeLabels,
  getProductId,
  getUniqueProducts,
} from "./home.page.helpers";

const product = (id, name = `Product ${id}`) => ({
  product_id: {
    product_id: {
      id,
      name,
    },
  },
});

describe("home page helpers", () => {
  it("reads nested product ids safely", () => {
    expect(getProductId(product(10))).toBe(10);
    expect(getProductId({})).toBeUndefined();
  });

  it("deduplicates products by nested product id", () => {
    const result = getUniqueProducts({
      object: [product(1, "A"), product(2, "B"), product(1, "A duplicate")],
    });

    expect(result).toHaveLength(2);
    expect(result.map(getProductId)).toEqual([1, 2]);
  });

  it("keeps products without ids instead of merging unrelated records", () => {
    expect(getUniqueProducts({ object: [{}, {}] })).toHaveLength(2);
    expect(getUniqueProducts()).toEqual([]);
  });

  it("builds labels and error messages through t", () => {
    const t = (key, params) => (params?.message ? `${key}:${params.message}` : key);

    expect(getHomeLabels(t)).toEqual({
      newProducts: "home.new_products",
      styleQuote: "home.style_quote",
      newsletterTitle: "home.newsletter_title",
      newsletterCopy: "home.newsletter_copy",
      emailLabel: "home.email_label",
    });
    expect(getHomeErrorMessage(new Error("Boom"), t)).toBe("common.error:Boom");
  });
});
