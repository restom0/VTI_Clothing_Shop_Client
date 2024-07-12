import React from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Avatar,
  Button,
  Card,
  CardBody,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Progress,
  Radio,
  Textarea,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "../configs/swiper.css";
import { Container, Rating } from "@mui/material";
import { useLocation } from "react-router-dom";
import Pagination from "../components/shared/Pagination";
const product = {
  id: 0,
  colors: [
    { color: "#aaaaaa", label: "Màu xám" },
    { color: "#ffffaa", label: "Màu vàng" },
    { color: "#012345", label: "Màu xanh" },
    { color: "#777777", label: "Màu xám đen" },
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  materials: ["Cotton", "Vải len"],
  price: 155000,
  rating: 4.0,
  imageUrl: [
    "https://www.material-tailwind.com/image/product-4.png",
    "https://www.material-tailwind.com/image/product-4.png",
    "https://www.material-tailwind.com/image/product-4.png",
    "https://www.material-tailwind.com/image/product-4.png",
  ],
  title: "Abisko Trail Stretch Trousers M",
  description: `The key to more success is to have a lot of pillows. Put it this way, it took me twenty five years to get these plants, twenty five years of blood sweat and tears, and I'm never giving up, I'm just getting started. I'm up to something. Fan luv.`,
  short_description: `As we live, our hearts turn colder.`,
};
const stars = [50, 50, 50, 50, 50];
const total_star = stars.reduce((a, b) => a + b, 0);
const reviews = [
  {
    id: 0,
    rating: 5,
    user: "Tania Andrew",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    date: "3 ngày trước",
    content: `The craftsmanship and quality materials are exactly what you expect from Fjall. I sent these back for three reasons. 1) The taper below the knee wasn't strong enough. Not a fan of excess material in that area of a pant. 2) The stretch was nice & very comfortable, but the durability for anything other than high alpine(no bushwacking) or post hike pub probably fails. 3) When considering the materials used, many other manufactuers sell a similar pant for 50% less the cost.`,
  },
  {
    id: 1,
    rating: 5,
    user: "Tania Andrew",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    date: "3 ngày trước",
    content: `The craftsmanship and quality materials are exactly what you expect from Fjall. I sent these back for three reasons. 1) The taper below the knee wasn't strong enough. Not a fan of excess material in that area of a pant. 2) The stretch was nice & very comfortable, but the durability for anything other than high alpine(no bushwacking) or post hike pub probably fails. 3) When considering the materials used, many other manufactuers sell a similar pant for 50% less the cost.`,
  },
  {
    id: 2,
    rating: 5,
    user: "Tania Andrew",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    date: "3 ngày trước",
    content: `The craftsmanship and quality materials are exactly what you expect from Fjall. I sent these back for three reasons. 1) The taper below the knee wasn't strong enough. Not a fan of excess material in that area of a pant. 2) The stretch was nice & very comfortable, but the durability for anything other than high alpine(no bushwacking) or post hike pub probably fails. 3) When considering the materials used, many other manufactuers sell a similar pant for 50% less the cost.`,
  },
  {
    id: 3,
    rating: 5,
    user: "Tania Andrew",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    date: "3 ngày trước",
    content: `The craftsmanship and quality materials are exactly what you expect from Fjall. I sent these back for three reasons. 1) The taper below the knee wasn't strong enough. Not a fan of excess material in that area of a pant. 2) The stretch was nice & very comfortable, but the durability for anything other than high alpine(no bushwacking) or post hike pub probably fails. 3) When considering the materials used, many other manufactuers sell a similar pant for 50% less the cost.`,
  },
  {
    id: 3,
    rating: 5,
    user: "Tania Andrew",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    date: "3 ngày trước",
    content: `The craftsmanship and quality materials are exactly what you expect from Fjall. I sent these back for three reasons. 1) The taper below the knee wasn't strong enough. Not a fan of excess material in that area of a pant. 2) The stretch was nice & very comfortable, but the durability for anything other than high alpine(no bushwacking) or post hike pub probably fails. 3) When considering the materials used, many other manufactuers sell a similar pant for 50% less the cost.`,
  },
];
const ProductDetailpage = () => {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(1);
  const handleOpen = () => setOpen(!open);
  const [description, setDescription] = React.useState(false);
  const [star, setStar] = React.useState(false);
  const { id } = useLocation();

  return (
    <>
      <section className="py-8 px-8">
        <div className="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2">
          <div className="grid-cols-1 ">
            <div className="h-[300px] w-96 mx-auto">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                effect={"fade"}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                modules={[EffectFade, Navigation, Autoplay]}
                loop={true}
                className="mySwiper1 h-[300px] w-[500px]"
              >
                {product.imageUrl.map((url, index) => (
                  <SwiperSlide key={index}>
                    <img src={url} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* <img
              src="https://www.material-tailwind.com/image/product-4.png"
              alt="pink blazer"
              className=""
            /> */}
            <div className="h-[100px] w-[500px]">
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
                {product.imageUrl.map((url, index) => (
                  <SwiperSlide key={index}>
                    <img src={url} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div>
            <Typography className="mb-4" variant="h3">
              {product.title}
            </Typography>
            <Typography variant="h5">$1,490</Typography>
            <Typography className="!mt-4 text-base font-normal leading-[27px] !text-gray-500">
              {product.short_description}
            </Typography>
            <div className="my-8 flex items-center gap-2">
              <Rating
                readOnly
                value={product.rating}
                className="disabled text-amber-500"
              />
              <Typography className="!text-sm font-bold !text-gray-700">
                {product.rating.toPrecision(2)}/5 (100 reviews)
              </Typography>
            </div>
            <Typography color="blue-gray" variant="h6">
              Màu sắc
            </Typography>
            <div className="my-8 mt-3 flex items-center gap-2">
              {/* <div className="h-8 w-8 rounded-full border border-gray-900 bg-blue-gray-600 "></div>
              <div className="h-8 w-8 rounded-full border border-blue-gray-100 "></div>
              <div className="h-8 w-8 rounded-full border border-blue-gray-100 bg-gray-900 "></div> */}
              {product.colors.map((color, index) => (
                <Tooltip content={color.label} key={index}>
                  <Button
                    key={index}
                    size="lg"
                    variant="gradient"
                    color="white"
                    className="rounded-full"
                    style={{ backgroundColor: color.color }}
                  >
                    {" "}
                  </Button>
                </Tooltip>
              ))}
            </div>
            <div className="grid grid-cols-2">
              <Typography color="blue-gray" variant="h6">
                Kích cỡ
              </Typography>
              <Button
                onClick={handleOpen}
                size="sm"
                variant="gradient"
                color="white"
                className="shadow-none"
              >
                Hướng dẫn chi tiết
              </Button>
              <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Its a simple dialog.</DialogHeader>
                <DialogBody>
                  The key to more success is to have a lot of pillows. Put it
                  this way, it took me twenty five years to get these plants,
                  twenty five years of blood sweat and tears, and I&apos;m never
                  giving up, I&apos;m just getting started. I&apos;m up to
                  something. Fan luv.
                </DialogBody>
                <DialogFooter>
                  <Button
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1"
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button variant="gradient" color="green" onClick={handleOpen}>
                    <span>Confirm</span>
                  </Button>
                </DialogFooter>
              </Dialog>
            </div>
            <div className="my-8 mt-3 flex items-center gap-2">
              {product.sizes.map((size, index) => (
                <Button
                  key={index}
                  size="md"
                  variant="gradient"
                  color="white"
                  className="rounded-full"
                >
                  {size}
                </Button>
              ))}
            </div>
            <Typography color="blue-gray" variant="h6">
              Chất liệu
            </Typography>
            <div className="my-8 mt-3 flex items-center gap-2">
              <div className="flex gap-10">
                {product.materials.map((material, index) => (
                  <Radio key={index} name="type" label={material} />
                ))}
              </div>
            </div>
            <div className="mb-4 flex w-full items-center gap-3">
              <Button color="blue" className="w-52">
                Thêm vào giỏ hàng
              </Button>
              <Button color="green" className="w-64">
                Thêm vào giỏ hàng nhanh
              </Button>
              <IconButton color="red" variant="text" className="shrink-0">
                <HeartIcon className="h-6 w-6" />
              </IconButton>
            </div>
          </div>
        </div>
        <Container>
          <Accordion open={description === false}>
            <AccordionHeader onClick={() => setDescription(!description)}>
              <Typography variant="h3" className="">
                Chi tiết sản phẩm
              </Typography>
            </AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-2 gap-8">
                <Typography>{product.description}</Typography>
                <Typography>{product.description}</Typography>
              </div>
            </AccordionBody>
          </Accordion>
        </Container>
        <Container className="mt-5">
          <Accordion open={star === false}>
            <AccordionHeader onClick={() => setStar(!star)}>
              <Typography variant="h3" className="">
                Đánh giá sản phẩm
              </Typography>
            </AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-3 gap-20">
                <div>
                  <Typography className="mt-5" variant="h6">
                    Tổng quan
                  </Typography>
                  <div className="flex flex-col">
                    {stars.map((star, index) => (
                      <div className="w-full" key={index}>
                        <div className="flex items-center justify-between gap-4">
                          <Rating
                            readOnly
                            value={5 - index}
                            className="disabled text-amber-500 mt-3"
                          />
                          <Typography
                            color="blue-gray"
                            variant="h6"
                            className="mt-3"
                          >
                            {star}
                          </Typography>
                        </div>
                        <Progress
                          size="sm"
                          value={(star / total_star) * 100}
                          color="blue"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mx-auto">
                  <Typography className="my-5" variant="h6">
                    Tổng thể
                  </Typography>
                  <div className="flex items-center gap-8 mx-5">
                    <Typography variant="h1" className="text-center">
                      {product.rating.toPrecision(2)}
                    </Typography>
                    <div>
                      <Rating
                        readOnly
                        size="large"
                        value={product.rating.toPrecision(2)}
                        precision={0.1}
                        className="disabled text-amber-500"
                      />
                      <Typography color="blue-gray" className="text-center">
                        {total_star} reviews
                      </Typography>
                    </div>
                  </div>
                </div>
                <div>
                  <Typography className="my-3" variant="h6">
                    Hãy chia sẻ cảm nhận của bạn
                  </Typography>
                  <Rating defaultValue={null} size="large" />
                  <Textarea
                    className="mt-3"
                    label="Đánh giá sản phẩm"
                    labelProps={{ className: "mt-3" }}
                  />
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                  />
                  <Button
                    variant="gradient"
                    className="my-3 w-full"
                    color="green"
                  >
                    Gửi
                  </Button>
                </div>
              </div>
            </AccordionBody>
          </Accordion>
        </Container>
        <Container className="mt-5">
          <div>
            <Typography variant="h3">Chi tiết đánh giá</Typography>
            {reviews.slice(active * 4 - 4, active * 4).map((review, index) => (
              <Card key={index} className="mt-5">
                <CardBody className="grid grid-cols-12 gap-20">
                  <div className="col-span-4">
                    <div className="flex justify-around">
                      <Avatar
                        size="lg"
                        variant="circular"
                        src={review.avatar}
                        alt="tania andrew"
                        className="my-auto"
                      />
                      <div className="flex flex-col">
                        <Typography variant="h6" className="mt-3">
                          {review.user}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-8">
                    <div className="flex items-center">
                      <Rating
                        readOnly
                        value={review.rating}
                        className="disabled text-amber-500"
                      />
                      <Typography className="ml-3 mt-1 font-bold text-blue-gray-500">
                        {(review.rating === 5 && "Cực kì hài lòng") ||
                          (review.rating === 4 && "Hài lòng") ||
                          (review.rating === 3 && "Bình thường") ||
                          (review.rating === 2 && "Không hài lòng") ||
                          (review.rating === 1 && "Rất không hài lòng")}
                      </Typography>
                    </div>
                    <Typography className="mt-1 text-sm">
                      {review.date}
                    </Typography>
                    <Typography className="pt-3 pe-10 pb-5">
                      {review.content}
                    </Typography>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
          <Pagination
            page={Math.ceil(reviews.length / 4)}
            active={active}
            setActive={setActive}
          />
        </Container>
      </section>
    </>
  );
};

export default ProductDetailpage;
