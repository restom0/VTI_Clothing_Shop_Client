const allorder_tab = [
  {
    label: "Tất cả",
    value: "ALL",
  },
  {
    label: "Chờ thanh toán",
    value: "ONHOLD",
  },
  {
    label: "Đang xử lý",
    value: "CONFIRMED",
  },
  {
    label: "Đang vận chuyển",
    value: "DELIVERING",
  },
  {
    label: "Đã giao",
    value: "COMPLETED",
  },
  {
    label: "Đã hủy",
    value: "CANCELLED",
  },
];
const voucher = [
  {
    label: "Tất cả",
    value: "ALL",
  },
  {
    label: "Đã hết hạn",
    value: "outdate",
  },
];
const rating = [
  {
    label: "Chờ đánh giá",
    value: "unrate",
  },
  {
    label: "Đã đánh giá",
    value: "rated",
  },
];
const inventory_tab = [
  {
    label: "Tất cả",
    value: "ALL",
  },
  {
    label: "Còn hàng",
    value: "AVAILABLE",
  },
  {
    label: "Hết hàng",
    value: "OUT_OF_STOCK",
  },
];
export { allorder_tab, voucher, rating, inventory_tab };
