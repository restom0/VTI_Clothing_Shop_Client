import { PRODUCT_COLOR_SWATCHES } from "../../../constants/product_color.constant";

export const MATERIALS = [
  { value: "cotton", labelKey: "material.cotton" },
  { value: "polyester", labelKey: "material.polyester" },
  { value: "wool", labelKey: "material.wool" },
  { value: "silk", labelKey: "material.silk" },
  { value: "linen", labelKey: "material.linen" },
  { value: "denim", labelKey: "material.denim" },
];

export const SIZES = ["S", "M", "L", "XL", "XXL", "XXXL"];

export const COLORS = PRODUCT_COLOR_SWATCHES.map(({ color, labelKey }) => ({
  color,
  labelKey,
}));

/** Toggles selection. */
export const toggleSelection = (currentValue, nextValue) =>
  currentValue === nextValue ? null : nextValue;

/** Gets product filter labels. */
export const getProductFilterLabels = (t) => ({
  material: t("product_filter.material"),
  size: t("product_filter.size"),
  color: t("product_filter.color"),
});

/** Gets material options. */
export const getMaterialOptions = (t) =>
  MATERIALS.map(({ value, labelKey }) => ({
    value,
    label: t(labelKey),
  }));

/** Gets color options. */
export const getColorOptions = (t) =>
  COLORS.map(({ color, labelKey }) => ({
    color,
    label: t(labelKey),
  }));
