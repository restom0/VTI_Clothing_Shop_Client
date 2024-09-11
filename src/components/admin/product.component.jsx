import { Button, Card, IconButton, Typography } from "@material-tailwind/react";
import {
  Select,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../configs/swiper.css";
import AdminLayout from "../../layouts/admin/admin.layout";
import { productdetail } from "../../constants/table_head";
import CloseIcon from "@mui/icons-material/Close";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../apis/product.api";
import Loading from "../shared/loading.component";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../apis/category.api";
import { useGetBrandsQuery } from "../../apis/brand.api";
import { Toast } from "../../configs/sweetalert2.config";
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
  const [addOpen, setAddOpen] = React.useState(false);
  const selectedId = useSelector((state) => state.selectedId.value);
  // const name = useSelector((state) => state.name.value);
  // const description = useSelector((state) => state.description.value);
  // const brand = useSelector((state) => state.brand.value);
  // const category = useSelector((state) => state.category.value);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateBrand, setUpdateBrand] = useState(null);
  const [updateCategory, setUpdateCategory] = useState(null);

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

  useEffect(() => {
    if (selectedId !== -1) {
      const selectedProduct = products?.object.find((p) => p.id === selectedId);
      setUpdateName(selectedProduct?.name);
      setUpdateDescription(selectedProduct?.short_description);
      setUpdateBrand(selectedProduct?.brand_id.id);
      setUpdateCategory(selectedProduct?.category_id.id);
    }
  }, [selectedId, products]);
  const handleAddOpen = () => setAddOpen(true);
  const handleClose = () => setAddOpen(false);
  const handleAddSubmit = async () => {
    try {
      await addProduct({
        name,
        short_description: description,
        brand_id: brand,
        category_id: category,
      })
        .unwrap()
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Thêm sản phẩm thành công",
          }).then(() => {
            handleClose();
            setName("");
            setDescription("");
            setBrand(null);
            setCategory(null);
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
      id: selectedId,
      name: updateName,
      brand_id: updateBrand,
      category_id: updateCategory,
      short_description: updateDescription,
    });
    return message;
  };
  const handleDeleteSubmit = async () => {
    try {
      const message = await deleteProduct(selectedId);
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
  products && products.object.length > 0;
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
        headerDetail={"Chi tiết sản phẩm"}
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
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle className="pb-0 flex justify-between">
                      <Typography variant="h4">Nhập giá sản phẩm</Typography>
                      <IconButton
                        className="border-none"
                        variant="outlined"
                        onClose={handleClose}
                      >
                        <CloseIcon />
                      </IconButton>
                    </DialogTitle>
                    <DialogContent>
                      The key to more success is to have a lot of pillows. Put
                      it this way, it took me twenty five years to get these
                      plants, twenty five years of blood sweat and tears, and
                      I&apos;m never giving up, I&apos;m just getting started.
                      I&apos;m up to something. Fan luv.
                    </DialogContent>
                    <DialogActions>
                      <Button
                        variant="text"
                        color="red"
                        onClose={handleClose}
                        className="mr-1"
                      >
                        <span>Cancel</span>
                      </Button>
                      <Button
                        variant="gradient"
                        color="green"
                        onClose={handleClose}
                      >
                        <span>Confirm</span>
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </div>
          </section>
        }
        headerUpdate={"Chỉnh sửa sản phẩm"}
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
              <TextField
                className="w-full"
                variant="outlined"
                autoComplete="off"
                placeholder="Nike"
                onChange={(e) => setUpdateName(e.target.value)}
                value={updateName}
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
              <FormControl fullWidth>
                <Select
                  value={updateBrand}
                  onChange={(e) => setUpdateBrand(e.target.value)}
                >
                  {brands?.object?.length > 0 &&
                    brands.object.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-bold my-auto"
              >
                Tên danh mục:
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={updateCategory}
                  onChange={(e) => setUpdateCategory(e.target.value)}
                >
                  {categories &&
                    categories.object.length > 0 &&
                    categories.object.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <Typography variant="h5" color="blue-gray" className="font-bold">
              Mô tả:
            </Typography>
            <TextField
              className="w-full !mt-2"
              size="lg"
              rows={4}
              maxRows={4}
              multiline
              variant="outlined"
              placeholder="Mô tả không quá 255 kí tự"
              autoComplete="off"
              onChange={(e) => setUpdateDescription(e.target.value)}
              value={updateDescription}
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
      <Dialog open={addOpen} onClose={handleClose}>
        <DialogTitle className="pb-0 flex justify-between">
          <Typography variant="h4">Thêm sản phẩm</Typography>
          <IconButton
            className="border-none"
            variant="outlined"
            onClick={handleAddOpen}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Container>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-bold my-auto"
              >
                Tên sản phẩm:
              </Typography>
              <TextField
                className="w-full"
                variant="outlined"
                placeholder="Quần Tây học sinh"
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                value={name}
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
              <FormControl fullWidth>
                <Select
                  className="!z-1100"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                >
                  {brands?.object?.length > 0 &&
                    brands.object.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-bold my-auto"
              >
                Tên danh mục:
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories &&
                    categories.object.length > 0 &&
                    categories.object.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <Typography variant="h5" color="blue-gray" className="font-bold">
              Mô tả:
            </Typography>
            <TextField
              className="w-full !mt-2"
              size="lg"
              rows={4}
              maxRows={4}
              multiline
              variant="outlined"
              placeholder="Mô tả không quá 255 kí tự"
              autoComplete="off"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </Container>
        </DialogContent>
        <DialogActions>
          <Button
            variant="gradient"
            color="green"
            onClick={handleAddSubmit}
            loading={isAdded}
          >
            {!isAdded && <span>Thêm mới</span>}
          </Button>
        </DialogActions>
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
        <DialogTitle>Its a simple dialog.</DialogTitle>
        <DialogContent>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
        </DialogContent>
        <DialogActions>
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
        </DialogActions>
      </Dialog> */}
    </>
  );
};

export default ProductList;
