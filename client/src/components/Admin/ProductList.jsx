import {
  Button,
  Card,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
  Dialog,
  Tooltip,
  Input,
  Textarea,
  Radio,
  Select,
  Option,
} from "@material-tailwind/react";
import { Container, Rating } from "@mui/material";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../configs/swiper.css";
import AdminLayout from "../../layouts/Admin/AdminLayout";
import { productdetail } from "../../constants/table_head";
import CloseIcon from "@mui/icons-material/Close";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../apis/ProductApi";
import Loading from "../shared/Loading";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../apis/CategoryApi";
import { useGetBrandsQuery } from "../../apis/BrandApi";
import { Toast } from "../../configs/SweetAlert2";
import { useDispatch, useSelector } from "react-redux";
import { resetSelectedId } from "../../features/slices/selectIdSlice";
import { resetName, setName } from "../../features/slices/nameSlice";
import {
  resetDescription,
  setDescription,
} from "../../features/slices/descriptionSlice";
import {
  resetCategory,
  setCategory,
} from "../../features/slices/categorySlice";
import { resetBrand, setBrand } from "../../features/slices/brandSlice";
const ProductList = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetSelectedId());
  }, [dispatch]);
  const [addOpen, setAddOpen] = React.useState(false);
  const selectedId = useSelector((state) => state.selectedId.value);
  const name = useSelector((state) => state.name.value);
  const description = useSelector((state) => state.description.value);
  const brand = useSelector((state) => state.brand.value);
  const category = useSelector((state) => state.category.value);

  const {
    data: products,
    isLoading: isLoading_Product,
    error: isError_Product,
  } = useGetProductsQuery();
  const {
    data: brands,
    error: isError_Brand,
    isLoading_Brand,
  } = useGetBrandsQuery();
  const {
    data: categories,
    error: isError_Category,
    isLoading: isLoading_Category,
  } = useGetCategoriesQuery();
  const [addProduct, { isLoading: isAdded, error: AddError }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdated, error: updateError }] =
    useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleted, error: deleteError }] =
    useDeleteProductMutation();
  const handleAddOpen = () => setAddOpen(!addOpen);
  const handleAddSubmit = async () => {
    try {
      await addProduct({
        name,
        description,
        brand_id: brand.id,
        category_id: category.id,
      })
        .unwrap()
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Thêm sản phẩm thành công",
          }).then(() => {
            handleAddOpen();
            dispatch(resetName());
            dispatch(resetDescription());
            dispatch(resetBrand());
            dispatch(resetCategory());
          });
        });
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Thêm sản phẩm thất bại",
      }).then(() => {
        // if (err.originalStatus === 401) {
        //   localStorage.clear();
        //   navigate("/login");
        // }
      });
    }
  };

  const updateSubmit = async () => {
    const message = await updateProduct({
      id: products.object[selectedId].id,
      name: name,
      brand_id: brand.id,
      category_id: category.id,
    });
    if (message.data.statusCode === 200) {
      dispatch(resetName());
      dispatch(resetDescription());
      dispatch(resetBrand());
      dispatch(resetCategory());
    }
    return message;
  };
  const handleDeleteSubmit = async () => {
    try {
      const message = await deleteProduct(products.object[selectedId].id);
      if (message.data.statusCode === 200) {
        Toast.fire({
          icon: "success",
          title: "Xóa thành công",
        });
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Xóa thất bại",
      });
    }
  };
  if (isLoading_Brand || isLoading_Category || isLoading_Product)
    return <Loading />;
  if (isError_Brand || isError_Category || isError_Product)
    return navigate("/error");
  const ListProduct = [];
  products &&
    products.object.map((item, index) => {
      ListProduct.push({
        id: item.id,
        name: item.name,
        brand: item.brand_id.name,
        category: item.category_id.name,
      });
    });
  return (
    <>
      <AdminLayout
        name="Danh sách sản phẩm"
        TABLE_HEAD={productdetail}
        TABLE_ROWS={ListProduct}
        deleteContent="Xóa sản phẩm"
        updateContent="Chỉnh sửa sản phẩm"
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
                <div className="h-[100px] w-[400px]">
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    modules={[Navigation]}
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
                <div className="grid grid-cols-2 text-center mt-5">
                  <Typography variant="h6">Giá nhập:</Typography>
                  <Typography variant="small">$1,490</Typography>
                  <Typography variant="h6">Giá bán:</Typography>
                  <Typography variant="small">$1,490</Typography>
                  <Typography variant="h6">Giảm giá:</Typography>
                  <Typography variant="small">10%</Typography>
                </div>
              </div>
              <div>
                <Typography className="mb-4" variant="h3">
                  {product.title}
                </Typography>
                <div className="grid grid-cols-2 text-center mt-5">
                  <Typography variant="h6">Thương hiệu:</Typography>
                  <Typography variant="small">Nike</Typography>
                  <Typography variant="h6">Danh mục:</Typography>
                  <Typography variant="small">Quần áo</Typography>
                </div>
                <Typography className="!mt-4 text-base font-bold leading-[27px] !text-gray-700">
                  Mô tả
                </Typography>
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
                <div className="grid grid-cols-4  text-center">
                  <Typography
                    color="blue-gray"
                    variant="h6"
                    className="col-span-2"
                  >
                    Màu sắc
                  </Typography>
                  <Typography color="blue-gray" variant="h6">
                    Kích cỡ
                  </Typography>
                  <Typography color="blue-gray" variant="h6">
                    Chất liệu
                  </Typography>
                  <div className="my-4 mt-3 flex flex-col gap-2 col-span-2">
                    {product.colors.map((color, index) => (
                      <div className="flex gap-2 items-center ms-5" key={index}>
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
                      <Typography
                        key={index}
                        className="!text-gray-700 text-center"
                      >
                        {size}
                      </Typography>
                    ))}
                  </div>
                  <div className="my-8 mt-3 flex flex-col gap-2">
                    {product.materials.map((material, index) => (
                      <Typography
                        key={index}
                        className="!text-gray-700 text-center"
                      >
                        {material}
                      </Typography>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <Dialog open={open} handler={handleOpen}>
                    <DialogHeader className="pb-0 flex justify-between">
                      <Typography variant="h4">Nhập giá sản phẩm</Typography>
                      <IconButton
                        className="border-none"
                        variant="outlined"
                        onClick={handleOpen}
                      >
                        <CloseIcon />
                      </IconButton>
                    </DialogHeader>
                    <DialogBody>
                      The key to more success is to have a lot of pillows. Put
                      it this way, it took me twenty five years to get these
                      plants, twenty five years of blood sweat and tears, and
                      I&apos;m never giving up, I&apos;m just getting started.
                      I&apos;m up to something. Fan luv.
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
                      <Button
                        variant="gradient"
                        color="green"
                        onClick={handleOpen}
                      >
                        <span>Confirm</span>
                      </Button>
                    </DialogFooter>
                  </Dialog>
                </div>
              </div>
            </div>
          </section>
        }
        headerUpdate={"Chỉnh sửa sản phẩm #" + "001"}
        bodyUpdate={
          <Container>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-bold my-auto"
              >
                Tên sản phẩm:
              </Typography>
              <Input
                value={
                  selectedId === -1
                    ? ""
                    : name === ""
                    ? products.object.find((item) => item.id === selectedId)
                        ?.name || ""
                    : name
                }
                placeholder="Nike"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => dispatch(setName(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-bold my-auto"
              >
                Tên thương hiệu:
              </Typography>
              <Select
                value={
                  selectedId === -1
                    ? ""
                    : brand.id
                    ? brand.id
                    : products.object.find((item) => item.id === selectedId)
                        ?.brand_id.id || ""
                }
                className=" !border-blue-gray-200 focus:!border-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => dispatch(setBrand(e))}
              >
                {brands &&
                  brands.object.length > 0 &&
                  brands.object.map((item, index) => (
                    <Option key={index} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-bold my-auto"
              >
                Tên danh mục:
              </Typography>
              <Select
                value={
                  selectedId === -1
                    ? ""
                    : category.id
                    ? category.id
                    : products.object.find((item) => item.id === selectedId)
                        ?.category_id.id || ""
                }
                className=" !border-blue-gray-200 focus:!border-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => dispatch(setCategory(e))}
              >
                {categories &&
                  categories.object.length > 0 &&
                  categories.object.map((item, index) => (
                    <Option key={index} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </div>
            <Typography variant="h5" color="blue-gray" className="font-bold">
              Mô tả:
            </Typography>
            <Textarea
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={
                selectedId === -1
                  ? ""
                  : description === ""
                  ? products.object.find((item) => item.id === selectedId)
                      ?.description || ""
                  : description
              }
              placeholder="Thương hiệu thể thao hàng đầu thế giới"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Container>
        }
        updateSubmit={updateSubmit}
        handleDeleteSubmit={handleDeleteSubmit}
        isUpdated={isUpdated}
        isDeleted={isDeleted}
      >
        <div className="flex items-center justify-between gap-4">
          <Button
            className=" !border-gray-300"
            color="gray"
            variant="outlined"
            onClick={handleAddOpen}
          >
            Thêm mới
          </Button>
        </div>
      </AdminLayout>
      <Dialog open={addOpen} handler={handleAddOpen} size="md">
        <DialogHeader className="pb-0 flex justify-between">
          <Typography variant="h4">Thêm thương hiệu</Typography>
          <IconButton
            className="border-none"
            variant="outlined"
            onClick={handleAddOpen}
          >
            <CloseIcon />
          </IconButton>
        </DialogHeader>
        <DialogBody>
          <Container>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-bold my-auto"
              >
                Tên sản phẩm:
              </Typography>
              <Input
                placeholder="Nike"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-bold my-auto"
              >
                Tên thương hiệu:
              </Typography>
              <Select
                className=" !border-blue-gray-200 focus:!border-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              >
                {brands &&
                  brands.object.length > 0 &&
                  brands.object.map((item, index) => (
                    <Option
                      key={index}
                      value={item.id}
                      onClick={() => setBrand(item)}
                    >
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-bold my-auto"
              >
                Tên danh mục:
              </Typography>
              <Select
                className=" !border-blue-gray-200 focus:!border-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              >
                {categories &&
                  categories.object.length > 0 &&
                  categories.object.map((item, index) => (
                    <Option
                      key={index}
                      value={item.id}
                      onClick={() => setCategory(item)}
                    >
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </div>
            <Typography variant="h5" color="blue-gray" className="font-bold">
              Mô tả:
            </Typography>
            <Textarea
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              placeholder="Thương hiệu thể thao hàng đầu thế giới"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Container>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="green"
            onClick={handleAddSubmit}
            loading={isAdded}
          >
            {!isAdded && <span>Thêm mới</span>}
          </Button>
        </DialogFooter>
      </Dialog>
      {/* <Container className="mt-5">
        <div className="flex items-center justify-between mb-5">
          <Typography variant="h3" color="blue-gray" className="font-bold">
            Danh sách sản phẩm
          </Typography>
          <div className="flex items-center justify-between gap-4">
            <Button
              className=" !border-gray-300"
              color="gray"
              variant="outlined"
            >
              Thêm mới
            </Button>
          </div>
        </div>
        <Table
          TABLE_HEAD={productdetail}
          TABLE_ROWS={TABLE_ROWS}
          active={active}
          setActive={setActive}
          handleDetailOpen={handleDetailOpen}
          handleUpdateOpen={handleUpdateOpen}
          handleDeleteOpen={handleDeleteOpen}
          deleteContent="Xóa sản phẩm"
          updateContent="Chỉnh sửa sản phẩm"
        />
      </Container>
      <Dialog open={detailOpen} handler={handleDetailOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleDetailOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleDetailOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog> */}
    </>
  );
};

export default ProductList;
