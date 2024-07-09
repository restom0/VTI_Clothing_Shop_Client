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
import "../assets/swiper.css";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { Container } from "@mui/material";
import { homepage_slides } from "../constants/slide";
import { useNavigate } from "react-router-dom";
import HomeProductList from "../layouts/Shop/HomeProductList";
const new_products = [
  {
    id: 0,
    colors: [
      { color: "#aaaaaa", label: "Màu xám" },
      { color: "#ffffaa", label: "Màu vàng" },
      { color: "#012345", label: "Màu xanh" },
      { color: "#777777", label: "Màu xám đen" },
    ],
    price: 155000,
    rating: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "Abisko Trail Stretch Trousers M",
  },
  {
    id: 1,
    colors: [
      { color: "#aaaaaa", label: "Màu xám" },
      { color: "#ffffaa", label: "Màu vàng" },
      { color: "#012345", label: "Màu xanh" },
      { color: "#777777", label: "Màu xám đen" },
    ],
    price: 155000,
    rating: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "Abisko Trail Stretch Trousers M",
  },
  {
    id: 2,
    colors: [
      { color: "#aaaaaa", label: "Màu xám" },
      { color: "#ffffaa", label: "Màu vàng" },
      { color: "#012345", label: "Màu xanh" },
      { color: "#777777", label: "Màu xám đen" },
    ],
    price: 155000,
    rating: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "Abisko Trail Stretch Trousers M",
  },
  {
    id: 3,
    colors: [
      { color: "#aaaaaa", label: "Màu xám" },
      { color: "#ffffaa", label: "Màu vàng" },
      { color: "#012345", label: "Màu xanh" },
      { color: "#777777", label: "Màu xám đen" },
    ],
    price: 155000,
    rating: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "Abisko Trail Stretch Trousers M",
  },
  {
    id: 4,
    colors: [
      { color: "#aaaaaa", label: "Màu xám" },
      { color: "#ffffaa", label: "Màu vàng" },
      { color: "#012345", label: "Màu xanh" },
      { color: "#777777", label: "Màu xám đen" },
    ],
    price: 155000,
    rating: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "Abisko Trail Stretch Trousers M",
  },
  {
    id: 5,
    colors: [
      { color: "#aaaaaa", label: "Màu xám" },
      { color: "#ffffaa", label: "Màu vàng" },
      { color: "#012345", label: "Màu xanh" },
      { color: "#777777", label: "Màu xám đen" },
    ],
    price: 155.0,
    rating: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "Abisko Trail Stretch Trousers M",
  },
  {
    id: 6,
    colors: [
      { color: "#aaaaaa", label: "Màu xám" },
      { color: "#ffffaa", label: "Màu vàng" },
      { color: "#012345", label: "Màu xanh" },
      { color: "#777777", label: "Màu xám đen" },
    ],
    price: 155.0,
    rating: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "Abisko Trail Stretch Trousers M",
  },
];
const collection_products = [
  {
    id: 0,
    colors: [
      { color: "#aaaaaa", label: "Màu xám" },
      { color: "#ffffaa", label: "Màu vàng" },
      { color: "#012345", label: "Màu xanh" },
      { color: "#777777", label: "Màu xám đen" },
    ],
    price: 155000,
    rating: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "Abisko Trail Stretch Trousers M",
  },
  {
    id: 1,
    colors: [
      { color: "#aaaaaa", label: "Màu xám" },
      { color: "#ffffaa", label: "Màu vàng" },
      { color: "#012345", label: "Màu xanh" },
      { color: "#777777", label: "Màu xám đen" },
    ],
    price: 155000,
    rating: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "Abisko Trail Stretch Trousers M",
  },
  {
    id: 2,
    colors: [
      { color: "#aaaaaa", label: "Màu xám" },
      { color: "#ffffaa", label: "Màu vàng" },
      { color: "#012345", label: "Màu xanh" },
      { color: "#777777", label: "Màu xám đen" },
    ],
    price: 155000,
    rating: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "Abisko Trail Stretch Trousers M",
  },
  {
    id: 3,
    colors: [
      { color: "#aaaaaa", label: "Màu xám" },
      { color: "#ffffaa", label: "Màu vàng" },
      { color: "#012345", label: "Màu xanh" },
      { color: "#777777", label: "Màu xám đen" },
    ],
    price: 155000,
    rating: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "Abisko Trail Stretch Trousers M",
  },
  {
    id: 4,
    colors: [
      { color: "#aaaaaa", label: "Màu xám" },
      { color: "#ffffaa", label: "Màu vàng" },
      { color: "#012345", label: "Màu xanh" },
      { color: "#777777", label: "Màu xám đen" },
    ],
    price: 155000,
    rating: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "Abisko Trail Stretch Trousers M",
  },
  {
    id: 5,
    colors: [
      { color: "#aaaaaa", label: "Màu xám" },
      { color: "#ffffaa", label: "Màu vàng" },
      { color: "#012345", label: "Màu xanh" },
      { color: "#777777", label: "Màu xám đen" },
    ],
    price: 155.0,
    rating: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "Abisko Trail Stretch Trousers M",
  },
  {
    id: 6,
    colors: [
      { color: "#aaaaaa", label: "Màu xám" },
      { color: "#ffffaa", label: "Màu vàng" },
      { color: "#012345", label: "Màu xanh" },
      { color: "#777777", label: "Màu xám đen" },
    ],
    price: 155.0,
    rating: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "Abisko Trail Stretch Trousers M",
  },
];
const Homepage = () => {
  return (
    <>
      <div className="w-full h-[500px] mb-5">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          effect={"fade"}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[Autoplay, EffectFade, Pagination, Navigation]}
          className="mySwiper"
        >
          {homepage_slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <img src={slide} alt="slide" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
        <HomeProductList products={new_products} title="Sản phẩm mới" />
        <HomeProductList
          products={collection_products}
          title="Sản phẩm bán chạy"
        />
        {/* <Container className="mt-10">
          <div className="grid grid-cols-3 gap-4">
            <div></div>
            <Typography variant="h1" className="text-center">
              Sản phẩm mới
            </Typography>
            <div
              className="text-right my-auto flex items-center justify-end"
              onClick={() => navigate("/product")}
            >
              <Typography variant="medium">Xem thêm</Typography>
              <EastIcon />
            </div>
          </div>
        </Container>
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
          <SwiperSlide className="mb-5">
            <Card className="mt-6">
              <CardHeader color="blue-gray" className="relative h-56">
                <img
                  src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="card-image"
                />
              </CardHeader>
              <CardBody className="mx-auto">
                <div className="grid grid-cols-4 gap-4 mb-5">
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#aaaaaa" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#ffffaa" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#012345" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#777777" }}
                  ></Button>
                </div>
                <Typography>Abisko Trail Stretch Trousers M</Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className=" text-center mb-2"
                >
                  $155.00
                </Typography>
              </CardFooter>
            </Card>
          </SwiperSlide>
          <SwiperSlide className="mb-5">
            <Card className="mt-6">
              <CardHeader color="blue-gray" className="relative h-56">
                <img
                  src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="card-image"
                />
              </CardHeader>
              <CardBody className="mx-auto">
                <div className="grid grid-cols-4 gap-4 mb-5">
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#aaaaaa" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#ffffaa" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#012345" }}
                  >
                    {" "}
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#777777" }}
                  ></Button>
                </div>
                <Typography>Abisko Trail Stretch Trousers M</Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className=" text-center mb-2"
                >
                  $155.00
                </Typography>
              </CardFooter>
            </Card>
          </SwiperSlide>
          <SwiperSlide className="mb-5">
            <Card className="mt-6">
              <CardHeader color="blue-gray" className="relative h-56">
                <img
                  src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="card-image"
                />
              </CardHeader>
              <CardBody className="mx-auto">
                <div className="grid grid-cols-4 gap-4 mb-5">
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#aaaaaa" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#ffffaa" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#012345" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#777777" }}
                  ></Button>
                </div>
                <Typography>Abisko Trail Stretch Trousers M</Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className=" text-center mb-2"
                >
                  $155.00
                </Typography>
              </CardFooter>
            </Card>
          </SwiperSlide>
          <SwiperSlide className="mb-5">
            <Card className="mt-6">
              <CardHeader color="blue-gray" className="relative h-56">
                <img
                  src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="card-image"
                />
              </CardHeader>
              <CardBody className="mx-auto">
                <div className="grid grid-cols-4 gap-4 mb-5">
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#aaaaaa" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#ffffaa" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#012345" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#777777" }}
                  ></Button>
                </div>
                <Typography>Abisko Trail Stretch Trousers M</Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className=" text-center mb-2"
                >
                  $155.00
                </Typography>
              </CardFooter>
            </Card>
          </SwiperSlide>
          <SwiperSlide className="mb-5">
            <Card className="mt-6">
              <CardHeader color="blue-gray" className="relative h-56">
                <img
                  src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="card-image"
                />
              </CardHeader>
              <CardBody className="mx-auto">
                <div className="grid grid-cols-4 gap-4 mb-5">
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#aaaaaa" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#ffffaa" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#012345" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#777777" }}
                  ></Button>
                </div>
                <Typography>Abisko Trail Stretch Trousers M</Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className=" text-center mb-2"
                >
                  $155.00
                </Typography>
              </CardFooter>
            </Card>
          </SwiperSlide>
        </Swiper>
        <Container>
          <Typography variant="h1" className="text-center mt-10">
            Bộ sưu tập
          </Typography>
        </Container>
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
          <SwiperSlide className="mb-5">
            <Card className="mt-6">
              <CardHeader color="blue-gray" className="relative h-56">
                <img
                  src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="card-image"
                />
              </CardHeader>
              <CardBody className="mx-auto">
                <div className="grid grid-cols-4 gap-4 mb-5">
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#aaaaaa" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#ffffaa" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#012345" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#777777" }}
                  ></Button>
                </div>
                <Typography>Abisko Trail Stretch Trousers M</Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className=" text-center mb-2"
                >
                  $155.00
                </Typography>
              </CardFooter>
            </Card>
          </SwiperSlide>
          <SwiperSlide className="mb-5">
            <Card className="mt-6">
              <CardHeader color="blue-gray" className="relative h-56">
                <img
                  src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="card-image"
                />
              </CardHeader>
              <CardBody className="mx-auto">
                <div className="grid grid-cols-4 gap-4 mb-5">
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#aaaaaa" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#ffffaa" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#012345" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#777777" }}
                  ></Button>
                </div>
                <Typography>Abisko Trail Stretch Trousers M</Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className=" text-center mb-2"
                >
                  $155.00
                </Typography>
              </CardFooter>
            </Card>
          </SwiperSlide>
          <SwiperSlide className="mb-5">
            <Card className="mt-6">
              <CardHeader color="blue-gray" className="relative h-56">
                <img
                  src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="card-image"
                />
              </CardHeader>
              <CardBody className="mx-auto">
                <div className="grid grid-cols-4 gap-4 mb-5">
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#aaaaaa" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#ffffaa" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#012345" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#777777" }}
                  ></Button>
                </div>
                <Typography>Abisko Trail Stretch Trousers M</Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className=" text-center mb-2"
                >
                  $155.00
                </Typography>
              </CardFooter>
            </Card>
          </SwiperSlide>
          <SwiperSlide className="mb-5">
            <Card className="mt-6">
              <CardHeader color="blue-gray" className="relative h-56">
                <img
                  src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="card-image"
                />
              </CardHeader>
              <CardBody className="mx-auto">
                <div className="grid grid-cols-4 gap-4 mb-5">
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#aaaaaa" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#ffffaa" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#012345" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#777777" }}
                  ></Button>
                </div>
                <Typography>Abisko Trail Stretch Trousers M</Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className=" text-center mb-2"
                >
                  $155.00
                </Typography>
              </CardFooter>
            </Card>
          </SwiperSlide>
          <SwiperSlide className="mb-5">
            <Card className="mt-6">
              <CardHeader color="blue-gray" className="relative h-56">
                <img
                  src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="card-image"
                />
              </CardHeader>
              <CardBody className="mx-auto">
                <div className="grid grid-cols-4 gap-4 mb-5">
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#aaaaaa" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#ffffaa" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#012345" }}
                  ></Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: "#777777" }}
                  ></Button>
                </div>
                <Typography>Abisko Trail Stretch Trousers M</Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className=" text-center mb-2"
                >
                  $155.00
                </Typography>
              </CardFooter>
            </Card>
          </SwiperSlide>
        </Swiper> */}
        {/* <div className="grid grid-cols-4 w-full gap-4 px-4 py-5">
          <Card className="mt-6">
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="card-image"
              />
            </CardHeader>
            <CardBody className="mx-auto">
              <div className="grid grid-cols-4 gap-4 mb-5">
                <Button
                  size="sm"
                  className="rounded-full"
                  style={{ backgroundColor: "#aaaaaa" }}
                ></Button>
                <Button
                  size="sm"
                  className="rounded-full"
                  style={{ backgroundColor: "#ffffaa" }}
                ></Button>
                <Button
                  size="sm"
                  className="rounded-full"
                  style={{ backgroundColor: "#012345" }}
                ></Button>
                <Button
                  size="sm"
                  className="rounded-full"
                  style={{ backgroundColor: "#777777" }}
                ></Button>
              </div>
              <Typography>Abisko Trail Stretch Trousers M</Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Typography
                variant="h5"
                color="blue-gray"
                className=" text-center mb-2"
              >
                $155.00
              </Typography>
            </CardFooter>
          </Card>
          <Card className="mt-6">
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="card-image"
              />
            </CardHeader>
            <CardBody className="mx-auto">
              <div className="grid grid-cols-4 gap-4 mb-5">
                <Button
                  size="sm"
                  className="rounded-full"
                  style={{ backgroundColor: "#aaaaaa" }}
                ></Button>
                <Button
                  size="sm"
                  className="rounded-full"
                  style={{ backgroundColor: "#ffffaa" }}
                ></Button>
                <Button
                  size="sm"
                  className="rounded-full"
                  style={{ backgroundColor: "#012345" }}
                ></Button>
                <Button
                  size="sm"
                  className="rounded-full"
                  style={{ backgroundColor: "#777777" }}
                ></Button>
              </div>
              <Typography>Abisko Trail Stretch Trousers M</Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Typography
                variant="h5"
                color="blue-gray"
                className=" text-center mb-2"
              >
                $155.00
              </Typography>
            </CardFooter>
          </Card>
          <Card className="mt-6">
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="card-image"
              />
            </CardHeader>
            <CardBody className="mx-auto">
              <div className="grid grid-cols-4 gap-4 mb-5">
                <Button
                  size="sm"
                  className="rounded-full"
                  style={{ backgroundColor: "#aaaaaa" }}
                ></Button>
                <Button
                  size="sm"
                  className="rounded-full"
                  style={{ backgroundColor: "#ffffaa" }}
                ></Button>
                <Button
                  size="sm"
                  className="rounded-full"
                  style={{ backgroundColor: "#012345" }}
                ></Button>
                <Button
                  size="sm"
                  className="rounded-full"
                  style={{ backgroundColor: "#777777" }}
                ></Button>
              </div>
              <Typography>Abisko Trail Stretch Trousers M</Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Typography
                variant="h5"
                color="blue-gray"
                className=" text-center mb-2"
              >
                $155.00
              </Typography>
            </CardFooter>
          </Card>
        </div> */}
        <div className="text-center mt-10 mb-20">
          <Typography
            variant="h2"
            color="blue-gray"
            className=" text-center mb-2"
          >
            #WearWithStyle
          </Typography>
          <Typography
            size="xl"
            color="blue-gray"
            className="w-1/3 mx-auto text-center mb-2"
          >
            <em>
              Hãy luôn chọn cho mình những trang phục thật phong cách. Hãy chia
              sẻ hình ảnh của bạn với sản phẩm của chúng tôi với hashtag
              #WearWithStyle
            </em>
          </Typography>
        </div>
        <div className="text-center mt-10 mb-20">
          <img
            src="/dailynews.jpg"
            className="mx-auto"
            width={200}
            height={200}
            alt="Youtube"
          />
          <Typography
            variant="h2"
            color="blue-gray"
            className=" text-center mb-2"
          >
            Đồng hành cùng chúng tôi
          </Typography>
          <Typography
            size="lg"
            color="blue-gray"
            className="w-1/3 mx-auto text-center mb-2"
          >
            <em>
              Hãy đăng ký nhận bản tin từ chúng tôi để nhận thông tin mới nhất
            </em>
            <div className="relative flex w-full mt-10">
              <Input
                type="email"
                label="Enter your email address"
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
};

export default Homepage;
