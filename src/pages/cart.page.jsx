import { ROUTES } from "../constants/routes.constant";
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
import { useI18n } from "../i18n";
import { STORAGE_KEYS } from "../constants/storage.constant";

/** Checks whether the cart has an authenticated user. */
export const hasCartToken = (storage = localStorage) =>
  Boolean(storage.getItem(STORAGE_KEYS.TOKEN));

/** Gets the next valid cart quantity, or null when the change is invalid. */
export const getNextCartQuantity = (item, delta) => {
  const newQty = (item.quantity ?? 0) + delta;
  return newQty < 1 ? null : newQty;
};

/** Builds an order-item update payload for the cart API. */
export const buildCartQuantityPayload = (item, quantity, storage = localStorage) => ({
  id: storage.getItem(STORAGE_KEYS.ORDER_ID),
  product_id: item.product_id?.id,
  quantity,
});

// ─── SVG icons for quantity stepper ───────────────────────────────
/** Handles minus SVG. */
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

/** Handles plus SVG. */
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
/** Handles cart page. */
const CartPage = () => {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const { t } = useI18n();

  // ── All hooks MUST be called unconditionally (Rules of Hooks) ──
  const hasToken = hasCartToken();

  const { data: cart, isLoading, error } = useGetCartQuery(undefined, { skip: !hasToken });

  const [updateOrderItem] = useUpdateOrderItemMutation();

  // Redirect unauthenticated users AFTER hooks
  useEffect(() => {
    if (!hasToken) navigate(ROUTES.LOGIN, { replace: true });
  }, [hasToken, navigate]);

  // ── Quantity update handler ────────────────────────────────────
  /** Handles update quantity. */
  const handleUpdateQuantity = async (item, delta) => {
    const newQty = getNextCartQuantity(item, delta);
    if (newQty === null) return;
    try {
      await updateOrderItem(buildCartQuantityPayload(item, newQty));
      Toast.fire({ icon: "success", title: t("common.update_success") });
    } catch {
      Toast.fire({ icon: "error", title: t("common.update_failed") });
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
        {t("cart.load_error")}: {error?.data?.message ?? t("common.retry")}
      </div>
    );

  const items = cart?.object?.orderItems ?? [];
  const total = cart?.object?.total_price ?? 0;

  return (
    <div className="page-container cart-page">
      {/* ── Left: cart items ── */}
      <div className="cart-items">
        <h2 className="section-title mb-5">{t("common.cart")}</h2>

        {/* Header row */}
        <div className="cart-header">
          <Checkbox color="blue" />
          <span className="col-span-2">{t("common.image")}</span>
          <span className="col-span-2">{t("common.product")}</span>
          <span className="col-span-2">{t("cart.unit_price")}</span>
          <span>{t("common.quantity")}</span>
          <span className="col-span-3">{t("cart.line_total")}</span>
          <Tooltip content={t("common.delete_all")}>
            <IconButton color="white" aria-label={t("common.delete_all")}>
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
          const productName = item.product_id?.product_id?.product_id?.name ?? t("common.product");

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
                  aria-label={t("cart.decrease_quantity")}
                  onClick={() => handleUpdateQuantity(item, -1)}
                >
                  <MinusSVG />
                </button>
                <input
                  type="text"
                  className="qty-input"
                  value={item.quantity ?? 0}
                  readOnly
                  aria-label={t("common.quantity")}
                />
                <button
                  type="button"
                  className="qty-btn"
                  aria-label={t("cart.increase_quantity")}
                  onClick={() => handleUpdateQuantity(item, 1)}
                >
                  <PlusSVG />
                </button>
              </div>

              <span className="cart-line-total">
                {formatPrice(unitPrice * (item.quantity ?? 0))}
              </span>

              <IconButton color="white" aria-label={t("cart.delete_product")}>
                <DeleteIcon color="error" />
              </IconButton>
            </div>
          );
        })}

        {items.length === 0 && (
          <p className="text-center py-12" style={{ color: "var(--color-text-muted)" }}>
            {t("cart.empty")}
          </p>
        )}

        <Pagination page={1} />
      </div>

      {/* ── Right: summary ── */}
      <div className="cart-summary stack-sm">
        {/* Voucher card */}
        <div className="cart-summary-card">
          <p className="cart-summary-title">{t("checkout.discount")}</p>
          <div className="flex-between mt-4">
            <span className="summary-label">{t("checkout.discount_code")}</span>
            <span className="summary-label">- 0%</span>
          </div>
          <button className="btn-outline w-full mt-4">{t("cart.enter_discount_code")}</button>
        </div>

        {/* Order summary card */}
        <div className="cart-summary-card">
          <div className="flex-between">
            <span className="summary-label">{t("checkout.subtotal")}</span>
            <span className="summary-value">{formatPrice(total)}</span>
          </div>
          <div className="flex-between mt-3">
            <span className="summary-label">{t("checkout.discount")}</span>
            <span className="summary-label">{formatPrice(0)}</span>
          </div>
          <div className="cart-total-row">
            <span className="cart-total-label">{t("common.total")}</span>
            <span className="cart-total-value">{formatPrice(total)}</span>
          </div>
          <button
            className="btn-primary w-full mt-4"
            onClick={() => navigate(ROUTES.CHECKOUT)}
            disabled={items.length === 0}
          >
            {t("checkout.pay")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
