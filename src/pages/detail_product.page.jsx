import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react/components/Accordion";
import { Avatar } from "@material-tailwind/react/components/Avatar";
import { Button } from "@material-tailwind/react/components/Button";
import { Card, CardBody } from "@material-tailwind/react/components/Card";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react/components/Dialog";
import { IconButton } from "@material-tailwind/react/components/IconButton";
import { Progress } from "@material-tailwind/react/components/Progress";
import { Radio } from "@material-tailwind/react/components/Radio";
import { Textarea } from "@material-tailwind/react/components/Textarea";
import { Tooltip } from "@material-tailwind/react/components/Tooltip";
import { Typography } from "@material-tailwind/react/components/Typography";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../configs/swiper.css";
import { Container, Rating } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../components/shared/pagination.component";
import { useGetOnSaleProductQuery } from "../apis/on_sale_product.api";
import { useCreateOrderItemMutation } from "../apis/order_item.api";
import { Toast } from "../configs/sweetalert2.config";
import Loading from "../components/shared/loading.component";
import { useCurrency } from "../currency";
import { useI18n } from "../i18n";
import {
  PRODUCT_DESCRIPTION_TEXT_CLASSNAME,
  PRODUCT_DETAIL_ACTIONS_CLASSNAME,
  PRODUCT_DETAIL_LAYOUT_CLASSNAME,
  PRODUCT_DETAIL_PAGE_CLASSNAME,
  PRODUCT_INFO_COLUMN_CLASSNAME,
  PRODUCT_MAIN_MEDIA_CLASSNAME,
  PRODUCT_MAIN_SWIPER_CLASSNAME,
  PRODUCT_MATERIAL_GROUP_CLASSNAME,
  PRODUCT_MEDIA_COLUMN_CLASSNAME,
  PRODUCT_OPTION_HEADER_CLASSNAME,
  PRODUCT_OPTION_ROW_CLASSNAME,
  PRODUCT_REVIEW_CARD_CLASSNAME,
  PRODUCT_THUMB_MEDIA_CLASSNAME,
  PRODUCT_THUMB_SWIPER_CLASSNAME,
  PRODUCT_TITLE_CLASSNAME,
  RESPONSIVE_GRID_2_CLASSNAME,
  RESPONSIVE_GRID_3_CLASSNAME,
} from "../styles/classNames";
const stars = [50, 50, 50, 50, 50];
const total_star = stars.reduce((a, b) => a + b, 0);
const reviews = [
  {
    id: 0,
    rating: 5,
    user: "Tania Andrew",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    dateKey: "product.review_date_3_days_ago",
    contentKey: "product.review_sample_content",
  },
  {
    id: 1,
    rating: 5,
    user: "Tania Andrew",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    dateKey: "product.review_date_3_days_ago",
    contentKey: "product.review_sample_content",
  },
  {
    id: 2,
    rating: 5,
    user: "Tania Andrew",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    dateKey: "product.review_date_3_days_ago",
    contentKey: "product.review_sample_content",
  },
  {
    id: 3,
    rating: 5,
    user: "Tania Andrew",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    dateKey: "product.review_date_3_days_ago",
    contentKey: "product.review_sample_content",
  },
  {
    id: 3,
    rating: 5,
    user: "Tania Andrew",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    dateKey: "product.review_date_3_days_ago",
    contentKey: "product.review_sample_content",
  },
];

const getRatingLabelKey = (rating) => {
  switch (rating) {
    case 5:
      return "product.rating_5";
    case 4:
      return "product.rating_4";
    case 3:
      return "product.rating_3";
    case 2:
      return "product.rating_2";
    case 1:
      return "product.rating_1";
    default:
      return "product.rating_default";
  }
};

