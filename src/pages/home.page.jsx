import { Typography, Button, Input } from "@material-tailwind/react";
import EastIcon from "@mui/icons-material/East";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../configs/swiper.css";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { homepage_slides } from "../constants/slide.constant";
import HomeProductList from "../components/shared/shop/HomeProductList";
import Loading from "../components/shared/loading.component";
import { useGetOnSaleProductsQuery } from "../apis/on_sale_product.api";
import { useI18n } from "../i18n";
import PropTypes from "prop-types";
import {
  getHomeErrorMessage,
  getHomeLabels,
  getUniqueProducts,
} from "./home.page.helpers";

const renderSlide = (slide, index) => (
  <SwiperSlide key={index}>
    <img src={slide} alt="slide" />
  </SwiperSlide>
);

export const HomepageView = ({ labels, products, slides }) => (
  <>
    <div className="home-hero">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        effect="fade"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map(renderSlide)}
      </Swiper>
    </div>
    <div>
      <HomeProductList products={products} title={labels.newProducts} />
      <div className="home-copy-block">
        <Typography
          variant="h2"
          color="blue-gray"
          className="text-center mb-2"
        >
          #WearWithStyle
        </Typography>
        <Typography
          size="xl"
          color="blue-gray"
          className="home-copy mb-2"
        >
          <em>{labels.styleQuote}</em>
        </Typography>
      </div>
      <div className="home-copy-block">
        <img
          src="/dailynews.jpg"
          className="mx-auto"
          width={200}
          height={200}
          alt="Daily news"
        />
        <Typography
          variant="h2"
          color="blue-gray"
          className="text-center mb-2"
        >
          {labels.newsletterTitle}
        </Typography>
        <Typography
          size="lg"
          color="blue-gray"
          className="home-copy mb-2"
        >
          <em>{labels.newsletterCopy}</em>
          <div className="home-newsletter-form">
            <Input
              type="email"
              label={labels.emailLabel}
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }}
            />
            <Button size="sm" className="!absolute right-1 top-1 rounded">
              <EastIcon fontSize="30px" />
            </Button>
          </div>
        </Typography>
      </div>
    </div>
  </>
);

HomepageView.propTypes = {
  labels: PropTypes.shape({
    newProducts: PropTypes.string.isRequired,
    styleQuote: PropTypes.string.isRequired,
    newsletterTitle: PropTypes.string.isRequired,
    newsletterCopy: PropTypes.string.isRequired,
    emailLabel: PropTypes.string.isRequired,
  }).isRequired,
  products: PropTypes.array.isRequired,
  slides: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const Homepage = () => {
  const { t } = useI18n();
  const { data: products, isLoading, error } = useGetOnSaleProductsQuery();

  if (isLoading) {
    return (
      <div className="home-hero">
        <Loading />
      </div>
    );
  }

  if (error) return <div>{getHomeErrorMessage(error, t)}</div>;

  return (
    <HomepageView
      labels={getHomeLabels(t)}
      products={getUniqueProducts(products)}
      slides={homepage_slides}
    />
  );
};

export default Homepage;
