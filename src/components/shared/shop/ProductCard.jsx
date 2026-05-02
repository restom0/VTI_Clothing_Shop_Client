import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "../../../currency";

const ProductCard = ({
  discount = 0,
  id,
  imageUrl,
  price,
  product_id,
  sale_price,
  title,
}) => {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const productInfo = product_id?.product_id ?? product_id ?? {};
  const productName = productInfo.name ?? title ?? "";
  const productImage = product_id?.image_url ?? imageUrl ?? "";
  const originalPrice = sale_price ?? price ?? 0;
  const finalPrice = originalPrice * (1 - discount / 100);
  const hasDiscount = discount > 0;

  return (
    <div className="card-product" onClick={() => navigate(`/product/${id}`)}>
      <div className="card-product__image">
        <img
          src={productImage}
          alt={productName}
          decoding="async"
          loading="lazy"
        />
      </div>

      <div className="card-product__body">
        <p className="card-product__name">{productName}</p>

        <div className="card-product__price-row">
          <span className="card-product__price-sale">
            {formatPrice(finalPrice)}
          </span>
          {hasDiscount && <span className="badge-discount">-{discount}%</span>}
          {hasDiscount && (
            <span className="card-product__price-original">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

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
