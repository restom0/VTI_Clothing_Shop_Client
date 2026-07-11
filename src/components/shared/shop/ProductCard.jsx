import { memo } from "react";
import PropTypes from "prop-types";
import { useCurrency } from "../../../currency";
import LazyImage from "../LazyImage";
import ScrollReveal from "../ScrollReveal";

/**
 * ProductCard — thẻ sản phẩm.
 *
 * a11y:
 *  - Dùng <a href> thực sự thay vì div[role=link] (WCAG 4.1.2)
 *  - aria-label mô tả đầy đủ: tên + giá + giảm giá (WCAG 1.3.1)
 *  - LazyImage nhận alt text là tên sản phẩm
 *
 * performance:
 *  - React.memo: chỉ re-render khi props thay đổi
 *  - LazyImage đã dùng loading="lazy" + decoding="async"
 */
const ProductCard = memo(({ discount = 0, id, imageUrl, price, product_id, sale_price, title }) => {
  const { formatPrice } = useCurrency();

  const productInfo = product_id?.product_id ?? product_id ?? {};
  const productName = productInfo.name ?? title ?? "";
  const productImage = product_id?.image_url ?? imageUrl ?? "";
  const originalPrice = sale_price ?? price ?? 0;
  const finalPrice = originalPrice * (1 - discount / 100);
  const hasDiscount = discount > 0;

  // Mô tả đầy đủ cho screen reader
  const ariaLabel = hasDiscount
    ? `${productName} — ${formatPrice(finalPrice)} (giảm ${discount}%, giá gốc ${formatPrice(originalPrice)})`
    : `${productName} — ${formatPrice(finalPrice)}`;

  return (
    <ScrollReveal variant="fade-up" className="card-product" as="article">
      {/*
        <a href> thay thế div[role=link]:
        - Semantic HTML đúng chuẩn WCAG 4.1.2
        - Keyboard focusable mặc định (không cần tabIndex)
        - Enter/Space kích hoạt mặc định (không cần onKeyDown)
        - Screen reader đọc đúng "link"
      */}
      <a href={`/product/${id}`} className="card-product__link" aria-label={ariaLabel}>
        <div className="card-product__image">
          <LazyImage
            src={productImage}
            alt={productName}
            aspectRatio="4/3"
            wrapperClassName="card-product__lazy"
          />
        </div>

        <div className="card-product__body" aria-hidden="true">
          {/* aria-hidden vì aria-label trên <a> đã mô tả đầy đủ */}
          <p className="card-product__name">{productName}</p>

          <div className="card-product__price-row">
            <span className="card-product__price-sale">{formatPrice(finalPrice)}</span>
            {hasDiscount && (
              <span className="badge-discount" aria-hidden="true">
                -{discount}%
              </span>
            )}
            {hasDiscount && (
              <span className="card-product__price-original" aria-hidden="true">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>
      </a>
    </ScrollReveal>
  );
});

ProductCard.displayName = "ProductCard";

ProductCard.propTypes = {
  discount: PropTypes.number,
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  price: PropTypes.number,
  product_id: PropTypes.shape({
    image_url: PropTypes.string,
    product_id: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  sale_price: PropTypes.number,
  title: PropTypes.string,
};

export default ProductCard;
