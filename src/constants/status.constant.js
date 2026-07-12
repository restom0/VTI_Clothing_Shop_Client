// Domain status / filter values shared across the app. Use these instead of raw
// string literals so equality checks can't drift from a typo.
// Mirrors the server PaymentStatus enum (vn.vti.clothing_shop.constants.PaymentStatus).
// Keep values byte-for-byte identical to the backend so payment_status comparisons match.
export const ORDER_STATUS = {
  NOT_CONFIRMED: "NOT_CONFIRMED",
  ON_HOLD: "ON_HOLD",
  CONFIRMED: "CONFIRMED",
  DELIVERING: "DELIVERING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

export const INVENTORY_FILTER = {
  ALL: "ALL",
  AVAILABLE: "AVAILABLE",
  OUT_OF_STOCK: "OUT_OF_STOCK",
};
