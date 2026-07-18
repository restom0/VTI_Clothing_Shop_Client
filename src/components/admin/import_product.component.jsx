import { ROUTES } from "../../constants/routes.constant";
import { Button } from "@material-tailwind/react/components/Button";
import { IconButton } from "@material-tailwind/react/components/IconButton";
import { Typography } from "@material-tailwind/react/components/Typography";
import { Input } from "@material-tailwind/react/components/Input";
import { Radio } from "@material-tailwind/react/components/Radio";
import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/admin/admin.layout";
import { importproduct } from "../../constants/head_table.constant";
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

import Loading from "../shared/loading.component";
import { resetSelectedId } from "../../features/slices/select_id.slice";
import { handleDelete } from "../../utils/delete_image.util";
import { useCurrency } from "../../currency";
import {
  IMPORT_ACTION_BUTTON_CLASSNAME,
  IMPORT_ACTIONS_CLASSNAME,
  IMPORT_AVATAR_DELETE_BUTTON_CLASSNAME,
  IMPORT_AVATAR_PREVIEW_CLASSNAME,
  IMPORT_AVATAR_PREVIEW_IMAGE_CLASSNAME,
  IMPORT_AVATAR_PREVIEW_IMAGE_FULL_CLASSNAME,
  IMPORT_DETAIL_FIELD_CLASSNAME,
  IMPORT_DETAIL_LAYOUT_CLASSNAME,
  IMPORT_DETAIL_MAIN_IMAGE_CLASSNAME,
  IMPORT_DETAIL_MEDIA_GRID_CLASSNAME,
  IMPORT_DETAIL_MEDIA_ITEM_CLASSNAME,
  IMPORT_DETAIL_THUMB_GRID_CLASSNAME,
  IMPORT_DETAIL_THUMB_IMAGE_CLASSNAME,
  IMPORT_DIALOG_HEADER_CLASSNAME,
  IMPORT_FORM_FIELD_CLASSNAME,
  IMPORT_FORM_GRID_CLASSNAME,
  IMPORT_SLIDER_DELETE_BUTTON_CLASSNAME,
  IMPORT_SLIDER_PREVIEW_CLASSNAME,
  IMPORT_SLIDER_PREVIEW_FULL_CLASSNAME,
  IMPORT_SLIDER_PREVIEW_IMAGE_CLASSNAME,
  IMPORT_SLIDER_PREVIEW_IMAGE_TALL_CLASSNAME,
  IMPORT_UPLOAD_BODY_CLASSNAME,
  IMPORT_UPLOAD_BODY_PADDED_CLASSNAME,
  IMPORT_UPLOAD_CAPTION_CLASSNAME,
  IMPORT_UPLOAD_CENTER_CLASSNAME,
  IMPORT_UPLOAD_DROPZONE_CLASSNAME,
  IMPORT_UPLOAD_FIGURE_CLASSNAME,
  IMPORT_UPLOAD_HELPER_TEXT_CLASSNAME,
  IMPORT_UPLOAD_HINT_CLASSNAME,
  IMPORT_UPLOAD_ICON_CLASSNAME,
  IMPORT_UPLOAD_ICON_SPACED_CLASSNAME,
  IMPORT_UPLOAD_STACK_CLASSNAME,
  IMPORT_UPLOAD_TEXT_CLASSNAME,
} from "../../styles/classNames";

/** Handles gender label. */
const genderLabel = (gender) => {
  if (gender === "MALE") return "Nam";
  if (gender === "FEMALE") return "Nữ";
  return "Unisex";
};

/** Clamps range. */
const clampRange = (raw, min, max) => {
  const value = Number(raw);
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
};
/** Clamps floor. */
const clampFloor = (raw, min) => {
  const value = Number(raw);
  if (Number.isNaN(value)) return min;
  return Math.max(value, min);
};

/** Finds old variant. */
const findOldVariant = (importedProducts, productId, colorCode, size, material) =>
  importedProducts?.object?.find(
    (item) =>
      item.product_id.id === productId &&
      item.color_id.color_code === colorCode &&
      item.size_id.size === size &&
      item.material_id.name === material
  );

export { genderLabel, clampRange, clampFloor, findOldVariant };

