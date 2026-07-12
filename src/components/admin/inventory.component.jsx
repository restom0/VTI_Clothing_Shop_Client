import { Button } from "@material-tailwind/react/components/Button";
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  Dialog,
} from "@material-tailwind/react/components/Dialog";
import { IconButton } from "@material-tailwind/react/components/IconButton";
import { Typography } from "@material-tailwind/react/components/Typography";
import { Input } from "@material-tailwind/react/components/Input";
import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { inventory_tab } from "../../constants/tab.constant";
import AdminLayout from "../../layouts/admin/admin.layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../configs/swiper.css";
import { inventory } from "../../constants/head_table.constant";
import CloseIcon from "@mui/icons-material/Close";
import { useGetImportedProductsQuery } from "../../apis/import_product.api";
import Loading from "../shared/loading.component";
import { useCurrency } from "../../currency";
import {
  ADMIN_PRODUCT_THUMB_MEDIA_CLASSNAME,
  ADMIN_PRODUCT_THUMB_SWIPER_CLASSNAME,
  PRODUCT_COLOR_COLUMN_CLASSNAME,
  PRODUCT_COLOR_ROW_CLASSNAME,
  PRODUCT_DESCRIPTION_LABEL_CLASSNAME,
  PRODUCT_DESCRIPTION_TEXT_CLASSNAME,
  PRODUCT_META_GRID_CLASSNAME,
  PRODUCT_RATING_ROW_CLASSNAME,
  PRODUCT_TITLE_CLASSNAME,
  PRODUCT_VARIANT_GRID_CLASSNAME,
} from "../../styles/classNames";
import { SHOP_PRODUCT_COLORS } from "../../mocks/shop_products.mock";
import { INVENTORY_FILTER } from "../../constants/status.constant";
const Inventory = () => {
  const [tab1, setTab1] = useState(INVENTORY_FILTER.ALL);
  const { formatPrice } = useCurrency();
  const [open, setOpen] = React.useState(false);
  const [importProducts, setImportProducts] = React.useState(null);
  const handleOpen = () => setOpen(!open);

  const product = {
    id: 0,
    colors: SHOP_PRODUCT_COLORS,
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
  const {
    data: importProduct,
    isLoading: importProductLoading,
    error: importProductError,
  } = useGetImportedProductsQuery();
  useEffect(() => {
    if (tab1 === INVENTORY_FILTER.AVAILABLE) {
      setImportProducts(importProduct?.object.filter((product) => product.stock > 0));
    }
    if (tab1 === INVENTORY_FILTER.OUT_OF_STOCK) {
      setImportProducts(importProduct?.object.filter((product) => product.stock === 0));
    }
    if (tab1 === INVENTORY_FILTER.ALL) {
      setImportProducts(importProduct?.object);
    }
  }, [tab1, importProduct]);
  if (importProductLoading) return <Loading />;
  if (importProductError) return <div>{importProductError}</div>;
  const listImportedProducts =
    importProducts &&
    importProducts.map((item) => {
      return {
        id: item.id,
        avatar: (
          <img className="h-auto w-16 mx-auto" src={item.image_url} alt={item.product_id.name} />
        ),
        name: item.product_id.name,
        sku: item.sku,
        price: formatPrice(item.importPrice),
        stock: item.stock,
      };
    });
  return (
    <>
      <AdminLayout
        name="Kho hàng"
        tab={tab1}
        setTab={setTab1}
        tablist={inventory_tab}
        TABLE_HEAD={inventory}
        TABLE_ROWS={listImportedProducts ? listImportedProducts : []}
        updateContent="Chỉnh sửa"
        deleteContent="Xóa"
        size="xl"
        headerDetail={"Chi tiết sản phẩm #" + "001"}
        bodyDetail={
          <section className="px-8 h-[65vh] overflow-auto">
            <div className="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2">
              <div className="grid-cols-1 ">
                <div className="h-[300px] w-96 mx-auto">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    modules={[Navigation]}
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
                <div className={ADMIN_PRODUCT_THUMB_MEDIA_CLASSNAME}>
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    modules={[Navigation]}
                    loop={true}
                    className={ADMIN_PRODUCT_THUMB_SWIPER_CLASSNAME}
                  >
                    {product.imageUrl.map((url, index) => (
                      <SwiperSlide key={index}>
                        <img src={url} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className={PRODUCT_META_GRID_CLASSNAME}>
                  <Typography variant="h6">Giá nhập:</Typography>
                  <Typography variant="small">$1,490</Typography>
                  <Typography variant="h6">Giá bán:</Typography>
                  <Typography variant="small">$1,490</Typography>
                  <Typography variant="h6">Giảm giá:</Typography>
                  <Typography variant="small">10%</Typography>
                </div>
              </div>
              <div>
                <Typography className={PRODUCT_TITLE_CLASSNAME} variant="h3">
                  {product.title}
                </Typography>
                <div className={PRODUCT_META_GRID_CLASSNAME}>
                  <Typography variant="h6">Thương hiệu:</Typography>
                  <Typography variant="small">Nike</Typography>
                  <Typography variant="h6">Danh mục:</Typography>
                  <Typography variant="small">Quần áo</Typography>
                </div>
                <Typography className={PRODUCT_DESCRIPTION_LABEL_CLASSNAME}>Mô tả</Typography>
                <Typography className={PRODUCT_DESCRIPTION_TEXT_CLASSNAME}>
                  {product.short_description}
                </Typography>
                <div className={PRODUCT_RATING_ROW_CLASSNAME}>
                  <Rating readOnly value={product.rating} className="disabled text-amber-500" />
                  <Typography className="!text-sm font-bold !text-gray-700">
                    {product.rating.toPrecision(2)}/5 (100 reviews)
                  </Typography>
                </div>
                <div className={PRODUCT_VARIANT_GRID_CLASSNAME}>
                  <Typography color="blue-gray" variant="h6" className="col-span-2">
                    Màu sắc
                  </Typography>
                  <Typography color="blue-gray" variant="h6">
                    Kích cỡ
                  </Typography>
                  <Typography color="blue-gray" variant="h6">
                    Chất liệu
                  </Typography>
                  <div className={PRODUCT_COLOR_COLUMN_CLASSNAME}>
                    {product.colors.map((color, index) => (
                      <div className={PRODUCT_COLOR_ROW_CLASSNAME} key={index}>
                        <Button
                          size="lg"
                          variant="gradient"
                          color="white"
                          className="rounded-full"
                          style={{ backgroundColor: color.color }}
                        >
                          {" "}
                        </Button>
                        <Typography>{color.label}</Typography>
                      </div>
                    ))}
                  </div>

                  <div className="my-8 mt-3 flex flex-col gap-2">
                    {product.sizes.map((size, index) => (
                      <Typography key={index} className="!text-gray-700 text-center">
                        {size}
                      </Typography>
                    ))}
                  </div>
                  <div className="my-8 mt-3 flex flex-col gap-2">
                    {product.materials.map((material, index) => (
                      <Typography key={index} className="!text-gray-700 text-center">
                        {material}
                      </Typography>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <Dialog open={open} handler={handleOpen}>
                    <DialogHeader className="pb-0 flex justify-between">
                      <Typography variant="h4">Nhập sản phẩm mới</Typography>
                      <IconButton className="border-none" variant="outlined" onClick={handleOpen}>
                        <CloseIcon />
                      </IconButton>
                    </DialogHeader>
                    <DialogBody>
                      The key to more success is to have a lot of pillows. Put it this way, it took
                      me twenty five years to get these plants, twenty five years of blood sweat and
                      tears, and I&apos;m never giving up, I&apos;m just getting started. I&apos;m
                      up to something. Fan luv.
                    </DialogBody>
                    <DialogFooter>
                      <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
                        <span>Cancel</span>
                      </Button>
                      <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm</span>
                      </Button>
                    </DialogFooter>
                  </Dialog>
                </div>
              </div>
            </div>
          </section>
        }
        noUpdate
      >
        <div className="flex items-center justify-between gap-4">
          {/* <Select label="Phân loại theo">
            <Option value="">Không có</Option>
            <Option value="Color">Thương hiệu</Option>
            <Option value="Color">Loại sản phẩm</Option>
            <Option value="Size">Kích thước</Option>
            <Option value="Material">Chất liệu</Option>
            <Option value="Type">Loại sản phẩm</Option>
          </Select> */}
          <Input
            size="sm"
            label="Tìm kiếm"
            iconFamily="material-icons"
            iconName="search"
            placeholder="Tìm kiếm sản phẩm"
          />
        </div>
      </AdminLayout>
    </>
  );
};

export default Inventory;
