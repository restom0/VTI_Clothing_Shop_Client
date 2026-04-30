import { Checkbox, IconButton, Tooltip } from "@material-tailwind/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/shared/pagination.component";
import { useGetCartQuery } from "../apis/order.api";
import Loading from "../components/shared/loading.component";
import { useUpdateOrderItemMutation } from "../apis/order_item.api";
import { Toast } from "../configs/sweetalert2.config";
import { useState } from "react";
import { useCurrency } from "../currency";

// ─── SVG icons for quantity stepper ───────────────────────────────
const MinusSVG = () => (
  <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
  </svg>
);

const PlusSVG = () => (
  <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
  </svg>
);

// ─── Cart page ─────────────────────────────────────────────────────
const CartPage = () => {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const [select, setSelect] = useState(-1);

  if (!localStorage.getItem("token")) {
    window.location.replace("/login");
    return null;
  }

  const {
    data: cart,
    isLoading,
    error,
  } = useGetCartQuery(undefined, { skip: !localStorage.getItem("token") });

  const [updateOrderItem] = useUpdateOrderItemMutation();

  const handleUpdateQuantity = async (item, delta) => {
    const newQty = item.quantity + delta;
    if (newQty < 1) return;
    try {
      await updateOrderItem({
        id: localStorage.getItem("order_id"),
        product_id: item.product_id.id,
        quantity: newQty,
      });
      Toast.fire({ icon: "success", title: "Cập nhật thành công" });
    } catch {
      Toast.fire({ icon: "error", title: "Cập nhật thất bại" });
    }
  };

  if (isLoading) return <div className="h-96"><Loading /></div>;
  if (error) return <div className="error-message">Error: {error.toString()}</div>;

  const items = cart?.object?.orderItems ?? [];
  const total = cart?.object?.total_price ?? 0;

  return (
    <div className="page-container cart-page">
      {/* ── Left: cart items ── */}
      <div className="cart-items">
        <h2 className="section-title mb-5">Giỏ hàng</h2>

        {/* Header row */}
        <div className="cart-header">
          <Checkbox color="blue" />
          <span className="col-span-2">Hình ảnh</span>
          <span className="col-span-2">Sản phẩm</span>
          <span className="col-span-2">Đơn giá</span>
          <span>Số lượng</span>
          <span className="col-span-3">Thành tiền</span>
          <Tooltip content="Xóa toàn bộ">
            <IconButton color="white" aria-label="Xóa tất cả">
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </div>

        {/* Item rows */}
        {items.map((item, index) => {
          const unitPrice = item.product_id.sale_price * (1 - item.product_id.discount / 100);
          return (
            <div className="cart-row" key={index}>
              <Checkbox color="blue" />
              <div className="col-span-2">
                <img
                  src={item.product_id.product_id.image_url}
                  alt={item.product_id.product_id.product_id?.name ?? ""}
                  className="w-20 h-20 object-cover rounded mx-auto"
                />
              </div>
              <span className="col-span-2 text-sm font-medium" style={{ color: "var(--color-text-base)" }}>
                {item.product_id.product_id.product_id?.name}
              </span>
              <span className="col-span-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
                {formatPrice(unitPrice)}
              </span>

              {/* Quantity stepper */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="qty-btn"
                  aria-label="Giảm"
                  onClick={() => handleUpdateQuantity(item, -1)}
                >
                  <MinusSVG />
                </button>
                <input
                  type="text"
                  className="qty-input"
                  value={item.quantity}
                  readOnly
                />
                <button
                  type="button"
                  className="qty-btn"
                  aria-label="Tăng"
                  onClick={() => handleUpdateQuantity(item, 1)}
                >
                  <PlusSVG />
                </button>
              </div>

              <span
                className="col-span-3 text-sm font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                {formatPrice(unitPrice * item.quantity)}
              </span>

              <IconButton color="white" aria-label="Xóa">
                <DeleteIcon color="error" />
              </IconButton>
            </div>
          );
        })}

        <Pagination page={1} />
      </div>

      {/* ── Right: summary ── */}
      <div className="cart-summary stack-sm">
        {/* Voucher card */}
        <div className="cart-summary-card">
          <p className="font-semibold" style={{ color: "var(--color-text-base)" }}>Giảm giá</p>
          <div className="flex-between mt-4">
            <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>SAVE200</span>
            <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>- 0%</span>
          </div>
          <button className="btn-outline w-full mt-4">Nhập mã giảm giá</button>
        </div>

        {/* Order summary card */}
        <div className="cart-summary-card">
          <div className="flex-between">
            <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>Tạm tính</span>
            <span className="text-sm font-medium" style={{ color: "var(--color-text-base)" }}>
              {formatPrice(total)}
            </span>
          </div>
          <div className="flex-between mt-3">
            <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>Giảm giá</span>
            <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>{formatPrice(0)}</span>
          </div>
          <div className="flex-between mt-3 pt-3 border-t" style={{ borderColor: "var(--color-border)" }}>
            <span className="font-semibold" style={{ color: "var(--color-text-base)" }}>Tổng cộng</span>
            <span className="font-bold text-lg" style={{ color: "var(--color-primary)" }}>
              {formatPrice(total)}
            </span>
          </div>
          <button className="btn-primary w-full mt-4" onClick={() => navigate("/checkout")}>
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
