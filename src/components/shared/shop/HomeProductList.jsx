import { ROUTES } from "../../../constants/routes.constant";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../../../configs/swiper.css";
import { Autoplay, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import EastIcon from "@mui/icons-material/East";
import ProductCard from "./ProductCard";
import { useI18n } from "../../../i18n";

/** Navigates to the product listing page. */
export const goToProductList = (navigate) => navigate(ROUTES.PRODUCT);

/** Creates the product-list navigation handler. */
export const createGoToProductListHandler = (navigate) => () => goToProductList(navigate);

/** Handles home product list. */
const HomeProductList = ({ title, products }) => {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <section className="page-container mt-10">
      {/* Section header */}
      <div className="home-section-header">
        <div />
        <h2 className="section-title">{title}</h2>
        <button
          type="button"
          className="flex items-center justify-end gap-1 btn-ghost text-sm ml-auto"
          onClick={createGoToProductListHandler(navigate)}
        >
          {t("common.view_more")} <EastIcon fontSize="small" />
        </button>
      </div>

      {/* Product carousel */}
      <Swiper
        slidesPerView={1.15}
        spaceBetween={16}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 18,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        modules={[Navigation, Autoplay]}
        loop={true}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="mb-5">
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

HomeProductList.propTypes = {
  title: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
};

export default HomeProductList;
