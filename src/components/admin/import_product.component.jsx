import {
  Button,
  Card,
  IconButton,
  Typography,
  Tooltip,
  Input,
  Tabs,
  TabsHeader,
  Tab,
  Option,
  CardFooter,
  useSelect,
  slider,
  Radio,
} from "@material-tailwind/react";
import {
  Select,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Container,
  Rating,
  TextField,
  InputAdornment,
  FormControl,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/admin/admin.layout";
import { importproduct } from "../../constants/table_head";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../apis/product.api";
import {
  useAddImportedProductMutation,
  useDeleteImportedProductMutation,
  useGetImportedProductsQuery,
  useUpdateImportedProductMutation,
} from "../../apis/import_product.api";
import { Toast } from "../../configs/sweetalert2.config";
import ImageUpload from "../upload_image.component";
import {
  deleteAvatar,
  resetAvatar,
  setAvatar,
} from "../../features/slices/avatar_urlSlice";
import axios from "axios";
import CryptoJS from "crypto-js";
import {
  deleteSlider1,
  resetSlider1,
  setSlider1,
} from "../../features/slices/slider1Slice";
import {
  deleteSlider2,
  resetSlider2,
  setSlider2,
} from "../../features/slices/slider2Slice";
import {
  deleteSlider3,
  resetSlider3,
  setSlider3,
} from "../../features/slices/slider3Slice";
import {
  deleteSlider4,
  resetSlider4,
  setSlider4,
} from "../../features/slices/slider4Slice";
import Loading from "../shared/loading.component";
import { resetSelectedId } from "../../features/slices/selectIdSlice";
import { handleDelete } from "../../utils/delete_image.util";

const ImportProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const avatar_url = useSelector((state) => state.avatar_url);
  // const slider1 = useSelector((state) => state.slider1);
  // const slider2 = useSelector((state) => state.slider2);
  // const slider3 = useSelector((state) => state.slider3);
  // const slider4 = useSelector((state) => state.slider4);
  const [avatar_url, setAvatar_Url] = useState("");
  const [slider1, setSlider1] = useState("");
  const [slider2, setSlider2] = useState("");
  const [slider3, setSlider3] = useState("");
  const [slider4, setSlider4] = useState("");
  const [publicIdAvatar, setPublicIdAvatar] = useState("");
  const [publicIdSlider1, setPublicIdSlider1] = useState("");
  const [publicIdSlider2, setPublicIdSlider2] = useState("");
  const [publicIdSlider3, setPublicIdSlider3] = useState("");
  const [publicIdSlider4, setPublicIdSlider4] = useState("");

  const [updateAvatar_Url, setUpdateAvatar_Url] = useState("");
  const [updateSlider1, setUpdateSlider1] = useState("");
  const [updateSlider2, setUpdateSlider2] = useState("");
  const [updateSlider3, setUpdateSlider3] = useState("");
  const [updateSlider4, setUpdateSlider4] = useState("");
  const [updatePublicIdAvatar, setUpdatePublicIdAvatar] = useState("");
  const [updatePublicIdSlider1, setUpdatePublicIdSlider1] = useState("");
  const [updatePublicIdSlider2, setUpdatePublicIdSlider2] = useState("");
  const [updatePublicIdSlider3, setUpdatePublicIdSlider3] = useState("");
  const [updatePublicIdSlider4, setUpdatePublicIdSlider4] = useState("");

  const [newOpen, setNewOpen] = useState(false);
  const [oldOpen, setOldOpen] = useState(false);
  const selectedId = useSelector((state) => state.selectedId.value);
  const [product, setProduct] = useState(null);
  const [color_code, setColorCode] = useState("");
  const [color_name, setColorName] = useState("");
  const [size, setSize] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [material, setMaterial] = useState("");
  const [gender, setGender] = useState("");
  const [importPrice, setImportPrice] = useState(1000);
  const [importNumber, setImportNumber] = useState(1);
  const [updateColor_code, setUpdateColorCode] = useState("");
  const [updateColor_name, setUpdateColorName] = useState("");
  const [updateSize, setUpdateSize] = useState("");
  const [updateHeight, setUpdateHeight] = useState(0);
  const [updateWeight, setUpdateWeight] = useState(0);
  const [updateMaterial, setUpdateMaterial] = useState("");
  const [updateGender, setUpdateGender] = useState("");
  const [updateImportPrice, setUpdateImportPrice] = useState(1000);
  const [updateImportNumber, setUpdateImportNumber] = useState(1);
  const handleNewOpen = () => setNewOpen(true);

  const handleOldOpen = () => setOldOpen(true);

  const handleNewClose = () => setNewOpen(false);

  const handleOldClose = () => setOldOpen(false);

  const { data: products, error, isLoading } = useGetProductsQuery();
  const {
    data: importedProducts,
    error: isError_ImportedProducts,
    isLoading: isLoading_ImportProducts,
  } = useGetImportedProductsQuery();
  const [addImportedProduct, { error: isAddedError, isLoading: isAdded }] =
    useAddImportedProductMutation();
  const [
    updateImportedProduct,
    { error: isUpdatedError, isLoading: isUpdated },
  ] = useUpdateImportedProductMutation();
  const [
    deleteImportedProduct,
    { error: isDeletedError, isLoading: isDeleted },
  ] = useDeleteImportedProductMutation();
  const handleAddSubmit = async () => {
    try {
      if (oldOpen) {
        await addImportedProduct({
          product_id: product,
          color_code: color_code,
          color_name: color_name,
          size: size,
          height: height,
          weight: weight,
          material: material,
          gender: gender,
          importPrice: Number(importPrice),
          image_url: avatar_url,
          slider_url_1: slider1,
          slider_url_2: slider2,
          slider_url_3: slider3,
          slider_url_4: slider4,
          public_id_url: publicIdAvatar,
          public_id_slider_url_1: publicIdSlider1,
          public_id_slider_url_2: publicIdSlider2,
          public_id_slider_url_3: publicIdSlider3,
          public_id_slider_url_4: publicIdSlider4,
          importNumber: Number(importNumber),
        })
          .unwrap()
          .then(() => {
            Toast.fire({
              icon: "success",
              title: "Thêm thương hiệu thành công",
            }).then(() => {
              handleOldOpen();
            });
          });
      } else if (newOpen) {
        await addImportedProduct({
          product_id: product,
          color_code: color_code,
          color_name: color_name,
          size: size,
          height: height,
          weight: weight,
          material: material,
          gender: gender,
          importPrice: Number(importPrice),
          image_url: avatar_url,
          slider_url_1: slider1,
          slider_url_2: slider2,
          slider_url_3: slider3,
          slider_url_4: slider4,
          public_id_url: publicIdAvatar,
          public_id_slider_url_1: publicIdSlider1,
          public_id_slider_url_2: publicIdSlider2,
          public_id_slider_url_3: publicIdSlider3,
          public_id_slider_url_4: publicIdSlider4,
          importNumber: Number(importNumber),
        })
          .unwrap()
          .then(() => {
            Toast.fire({
              icon: "success",
              title: "Thêm thương hiệu thành công",
            }).then(() => {
              handleNewClose();
              setAvatar_Url("");
              setSlider1("");
              setSlider2("");
              setSlider3("");
              setSlider4("");
              setPublicIdAvatar("");
              setPublicIdSlider1("");
              setPublicIdSlider2("");
              setPublicIdSlider3("");
              setPublicIdSlider4("");
              setProduct(null);
              setColorCode("");
              setColorName("");
              setSize("");
              setHeight(0);
              setWeight(0);
              setMaterial("");
              setGender("");
              setImportPrice(1000);
              setImportNumber(1);
            });
          });
      }
    } catch (err) {
      console.log(err);
      Toast.fire({
        icon: "error",
        title: "Thêm thương hiệu thất bại",
      }).then(() => {
        if (err && err.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
        // if (err.originalStatus === 401) {
        //   localStorage.clear();
        //   navigate("/login");
        // }
      });
    }
  };
  const updateSubmit = async () => {
    const search = importedProducts.object.find((row) => row.id === selectedId);
    const message = await updateImportedProduct({
      id: selectedId,
      product_id: search?.product_id.id || "",
      color_id: search?.color_id.id || "",
      size_id: search?.size_id.id,
      material_id: search?.material_id.id,
      color_code: updateColor_code,
      color_name: updateColor_name,
      size: updateSize,
      height: updateHeight,
      weight: updateWeight,
      material: updateMaterial,
      gender: updateGender,
      importPrice: updateImportPrice,
      image_url: updateAvatar_Url,
      slider_url_1: updateSlider1,
      slider_url_2: updateSlider2,
      slider_url_3: updateSlider3,
      slider_url_4: updateSlider4,
      public_id_url: updatePublicIdAvatar,
      public_id_slider_url_1: updatePublicIdSlider1,
      public_id_slider_url_2: updatePublicIdSlider2,
      public_id_slider_url_3: updatePublicIdSlider3,
      public_id_slider_url_4: updatePublicIdSlider4,
      importNumber: updateImportNumber,
    });

    return message;
  };
  const handleDeleteSubmit = async () => {
    try {
      const message = await deleteImportedProduct(
        importedProducts.object.find((row) => row.id === selectedId)?.id || ""
      );
      if (message.data.statusCode === 200) {
        Toast.fire({
          icon: "success",
          title: "Xóa thành công",
        }).then(() => {
          dispatch(resetSelectedId());
        });
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Xóa thất bại",
      });
    }
  };
  useEffect(() => {
    if (selectedId !== -1) {
      const search = importedProducts?.object.find(
        (row) => row.id === selectedId
      );
      if (search) {
        setUpdateSlider1(search.slider_url_1);
        setUpdateSlider2(search.slider_url_2);
        setUpdateSlider3(search.slider_url_3);
        setUpdateSlider4(search.slider_url_4);
        setUpdateAvatar_Url(search.image_url);
        setUpdateColorCode(search.color_id.color_code);
        setUpdateColorName(search.color_id.color_name);
        setUpdateSize(search.size_id.size);
        setUpdateHeight(search.size_id.height.replace("cm", "").trim());
        setUpdateWeight(search.size_id.weight.replace("kg", "").trim());
        setUpdateMaterial(search.material_id.name);
        setUpdateGender(search.gender);
        setUpdateImportPrice(search.importPrice);
        setUpdateImportNumber(search.importNumber);
        setUpdatePublicIdAvatar(search.public_id_url);
        setUpdatePublicIdSlider1(search.public_id_slider_url_1);
        setUpdatePublicIdSlider2(search.public_id_slider_url_2);
        setUpdatePublicIdSlider3(search.public_id_slider_url_3);
        setUpdatePublicIdSlider4(search.public_id_slider_url_4);
      }
    }
  }, [selectedId, importedProducts?.object]);

  useEffect(() => {
    const imported_product = importedProducts?.object.find(
      (row) =>
        row.product_id.id === product &&
        row.color_id.id === color_code &&
        row.size_id.size === size &&
        row.material_id.id === material
    );
    if (imported_product) {
      setAvatar_Url(imported_product.image_url);
      setSlider1(imported_product.slider_url_1);
      setSlider2(imported_product.slider_url_2);
      setSlider3(imported_product.slider_url_3);
      setSlider4(imported_product.slider_url_4);
      setPublicIdAvatar(imported_product.public_id_url);
      setPublicIdSlider1(imported_product.public_id_slider_url_1);
      setPublicIdSlider2(imported_product.public_id_slider_url_2);
      setPublicIdSlider3(imported_product.public_id_slider_url_3);
      setPublicIdSlider4(imported_product.public_id_slider_url_4);
      setColorName(imported_product.color_id.color_name);
      setColorCode(imported_product.color_id.color_code);
      setSize(imported_product.size_id.size);
      setHeight(imported_product.size_id.height.replace("cm", "").trim());
      setWeight(imported_product.size_id.weight.replace("kg", "").trim());
      setGender(imported_product.gender);
    }
  }, [product, color_code, size, material, importedProducts?.object]);
  if (isLoading || isLoading_ImportProducts) return <Loading />;
  if (error || isError_ImportedProducts) return navigate("/error");
  const ListImportProducts = importedProducts.object.map((product) => {
    return {
      id: product.id,
      name: product.product_id.name,
      color: product.color_id.color_name,
      size: product.size_id.size,
      material: product.material_id.name,
      importPrice: product.importPrice.toLocaleString("en-US") + " đ",
      import: product.importNumber,
    };
  });
  return (
    <>
      <AdminLayout
        name="Nhập hàng"
        TABLE_HEAD={importproduct}
        TABLE_ROWS={ListImportProducts}
        updateContent="Chỉnh sửa"
        deleteContent="Xóa"
        size="xl"
        headerDetail={"Chi tiết mã hàng"}
        bodyDetail={
          <Container>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid grid-cols-1 col-span-2 gap-4">
                <div className=" my-auto mx-auto">
                  <figure>
                    <img
                      src={
                        selectedId === -1
                          ? ""
                          : importedProducts
                          ? importedProducts.object.length > 0
                            ? importedProducts.object.find(
                                (row) => row.id === selectedId
                              )?.image_url || ""
                            : ""
                          : ""
                      }
                      alt=""
                      className="w-64 h-64 object-cover"
                    />
                    <Typography
                      as="caption"
                      variant="small"
                      className="mt-2 text-center font-normal"
                    >
                      Hình đại diện
                    </Typography>
                  </figure>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className=" my-auto mx-auto">
                    <figure>
                      <img
                        src={
                          selectedId === -1
                            ? ""
                            : importedProducts
                            ? importedProducts.object.length > 0
                              ? importedProducts.object.find(
                                  (row) => row.id === selectedId
                                )?.slider_url_1 || ""
                              : ""
                            : ""
                        }
                        alt=""
                        className="w-32 h-32 object-cover"
                      />
                      <Typography
                        as="caption"
                        variant="small"
                        className="mt-2 text-center font-normal"
                      >
                        Hình 1
                      </Typography>
                    </figure>
                  </div>
                  <div className=" my-auto mx-auto">
                    <figure>
                      <img
                        src={
                          selectedId === -1
                            ? ""
                            : importedProducts
                            ? importedProducts.object.length > 0
                              ? importedProducts.object.find(
                                  (row) => row.id === selectedId
                                )?.slider_url_2 || ""
                              : ""
                            : ""
                        }
                        alt=""
                        className="w-32 h-32 object-cover"
                      />
                      <Typography
                        as="caption"
                        variant="small"
                        className="mt-2 text-center font-normal"
                      >
                        Hình 2
                      </Typography>
                    </figure>
                  </div>
                  <div className=" my-auto mx-auto">
                    <figure>
                      <img
                        src={
                          selectedId === -1
                            ? ""
                            : importedProducts
                            ? importedProducts.object.length > 0
                              ? importedProducts.object.find(
                                  (row) => row.id === selectedId
                                )?.slider_url_3 || ""
                              : ""
                            : ""
                        }
                        alt=""
                        className="w-32 h-32 object-cover"
                      />
                      <Typography
                        as="caption"
                        variant="small"
                        className="mt-2 text-center font-normal"
                      >
                        Hình 3
                      </Typography>
                    </figure>
                  </div>
                  <div className=" my-auto mx-auto">
                    <figure>
                      <img
                        src={
                          selectedId === -1
                            ? ""
                            : importedProducts
                            ? importedProducts.object.length > 0
                              ? importedProducts.object.find(
                                  (row) => row.id === selectedId
                                )?.slider_url_4 || ""
                              : ""
                            : ""
                        }
                        alt=""
                        className="w-32 h-32 object-cover"
                      />
                      <Typography
                        as="caption"
                        variant="small"
                        className="mt-2 text-center font-normal"
                      >
                        Hình 4
                      </Typography>
                    </figure>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4 mb-3">
                  <Typography variant="h5">Sản phẩm: </Typography>
                  <Typography variant="medium">
                    {selectedId === -1
                      ? ""
                      : importedProducts
                      ? importedProducts.object.length > 0
                        ? importedProducts.object.find(
                            (row) => row.id === selectedId
                          )?.product_id.name || ""
                        : ""
                      : ""}
                  </Typography>
                </div>
                <div className="flex flex-col gap-4 mb-3">
                  <Typography variant="h6">Mã màu: </Typography>
                  <Typography variant="medium">
                    {selectedId === -1
                      ? ""
                      : importedProducts
                      ? importedProducts.object.length > 0
                        ? importedProducts.object.find(
                            (row) => row.id === selectedId
                          )?.color_id.color_code || ""
                        : ""
                      : ""}
                  </Typography>
                </div>
                <div className="flex flex-col gap-4 mb-3">
                  <Typography variant="h6">Màu sắc: </Typography>
                  <Typography variant="medium">
                    {selectedId === -1
                      ? ""
                      : importedProducts
                      ? importedProducts.object.length > 0
                        ? importedProducts.object.find(
                            (row) => row.id === selectedId
                          )?.color_id.color_name || ""
                        : ""
                      : ""}
                  </Typography>
                </div>
                <div className="flex flex-col gap-4 mb-3">
                  <Typography variant="h6">Kích thước: </Typography>
                  <Typography variant="medium">
                    {selectedId === -1
                      ? ""
                      : importedProducts
                      ? importedProducts.object.length > 0
                        ? importedProducts.object.find(
                            (row) => row.id === selectedId
                          )?.size_id.size || ""
                        : ""
                      : ""}
                  </Typography>
                </div>
                <div className="flex flex-col gap-4 mb-3">
                  <Typography variant="h6">Chiều cao: </Typography>
                  <Typography variant="medium">
                    {selectedId === -1
                      ? ""
                      : importedProducts
                      ? importedProducts.object.length > 0
                        ? importedProducts.object.find(
                            (row) => row.id === selectedId
                          )?.size_id.height || ""
                        : ""
                      : ""}
                  </Typography>
                </div>
                <div className="flex flex-col gap-4 mb-3">
                  <Typography variant="h6">Cân nặng: </Typography>
                  <Typography variant="medium">
                    {selectedId === -1
                      ? ""
                      : importedProducts
                      ? importedProducts.object.length > 0
                        ? importedProducts.object.find(
                            (row) => row.id === selectedId
                          )?.size_id.weight || ""
                        : ""
                      : ""}
                  </Typography>
                </div>
                <div className="flex flex-col gap-4 mb-3">
                  <Typography variant="h6">Vật liệu: </Typography>
                  <Typography variant="medium">
                    {selectedId === -1
                      ? ""
                      : importedProducts
                      ? importedProducts.object.length > 0
                        ? importedProducts.object.find(
                            (row) => row.id === selectedId
                          )?.material_id.name || ""
                        : ""
                      : ""}
                  </Typography>
                </div>
                <div className="flex flex-col gap-4 mb-3">
                  <Typography variant="h6">Giới tính </Typography>
                  <Typography variant="medium">
                    {selectedId === -1
                      ? ""
                      : importedProducts
                      ? importedProducts.object.length > 0
                        ? importedProducts.object.find(
                            (row) => row.id === selectedId
                          )?.gender === "MALE"
                          ? "Nam"
                          : importedProducts.object.find(
                              (row) => row.id === selectedId
                            )?.gender === "FEMALE"
                          ? "Nữ"
                          : "Unisex"
                        : ""
                      : ""}
                  </Typography>
                </div>
                <div className="flex flex-col gap-4 mb-3">
                  <Typography variant="h6">Số lượng: </Typography>
                  <Typography variant="medium">
                    {selectedId === -1
                      ? ""
                      : importedProducts
                      ? importedProducts.object.length > 0
                        ? importedProducts.object.find(
                            (row) => row.id === selectedId
                          )?.importNumber
                        : ""
                      : ""}
                  </Typography>
                </div>
                <div className="flex flex-col gap-4 mb-3">
                  <Typography variant="h6">Giá nhập </Typography>
                  <Typography variant="medium">
                    {selectedId === -1
                      ? ""
                      : importedProducts
                      ? importedProducts.object.length > 0
                        ? importedProducts.object
                            .find((row) => row.id === selectedId)
                            ?.importPrice.toLocaleString("en-US")
                        : ""
                      : ""}{" "}
                    đ
                  </Typography>
                </div>
              </div>
            </div>
          </Container>
        }
        sizeUpdate="xl"
        headerUpdate={"Chỉnh sửa mã hàng"}
        bodyUpdate={
          <Container>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-4">
                {updateAvatar_Url === "" ? (
                  <figure className="my-auto mx-auto h-full w-full">
                    <div className="flex items-center  justify-center h-full w-full my-auto">
                      <label
                        htmlFor="avatar_url"
                        className="flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>

                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                          <Typography
                            as="caption"
                            variant="small"
                            className="mt-2 text-center font-normal"
                          >
                            Hình đại diện
                          </Typography>
                        </div>
                        <ImageUpload
                          image="avatar_url"
                          setAvatar={setUpdateAvatar_Url}
                          setPublicId={setUpdatePublicIdAvatar}
                        />
                      </label>
                    </div>
                  </figure>
                ) : (
                  <div className="grid grid-cols-4 justify-around mx-auto my-auto w-full">
                    <img
                      src={updateAvatar_Url}
                      alt="avatar"
                      className="h-[200px] w-full mx-auto col-span-3"
                    />
                    <Button
                      onClick={() => {
                        handleDelete(publicIdAvatar);
                        setUpdateAvatar_Url("");
                        setUpdatePublicIdAvatar("");
                      }}
                      color="red"
                      className="w-full rounded-l-none h-[200px]"
                    >
                      Xóa ảnh đại diện
                    </Button>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {updateSlider1 === "" ? (
                    <figure className="my-auto mx-auto h-full w-full">
                      <div className="flex items-center  justify-center h-full w-full my-auto">
                        <label
                          htmlFor="slider_url_1"
                          className="flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                        >
                          <div className="flex flex-col items-center justify-center my-auto">
                            <svg
                              className="w-8 h-8 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <Typography
                              as="caption"
                              variant="small"
                              className="mt-2 text-center font-normal"
                            >
                              Hình 1
                            </Typography>
                          </div>
                          <ImageUpload
                            image="slider_url_1"
                            setAvatar={setUpdateSlider1}
                            setPublicId={setUpdatePublicIdSlider1}
                          />
                        </label>
                      </div>
                    </figure>
                  ) : (
                    <div className="flex justify-around mx-auto w-full my-auto">
                      <img
                        src={updateSlider1}
                        alt="avatar"
                        className="h-[100px] w-full mx-auto my-auto"
                      />
                      <Button
                        onClick={() => {
                          handleDelete(updatePublicIdSlider1);
                          setUpdateSlider1("");
                          setUpdatePublicIdSlider1("");
                        }}
                        color="red"
                        className="h-[100px] rounded-l-none mx-auto my-auto"
                      >
                        Xóa ảnh 1
                      </Button>
                    </div>
                  )}

                  {updateSlider2 === "" ? (
                    <figure className="my-auto mx-auto h-full w-full">
                      <div className="flex items-center  justify-center h-full w-full my-auto">
                        <label
                          htmlFor="slider_url_2"
                          className="flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                        >
                          <div className="flex flex-col items-center justify-center my-auto">
                            <svg
                              className="w-8 h-8 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <Typography
                              as="caption"
                              variant="small"
                              className="mt-2 text-center font-normal"
                            >
                              Hình 2
                            </Typography>
                          </div>
                          <ImageUpload
                            image="slider_url_2"
                            setAvatar={setUpdateSlider2}
                            setPublicId={setUpdatePublicIdSlider2}
                          />
                        </label>
                      </div>
                    </figure>
                  ) : (
                    <div className="flex justify-around mx-auto w-full my-auto">
                      <img
                        src={updateSlider2}
                        alt="avatar"
                        className="h-[100px] w-full mx-auto my-auto"
                      />
                      <Button
                        onClick={() => {
                          handleDelete(updatePublicIdSlider2);
                          setUpdateSlider2("");
                          setUpdatePublicIdSlider2("");
                        }}
                        color="red"
                        className="h-[100px] rounded-l-none mx-auto my-auto"
                      >
                        Xóa ảnh 2
                      </Button>
                    </div>
                  )}

                  {updateSlider3 === "" ? (
                    <figure className="my-auto mx-auto h-full w-full">
                      <div className="flex items-center  justify-center h-full w-full my-auto">
                        <label
                          htmlFor="slider_url_3"
                          className="flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                        >
                          <div className="flex flex-col items-center justify-center my-auto">
                            <svg
                              className="w-8 h-8 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <Typography
                              as="caption"
                              variant="small"
                              className="mt-2 text-center font-normal"
                            >
                              Hình 3
                            </Typography>
                          </div>
                          <ImageUpload
                            image="slider_url_3"
                            setAvatar={setUpdateSlider3}
                            setPublicId={setUpdatePublicIdSlider3}
                          />
                        </label>
                      </div>
                    </figure>
                  ) : (
                    <div className="flex justify-around mx-auto w-full my-auto">
                      <img
                        src={updateSlider3}
                        alt="avatar"
                        className="h-[100px] w-full mx-auto my-auto"
                      />
                      <Button
                        onClick={() => {
                          handleDelete(updatePublicIdSlider3);
                          setUpdateSlider3("");
                          setUpdatePublicIdSlider3("");
                        }}
                        color="red"
                        className="h-[100px] rounded-l-none mx-auto my-auto"
                      >
                        Xóa ảnh 3
                      </Button>
                    </div>
                  )}

                  {updateSlider4 === "" ? (
                    <figure className="my-auto mx-auto h-full w-full">
                      <div className="flex items-center  justify-center h-full w-full my-auto">
                        <label
                          htmlFor="slider_url_4"
                          className="flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                        >
                          <div className="flex flex-col items-center justify-center my-auto">
                            <svg
                              className="w-8 h-8 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <Typography
                              as="caption"
                              variant="small"
                              className="mt-2 text-center font-normal"
                            >
                              Hình 4
                            </Typography>
                          </div>
                          <ImageUpload
                            image="slider_url_4"
                            setAvatar={setUpdateSlider4}
                            setPublicId={setUpdatePublicIdSlider4}
                          />
                        </label>
                      </div>
                    </figure>
                  ) : (
                    <div className="flex justify-around mx-auto w-full my-auto">
                      <img
                        src={updateSlider4}
                        alt="avatar"
                        className="h-[100px] w-full mx-auto my-auto"
                      />
                      <Button
                        onClick={() => {
                          handleDelete(updatePublicIdSlider4);
                          setUpdateSlider4("");
                          setUpdatePublicIdSlider4("");
                        }}
                        color="red"
                        className="h-[100px] rounded-l-none mx-auto my-auto"
                      >
                        Xóa ảnh 4
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col justify-between gap-4">
                  <Typography variant="h6">Sản phẩm: </Typography>

                  <FormControl fullWidth size="small">
                    <Select
                      value={
                        importedProducts.object.find(
                          (row) => row.id === selectedId
                        )?.product_id.id
                      }
                    >
                      {products &&
                        products.object.length > 0 &&
                        products.object.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="flex flex-col justify-between gap-4">
                  <Typography variant="h6">Mã màu: </Typography>
                  <TextField
                    size="small"
                    type="color"
                    value={updateColor_code}
                    pattern="#[a-fA-F0-9]{6}"
                    placeholder="#000000"
                    onChange={(e) => setUpdateColorCode(e.target.value)}
                  />
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Màu sắc: </Typography>
                  <TextField
                    size="small"
                    value={updateColor_name}
                    placeholder="Đen"
                    onChange={(e) => setUpdateColorName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Kích thước: </Typography>
                  <TextField
                    size="small"
                    value={updateSize}
                    placeholder="Đen"
                    onChange={(e) => setUpdateSize(e.target.value)}
                  />
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Chiều cao </Typography>

                  <OutlinedInput
                    size="small"
                    value={updateHeight}
                    id="outlined-adornment-weight"
                    endAdornment={
                      <InputAdornment position="end">cm</InputAdornment>
                    }
                    onChange={(e) =>
                      setUpdateHeight(
                        isNaN(e.target.value) || e.target.value < 0
                          ? 0
                          : e.target.value > 300
                          ? 300
                          : e.target.value
                      )
                    }
                  />
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Cân nặng: </Typography>
                  <OutlinedInput
                    size="small"
                    value={updateWeight}
                    id="outlined-adornment-weight"
                    endAdornment={
                      <InputAdornment position="end">kg</InputAdornment>
                    }
                    onChange={(e) =>
                      setUpdateWeight(
                        isNaN(e.target.value) || e.target.value < 0
                          ? 0
                          : e.target.value > 150
                          ? 150
                          : e.target.value
                      )
                    }
                  />
                </div>

                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Chất liệu: </Typography>
                  <OutlinedInput
                    size="small"
                    value={updateMaterial}
                    id="outlined-adornment-weight"
                    onChange={(e) => setUpdateMaterial(e.target.value)}
                  />
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Giới tính: </Typography>
                  <div className="flex">
                    <Radio
                      name="gender"
                      checked={updateGender === "MALE"}
                      value="MALE"
                      label="Nam"
                      onChange={(e) => setUpdateGender(e.target.defaultValue)}
                    />
                    <Radio
                      name="gender"
                      checked={updateGender === "FEMALE"}
                      value="FEMALE"
                      label="Nữ"
                      onChange={(e) => setUpdateGender(e.target.defaultValue)}
                    />
                    <Radio
                      name="gender"
                      checked={updateGender === "UNISEX"}
                      value="UNISEX"
                      label="Unisex"
                      onChange={(e) => setUpdateGender(e.target.defaultValue)}
                    />
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Số lượng: </Typography>
                  <OutlinedInput
                    size="small"
                    value={updateImportNumber}
                    onChange={(e) =>
                      setUpdateImportNumber(
                        isNaN(e.target.value) || e.target.value < 1
                          ? 1
                          : e.target.value
                      )
                    }
                  />
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Giá nhập: </Typography>
                  <OutlinedInput
                    size="small"
                    value={updateImportPrice}
                    endAdornment={
                      <InputAdornment position="end">đ</InputAdornment>
                    }
                    onChange={(e) =>
                      setUpdateImportPrice(
                        isNaN(e.target.value) || e.target.value < 1000
                          ? 1000
                          : e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </Container>
        }
        updateSubmit={updateSubmit}
        handleDeleteSubmit={handleDeleteSubmit}
        isUpdated={isUpdated}
        isDeleted={isDeleted}
      >
        <div className="flex items-center justify-between w-1/2 gap-4">
          <Button
            className=" !border-gray-300 w-full"
            color="gray"
            variant="outlined"
            onClick={handleNewOpen}
          >
            Nhập mới
          </Button>
          <Button
            className=" !border-gray-300 w-full"
            color="gray"
            variant="outlined"
            onClick={handleOldOpen}
            disabled={
              importedProducts ? importedProducts.object.length === 0 : true
            }
          >
            Nhập sẵn
          </Button>
          <Input
            size="md"
            label="Tìm kiếm"
            iconFamily="material-icons"
            iconName="search"
            placeholder="Tìm kiếm sản phẩm"
          />

          {/* <Select label="Phân loại theo">
              <Option value="">Không có</Option>
              <Option value="Color">Thương hiệu</Option>
              <Option value="Color">Loại sản phẩm</Option>
              <Option value="Size">Kích thước</Option>
              <Option value="Material">Chất liệu</Option>
              <Option value="Type">Loại sản phẩm</Option>
            </Select> */}
        </div>
      </AdminLayout>
      <Dialog open={newOpen} onClose={handleNewClose} maxWidth="xl">
        <DialogTitle className="pb-0 flex justify-between">
          <Typography variant="h4">Nhập sản phẩm mới</Typography>
          <IconButton
            className="border-none"
            variant="outlined"
            onClick={handleNewClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Container>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-4">
                {avatar_url === "" ? (
                  <figure className="my-auto mx-auto h-full w-full">
                    <div className="flex items-center  justify-center h-full w-full my-auto">
                      <label
                        htmlFor="avatar_url"
                        className="flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>

                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                          <Typography
                            as="caption"
                            variant="small"
                            className="mt-2 text-center font-normal"
                          >
                            Hình đại diện
                          </Typography>
                        </div>
                        <ImageUpload
                          image="avatar_url"
                          setAvatar={setAvatar_Url}
                          setPublicId={setPublicIdAvatar}
                        />
                      </label>
                    </div>
                  </figure>
                ) : (
                  <div className="grid grid-cols-4 justify-around mx-auto my-auto w-full">
                    <img
                      src={avatar_url}
                      alt="avatar"
                      className="h-[200px] w-full mx-auto col-span-3 object-fit"
                    />
                    <Button
                      onClick={() => {
                        handleDelete(publicIdAvatar);
                        setAvatar_Url("");
                        setPublicIdAvatar("");
                      }}
                      color="red"
                      className="w-full rounded-l-none h-[200px]"
                    >
                      Xóa ảnh đại diện
                    </Button>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {slider1 === "" ? (
                    <figure className="my-auto mx-auto h-full w-full">
                      <div className="flex items-center  justify-center h-full w-full my-auto">
                        <label
                          htmlFor="slider_url_1"
                          className="flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                        >
                          <div className="flex flex-col items-center justify-center my-auto">
                            <svg
                              className="w-8 h-8 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <Typography
                              as="caption"
                              variant="small"
                              className="mt-2 text-center font-normal"
                            >
                              Hình 1
                            </Typography>
                          </div>
                          <ImageUpload
                            image="slider_url_1"
                            setAvatar={setSlider1}
                            setPublicId={setPublicIdSlider1}
                          />
                        </label>
                      </div>
                    </figure>
                  ) : (
                    <div className="flex justify-around mx-auto w-full my-auto">
                      <img
                        src={slider1}
                        alt="avatar"
                        className="h-[100px] w-full mx-auto my-auto"
                      />
                      <Button
                        onClick={() => {
                          handleDelete(publicIdSlider1);
                          setSlider1("");
                          setPublicIdSlider1("");
                        }}
                        color="red"
                        className="h-[100px] rounded-l-none mx-auto my-auto"
                      >
                        Xóa ảnh 1
                      </Button>
                    </div>
                  )}

                  {slider2 === "" ? (
                    <figure className="my-auto mx-auto h-full w-full">
                      <div className="flex items-center  justify-center h-full w-full my-auto">
                        <label
                          htmlFor="slider_url_2"
                          className="flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                        >
                          <div className="flex flex-col items-center justify-center my-auto">
                            <svg
                              className="w-8 h-8 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <Typography
                              as="caption"
                              variant="small"
                              className="mt-2 text-center font-normal"
                            >
                              Hình 2
                            </Typography>
                          </div>
                          <ImageUpload
                            image="slider_url_2"
                            setAvatar={setSlider2}
                            setPublicId={setPublicIdSlider2}
                          />
                        </label>
                      </div>
                    </figure>
                  ) : (
                    <div className="flex justify-around mx-auto w-full my-auto">
                      <img
                        src={slider2}
                        alt="avatar"
                        className="h-[100px] w-full mx-auto my-auto"
                      />
                      <Button
                        onClick={() => {
                          handleDelete(publicIdSlider2);
                          setSlider2("");
                          setPublicIdSlider2("");
                        }}
                        color="red"
                        className="h-[100px] rounded-l-none mx-auto my-auto"
                      >
                        Xóa ảnh 2
                      </Button>
                    </div>
                  )}

                  {slider3 === "" ? (
                    <figure className="my-auto mx-auto h-full w-full">
                      <div className="flex items-center  justify-center h-full w-full my-auto">
                        <label
                          htmlFor="slider_url_3"
                          className="flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                        >
                          <div className="flex flex-col items-center justify-center my-auto">
                            <svg
                              className="w-8 h-8 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <Typography
                              as="caption"
                              variant="small"
                              className="mt-2 text-center font-normal"
                            >
                              Hình 3
                            </Typography>
                          </div>
                          <ImageUpload
                            image="slider_url_3"
                            setAvatar={setSlider3}
                            setPublicId={setPublicIdSlider3}
                          />
                        </label>
                      </div>
                    </figure>
                  ) : (
                    <div className="flex justify-around mx-auto w-full my-auto">
                      <img
                        src={slider3}
                        alt="avatar"
                        className="h-[100px] w-full mx-auto my-auto"
                      />
                      <Button
                        onClick={() => {
                          handleDelete(publicIdSlider3);
                          setSlider3("");
                          setPublicIdSlider3("");
                        }}
                        color="red"
                        className="h-[100px] rounded-l-none mx-auto my-auto"
                      >
                        Xóa ảnh 3
                      </Button>
                    </div>
                  )}

                  {slider4 === "" ? (
                    <figure className="my-auto mx-auto h-full w-full">
                      <div className="flex items-center  justify-center h-full w-full my-auto">
                        <label
                          htmlFor="slider_url_4"
                          className="flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                        >
                          <div className="flex flex-col items-center justify-center my-auto">
                            <svg
                              className="w-8 h-8 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <Typography
                              as="caption"
                              variant="small"
                              className="mt-2 text-center font-normal"
                            >
                              Hình 4
                            </Typography>
                          </div>
                          <ImageUpload
                            image="slider_url_4"
                            setAvatar={setSlider4}
                            setPublicId={setPublicIdSlider4}
                          />
                        </label>
                      </div>
                    </figure>
                  ) : (
                    <div className="flex justify-around mx-auto h-full w-full">
                      <img
                        src={slider4}
                        alt="avatar"
                        className="h-[100px] w-full mx-auto my-auto"
                      />
                      <Button
                        onClick={() => {
                          handleDelete(publicIdSlider4);
                          setSlider4("");
                          setPublicIdSlider4("");
                        }}
                        color="red"
                        className="h-[100px] rounded-l-none mx-auto my-auto"
                      >
                        Xóa ảnh 4
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col justify-between gap-4">
                  <Typography variant="h6">Sản phẩm: </Typography>
                  {/* <Typography variant="medium">Áo thun nam</Typography> */}
                  <FormControl fullWidth>
                    <Select
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                      size="small"
                    >
                      {products &&
                        products.object.length > 0 &&
                        products.object.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="flex flex-col justify-between gap-4">
                  <Typography variant="h6">Mã màu: </Typography>
                  <TextField
                    size="small"
                    type="color"
                    value={color_code}
                    pattern="#[a-fA-F0-9]{6}"
                    placeholder="#000000"
                    onChange={(e) => setColorCode(e.target.value)}
                  />
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Màu sắc: </Typography>
                  <TextField
                    type="text"
                    size="small"
                    value={color_name}
                    placeholder="Đen"
                    onChange={(e) => setColorName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Kích thước: </Typography>
                  <TextField
                    size="small"
                    type="text"
                    value={size}
                    placeholder="S,M,L,XL,..."
                    onChange={(e) => setSize(e.target.value)}
                  />
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Chiều cao </Typography>
                  <OutlinedInput
                    size="small"
                    type="text"
                    value={height}
                    placeholder="170"
                    endAdornment={
                      <InputAdornment position="end">cm</InputAdornment>
                    }
                    onChange={(e) =>
                      setHeight(
                        isNaN(e.target.value) || e.target.value < 0
                          ? 0
                          : e.target.value > 300
                          ? 300
                          : e.target.value
                      )
                    }
                  />
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Cân nặng </Typography>
                  <OutlinedInput
                    size="small"
                    type="text"
                    value={weight}
                    placeholder="80"
                    endAdornment={
                      <InputAdornment position="end">kg</InputAdornment>
                    }
                    onChange={(e) =>
                      setWeight(
                        isNaN(e.target.value) || e.target.value < 0
                          ? 0
                          : e.target.value > 150
                          ? 150
                          : e.target.value
                      )
                    }
                  />
                </div>

                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Chất liệu: </Typography>
                  <TextField
                    size="small"
                    value={material}
                    placeholder="Cotton"
                    onChange={(e) => setMaterial(e.target.value)}
                  />
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Giới tính: </Typography>
                  <div className="flex">
                    <Radio
                      name="gender"
                      checked={gender === "MALE"}
                      value="MALE"
                      label="Nam"
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <Radio
                      name="gender"
                      checked={gender === "FEMALE"}
                      value="FEMALE"
                      label="Nữ"
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <Radio
                      name="gender"
                      checked={gender === "UNISEX"}
                      value="UNISEX"
                      label="Unisex"
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Số lượng: </Typography>
                  <TextField
                    size="small"
                    value={importNumber}
                    placeholder="Cotton"
                    onChange={(e) =>
                      setImportNumber(e.target.value < 1 ? 1 : e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Giá nhập: </Typography>
                  <OutlinedInput
                    size="small"
                    value={importPrice}
                    placeholder="1000"
                    endAdornment={
                      <InputAdornment position="end">đ</InputAdornment>
                    }
                    onChange={(e) =>
                      setImportPrice(
                        e.target.value < 1000 ? 1000 : e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button
            variant="gradient"
            color="green"
            onClick={handleAddSubmit}
            loading={isAdded}
          >
            {!isAdded && <span>Xác nhận</span>}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={oldOpen} onClose={handleOldClose} maxWidth="xl">
        <DialogTitle className="pb-0 flex justify-between">
          <Typography variant="h4">Nhập sản phẩm có sẵn</Typography>
          <IconButton
            className="border-none"
            variant="outlined"
            onClick={handleOldClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Container>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-4">
                {avatar_url === "" ? (
                  <figure className="my-auto mx-auto h-full w-full">
                    <div className="flex items-center justify-center h-full w-full my-auto">
                      <label
                        htmlFor="avatar_url"
                        className="flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>

                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                          <Typography
                            as="caption"
                            variant="small"
                            className="mt-2 text-center font-normal"
                          >
                            Hình đại diện
                          </Typography>
                        </div>
                        {/* <ImageUpload image="avatar_url" /> */}
                      </label>
                    </div>
                  </figure>
                ) : (
                  <div className="grid grid-cols-4 justify-around mx-auto my-auto w-full">
                    <img
                      src={
                        importedProducts.object?.find(
                          (item) =>
                            item.product_id.id === product &&
                            item.color_id.color_code === color_code &&
                            item.size_id.size === size &&
                            item.material_id.name === material
                        )?.image_url
                      }
                      alt="avatar"
                      className="h-[250px] w-full mx-auto col-span-4"
                    />
                    {/* <Button
                      onClick={() => dispatch(deleteAvatar())}
                      color="red"
                      className="w-full h-[200px]"
                    >
                      Xóa ảnh đại diện
                    </Button> */}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {slider1 === "" ? (
                    <figure className="my-auto mx-auto h-full w-full">
                      <div className="flex items-center  justify-center h-full w-full my-auto">
                        <label
                          htmlFor="slider_url_1"
                          className="flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                        >
                          <div className="flex flex-col items-center justify-center my-auto">
                            <svg
                              className="w-8 h-8 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <Typography
                              as="caption"
                              variant="small"
                              className="mt-2 text-center font-normal"
                            >
                              Hình 1
                            </Typography>
                          </div>
                          {/* <ImageUpload image="slider_url_1" /> */}
                        </label>
                      </div>
                    </figure>
                  ) : (
                    <div className="flex justify-around mx-auto w-full my-auto">
                      <img
                        src={
                          importedProducts.object?.find(
                            (item) =>
                              item.product_id.id === product &&
                              item.color_id.color_code === color_code &&
                              item.size_id.size === size &&
                              item.material_id.name === material
                          )?.slider_url_1
                        }
                        alt="avatar"
                        className="h-[125px] w-full mx-auto my-auto"
                      />
                      {/* <Button
                        onClick={() => dispatch(deleteSlider1())}
                        color="red"
                        className="h-[100px] mx-auto my-auto"
                      >
                        Xóa ảnh 1
                      </Button> */}
                    </div>
                  )}

                  {slider2 === "" ? (
                    <figure className="my-auto mx-auto h-full w-full">
                      <div className="flex items-center  justify-center h-full w-full my-auto">
                        <label
                          htmlFor="slider_url_2"
                          className="flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                        >
                          <div className="flex flex-col items-center justify-center my-auto">
                            <svg
                              className="w-8 h-8 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <Typography
                              as="caption"
                              variant="small"
                              className="mt-2 text-center font-normal"
                            >
                              Hình 2
                            </Typography>
                          </div>
                          {/* <ImageUpload image="slider_url_2" /> */}
                        </label>
                      </div>
                    </figure>
                  ) : (
                    <div className="flex justify-around mx-auto w-full my-auto">
                      <img
                        src={
                          importedProducts.object?.find(
                            (item) =>
                              item.product_id.id === product &&
                              item.color_id.color_code === color_code &&
                              item.size_id.size === size &&
                              item.material_id.name === material
                          )?.slider_url_2
                        }
                        alt="avatar"
                        className="h-[125px] w-full mx-auto my-auto"
                      />
                      {/* <Button
                        onClick={() => dispatch(deleteSlider2())}
                        color="red"
                        className="h-[100px] mx-auto my-auto"
                      >
                        Xóa ảnh 2
                      </Button> */}
                    </div>
                  )}
                  {slider3 === "" ? (
                    <figure className="my-auto mx-auto h-full w-full">
                      <div className="flex items-center  justify-center h-full w-full my-auto">
                        <label
                          htmlFor="slider_url_3"
                          className="flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                        >
                          <div className="flex flex-col items-center justify-center my-auto">
                            <svg
                              className="w-8 h-8 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <Typography
                              as="caption"
                              variant="small"
                              className="mt-2 text-center font-normal"
                            >
                              Hình 3
                            </Typography>
                          </div>
                          {/* <ImageUpload image="slider_url_3" /> */}
                        </label>
                      </div>
                    </figure>
                  ) : (
                    <div className="flex justify-around mx-auto w-full my-auto">
                      <img
                        src={
                          importedProducts.object?.find(
                            (item) =>
                              item.product_id.id === product &&
                              item.color_id.color_code === color_code &&
                              item.size_id.size === size &&
                              item.material_id.name === material
                          )?.slider_url_3
                        }
                        alt="avatar"
                        className="h-[125px] w-full mx-auto my-auto"
                      />
                      {/* <Button
                        onClick={() => dispatch(deleteSlider3())}
                        color="red"
                        className="h-[100px] mx-auto my-auto"
                      >
                        Xóa ảnh 3
                      </Button> */}
                    </div>
                  )}
                  {slider4 === "" ? (
                    <figure className="my-auto mx-auto h-full w-full">
                      <div className="flex items-center  justify-center h-full w-full my-auto">
                        <label
                          htmlFor="slider_url_4"
                          className="flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                        >
                          <div className="flex flex-col items-center justify-center my-auto">
                            <svg
                              className="w-8 h-8 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <Typography
                              as="caption"
                              variant="small"
                              className="mt-2 text-center font-normal"
                            >
                              Hình 4
                            </Typography>
                          </div>
                          {/* <ImageUpload image="slider_url_4" /> */}
                        </label>
                      </div>
                    </figure>
                  ) : (
                    <div className="flex justify-around mx-auto w-full my-auto">
                      <img
                        src={
                          importedProducts.object?.find(
                            (item) =>
                              item.product_id.id === product &&
                              item.color_id.color_code === color_code &&
                              item.size_id.size === size &&
                              item.material_id.name === material
                          )?.slider_url_4
                        }
                        alt="avatar"
                        className="h-[125px] w-full mx-auto my-auto"
                      />
                      {/* <Button
                        onClick={() => dispatch(deleteSlider4())}
                        color="red"
                        className="h-[100px] mx-auto my-auto"
                      >
                        Xóa ảnh 4
                      </Button> */}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col justify-between gap-4">
                  <Typography variant="h6">Sản phẩm: </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                      size="small"
                    >
                      {products &&
                        products.object.length > 0 &&
                        products.object.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="flex flex-col justify-between gap-4">
                  <Typography variant="h6">Mã màu: </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={color_code}
                      onChange={(e) => setColorCode(e.target.value)}
                      size="small"
                    >
                      {importedProducts &&
                        importedProducts.object.length > 0 &&
                        importedProducts.object.map((item, index) => (
                          <MenuItem
                            key={index}
                            value={item.color_id.color_code}
                          >
                            {item.color_id.color_code}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Màu sắc: </Typography>
                  <TextField
                    size="small"
                    disabled
                    value={
                      importedProducts.object?.find(
                        (item) =>
                          item.product_id.id === product &&
                          item.color_id.id === color_code
                      )?.color_id.color_name
                    }
                    placeholder="Trắng"
                  />
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Kích thước: </Typography>
                  {/* <Input
                      value={size}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) => dispatch(setSize(e.target.value))}
                    /> */}
                  <FormControl fullWidth>
                    <Select
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      size="small"
                    >
                      {importedProducts &&
                        importedProducts.object.length > 0 &&
                        importedProducts.object.map((item, index) => (
                          <MenuItem key={index} value={item.size_id.size}>
                            {item.size_id.size}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Chiều cao </Typography>
                  <OutlinedInput
                    size="small"
                    disabled
                    endAdornment={
                      <InputAdornment position="end">cm</InputAdornment>
                    }
                    value={
                      importedProducts.object?.find(
                        (item) =>
                          item.product_id.id === product &&
                          item.size_id.size === size
                      )?.size_id.height
                    }
                    placeholder="170cm"
                  />
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Cân nặng </Typography>
                  <OutlinedInput
                    size="small"
                    disabled
                    endAdornment={
                      <InputAdornment position="end">kg</InputAdornment>
                    }
                    value={
                      importedProducts.object?.find(
                        (item) =>
                          item.product_id.id === product &&
                          item.size_id.id === size
                      )?.size_id.weight
                    }
                    placeholder="170cm"
                  />
                </div>

                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Chất liệu: </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      size="small"
                    >
                      {importedProducts &&
                        importedProducts.object.length > 0 &&
                        importedProducts.object.map((item, index) => (
                          <MenuItem key={index} value={item.material_id.name}>
                            {item.material_id.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="flex flex-col justify-between gap-4">
                  <Typography variant="h6">Giới tính: </Typography>
                  <div className="flex">
                    <Radio
                      name="gender"
                      checked={gender === "MALE"}
                      value="MALE"
                      label="Nam"
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <Radio
                      name="gender"
                      checked={gender === "FEMALE"}
                      value="FEMALE"
                      label="Nữ"
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <Radio
                      name="gender"
                      checked={gender === "UNISEX"}
                      value="UNISEX"
                      label="Unisex"
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Số lượng: </Typography>

                  <TextField
                    size="small"
                    value={importNumber}
                    placeholder="1"
                    onChange={(e) =>
                      setImportNumber(
                        isNaN(Number(e.target.value)) ||
                          Number(e.target.value) < 1
                          ? 1
                          : Number(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Giá nhập: </Typography>
                  <OutlinedInput
                    size="small"
                    value={importPrice}
                    placeholder="1000"
                    endAdornment={
                      <InputAdornment position="end">đ</InputAdornment>
                    }
                    onChange={(e) =>
                      setImportPrice(
                        isNaN(Number(e.target.value)) ||
                          Number(e.target.value) < 1000
                          ? 1000
                          : Number(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button
            variant="gradient"
            color="green"
            onClick={handleAddSubmit}
            loading={isAdded}
          >
            {!isAdded && <span>Xác nhận</span>}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ImportProduct;