// Upload dropzone (empty) or image preview (filled). Keeping the empty/filled
// choice here removes ~15 conditionals from ImportProduct. `upload`/`deleteButton`
// are passed as elements so each call site keeps its exact wiring.
/** Handles image slot. */
const ImageSlot = ({
  value,
  imageKey,
  caption,
  isAvatar,
  previewSrc,
  previewWrapClassName,
  previewImgClassName,
  upload,
  deleteButton,
}) =>
  value === "" ? (
    <figure className={IMPORT_UPLOAD_FIGURE_CLASSNAME}>
      <div className={IMPORT_UPLOAD_CENTER_CLASSNAME}>
        <label htmlFor={imageKey} className={IMPORT_UPLOAD_DROPZONE_CLASSNAME}>
          <div
            className={
              isAvatar ? IMPORT_UPLOAD_BODY_PADDED_CLASSNAME : IMPORT_UPLOAD_BODY_CLASSNAME
            }
          >
            <svg
              className={
                isAvatar ? IMPORT_UPLOAD_ICON_SPACED_CLASSNAME : IMPORT_UPLOAD_ICON_CLASSNAME
              }
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
            <p
              className={
                isAvatar ? IMPORT_UPLOAD_HELPER_TEXT_CLASSNAME : IMPORT_UPLOAD_TEXT_CLASSNAME
              }
            >
              <strong>Click to upload</strong> or drag and drop
            </p>
            {isAvatar && (
              <p className={IMPORT_UPLOAD_HINT_CLASSNAME}>SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            )}
            <Typography as="caption" variant="small" className={IMPORT_UPLOAD_CAPTION_CLASSNAME}>
              {caption}
            </Typography>
          </div>
          {upload}
        </label>
      </div>
    </figure>
  ) : (
    <div className={previewWrapClassName}>
      <img src={previewSrc} alt="avatar" className={previewImgClassName} />
      {deleteButton}
    </div>
  );