const ProductDetailpage = () => {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(1);
  const [image, setImage] = React.useState([]);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [material, setMaterial] = useState(null);
  const [stock, setStock] = useState(0);
  const [amount, setAmount] = useState(1);
  const [select] = useState(-1);
  const handleOpen = () => setOpen(!open);
  const [description, setDescription] = React.useState(false);
  const [star, setStar] = React.useState(false);
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetOnSaleProductQuery(id);
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const { t } = useI18n();
  const [createOrderItem] = useCreateOrderItemMutation();
  useEffect(() => {
    if (
      !color ||
      !size ||
      !material ||
      !product?.object ||
      !product?.object.find(
        (item) =>
          item.product_id.color_id.id === color &&
          item.product_id.size_id.id === size &&
          item.product_id.material_id.id === material
      )
    ) {
      const first = product?.object?.[0];
      setImage(
        first
          ? [
              first.product_id?.image_url,
              first.product_id?.slider_url_1,
              first.product_id?.slider_url_2,
              first.product_id?.slider_url_3,
              first.product_id?.slider_url_4,
            ].filter(Boolean)
          : []
      );
      setStock(0);
    } else {
      const search = product?.object.find(
        (item) =>
          item.product_id.color_id.id === color &&
          item.product_id.size_id.id === size &&
          item.product_id.material_id.id === material
      );
      setImage(
        [
          search?.product_id?.image_url,
          search?.product_id?.slider_url_1,
          search?.product_id?.slider_url_2,
          search?.product_id?.slider_url_3,
          search?.product_id?.slider_url_4,
        ].filter(Boolean)
      );
      setStock(search?.product_id?.stock ?? 0);
    }
  }, [select, product?.object, size, material, color]);
  if (isLoading)
    return (
      <div className="h-96">
        <Loading />
      </div>
    );
  if (error) {
    navigate("/error");
    return null;
  }

  const firstItem = product?.object?.[0];
  if (!firstItem) return null;

  const handleAddCart = async () => {
    if (!localStorage.getItem("token")) return navigate("/login");
    try {
      await createOrderItem({
        order_id: Number(localStorage.getItem("order_id")),
        product_id: firstItem.id,
        quantity: 1,
      }).unwrap();
      Toast.fire({ icon: "success", title: t("product.add_cart_success") });
    } catch {
      Toast.fire({ icon: "error", title: t("product.add_cart_failed") });
    }
  };

  const handleAddCarts = async () => {
    if (!localStorage.getItem("token")) return navigate("/login");
    try {
      await createOrderItem({
        order_id: Number(localStorage.getItem("order_id")),
        product_id: firstItem.id,
        quantity: amount,
      }).unwrap();
      Toast.fire({ icon: "success", title: t("product.add_cart_success") });
    } catch {
      Toast.fire({
        icon: "error",
        title: t("product.add_cart_failed"),
      });
    }
  };
  return (
    <>
      <section className={PRODUCT_DETAIL_PAGE_CLASSNAME}>
        <div className={PRODUCT_DETAIL_LAYOUT_CLASSNAME}>
          <div className={PRODUCT_MEDIA_COLUMN_CLASSNAME}>
            <div className={PRODUCT_MAIN_MEDIA_CLASSNAME}>
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
                className={PRODUCT_MAIN_SWIPER_CLASSNAME}
              >
                {image.map((url, index) => (
                  <SwiperSlide key={index}>
                    <img src={url} alt={t("product.image_alt", { index: index + 1 })} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* <img
              src="https://www.material-tailwind.com/image/product-4.png"
              alt="pink blazer"
              className=""
            /> */}
            <div className={PRODUCT_THUMB_MEDIA_CLASSNAME}>
              <Swiper
                slidesPerView={4}
                spaceBetween={30}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                modules={[Navigation, Autoplay]}
                loop={true}
                className={PRODUCT_THUMB_SWIPER_CLASSNAME}
              >
                {image.map((url, index) => (
                  <SwiperSlide key={index}>
                    <img src={url} alt={t("product.image_alt", { index: index + 1 })} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className={PRODUCT_INFO_COLUMN_CLASSNAME}>
            <Typography className={PRODUCT_TITLE_CLASSNAME} variant="h3">
              {firstItem.product_id?.product_id?.name ?? ""}
            </Typography>
            <Typography variant="h5">{formatPrice(firstItem.sale_price ?? 0)}</Typography>
            <Typography className={PRODUCT_DESCRIPTION_TEXT_CLASSNAME}>
              {firstItem.product_id?.product_id?.short_description ?? ""}
            </Typography>
            <Typography color="blue-gray" variant="h6">
              {t("product.color")}
            </Typography>
            <div className={PRODUCT_OPTION_ROW_CLASSNAME}>
              {(product.object ?? []).map((color, index) => (
                <Tooltip content={color.product_id?.color_id?.color_name ?? ""} key={index}>
                  <Button
                    size="lg"
                    variant="gradient"
                    color="white"
                    className="rounded-full"
                    style={{
                      backgroundColor: color.product_id.color_id.color_code,
                    }}
                    onClick={() => setColor(color.product_id.color_id.id)}
                  >
                    {" "}
                  </Button>
                </Tooltip>
              ))}
              {/* {product.colors.map((color, index) => (
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
              ))} */}
            </div>
            <div className={PRODUCT_OPTION_HEADER_CLASSNAME}>
              <Typography color="blue-gray" variant="h6">
                {t("product.size")}
              </Typography>
              {/* <Button
                onClick={handleOpen}
                size="sm"
                variant="gradient"
                color="white"
                className="shadow-none"
              >
                {t("product.size_guide")}
              </Button> */}
              <Dialog open={open} handler={handleOpen}>
                <DialogHeader>{t("product.size_guide_title")}</DialogHeader>
                <DialogBody>{t("product.size_guide_body")}</DialogBody>
              </Dialog>
            </div>
            <div className={PRODUCT_OPTION_ROW_CLASSNAME}>
              {product.object
                .filter(
                  (value, index, self) =>
                    index ===
                    self.findIndex((t) => t.product_id.size_id.id === value.product_id.size_id.id)
                )
                .map((size, index) => (
                  <Tooltip
                    content={
                      size.product_id.size_id.height +
                      " cm - " +
                      size.product_id.size_id.weight +
                      " kg"
                    }
                    key={index}
                  >
                    <Button
                      size="md"
                      variant="gradient"
                      color="white"
                      className="rounded-full"
                      onClick={() => setSize(size.product_id.size_id.id)}
                    >
                      {size.product_id.size_id.size}
                    </Button>
                  </Tooltip>
                ))}
              {/* {product.sizes.map((size, index) => (
                <Button
                  key={index}
                  size="md"
                  variant="gradient"
                  color="white"
                  className="rounded-full"
                >
                  {size}
                </Button>
              ))} */}
            </div>
            <Typography color="blue-gray" variant="h6">
              {t("product.material")}
            </Typography>
            <div className={PRODUCT_OPTION_ROW_CLASSNAME}>
              <div className={PRODUCT_MATERIAL_GROUP_CLASSNAME}>
                {product.object
                  .filter(
                    (value, index, self) =>
                      index ===
                      self.findIndex(
                        (t) => t.product_id.material_id.id === value.product_id.material_id.id
                      )
                  )
                  .map((material, index) => (
                    <Radio
                      name="type"
                      label={material.product_id.material_id.name}
                      key={index}
                      onClick={() => setMaterial(material.product_id.material_id.id)}
                    />
                  ))}
                {/* {product.materials.map((material, index) => (
                  <Radio key={index} name="type" label={material} />
                ))} */}
              </div>
            </div>
            <div className={PRODUCT_OPTION_ROW_CLASSNAME}>
              <Typography variant="h6">{t("product.stock_left")}:</Typography>
              <Typography>{stock}</Typography>
              <Typography>{t("product.stock_unit")}</Typography>
            </div>
            <div className={PRODUCT_OPTION_ROW_CLASSNAME}>
              <Typography variant="h6">{t("product.quantity")}</Typography>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setAmount(amount - 1 < 1 ? amount : amount - 1)}
                  variant="gradient"
                  color="white"
                  className="rounded-full"
                >
                  -
                </Button>
                <Typography>{amount}</Typography>
                <Button
                  onClick={() => setAmount(amount + 1 > stock ? amount : amount + 1)}
                  variant="gradient"
                  color="white"
                  className="rounded-full"
                >
                  +
                </Button>
              </div>
            </div>

            <div className={PRODUCT_DETAIL_ACTIONS_CLASSNAME}>
              <Button color="blue" className="w-52" onClick={handleAddCarts}>
                {t("product.add_to_cart")}
              </Button>
              <Button color="green" className="w-64" onClick={handleAddCart}>
                {t("product.quick_add_to_cart")}
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
                {t("product.detail")}
              </Typography>
            </AccordionHeader>
            <AccordionBody>
              <div className={RESPONSIVE_GRID_2_CLASSNAME}>
                <Typography>{product.object[0].product_id.product_id.short_description}</Typography>
              </div>
            </AccordionBody>
          </Accordion>
        </Container>
        <Container className="mt-5">
          <Accordion open={star === false}>
            <AccordionHeader onClick={() => setStar(!star)}>
              <Typography variant="h3" className="">
                {t("product.reviews")}
              </Typography>
            </AccordionHeader>
            <AccordionBody>
              <div className={RESPONSIVE_GRID_3_CLASSNAME}>
                <div>
                  <Typography className="mt-5" variant="h6">
                    {t("product.review_overview")}
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
                          <Typography color="blue-gray" variant="h6" className="mt-3">
                            {star}
                          </Typography>
                        </div>
                        <Progress size="sm" value={(star / total_star) * 100} color="blue" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mx-auto">
                  <Typography className="my-5" variant="h6">
                    {t("product.review_overall")}
                  </Typography>
                  <div className="flex items-center gap-8 mx-5">
                    <Typography variant="h1" className="text-center">
                      {product.rating}
                    </Typography>
                    <div>
                      <Rating
                        readOnly
                        size="large"
                        value={product.rating}
                        precision={0.1}
                        className="disabled text-amber-500"
                      />
                      <Typography color="blue-gray" className="text-center">
                        {t("product.reviews_count", { count: total_star })}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div>
                  <Typography className="my-3" variant="h6">
                    {t("product.review_share_prompt")}
                  </Typography>
                  <Rating defaultValue={null} size="large" />
                  <Textarea
                    className="mt-3"
                    label={t("product.review_input_label")}
                    labelProps={{ className: "mt-3" }}
                  />
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                  />
                  <Button variant="gradient" className="my-3 w-full" color="green">
                    {t("product.submit_review")}
                  </Button>
                </div>
              </div>
            </AccordionBody>
          </Accordion>
        </Container>
        <Container className="mt-5">
          <div>
            <Typography variant="h3">{t("product.review_details")}</Typography>
            {reviews.slice(active * 4 - 4, active * 4).map((review, index) => (
              <Card key={index} className="mt-5">
                <CardBody className={PRODUCT_REVIEW_CARD_CLASSNAME}>
                  <div className="col-span-4">
                    <div className="flex justify-around">
                      <Avatar
                        size="lg"
                        variant="circular"
                        src={review.avatar}
                        alt="tania andrew"
                        title={review.user}
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
                      <Rating readOnly value={review.rating} className="disabled text-amber-500" />
                      <Typography className="ml-3 mt-1 font-bold text-blue-gray-500">
                        {t(getRatingLabelKey(review.rating))}
                      </Typography>
                    </div>
                    <Typography className="mt-1 text-sm">{t(review.dateKey)}</Typography>
                    <Typography className="pt-3 pe-10 pb-5">{t(review.contentKey)}</Typography>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
          <Pagination page={Math.ceil(reviews.length / 4)} active={active} setActive={setActive} />
        </Container>
      </section>
    </>
  );
};

export default ProductDetailpage;
