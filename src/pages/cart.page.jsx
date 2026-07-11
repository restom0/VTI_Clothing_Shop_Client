import { Checkbox } from "@material-tailwind/react/components/Checkbox";
import { IconButton } from "@material-tailwind/react/components/IconButton";
import { Tooltip } from "@material-tailwind/react/components/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/shared/pagination.component";
import { useGetCartQuery } from "../apis/order.api";
import Loading from "../components/shared/loading.component";
import { useUpdateOrderItemMutation } from "../apis/order_item.api";
import { Toast } from "../configs/sweetalert2.config";
import { useCurrency } from "../currency";

// ─── SVG icons for quantity stepper ───────────────────────────────
const MinusSVG = () => (
  <svg
    className="w-2.5 h-2.5"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 18 2"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M1 1h16"
    />
  </svg>
);

const PlusSVG = () => (
  <svg
    className="w-2.5 h-2.5"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 18 18"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 1v16M1 9h16"
    />
  </svg>
);

// ─── Cart page ─────────────────────────────────────────────────────
const CartPage = () => {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();

  // ── All hooks MUST be called unconditionally (Rules of Hooks) ──
  const hasToken = Boolean(localStorage.getItem("token"));

  const { data: cart, isLoading, error } = useGetCartQuery(undefined, { skip: !hasToken });

  const [updateOrderItem] = useUpdateOrderItemMutation();

  // Redirect unauthenticated users AFTER hooks
  useEffect(() => {
    if (!hasToken) navigate("/login", { replace: true });
  }, [hasToken, navigate]);

  // ── Quantity update handler ────────────────────────────────────
  const handleUpdateQuantity = async (item, delta) => {
    const newQty = (item.quantity ?? 0) + delta;
    if (newQty < 1) return;
    try {
      await updateOrderItem({
        id: localStorage.getItem("order_id"),
        product_id: item.product_id?.id,
        quantity: newQty,
      });
      Toast.fire({ icon: "success", title: "Cập nhật thành công" });
    } catch {
      Toast.fire({ icon: "error", title: "Cập nhật thất bại" });
    }
  };

  // ── Early returns AFTER all hooks ──────────────────────────────
  if (!hasToken) return null;
  if (isLoading)
    return (
      <div className="h-96">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="error-message">
        Lỗi tải giỏ hàng: {error?.data?.message ?? "Vui lòng thử lại."}
      </div>
    );

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
          const salePrice = item.product_id?.sale_price ?? 0;
          const discount = item.product_id?.discount ?? 0;
          const unitPrice = salePrice * (1 - discount / 100);
          const imageSrc = item.product_id?.product_id?.image_url ?? "";
          const productName = item.product_id?.product_id?.product_id?.name ?? "Sản phẩm";

          return (
            <div className="cart-row" key={index}>
              <Checkbox color="blue" />
              <div className="col-span-2">
                <img
                  src={imageSrc}
                  alt={productName}
                  className="w-20 h-20 object-cover rounded mx-auto"
                  loading="lazy"
                />
              </div>
              <span className="cart-item-title">{productName}</span>
              <span className="cart-item-price">{formatPrice(unitPrice)}</span>

              {/* Quantity stepper */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="qty-btn"
                  aria-label="Giảm số lượng"
                  onClick={() => handleUpdateQuantity(item, -1)}
                >
                  <MinusSVG />
                </button>
                <input
                  type="text"
                  className="qty-input"
                  value={item.quantity ?? 0}
                  readOnly
                  aria-label="Số lượng"
                />
                <button
                  type="button"
                  className="qty-btn"
                  aria-label="Tăng số lượng"
                  onClick={() => handleUpdateQuantity(item, 1)}
                >
                  <PlusSVG />
                </button>
              </div>

              <span className="cart-line-total">
                {formatPrice(unitPrice * (item.quantity ?? 0))}
              </span>

              <IconButton color="white" aria-label="Xóa sản phẩm">
                <DeleteIcon color="error" />
              </IconButton>
            </div>
          );
        })}

        {items.length === 0 && (
          <p className="text-center py-12" style={{ color: "var(--color-text-muted)" }}>
            Giỏ hàng của bạn đang trống.
          </p>
        )}

        <Pagination page={1} />
      </div>

      {/* ── Right: summary ── */}
      <div className="cart-summary stack-sm">
        {/* Voucher card */}
        <div className="cart-summary-card">
          <p className="cart-summary-title">Giảm giá</p>
          <div className="flex-between mt-4">
            <span className="summary-label">Mã giảm giá</span>
            <span className="summary-label">- 0%</span>
          </div>
          <button className="btn-outline w-full mt-4">Nhập mã giảm giá</button>
        </div>

        {/* Order summary card */}
        <div className="cart-summary-card">
          <div className="flex-between">
            <span className="summary-label">Tạm tính</span>
            <span className="summary-value">{formatPrice(total)}</span>
          </div>
          <div className="flex-between mt-3">
            <span className="summary-label">Giảm giá</span>
            <span className="summary-label">{formatPrice(0)}</span>
          </div>
          <div className="cart-total-row">
            <span className="cart-total-label">Tổng cộng</span>
            <span className="cart-total-value">{formatPrice(total)}</span>
          </div>
          <button
            className="btn-primary w-full mt-4"
            onClick={() => navigate("/checkout")}
            disabled={items.length === 0}
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
