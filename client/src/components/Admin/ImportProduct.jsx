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
  Tabs,
  TabsHeader,
  Tab,
  Select,
  Option,
  CardFooter,
  useSelect,
  slider,
  Radio,
} from "@material-tailwind/react";
import { Container, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/Admin/AdminLayout";
import { importproduct } from "../../constants/table_head";
import useOpen from "../../hooks/useOpen";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../apis/ProductApi";
import {
  useAddImportedProductMutation,
  useDeleteImportedProductMutation,
  useGetImportedProductsQuery,
  useUpdateImportedProductMutation,
} from "../../apis/ImportedProductApi";
import { Toast } from "../../configs/SweetAlert2";
import ImageUpload from "../ImageUpload";
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
import { setProduct } from "../../features/slices/productSlice";
import {
  resetImportedProduct,
  setColorCode,
  setColorName,
  setGender,
  setHeight,
  setImportNumber,
  setImportPrice,
  setMaterial,
  setProductId,
  setSize,
  setWeight,
} from "../../features/slices/importedProductSlice";
import Loading from "../shared/Loading";
import { resetSelectedId } from "../../features/slices/selectIdSlice";

const ImportProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const avatar_url = useSelector((state) => state.avatar_url);
  const slider1 = useSelector((state) => state.slider1);
  const slider2 = useSelector((state) => state.slider2);
  const slider3 = useSelector((state) => state.slider3);
  const slider4 = useSelector((state) => state.slider4);

  const [newOpen, setNewOpen] = useState(false);
  const [oldOpen, setOldOpen] = useState(false);

  const handleNewOpen = () => {
    if (selectedId !== -1) {
      if (
        avatar_url.value !==
          importedProducts.object.find((row) => row.id === selectedId)
            ?.image_url ||
        ""
      ) {
        dispatch(deleteAvatar());
      } else {
        dispatch(resetAvatar());
      }
      if (
        slider1.value !==
          importedProducts.object.find((row) => row.id === selectedId)
            ?.slider_url_1 ||
        ""
      ) {
        dispatch(deleteSlider1());
      } else {
        dispatch(resetSlider1());
      }
      if (
        slider2.value !==
          importedProducts.object.find((row) => row.id === selectedId)
            ?.slider_url_2 ||
        ""
      ) {
        dispatch(deleteSlider2());
      } else {
        dispatch(resetSlider2());
      }
      if (
        slider3.value !==
          importedProducts.object.find((row) => row.id === selectedId)
            ?.slider_url_3 ||
        ""
      ) {
        dispatch(deleteSlider3());
      } else {
        dispatch(resetSlider3());
      }
      if (
        slider4.value !==
          importedProducts.object.find((row) => row.id === selectedId)
            ?.slider_url_4 ||
        ""
      ) {
        dispatch(deleteSlider4());
      } else {
        dispatch(resetSlider4());
      }
      dispatch(resetSelectedId());
      dispatch(resetImportedProduct());
    }

    setNewOpen(!newOpen);
  };
  const handleOldOpen = () => {
    if (selectedId !== -1) {
      dispatch(resetSelectedId());
      if (
        avatar_url.value !==
          importedProducts.object.find((row) => row.id === selectedId)
            ?.image_url ||
        ""
      ) {
        dispatch(deleteAvatar());
      } else {
        dispatch(resetAvatar());
      }
      if (
        slider1.value !==
          importedProducts.object.find((row) => row.id === selectedId)
            ?.slider_url_1 ||
        ""
      ) {
        dispatch(deleteSlider1());
      } else {
        dispatch(resetSlider1());
      }
      if (
        slider2.value !==
          importedProducts.object.find((row) => row.id === selectedId)
            ?.slider_url_2 ||
        ""
      ) {
        dispatch(deleteSlider2());
      } else {
        dispatch(resetSlider2());
      }
      if (
        slider3.value !==
          importedProducts.object.find((row) => row.id === selectedId)
            ?.slider_url_3 ||
        ""
      ) {
        dispatch(deleteSlider3());
      } else {
        dispatch(resetSlider3());
      }
      if (
        slider4.value !==
          importedProducts.object.find((row) => row.id === selectedId)
            ?.slider_url_4 ||
        ""
      ) {
        dispatch(deleteSlider4());
      } else {
        dispatch(resetSlider4());
      }
      dispatch(resetSelectedId());
      dispatch(resetImportedProduct());
    }
    setOldOpen(!oldOpen);
  };

  const selectedId = useSelector((state) => state.selectedId.value);
  const check = useSelector((state) => state.selectedId.change);
  const importedProduct = useSelector((state) => state.importedProduct);
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
        const product = importedProducts.object?.find(
          (item) =>
            item.product_id.id === importedProduct.product &&
            item.color_id.id === importedProduct.color_code &&
            item.size_id.id === importedProduct.size &&
            item.material_id.id === importedProduct.material
        );
        await addImportedProduct({
          product_id: product.product_id.id,
          color_code: product.color_id.color_code,
          color_name: product.color_id.color_name,
          size: product.size_id.size,
          height: product.size_id.height,
          weight: product.size_id.weight,
          material: product.material_id.name,
          gender: product.gender,
          importPrice: Number(importedProduct.importPrice),
          image_url: product.image_url,
          slider_url_1: product.slider_url_1,
          slider_url_2: product.slider_url_2,
          slider_url_3: product.slider_url_3,
          slider_url_4: product.slider_url_4,
          public_id_url: product.public_id_url,
          public_id_slider_url_1: product.public_id_slider_url_1,
          public_id_slider_url_2: product.public_id_slider_url_2,
          public_id_slider_url_3: product.public_id_slider_url_3,
          public_id_slider_url_4: product.public_id_slider_url_4,
          importNumber: Number(importedProduct.importNumber),
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
          product_id: importedProduct.product,
          color_code: importedProduct.color_code,
          color_name: importedProduct.color_name,
          size: importedProduct.size,
          height: importedProduct.height,
          weight: importedProduct.weight,
          material: importedProduct.material,
          gender: importedProduct.gender,
          importPrice: Number(importedProduct.importPrice),
          image_url: avatar_url.value,
          slider_url_1: slider1.value,
          slider_url_2: slider2.value,
          slider_url_3: slider3.value,
          slider_url_4: slider4.value,
          public_id_url: avatar_url.publicId,
          public_id_slider_url_1: slider1.publicId,
          public_id_slider_url_2: slider2.publicId,
          public_id_slider_url_3: slider3.publicId,
          public_id_slider_url_4: slider4.publicId,
          importNumber: Number(importedProduct.importNumber),
        })
          .unwrap()
          .then(() => {
            Toast.fire({
              icon: "success",
              title: "Thêm thương hiệu thành công",
            }).then(() => {
              handleNewOpen();
            });
          });
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Thêm thương hiệu thất bại",
      }).then(() => {
        // if (err.originalStatus === 401) {
        //   localStorage.clear();
        //   navigate("/login");
        // }
      });
    }
  };
  const updateSubmit = async () => {
    const message = await updateImportedProduct({
      id: importedProducts.object.find((row) => row.id === selectedId)?.id,
      product_id:
        importedProducts.object.find((row) => row.id === selectedId)?.product_id
          .id || "",
      color_id:
        importedProducts.object.find((row) => row.id === selectedId)?.color_id
          .id || "",
      size_id: importedProducts.object.find((row) => row.id === selectedId)
        ?.size_id.id,
      material_id: importedProducts.object.find((row) => row.id === selectedId)
        ?.material_id.id,
      color_code:
        importedProduct.color_code ||
        importedProducts.object.find((row) => row.id === selectedId)?.color_id
          .color_code ||
        "",
      color_name:
        importedProduct.color_name ||
        importedProducts.object.find((row) => row.id === selectedId)?.color_id
          .color_name ||
        "",
      size:
        importedProduct.size ||
        importedProducts.object.find((row) => row.id === selectedId)?.size_id
          .size ||
        "",
      height:
        importedProduct.height ||
        importedProducts.object.find((row) => row.id === selectedId)?.size_id
          .height ||
        "",
      weight:
        importedProduct.weight ||
        importedProducts.object.find((row) => row.id === selectedId)?.size_id
          .weight ||
        "",
      material:
        importedProduct.material ||
        importedProducts.object.find((row) => row.id === selectedId)
          ?.material_id.name ||
        "",
      gender:
        importedProduct.gender ||
        importedProducts.object.find((row) => row.id === selectedId)?.gender ||
        "",
      importPrice:
        importedProduct.importPrice ||
        importedProducts.object.find((row) => row.id === selectedId)
          ?.importPrice ||
        "",
      image_url: avatar_url.value,
      slider_url_1: slider1.value,
      slider_url_2: slider2.value,
      slider_url_3: slider3.value,
      slider_url_4: slider4.value,
      public_id_url: avatar_url.publicId,
      public_id_slider_url_1: slider1.publicId,
      public_id_slider_url_2: slider2.publicId,
      public_id_slider_url_3: slider3.publicId,
      public_id_slider_url_4: slider4.publicId,
      importNumber: importedProduct.importNumber,
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
  const ListImportProducts = [];
  importedProducts &&
    importedProducts.object.length > 0 &&
    importedProducts.object.map((product) => {
      ListImportProducts.push({
        id: product.id,
        name: product.product_id.name,
        color: product.color_id.color_name,
        size: product.size_id.size,
        material: product.material_id.name,
        importPrice: product.importPrice.toLocaleString("en-US") + " đ",
        import: product.importNumber,
      });
    });

  useEffect(() => {
    if (selectedId !== -1) {
      dispatch(
        setAvatar({
          value:
            importedProducts.object.find((row) => row.id === selectedId)
              ?.image_url || "",
          publicId:
            importedProducts.object.find((row) => row.id === selectedId)
              ?.public_id_url || "",
        })
      );
      dispatch(
        setSlider1({
          value:
            importedProducts.object.find((row) => row.id === selectedId)
              ?.slider_url_1 || "",
          publicId:
            importedProducts.object.find((row) => row.id === selectedId)
              ?.public_id_slider_url_1 || "",
        })
      );
      dispatch(
        setSlider2({
          value:
            importedProducts.object.find((row) => row.id === selectedId)
              ?.slider_url_2 || "",
          publicId:
            importedProducts.object.find((row) => row.id === selectedId)
              ?.public_id_slider_url_2 || "",
        })
      );
      dispatch(
        setSlider3({
          value:
            importedProducts.object.find((row) => row.id === selectedId)
              ?.slider_url_3 || "",
          publicId:
            importedProducts.object.find((row) => row.id === selectedId)
              ?.public_id_slider_url_3 || "",
        })
      );
      dispatch(
        setSlider4({
          value:
            importedProducts.object.find((row) => row.id === selectedId)
              ?.slider_url_4 || "",
          publicId:
            importedProducts.object.find((row) => row.id === selectedId)
              ?.public_id_slider_url_4 || "",
        })
      );
    }
  }, [selectedId, importedProducts, dispatch, check]);
  const findImportedProduct = (product, color, size, material) => {
    if (importedProducts.object?.length === 0) return false;
    if (!product || !color || !size || !material) return false;
    if (
      importedProducts.object?.find(
        (item) =>
          item.product_id.id === product &&
          item.color_id.id === color &&
          item.size_id.id === size &&
          item.material_id.id === material
      )
    ) {
      const imported_product = importedProducts.object?.find(
        (item) =>
          item.product_id.id === product &&
          item.color_id.id === color &&
          item.material_id.id === material &&
          item.size_id.id === size
      );
      dispatch(setGender(imported_product.gender));
      dispatch(setSlider1(imported_product.image_url));
      dispatch(setSlider2(imported_product.slider_url_1));
      dispatch(setSlider2(imported_product.slider_url_2));
      dispatch(setSlider3(imported_product.slider_url_3));
      dispatch(setSlider4(imported_product.slider_url_4));
      dispatch(
        setGender(
          importedProducts.object?.find(
            (item) =>
              item.product_id.id === product &&
              item.color_id.id === color &&
              item.size_id.id === size &&
              item.material_id.id === material
          ).gender
        )
      );
      return true;
    }
    return false;
  };

  if (isLoading || isLoading_ImportProducts) return <Loading />;
  if (error || isError_ImportedProducts) return navigate("/error");

  return (
    <>
      <AdminLayout
        name="Nhập hàng"
        TABLE_HEAD={importproduct}
        TABLE_ROWS={ListImportProducts}
        updateContent="Chỉnh sửa"
        deleteContent="Xóa"
        size="xl"
        headerDetail={
          "Chi tiết mã hàng #" +
          (selectedId === -1
            ? ""
            : importedProducts
            ? importedProducts.object.length > 0
              ? importedProducts.object.find((row) => row.id === selectedId)
                  ?.id || ""
              : ""
            : "")
        }
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
        headerUpdate={"Chỉnh sửa mã hàng #" + selectedId}
        bodyUpdate={
          <Container>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-4">
                {avatar_url.value === "" ? (
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
                        <ImageUpload image="avatar_url" />
                      </label>
                    </div>
                  </figure>
                ) : (
                  <div className="grid grid-cols-4 justify-around mx-auto my-auto w-full">
                    <img
                      src={
                        selectedId === -1
                          ? ""
                          : avatar_url.value === ""
                          ? importedProducts.object.find(
                              (row) => row.id === selectedId
                            )?.image_url || ""
                          : avatar_url.value
                      }
                      alt="avatar"
                      className="h-[200px] w-full mx-auto col-span-3"
                    />
                    <Button
                      onClick={() => dispatch(deleteAvatar())}
                      color="red"
                      className="w-full h-[200px]"
                    >
                      Xóa ảnh đại diện
                    </Button>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {slider1.value === "" ? (
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
                          <ImageUpload image="slider_url_1" />
                        </label>
                      </div>
                    </figure>
                  ) : (
                    <div className="flex justify-around mx-auto w-full my-auto">
                      <img
                        src={
                          selectedId === -1
                            ? ""
                            : slider1.value === ""
                            ? importedProducts.object.find(
                                (row) => row.id === selectedId
                              )?.slider_url_1 || ""
                            : slider1.value
                        }
                        alt="avatar"
                        className="h-[100px] mx-auto my-auto"
                      />
                      <Button
                        onClick={() => dispatch(deleteSlider1())}
                        color="red"
                        className="h-[100px] mx-auto my-auto"
                      >
                        Xóa ảnh 1
                      </Button>
                    </div>
                  )}

                  {slider2.value === "" ? (
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
                          <ImageUpload image="slider_url_2" />
                        </label>
                      </div>
                    </figure>
                  ) : (
                    <div className="flex justify-around mx-auto w-full my-auto">
                      <img
                        src={
                          selectedId === -1
                            ? ""
                            : slider2.value === ""
                            ? importedProducts.object.find(
                                (row) => row.id === selectedId
                              )?.slider_url_2 || ""
                            : slider2.value
                        }
                        alt="avatar"
                        className="h-[100px] mx-auto my-auto"
                      />
                      <Button
                        onClick={() => dispatch(deleteSlider2())}
                        color="red"
                        className="h-[100px] mx-auto my-auto"
                      >
                        Xóa ảnh 2
                      </Button>
                    </div>
                  )}

                  {slider3.value === "" ? (
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
                          <ImageUpload image="slider_url_3" />
                        </label>
                      </div>
                    </figure>
                  ) : (
                    <div className="flex justify-around mx-auto w-full my-auto">
                      <img
                        src={
                          selectedId === -1
                            ? ""
                            : slider3.value === ""
                            ? importedProducts.object.find(
                                (row) => row.id === selectedId
                              )?.slider_url_3
                            : slider3.value
                        }
                        alt="avatar"
                        className="h-[100px] mx-auto my-auto"
                      />
                      <Button
                        onClick={() => dispatch(deleteSlider3())}
                        color="red"
                        className="h-[100px] mx-auto my-auto"
                      >
                        Xóa ảnh 3
                      </Button>
                    </div>
                  )}

                  {slider4.value === "" ? (
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
                          <ImageUpload image="slider_url_4" />
                        </label>
                      </div>
                    </figure>
                  ) : (
                    <div className="flex justify-around mx-auto h-full">
                      <img
                        src={
                          selectedId === -1
                            ? ""
                            : slider4.value === ""
                            ? importedProducts.object.find(
                                (row) => row.id === selectedId
                              )?.slider_url_4
                            : slider4.value
                        }
                        alt="avatar"
                        className="h-[100px] mx-auto my-auto"
                      />
                      <Button
                        onClick={() => dispatch(deleteSlider4())}
                        color="red"
                        className="h-[100px] mx-auto my-auto"
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
                  <div className="w-[200px]">
                    <Select
                      disabled
                      className=" !border-blue-gray-200 focus:!border-black"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      value={
                        selectedId === -1
                          ? ""
                          : importedProduct.product
                          ? importedProduct.product
                          : importedProducts.object.find(
                              (row) => row.id === selectedId
                            )?.product_id.id
                      }
                      onChange={(e) => dispatch(setProductId(e))}
                    >
                      {products &&
                        products.object.length > 0 &&
                        products.object.map((item, index) => (
                          <Option key={index} value={item.id}>
                            {item.name}
                          </Option>
                        ))}
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-4">
                  <Typography variant="h6">Mã màu: </Typography>
                  <div className="w-[200px]">
                    <Input
                      type="color"
                      value={importedProduct.color_code}
                      pattern="#[a-fA-F0-9]{6}"
                      placeholder="#000000"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) => dispatch(setColorCode(e.target.value))}
                    />
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Màu sắc: </Typography>
                  <div className="w-[200px]">
                    <Input
                      value={
                        selectedId === -1
                          ? ""
                          : importedProduct.color_name === ""
                          ? importedProducts.object.find(
                              (row) => row.id === selectedId
                            )?.color_id.color_name
                          : importedProduct.color_name
                      }
                      placeholder="Trắng"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) => dispatch(setColorName(e.target.value))}
                    />
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Kích thước: </Typography>
                  <div className="w-[200px]">
                    <Input
                      value={
                        selectedId === -1
                          ? ""
                          : importedProduct.size === ""
                          ? importedProducts.object.find(
                              (row) => row.id === selectedId
                            )?.size_id.size
                          : importedProduct.size
                      }
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) => dispatch(setSize(e.target.value))}
                    />
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Chiều cao </Typography>
                  <div className="w-[200px]">
                    <Input
                      value={
                        selectedId === -1
                          ? ""
                          : importedProduct.height === ""
                          ? importedProducts.object.find(
                              (row) => row.id === selectedId
                            )?.size_id.height
                          : importedProduct.height
                      }
                      placeholder="170cm"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) => dispatch(setHeight(e.target.value))}
                    />
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Cân nặng </Typography>
                  <div className="w-[200px]">
                    <Input
                      value={
                        selectedId === -1
                          ? ""
                          : importedProduct.weight === ""
                          ? importedProducts.object.find(
                              (row) => row.id === selectedId
                            )?.size_id.weight || ""
                          : importedProduct.weight
                      }
                      placeholder="50 kg"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) => dispatch(setWeight(e.target.value))}
                    />
                  </div>
                </div>

                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Chất liệu: </Typography>
                  <div className="w-[200px]">
                    <Input
                      value={
                        selectedId === -1
                          ? ""
                          : importedProduct.material === ""
                          ? importedProducts.object.find(
                              (row) => row.id === selectedId
                            )?.material_id.name
                          : importedProduct.material
                      }
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) => dispatch(setMaterial(e.target.value))}
                    />
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Giới tính: </Typography>
                  <div className="flex">
                    <Radio
                      name="gender"
                      checked={
                        importedProduct.gender === "MALE" ||
                        (selectedId === -1
                          ? ""
                          : importedProduct.gender === ""
                          ? importedProducts.object.find(
                              (row) => row.id === selectedId
                            )?.gender === "MALE"
                          : importedProduct.gender === "MALE")
                      }
                      value="MALE"
                      label="Nam"
                      onChange={(e) =>
                        dispatch(setGender(e.target.defaultValue))
                      }
                    />
                    <Radio
                      name="gender"
                      checked={
                        importedProduct.gender === "FEMALE" ||
                        (selectedId === -1
                          ? ""
                          : importedProduct.gender === ""
                          ? importedProducts.object.find(
                              (row) => row.id === selectedId
                            )?.gender === "FEMALE"
                          : importedProduct.gender === "FEMALE")
                      }
                      value="FEMALE"
                      label="Nữ"
                      onChange={(e) =>
                        dispatch(setGender(e.target.defaultValue))
                      }
                    />
                    <Radio
                      name="gender"
                      checked={
                        importedProduct.gender === "UNISEX" ||
                        (selectedId === -1
                          ? ""
                          : importedProduct.gender === ""
                          ? importedProducts.object.find(
                              (row) => row.id === selectedId
                            )?.gender === "UNISEX"
                          : importedProduct.gender === "UNISEX")
                      }
                      value="UNISEX"
                      label="Unisex"
                      onChange={(e) =>
                        dispatch(setGender(e.target.defaultValue))
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Số lượng: </Typography>
                  <div className="w-[200px]">
                    <Input
                      type="number"
                      value={
                        selectedId === -1
                          ? ""
                          : importedProduct.importNumber === 1
                          ? importedProducts.object.find(
                              (row) => row.id === selectedId
                            )?.importNumber || ""
                          : importedProduct.importNumber
                      }
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) =>
                        dispatch(
                          setImportNumber(
                            e.target.value < 1 ? 1 : e.target.value
                          )
                        )
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Giá nhập: </Typography>
                  <div className="w-[200px]">
                    <Input
                      type="number"
                      value={
                        selectedId === -1
                          ? ""
                          : importedProduct.importPrice === 1000
                          ? importedProducts.object.find(
                              (row) => row.id === selectedId
                            )?.importPrice || ""
                          : importedProduct.importPrice
                      }
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) =>
                        dispatch(
                          setImportPrice(
                            e.target.value < 1000 ? 1000 : e.target.value
                          )
                        )
                      }
                    />
                  </div>
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
      <Dialog open={newOpen} handler={handleNewOpen} size="xl">
        <DialogHeader className="pb-0 flex justify-between">
          <Typography variant="h4">Nhập sản phẩm mới</Typography>
          <IconButton
            className="border-none"
            variant="outlined"
            onClick={handleNewOpen}
          >
            <CloseIcon />
          </IconButton>
        </DialogHeader>
        <DialogBody>
          <Container>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-4">
                {avatar_url.value === "" ? (
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
                        <ImageUpload image="avatar_url" />
                      </label>
                    </div>
                  </figure>
                ) : (
                  <div className="grid grid-cols-4 justify-around mx-auto my-auto w-full">
                    <img
                      src={avatar_url.value}
                      alt="avatar"
                      className="h-[200px] w-full mx-auto col-span-3"
                    />
                    <Button
                      onClick={() => dispatch(deleteAvatar())}
                      color="red"
                      className="w-full h-[200px]"
                    >
                      Xóa ảnh đại diện
                    </Button>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {slider1.value === "" ? (
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
                          <ImageUpload image="slider_url_1" />
                        </label>
                      </div>
                    </figure>
                  ) : (
                    <div className="flex justify-around mx-auto w-full my-auto">
                      <img
                        src={slider1.value}
                        alt="avatar"
                        className="h-[100px] mx-auto my-auto"
                      />
                      <Button
                        onClick={() => dispatch(deleteSlider1())}
                        color="red"
                        className="h-[100px] mx-auto my-auto"
                      >
                        Xóa ảnh 1
                      </Button>
                    </div>
                  )}

                  {slider2.value === "" ? (
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
                          <ImageUpload image="slider_url_2" />
                        </label>
                      </div>
                    </figure>
                  ) : (
                    <div className="flex justify-around mx-auto w-full my-auto">
                      <img
                        src={slider2.value}
                        alt="avatar"
                        className="h-[100px] mx-auto my-auto"
                      />
                      <Button
                        onClick={() => dispatch(deleteSlider2())}
                        color="red"
                        className="h-[100px] mx-auto my-auto"
                      >
                        Xóa ảnh 2
                      </Button>
                    </div>
                  )}

                  {slider3.value === "" ? (
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
                          <ImageUpload image="slider_url_3" />
                        </label>
                      </div>
                    </figure>
                  ) : (
                    <div className="flex justify-around mx-auto w-full my-auto">
                      <img
                        src={slider3.value}
                        alt="avatar"
                        className="h-[100px] mx-auto my-auto"
                      />
                      <Button
                        onClick={() => dispatch(deleteSlider3())}
                        color="red"
                        className="h-[100px] mx-auto my-auto"
                      >
                        Xóa ảnh 3
                      </Button>
                    </div>
                  )}

                  {slider4.value === "" ? (
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
                          <ImageUpload image="slider_url_4" />
                        </label>
                      </div>
                    </figure>
                  ) : (
                    <div className="flex justify-around mx-auto h-full">
                      <img
                        src={slider4.value}
                        alt="avatar"
                        className="h-[100px] mx-auto my-auto"
                      />
                      <Button
                        onClick={() => dispatch(deleteSlider4())}
                        color="red"
                        className="h-[100px] mx-auto my-auto"
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
                  <div className="w-[200px]">
                    <Select
                      className=" !border-blue-gray-200 focus:!border-black"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      value={importedProduct.product.id}
                      onChange={(e) => dispatch(setProductId(e))}
                    >
                      {products &&
                        products.object.length > 0 &&
                        products.object.map((item, index) => (
                          <Option key={index} value={item.id}>
                            {item.name}
                          </Option>
                        ))}
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-4">
                  <Typography variant="h6">Mã màu: </Typography>
                  <div className="w-[200px]">
                    <Input
                      type="color"
                      value={importedProduct.color_code}
                      pattern="#[a-fA-F0-9]{6}"
                      placeholder="#000000"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) => dispatch(setColorCode(e.target.value))}
                    />
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Màu sắc: </Typography>
                  <div className="w-[200px]">
                    <Input
                      value={importedProduct.color_name}
                      placeholder="Trắng"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) => dispatch(setColorName(e.target.value))}
                    />
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Kích thước: </Typography>
                  <div className="w-[200px]">
                    <Input
                      value={importedProduct.size}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) => dispatch(setSize(e.target.value))}
                    />
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Chiều cao </Typography>
                  <div className="w-[200px]">
                    <Input
                      value={importedProduct.height}
                      placeholder="170cm"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) => dispatch(setHeight(e.target.value))}
                    />
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Cân nặng </Typography>
                  <div className="w-[200px]">
                    <Input
                      value={importedProduct.weight}
                      placeholder="50 kg"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) => dispatch(setWeight(e.target.value))}
                    />
                  </div>
                </div>

                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Chất liệu: </Typography>
                  <div className="w-[200px]">
                    <Input
                      value={importedProduct.material}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) => dispatch(setMaterial(e.target.value))}
                    />
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Giới tính: </Typography>
                  <div className="flex">
                    <Radio
                      name="gender"
                      checked={importedProduct.gender === "MALE"}
                      value="MALE"
                      label="Nam"
                      onChange={(e) =>
                        dispatch(setGender(e.target.defaultValue))
                      }
                    />
                    <Radio
                      name="gender"
                      checked={importedProduct.gender === "FEMALE"}
                      value="FEMALE"
                      label="Nữ"
                      onChange={(e) =>
                        dispatch(setGender(e.target.defaultValue))
                      }
                    />
                    <Radio
                      name="gender"
                      checked={importedProduct.gender === "UNISEX"}
                      value="UNISEX"
                      label="Unisex"
                      onChange={(e) =>
                        dispatch(setGender(e.target.defaultValue))
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Số lượng: </Typography>
                  <div className="w-[200px]">
                    <Input
                      type="number"
                      value={importedProduct.importNumber}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) =>
                        dispatch(
                          setImportNumber(
                            e.target.value < 1 ? 1 : e.target.value
                          )
                        )
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Giá nhập: </Typography>
                  <div className="w-[200px]">
                    <Input
                      type="number"
                      value={importedProduct.importPrice}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) =>
                        dispatch(
                          setImportPrice(
                            e.target.value < 1000 ? 1000 : e.target.value
                          )
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleAddSubmit}>
            <span>Xác nhận</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Dialog open={oldOpen} handler={handleOldOpen} size="xl">
        <DialogHeader className="pb-0 flex justify-between">
          <Typography variant="h4">Nhập sản phẩm có sẵn</Typography>
          <IconButton
            className="border-none"
            variant="outlined"
            onClick={handleOldOpen}
          >
            <CloseIcon />
          </IconButton>
        </DialogHeader>
        <DialogBody>
          <Container>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-4">
                {!findImportedProduct(
                  importedProduct.product,
                  importedProduct.color_code,
                  importedProduct.size,
                  importedProduct.material
                ) ? (
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
                            item.product_id.id === importedProduct.product &&
                            item.color_id.id === importedProduct.color_code &&
                            item.size_id.id === importedProduct.size &&
                            item.material_id.id === importedProduct.material
                        )?.image_url
                      }
                      alt="avatar"
                      className="h-[200px] w-full mx-auto col-span-4"
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
                  {!findImportedProduct(
                    importedProduct.product,
                    importedProduct.color_code,
                    importedProduct.size,
                    importedProduct.material
                  ) ? (
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
                              item.product_id.id === importedProduct.product &&
                              item.color_id.id === importedProduct.color_code &&
                              item.size_id.id === importedProduct.size &&
                              item.material_id.id === importedProduct.material
                          )?.slider_url_1
                        }
                        alt="avatar"
                        className="h-[125px] mx-auto my-auto"
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

                  {!findImportedProduct(
                    importedProduct.product,
                    importedProduct.color_code,
                    importedProduct.size,
                    importedProduct.material
                  ) ? (
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
                              item.product_id.id === importedProduct.product &&
                              item.color_id.id === importedProduct.color_code &&
                              item.size_id.id === importedProduct.size &&
                              item.material_id.id === importedProduct.material
                          )?.slider_url_2
                        }
                        alt="avatar"
                        className="h-[125px] mx-auto my-auto"
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
                  {!findImportedProduct(
                    importedProduct.product,
                    importedProduct.color_code,
                    importedProduct.size,
                    importedProduct.material
                  ) ? (
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
                              item.product_id.id === importedProduct.product &&
                              item.color_id.id === importedProduct.color_code &&
                              item.size_id.id === importedProduct.size &&
                              item.material_id.id === importedProduct.material
                          )?.slider_url_3
                        }
                        alt="avatar"
                        className="h-[125px] mx-auto my-auto"
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
                  {!findImportedProduct(
                    importedProduct.product,
                    importedProduct.color_code,
                    importedProduct.size,
                    importedProduct.material
                  ) ? (
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
                    <div className="flex justify-around mx-auto h-full">
                      <img
                        src={
                          importedProducts.object?.find(
                            (item) =>
                              item.product_id.id === importedProduct.product &&
                              item.color_id.id === importedProduct.color_code &&
                              item.size_id.id === importedProduct.size &&
                              item.material_id.id === importedProduct.material
                          )?.slider_url_4
                        }
                        alt="avatar"
                        className="h-[125px] mx-auto my-auto"
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
                  {/* <Typography variant="medium">Áo thun nam</Typography> */}
                  <div className="w-[200px]">
                    <Select
                      className=" !border-blue-gray-200 focus:!border-black"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      value={importedProduct.product}
                      onChange={(e) => dispatch(setProductId(e))}
                    >
                      {products &&
                        products.object.length > 0 &&
                        products.object.map((item, index) => (
                          <Option key={index} value={item.id}>
                            {item.name}
                          </Option>
                        ))}
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-4">
                  <Typography variant="h6">Mã màu: </Typography>
                  <div className="w-[200px]">
                    <Select
                      className=" !border-blue-gray-200 focus:!border-black"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      value={importedProduct.color_code}
                      onChange={(e) => dispatch(setColorCode(e))}
                    >
                      {importedProducts &&
                        importedProducts.object.length > 0 &&
                        importedProducts.object.map((item, index) => (
                          <Option key={index} value={item.color_id.id}>
                            {item.color_id.color_code}
                          </Option>
                        ))}
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Màu sắc: </Typography>
                  <div className="w-[200px]">
                    <Input
                      disabled
                      value={
                        importedProducts.object?.find(
                          (item) =>
                            item.product_id.id === importedProduct.product &&
                            item.color_id.id === importedProduct.color_code
                        )?.color_id.color_name
                      }
                      placeholder="Trắng"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Kích thước: </Typography>
                  <div className="w-[200px]">
                    {/* <Input
                      value={importedProduct.size}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) => dispatch(setSize(e.target.value))}
                    /> */}
                    <Select
                      className=" !border-blue-gray-200 focus:!border-black"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      value={importedProduct.size}
                      onChange={(e) => dispatch(setSize(e))}
                    >
                      {importedProducts &&
                        importedProducts.object.length > 0 &&
                        importedProducts.object.map((item, index) => (
                          <Option key={index} value={item.size_id.id}>
                            {item.size_id.size}
                          </Option>
                        ))}
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Chiều cao </Typography>
                  <div className="w-[200px]">
                    <Input
                      disabled
                      value={
                        importedProducts.object?.find(
                          (item) =>
                            item.product_id.id === importedProduct.product &&
                            item.size_id.id === importedProduct.size
                        )?.size_id.height
                      }
                      placeholder="170cm"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) => dispatch(setHeight(e.target.value))}
                    />
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Cân nặng </Typography>
                  <div className="w-[200px]">
                    <Input
                      disabled
                      value={
                        importedProducts.object?.find(
                          (item) =>
                            item.product_id.id === importedProduct.product &&
                            item.size_id.id === importedProduct.size
                        )?.size_id.weight
                      }
                      placeholder="50 kg"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) => dispatch(setWeight(e.target.value))}
                    />
                  </div>
                </div>

                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Chất liệu: </Typography>
                  <div className="w-[200px]">
                    <Select
                      className=" !border-blue-gray-200 focus:!border-black"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      value={importedProduct.material}
                      onChange={(e) => dispatch(setMaterial(e))}
                    >
                      {importedProducts &&
                        importedProducts.object.length > 0 &&
                        importedProducts.object.map((item, index) => (
                          <Option key={index} value={item.material_id.id}>
                            {item.material_id.name}
                          </Option>
                        ))}
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Giới tính: </Typography>
                  <div className="flex">
                    <Radio
                      name="gender"
                      checked={importedProduct.gender === "MALE"}
                      value="MALE"
                      label="Nam"
                    />
                    <Radio
                      name="gender"
                      checked={importedProduct.gender === "FEMALE"}
                      value="FEMALE"
                      label="Nữ"
                    />
                    <Radio
                      name="gender"
                      checked={importedProduct.gender === "UNISEX"}
                      value="UNISEX"
                      label="Unisex"
                    />
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Số lượng: </Typography>
                  <div className="w-[200px]">
                    <Input
                      type="number"
                      value={importedProduct.importNumber}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) =>
                        dispatch(
                          setImportNumber(
                            e.target.value < 1 ? 1 : e.target.value
                          )
                        )
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col  justify-between gap-4">
                  <Typography variant="h6">Giá nhập: </Typography>
                  <div className="w-[200px]">
                    <Input
                      type="number"
                      value={importedProduct.importPrice}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) =>
                        dispatch(
                          setImportPrice(
                            e.target.value < 1000 ? 1000 : e.target.value
                          )
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleAddSubmit}>
            <span>Xác nhận</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ImportProduct;
