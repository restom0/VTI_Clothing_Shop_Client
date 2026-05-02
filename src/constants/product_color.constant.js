export const PRODUCT_SWATCH_COLORS = Object.freeze({
  blue: "var(--product-swatch-blue)",
  darkGray: "var(--product-swatch-dark-gray)",
  gray: "var(--product-swatch-gray)",
  yellow: "var(--product-swatch-yellow)",
});

export const PRODUCT_COLOR_SWATCHES = Object.freeze([
  {
    color: PRODUCT_SWATCH_COLORS.gray,
    label: "Màu xám",
    labelKey: "color.gray",
  },
  {
    color: PRODUCT_SWATCH_COLORS.yellow,
    label: "Màu vàng",
    labelKey: "color.yellow",
  },
  {
    color: PRODUCT_SWATCH_COLORS.blue,
    label: "Màu xanh",
    labelKey: "color.blue",
  },
  {
    color: PRODUCT_SWATCH_COLORS.darkGray,
    label: "Màu xám đen",
    labelKey: "color.dark_gray",
  },
]);