/** Handles import product. */
const ImportProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formatPrice } = useCurrency();
  /** Formats optional price. */
  const formatOptionalPrice = (price) => (price == null ? "" : formatPrice(price));
  // const avatar_url = useSelector((state) => state.avatar_url);
  // const slider1 = useSelector((state) => state.slider1);
  // const slider2 = useSelector((state) => state.slider2);
  // const slider3 = useSelector((state) => state.slider3);
  // const slider4 = useSelector((state) => state.slider4);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [slider1, setSlider1] = useState("");
  const [slider2, setSlider2] = useState("");
  const [slider3, setSlider3] = useState("");
  const [slider4, setSlider4] = useState("");
  const [publicIdAvatar, setPublicIdAvatar] = useState("");
  const [publicIdSlider1, setPublicIdSlider1] = useState("");
  const [publicIdSlider2, setPublicIdSlider2] = useState("");
  const [publicIdSlider3, setPublicIdSlider3] = useState("");
  const [publicIdSlider4, setPublicIdSlider4] = useState("");

  const [updateAvatarUrl, setUpdateAvatarUrl] = useState("");
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
  const [colorCode, setColorCode] = useState("");
  const [colorName, setColorName] = useState("");
  const [size, setSize] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [material, setMaterial] = useState("");
  const [gender, setGender] = useState("");
  const [importPrice, setImportPrice] = useState(1000);
  const [importNumber, setImportNumber] = useState(1);
  const [updateColorCode, setUpdateColorCode] = useState("");
  const [updateColorName, setUpdateColorName] = useState("");
  const [updateSize, setUpdateSize] = useState("");
  const [updateHeight, setUpdateHeight] = useState(0);
  const [updateWeight, setUpdateWeight] = useState(0);
  const [updateMaterial, setUpdateMaterial] = useState("");
  const [updateGender, setUpdateGender] = useState("");
  const [updateImportPrice, setUpdateImportPrice] = useState(1000);
  const [updateImportNumber, setUpdateImportNumber] = useState(1);
  /** Handles new open. */
  const handleNewOpen = () => setNewOpen(true);

  /** Handles old open. */
  const handleOldOpen = () => setOldOpen(true);

  /** Handles new close. */
  const handleNewClose = () => setNewOpen(false);

  /** Handles old close. */
  const handleOldClose = () => setOldOpen(false);

  const { data: products, error, isLoading } = useGetProductsQuery();
  const {
    data: importedProducts,
    error: isError_ImportedProducts,
    isLoading: isLoading_ImportProducts,
  } = useGetImportedProductsQuery();
  const [addImportedProduct, { isLoading: isAdded }] = useAddImportedProductMutation();
  const [updateImportedProduct, { isLoading: isUpdated }] = useUpdateImportedProductMutation();
  const [deleteImportedProduct, { isLoading: isDeleted }] = useDeleteImportedProductMutation();
  /** Handles import payload. */
  const importPayload = () => ({
    product_id: product,
    color_code: colorCode,
    color_name: colorName,
    size: size,
    height: height,
    weight: weight,
    material: material,
    gender: gender,
    importPrice: Number(importPrice),
    image_url: avatarUrl,
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
  });
  /** Resets new form. */
  const resetNewForm = () => {
    handleNewClose();
    setAvatarUrl("");
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
  };
  /** Handles add submit. */
  const handleAddSubmit = async () => {
    if (!oldOpen && !newOpen) return;
    try {
      await addImportedProduct(importPayload()).unwrap();
      await Toast.fire({ icon: "success", title: "Thêm thương hiệu thành công" });
      if (oldOpen) handleOldOpen();
      else resetNewForm();
    } catch (err) {
      console.error(err);
      await Toast.fire({ icon: "error", title: "Thêm thương hiệu thất bại" });
      if (err && err.status === 401) {
        localStorage.clear();
        navigate(ROUTES.LOGIN);
      }
    }
  };
  /** Updates submit. */
  const updateSubmit = async () => {
    const search = importedProducts.object.find((row) => row.id === selectedId);
    return await updateImportedProduct({
      id: selectedId,
      product_id: search?.product_id.id || "",
      color_id: search?.color_id.id || "",
      size_id: search?.size_id.id,
      material_id: search?.material_id.id,
      color_code: updateColorCode,
      color_name: updateColorName,
      size: updateSize,
      height: updateHeight,
      weight: updateWeight,
      material: updateMaterial,
      gender: updateGender,
      importPrice: updateImportPrice,
      image_url: updateAvatarUrl,
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
  };
  /** Handles delete submit. */
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
    } catch {
      Toast.fire({
        icon: "error",
        title: "Xóa thất bại",
      });
    }
  };
  useEffect(() => {
    if (selectedId !== -1) {
      const search = importedProducts?.object.find((row) => row.id === selectedId);
      if (search) {
        setUpdateSlider1(search.slider_url_1);
        setUpdateSlider2(search.slider_url_2);
        setUpdateSlider3(search.slider_url_3);
        setUpdateSlider4(search.slider_url_4);
        setUpdateAvatarUrl(search.image_url);
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
        row.color_id.id === colorCode &&
        row.size_id.size === size &&
        row.material_id.id === material
    );
    if (imported_product) {
      setAvatarUrl(imported_product.image_url);
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
  }, [product, colorCode, size, material, importedProducts?.object]);
  if (isLoading || isLoading_ImportProducts) return <Loading />;
  if (error || isError_ImportedProducts) return navigate(ROUTES.ERROR);
  // Single accessor for "show the selected imported product's field, else blank".
  // Replaces the deeply-nested selectedId/importedProducts ternaries below.
  const selectedImport =
    selectedId === -1
      ? null
      : (importedProducts?.object?.find((row) => row.id === selectedId) ?? null);
  /** Handles import field. */
  const importField = (selector, fallback = "") =>
    selectedImport ? (selector(selectedImport) ?? fallback) : fallback;
  const oldVariant = findOldVariant(importedProducts, product, colorCode, size, material);
  const ListImportProducts = importedProducts.object.map((product) => {
    return {
      id: product.id,
      name: product.product_id.name,
      color: product.color_id.color_name,
      size: product.size_id.size,
      material: product.material_id.name,
      importPrice: formatOptionalPrice(product.importPrice),
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
            <div className={IMPORT_DETAIL_LAYOUT_CLASSNAME}>
              <div className={IMPORT_DETAIL_MEDIA_GRID_CLASSNAME}>
                <div className={IMPORT_DETAIL_MEDIA_ITEM_CLASSNAME}>
                  <figure>
                    <img
                      src={importField((s) => s.image_url)}
                      alt=""
                      className={IMPORT_DETAIL_MAIN_IMAGE_CLASSNAME}
                    />
                    <Typography
                      as="caption"
                      variant="small"
                      className={IMPORT_UPLOAD_CAPTION_CLASSNAME}
                    >
                      Hình đại diện
                    </Typography>
                  </figure>
                </div>
                <div className={IMPORT_DETAIL_THUMB_GRID_CLASSNAME}>
                  <div className={IMPORT_DETAIL_MEDIA_ITEM_CLASSNAME}>
                    <figure>
                      <img
                        src={importField((s) => s.slider_url_1)}
                        alt=""
                        className={IMPORT_DETAIL_THUMB_IMAGE_CLASSNAME}
                      />
                      <Typography
                        as="caption"
                        variant="small"
                        className={IMPORT_UPLOAD_CAPTION_CLASSNAME}
                      >
                        Hình 1
                      </Typography>
                    </figure>
                  </div>
                  <div className={IMPORT_DETAIL_MEDIA_ITEM_CLASSNAME}>
                    <figure>
                      <img
                        src={importField((s) => s.slider_url_2)}
                        alt=""
                        className={IMPORT_DETAIL_THUMB_IMAGE_CLASSNAME}
                      />
                      <Typography
                        as="caption"
                        variant="small"
                        className={IMPORT_UPLOAD_CAPTION_CLASSNAME}
                      >
                        Hình 2
                      </Typography>
                    </figure>
                  </div>
                  <div className={IMPORT_DETAIL_MEDIA_ITEM_CLASSNAME}>
                    <figure>
                      <img
                        src={importField((s) => s.slider_url_3)}
                        alt=""
                        className={IMPORT_DETAIL_THUMB_IMAGE_CLASSNAME}
                      />
                      <Typography
                        as="caption"
                        variant="small"
                        className={IMPORT_UPLOAD_CAPTION_CLASSNAME}
                      >
                        Hình 3
                      </Typography>
                    </figure>
                  </div>
                  <div className={IMPORT_DETAIL_MEDIA_ITEM_CLASSNAME}>
                    <figure>
                      <img
                        src={importField((s) => s.slider_url_4)}
                        alt=""
                        className={IMPORT_DETAIL_THUMB_IMAGE_CLASSNAME}
                      />
                      <Typography
                        as="caption"
                        variant="small"
                        className={IMPORT_UPLOAD_CAPTION_CLASSNAME}
                      >
                        Hình 4
                      </Typography>
                    </figure>
                  </div>
                </div>
              </div>
              <div className={IMPORT_FORM_GRID_CLASSNAME}>
                <div className={IMPORT_DETAIL_FIELD_CLASSNAME}>
                  <Typography variant="h5">Sản phẩm: </Typography>
                  <Typography variant="medium">{importField((s) => s.product_id.name)}</Typography>
                </div>
                <div className={IMPORT_DETAIL_FIELD_CLASSNAME}>
                  <Typography variant="h6">Mã màu: </Typography>
                  <Typography variant="medium">
                    {importField((s) => s.color_id.color_code)}
                  </Typography>
                </div>
                <div className={IMPORT_DETAIL_FIELD_CLASSNAME}>
                  <Typography variant="h6">Màu sắc: </Typography>
                  <Typography variant="medium">
                    {importField((s) => s.color_id.color_name)}
                  </Typography>
                </div>
                <div className={IMPORT_DETAIL_FIELD_CLASSNAME}>
                  <Typography variant="h6">Kích thước: </Typography>
                  <Typography variant="medium">{importField((s) => s.size_id.size)}</Typography>
                </div>
                <div className={IMPORT_DETAIL_FIELD_CLASSNAME}>
                  <Typography variant="h6">Chiều cao: </Typography>
                  <Typography variant="medium">{importField((s) => s.size_id.height)}</Typography>
                </div>
                <div className={IMPORT_DETAIL_FIELD_CLASSNAME}>
                  <Typography variant="h6">Cân nặng: </Typography>
                  <Typography variant="medium">{importField((s) => s.size_id.weight)}</Typography>
                </div>
                <div className={IMPORT_DETAIL_FIELD_CLASSNAME}>
                  <Typography variant="h6">Vật liệu: </Typography>
                  <Typography variant="medium">{importField((s) => s.material_id.name)}</Typography>
                </div>
                <div className={IMPORT_DETAIL_FIELD_CLASSNAME}>
                  <Typography variant="h6">Giới tính </Typography>
                  <Typography variant="medium">
                    {importField((s) => genderLabel(s.gender))}
                  </Typography>
                </div>
                <div className={IMPORT_DETAIL_FIELD_CLASSNAME}>
                  <Typography variant="h6">Số lượng: </Typography>
                  <Typography variant="medium">{importField((s) => s.importNumber)}</Typography>
                </div>
                <div className={IMPORT_DETAIL_FIELD_CLASSNAME}>
                  <Typography variant="h6">Giá nhập </Typography>
                  <Typography variant="medium">
                    {importField((s) => formatOptionalPrice(s.importPrice))}
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
            <div className={IMPORT_FORM_GRID_CLASSNAME}>
              <div className={IMPORT_UPLOAD_STACK_CLASSNAME}>
                <ImageSlot
                  value={updateAvatarUrl}
                  imageKey="avatar_url"
                  caption="Hình đại diện"
                  isAvatar
                  previewSrc={updateAvatarUrl}
                  previewWrapClassName={IMPORT_AVATAR_PREVIEW_CLASSNAME}
                  previewImgClassName={IMPORT_AVATAR_PREVIEW_IMAGE_CLASSNAME}
                  upload={
                    <ImageUpload
                      image="avatar_url"
                      setAvatar={setUpdateAvatarUrl}
                      setPublicId={setUpdatePublicIdAvatar}
                    />
                  }
                  deleteButton={
                    <Button
                      onClick={() => {
                        handleDelete(publicIdAvatar);
                        setUpdateAvatarUrl("");
                        setUpdatePublicIdAvatar("");
                      }}
                      color="red"
                      className={IMPORT_AVATAR_DELETE_BUTTON_CLASSNAME}
                    >
                      Xóa ảnh đại diện
                    </Button>
                  }
                />

                <div className={IMPORT_FORM_GRID_CLASSNAME}>
                  <ImageSlot
                    value={updateSlider1}
                    imageKey="slider_url_1"
                    caption="Hình 1"
                    previewSrc={updateSlider1}
                    previewWrapClassName={IMPORT_SLIDER_PREVIEW_CLASSNAME}
                    previewImgClassName={IMPORT_SLIDER_PREVIEW_IMAGE_CLASSNAME}
                    upload={
                      <ImageUpload
                        image="slider_url_1"
                        setAvatar={setUpdateSlider1}
                        setPublicId={setUpdatePublicIdSlider1}
                      />
                    }
                    deleteButton={
                      <Button
                        onClick={() => {
                          handleDelete(updatePublicIdSlider1);
                          setUpdateSlider1("");
                          setUpdatePublicIdSlider1("");
                        }}
                        color="red"
                        className={IMPORT_SLIDER_DELETE_BUTTON_CLASSNAME}
                      >
                        Xóa ảnh 1
                      </Button>
                    }
                  />

                  <ImageSlot
                    value={updateSlider2}
                    imageKey="slider_url_2"
                    caption="Hình 2"
                    previewSrc={updateSlider2}
                    previewWrapClassName={IMPORT_SLIDER_PREVIEW_CLASSNAME}
                    previewImgClassName={IMPORT_SLIDER_PREVIEW_IMAGE_CLASSNAME}
                    upload={
                      <ImageUpload
                        image="slider_url_2"
                        setAvatar={setUpdateSlider2}
                        setPublicId={setUpdatePublicIdSlider2}
                      />
                    }
                    deleteButton={
                      <Button
                        onClick={() => {
                          handleDelete(updatePublicIdSlider2);
                          setUpdateSlider2("");
                          setUpdatePublicIdSlider2("");
                        }}
                        color="red"
                        className={IMPORT_SLIDER_DELETE_BUTTON_CLASSNAME}
                      >
                        Xóa ảnh 2
                      </Button>
                    }
                  />

                  <ImageSlot
                    value={updateSlider3}
                    imageKey="slider_url_3"
                    caption="Hình 3"
                    previewSrc={updateSlider3}
                    previewWrapClassName={IMPORT_SLIDER_PREVIEW_CLASSNAME}
                    previewImgClassName={IMPORT_SLIDER_PREVIEW_IMAGE_CLASSNAME}
                    upload={
                      <ImageUpload
                        image="slider_url_3"
                        setAvatar={setUpdateSlider3}
                        setPublicId={setUpdatePublicIdSlider3}
                      />
                    }
                    deleteButton={
                      <Button
                        onClick={() => {
                          handleDelete(updatePublicIdSlider3);
                          setUpdateSlider3("");
                          setUpdatePublicIdSlider3("");
                        }}
                        color="red"
                        className={IMPORT_SLIDER_DELETE_BUTTON_CLASSNAME}
                      >
                        Xóa ảnh 3
                      </Button>
                    }
                  />

                  <ImageSlot
                    value={updateSlider4}
                    imageKey="slider_url_4"
                    caption="Hình 4"
                    previewSrc={updateSlider4}
                    previewWrapClassName={IMPORT_SLIDER_PREVIEW_CLASSNAME}
                    previewImgClassName={IMPORT_SLIDER_PREVIEW_IMAGE_CLASSNAME}
                    upload={
                      <ImageUpload
                        image="slider_url_4"
                        setAvatar={setUpdateSlider4}
                        setPublicId={setUpdatePublicIdSlider4}
                      />
                    }
                    deleteButton={
                      <Button
                        onClick={() => {
                          handleDelete(updatePublicIdSlider4);
                          setUpdateSlider4("");
                          setUpdatePublicIdSlider4("");
                        }}
                        color="red"
                        className={IMPORT_SLIDER_DELETE_BUTTON_CLASSNAME}
                      >
                        Xóa ảnh 4
                      </Button>
                    }
                  />
                </div>
              </div>
              <div className={IMPORT_FORM_GRID_CLASSNAME}>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Sản phẩm: </Typography>

                  <FormControl fullWidth size="small">
                    <Select
                      value={
                        importedProducts.object.find((row) => row.id === selectedId)?.product_id.id
                      }
                    >
                      {products &&
                        products.object.length > 0 &&
                        products.object.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Mã màu: </Typography>
                  <TextField
                    size="small"
                    type="color"
                    value={updateColorCode}
                    pattern="#[a-fA-F0-9]{6}"
                    placeholder="#000000"
                    onChange={(e) => setUpdateColorCode(e.target.value)}
                  />
                </div>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Màu sắc: </Typography>
                  <TextField
                    size="small"
                    value={updateColorName}
                    placeholder="Đen"
                    onChange={(e) => setUpdateColorName(e.target.value)}
                  />
                </div>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Kích thước: </Typography>
                  <TextField
                    size="small"
                    value={updateSize}
                    placeholder="Đen"
                    onChange={(e) => setUpdateSize(e.target.value)}
                  />
                </div>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Chiều cao </Typography>

                  <OutlinedInput
                    size="small"
                    value={updateHeight}
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                    onChange={(e) => setUpdateHeight(clampRange(e.target.value, 0, 300))}
                  />
                </div>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Cân nặng: </Typography>
                  <OutlinedInput
                    size="small"
                    value={updateWeight}
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                    onChange={(e) => setUpdateWeight(clampRange(e.target.value, 0, 150))}
                  />
                </div>

                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Chất liệu: </Typography>
                  <OutlinedInput
                    size="small"
                    value={updateMaterial}
                    id="outlined-adornment-weight"
                    onChange={(e) => setUpdateMaterial(e.target.value)}
                  />
                </div>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
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
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Số lượng: </Typography>
                  <OutlinedInput
                    size="small"
                    value={updateImportNumber}
                    onChange={(e) => setUpdateImportNumber(clampFloor(e.target.value, 1))}
                  />
                </div>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Giá nhập: </Typography>
                  <OutlinedInput
                    size="small"
                    value={updateImportPrice}
                    endAdornment={<InputAdornment position="end">đ</InputAdornment>}
                    onChange={(e) => setUpdateImportPrice(clampFloor(e.target.value, 1000))}
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
        <div className={IMPORT_ACTIONS_CLASSNAME}>
          <Button
            className={IMPORT_ACTION_BUTTON_CLASSNAME}
            color="gray"
            variant="outlined"
            onClick={handleNewOpen}
          >
            Nhập mới
          </Button>
          <Button
            className={IMPORT_ACTION_BUTTON_CLASSNAME}
            color="gray"
            variant="outlined"
            onClick={handleOldOpen}
            disabled={importedProducts ? importedProducts.object.length === 0 : true}
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
        <DialogTitle className={IMPORT_DIALOG_HEADER_CLASSNAME}>
          <Typography variant="h4">Nhập sản phẩm mới</Typography>
          <IconButton className="border-none" variant="outlined" onClick={handleNewClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Container>
            <div className={IMPORT_FORM_GRID_CLASSNAME}>
              <div className={IMPORT_UPLOAD_STACK_CLASSNAME}>
                <ImageSlot
                  value={avatarUrl}
                  imageKey="avatar_url"
                  caption="Hình đại diện"
                  isAvatar
                  previewSrc={avatarUrl}
                  previewWrapClassName={IMPORT_AVATAR_PREVIEW_CLASSNAME}
                  previewImgClassName={IMPORT_AVATAR_PREVIEW_IMAGE_CLASSNAME}
                  upload={
                    <ImageUpload
                      image="avatar_url"
                      setAvatar={setAvatarUrl}
                      setPublicId={setPublicIdAvatar}
                    />
                  }
                  deleteButton={
                    <Button
                      onClick={() => {
                        handleDelete(publicIdAvatar);
                        setAvatarUrl("");
                        setPublicIdAvatar("");
                      }}
                      color="red"
                      className={IMPORT_AVATAR_DELETE_BUTTON_CLASSNAME}
                    >
                      Xóa ảnh đại diện
                    </Button>
                  }
                />

                <div className={IMPORT_FORM_GRID_CLASSNAME}>
                  <ImageSlot
                    value={slider1}
                    imageKey="slider_url_1"
                    caption="Hình 1"
                    previewSrc={slider1}
                    previewWrapClassName={IMPORT_SLIDER_PREVIEW_CLASSNAME}
                    previewImgClassName={IMPORT_SLIDER_PREVIEW_IMAGE_CLASSNAME}
                    upload={
                      <ImageUpload
                        image="slider_url_1"
                        setAvatar={setSlider1}
                        setPublicId={setPublicIdSlider1}
                      />
                    }
                    deleteButton={
                      <Button
                        onClick={() => {
                          handleDelete(publicIdSlider1);
                          setSlider1("");
                          setPublicIdSlider1("");
                        }}
                        color="red"
                        className={IMPORT_SLIDER_DELETE_BUTTON_CLASSNAME}
                      >
                        Xóa ảnh 1
                      </Button>
                    }
                  />

                  <ImageSlot
                    value={slider2}
                    imageKey="slider_url_2"
                    caption="Hình 2"
                    previewSrc={slider2}
                    previewWrapClassName={IMPORT_SLIDER_PREVIEW_CLASSNAME}
                    previewImgClassName={IMPORT_SLIDER_PREVIEW_IMAGE_CLASSNAME}
                    upload={
                      <ImageUpload
                        image="slider_url_2"
                        setAvatar={setSlider2}
                        setPublicId={setPublicIdSlider2}
                      />
                    }
                    deleteButton={
                      <Button
                        onClick={() => {
                          handleDelete(publicIdSlider2);
                          setSlider2("");
                          setPublicIdSlider2("");
                        }}
                        color="red"
                        className={IMPORT_SLIDER_DELETE_BUTTON_CLASSNAME}
                      >
                        Xóa ảnh 2
                      </Button>
                    }
                  />

                  <ImageSlot
                    value={slider3}
                    imageKey="slider_url_3"
                    caption="Hình 3"
                    previewSrc={slider3}
                    previewWrapClassName={IMPORT_SLIDER_PREVIEW_CLASSNAME}
                    previewImgClassName={IMPORT_SLIDER_PREVIEW_IMAGE_CLASSNAME}
                    upload={
                      <ImageUpload
                        image="slider_url_3"
                        setAvatar={setSlider3}
                        setPublicId={setPublicIdSlider3}
                      />
                    }
                    deleteButton={
                      <Button
                        onClick={() => {
                          handleDelete(publicIdSlider3);
                          setSlider3("");
                          setPublicIdSlider3("");
                        }}
                        color="red"
                        className={IMPORT_SLIDER_DELETE_BUTTON_CLASSNAME}
                      >
                        Xóa ảnh 3
                      </Button>
                    }
                  />

                  <ImageSlot
                    value={slider4}
                    imageKey="slider_url_4"
                    caption="Hình 4"
                    previewSrc={slider4}
                    previewWrapClassName={IMPORT_SLIDER_PREVIEW_FULL_CLASSNAME}
                    previewImgClassName={IMPORT_SLIDER_PREVIEW_IMAGE_CLASSNAME}
                    upload={
                      <ImageUpload
                        image="slider_url_4"
                        setAvatar={setSlider4}
                        setPublicId={setPublicIdSlider4}
                      />
                    }
                    deleteButton={
                      <Button
                        onClick={() => {
                          handleDelete(publicIdSlider4);
                          setSlider4("");
                          setPublicIdSlider4("");
                        }}
                        color="red"
                        className={IMPORT_SLIDER_DELETE_BUTTON_CLASSNAME}
                      >
                        Xóa ảnh 4
                      </Button>
                    }
                  />
                </div>
              </div>
              <div className={IMPORT_FORM_GRID_CLASSNAME}>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
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
                        products.object.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Mã màu: </Typography>
                  <TextField
                    size="small"
                    type="color"
                    value={colorCode}
                    pattern="#[a-fA-F0-9]{6}"
                    placeholder="#000000"
                    onChange={(e) => setColorCode(e.target.value)}
                  />
                </div>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Màu sắc: </Typography>
                  <TextField
                    type="text"
                    size="small"
                    value={colorName}
                    placeholder="Đen"
                    onChange={(e) => setColorName(e.target.value)}
                  />
                </div>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Kích thước: </Typography>
                  <TextField
                    size="small"
                    type="text"
                    value={size}
                    placeholder="S,M,L,XL,..."
                    onChange={(e) => setSize(e.target.value)}
                  />
                </div>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Chiều cao </Typography>
                  <OutlinedInput
                    size="small"
                    type="text"
                    value={height}
                    placeholder="170"
                    endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                    onChange={(e) => setHeight(clampRange(e.target.value, 0, 300))}
                  />
                </div>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Cân nặng </Typography>
                  <OutlinedInput
                    size="small"
                    type="text"
                    value={weight}
                    placeholder="80"
                    endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                    onChange={(e) => setWeight(clampRange(e.target.value, 0, 150))}
                  />
                </div>

                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Chất liệu: </Typography>
                  <TextField
                    size="small"
                    value={material}
                    placeholder="Cotton"
                    onChange={(e) => setMaterial(e.target.value)}
                  />
                </div>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
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
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Số lượng: </Typography>
                  <TextField
                    size="small"
                    value={importNumber}
                    placeholder="Cotton"
                    onChange={(e) => setImportNumber(clampFloor(e.target.value, 1))}
                  />
                </div>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Giá nhập: </Typography>
                  <OutlinedInput
                    size="small"
                    value={importPrice}
                    placeholder="1000"
                    endAdornment={<InputAdornment position="end">đ</InputAdornment>}
                    onChange={(e) => setImportPrice(clampFloor(e.target.value, 1000))}
                  />
                </div>
              </div>
            </div>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button variant="gradient" color="green" onClick={handleAddSubmit} loading={isAdded}>
            {!isAdded && <span>Xác nhận</span>}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={oldOpen} onClose={handleOldClose} maxWidth="xl">
        <DialogTitle className={IMPORT_DIALOG_HEADER_CLASSNAME}>
          <Typography variant="h4">Nhập sản phẩm có sẵn</Typography>
          <IconButton className="border-none" variant="outlined" onClick={handleOldClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Container>
            <div className={IMPORT_FORM_GRID_CLASSNAME}>
              <div className={IMPORT_UPLOAD_STACK_CLASSNAME}>
                <ImageSlot
                  value={avatarUrl}
                  imageKey="avatar_url"
                  caption="Hình đại diện"
                  isAvatar
                  previewSrc={oldVariant?.image_url}
                  previewWrapClassName={IMPORT_AVATAR_PREVIEW_CLASSNAME}
                  previewImgClassName={IMPORT_AVATAR_PREVIEW_IMAGE_FULL_CLASSNAME}
                />

                <div className={IMPORT_FORM_GRID_CLASSNAME}>
                  <ImageSlot
                    value={slider1}
                    imageKey="slider_url_1"
                    caption="Hình 1"
                    previewSrc={oldVariant?.slider_url_1}
                    previewWrapClassName={IMPORT_SLIDER_PREVIEW_CLASSNAME}
                    previewImgClassName={IMPORT_SLIDER_PREVIEW_IMAGE_TALL_CLASSNAME}
                  />

                  <ImageSlot
                    value={slider2}
                    imageKey="slider_url_2"
                    caption="Hình 2"
                    previewSrc={oldVariant?.slider_url_2}
                    previewWrapClassName={IMPORT_SLIDER_PREVIEW_CLASSNAME}
                    previewImgClassName={IMPORT_SLIDER_PREVIEW_IMAGE_TALL_CLASSNAME}
                  />
                  <ImageSlot
                    value={slider3}
                    imageKey="slider_url_3"
                    caption="Hình 3"
                    previewSrc={oldVariant?.slider_url_3}
                    previewWrapClassName={IMPORT_SLIDER_PREVIEW_CLASSNAME}
                    previewImgClassName={IMPORT_SLIDER_PREVIEW_IMAGE_TALL_CLASSNAME}
                  />
                  <ImageSlot
                    value={slider4}
                    imageKey="slider_url_4"
                    caption="Hình 4"
                    previewSrc={oldVariant?.slider_url_4}
                    previewWrapClassName={IMPORT_SLIDER_PREVIEW_CLASSNAME}
                    previewImgClassName={IMPORT_SLIDER_PREVIEW_IMAGE_TALL_CLASSNAME}
                  />
                </div>
              </div>
              <div className={IMPORT_FORM_GRID_CLASSNAME}>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Sản phẩm: </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                      size="small"
                    >
                      {products &&
                        products.object.length > 0 &&
                        products.object.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Mã màu: </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={colorCode}
                      onChange={(e) => setColorCode(e.target.value)}
                      size="small"
                    >
                      {importedProducts &&
                        importedProducts.object.length > 0 &&
                        importedProducts.object.map((item) => (
                          <MenuItem key={item.color_id.color_code} value={item.color_id.color_code}>
                            {item.color_id.color_code}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Màu sắc: </Typography>
                  <TextField
                    size="small"
                    disabled
                    value={
                      importedProducts.object?.find(
                        (item) => item.product_id.id === product && item.color_id.id === colorCode
                      )?.color_id.color_name
                    }
                    placeholder="Trắng"
                  />
                </div>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
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
                    <Select value={size} onChange={(e) => setSize(e.target.value)} size="small">
                      {importedProducts &&
                        importedProducts.object.length > 0 &&
                        importedProducts.object.map((item) => (
                          <MenuItem key={item.size_id.size} value={item.size_id.size}>
                            {item.size_id.size}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Chiều cao </Typography>
                  <OutlinedInput
                    size="small"
                    disabled
                    endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                    value={
                      importedProducts.object?.find(
                        (item) => item.product_id.id === product && item.size_id.size === size
                      )?.size_id.height
                    }
                    placeholder="170cm"
                  />
                </div>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Cân nặng </Typography>
                  <OutlinedInput
                    size="small"
                    disabled
                    endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                    value={
                      importedProducts.object?.find(
                        (item) => item.product_id.id === product && item.size_id.id === size
                      )?.size_id.weight
                    }
                    placeholder="170cm"
                  />
                </div>

                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Chất liệu: </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      size="small"
                    >
                      {importedProducts &&
                        importedProducts.object.length > 0 &&
                        importedProducts.object.map((item) => (
                          <MenuItem key={item.material_id.name} value={item.material_id.name}>
                            {item.material_id.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
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
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Số lượng: </Typography>

                  <TextField
                    size="small"
                    value={importNumber}
                    placeholder="1"
                    onChange={(e) => setImportNumber(clampFloor(e.target.value, 1))}
                  />
                </div>
                <div className={IMPORT_FORM_FIELD_CLASSNAME}>
                  <Typography variant="h6">Giá nhập: </Typography>
                  <OutlinedInput
                    size="small"
                    value={importPrice}
                    placeholder="1000"
                    endAdornment={<InputAdornment position="end">đ</InputAdornment>}
                    onChange={(e) => setImportPrice(clampFloor(e.target.value, 1000))}
                  />
                </div>
              </div>
            </div>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button variant="gradient" color="green" onClick={handleAddSubmit} loading={isAdded}>
            {!isAdded && <span>Xác nhận</span>}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ImportProduct;
