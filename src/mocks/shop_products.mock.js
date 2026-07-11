import { PRODUCT_COLOR_SWATCHES } from "../constants/product_color.constant";

export const SHOP_PRODUCT_IMAGE_URL =
  "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80";

export const SHOP_PRODUCT_COLORS = PRODUCT_COLOR_SWATCHES.map(({ color, label }) => ({
  color,
  label,
}));

export const createShopMockProducts = (count = 7) =>
  Array.from({ length: count }, (_, id) => ({
    id,
    colors: SHOP_PRODUCT_COLORS,
    price: id < 5 ? 155000 : 155,
    rating: 4,
    imageUrl: SHOP_PRODUCT_IMAGE_URL,
    title: "Abisko Trail Stretch Trousers M",
  }));

export const SHOP_MOCK_PRODUCTS = createShopMockProducts();
