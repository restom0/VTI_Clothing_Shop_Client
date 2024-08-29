import React, { useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Radio,
  Input,
} from "@material-tailwind/react";
import EastIcon from "@mui/icons-material/East";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../configs/swiper.css";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";

const HomeProductList = ({ title, products }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-10 me-10 ms-10">
        <div className="grid grid-cols-4">
          <div></div>
          <Typography variant="h1" className="col-span-2 text-center w-full">
            {title}
          </Typography>
          <div
            className="text-right my-auto flex items-center justify-end"
            onClick={() => navigate("/product")}
          >
            <Typography variant="medium">Xem thêm</Typography>
            <EastIcon />
          </div>
        </div>
      </div>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay]}
        loop={true}
        className="mySwiper mt-10"
      >
        {products.object.map((product, index) => (
          <SwiperSlide key={index} className="mb-5">
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
HomeProductList.propTypes = {
  title: PropTypes.string.isRequired,
  products: PropTypes.arrayOf({
    id: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
export default HomeProductList;
