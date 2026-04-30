export const MATERIALS = [
  { value: "cotton", labelKey: "material.cotton" },
  { value: "polyester", labelKey: "material.polyester" },
  { value: "wool", labelKey: "material.wool" },
  { value: "silk", labelKey: "material.silk" },
  { value: "linen", labelKey: "material.linen" },
  { value: "denim", labelKey: "material.denim" },
];

export const SIZES = ["S", "M", "L", "XL", "XXL", "XXXL"];

export const COLORS = [
  { color: "#aaaaaa", labelKey: "color.gray" },
  { color: "#ffffaa", labelKey: "color.yellow" },
  { color: "#012345", labelKey: "color.blue" },
  { color: "#777777", labelKey: "color.dark_gray" },
];

export const toggleSelection = (currentValue, nextValue) =>
  currentValue === nextValue ? null : nextValue;

export const getProductFilterLabels = (t) => ({
  material: t("product_filter.material"),
  size: t("product_filter.size"),
  color: t("product_filter.color"),
});

export const getMaterialOptions = (t) =>
  MATERIALS.map(({ value, labelKey }) => ({
    value,
    label: t(labelKey),
  }));

export const getColorOptions = (t) =>
  COLORS.map(({ color, labelKey }) => ({
    color,
    label: t(labelKey),
  }));
