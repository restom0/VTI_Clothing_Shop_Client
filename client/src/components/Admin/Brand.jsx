import {
  Button,
  Card,
  CardBody,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Textarea,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { Container } from "@mui/material";
import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import useOpen from "../../hooks/useOpen";
import AdminLayout from "../../layouts/Admin/AdminLayout";
import { brand } from "../../constants/table_head";
import useFetch from "../../hooks/useFetch";
import {
  useAddBrandMutation,
  useDeleteBrandMutation,
  useGetBrandsQuery,
  useUpdateBrandMutation,
} from "../../apis/BrandApi";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "../../configs/SweetAlert2";
import { useNavigate } from "react-router-dom";
import { resetSelectedId } from "../../features/slices/selectIdSlice";
import Loading from "../shared/Loading";
import {
  resetDescription,
  setDescription,
} from "../../features/slices/descriptionSlice";
import { resetName, setName } from "../../features/slices/nameSlice";
const Brand = () => {
  const navigate = useNavigate();
  const { data: brands, error, isLoading } = useGetBrandsQuery();
  const selectedId = useSelector((state) => state.selectedId.value);
  const name = useSelector((state) => state.name.value);
  const description = useSelector((state) => state.description.value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetSelectedId());
    dispatch(resetName());
    dispatch(resetDescription());
  }, [dispatch]);

  useEffect(() => {
    if (selectedId === -1) {
      dispatch(resetName());
      dispatch(resetDescription());
    }
  }, [selectedId, dispatch]);

  const [addOpen, setAddOpen] = React.useState(false);
  const handleAddOpen = () => setAddOpen(!addOpen);

  const [addBrand, { isLoading: isAdded, error: AddError }] =
    useAddBrandMutation();
  const [updateBrand, { isLoading: isUpdated, error: updateError }] =
    useUpdateBrandMutation();
  const handleAddSubmit = async () => {
    try {
      await addBrand({ name, description })
        .unwrap()
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Thêm thương hiệu thành công",
          }).then(() => {
            handleAddOpen();
            dispatch(resetName());
            dispatch(resetDescription());
          });
        });
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
    const message = await updateBrand({
      id: brands.object[selectedId].id,
      name: name === "" ? brands.object[selectedId].name : name,
      description:
        description === ""
          ? brands.object[selectedId].description
          : description,
    });
    return message;
  };
  const [deleteBrand, { isLoading: isDeleted, error: deleteError }] =
    useDeleteBrandMutation();
  const handleDeleteSubmit = async () => {
    try {
      const message = await deleteBrand(brands.object[selectedId].id);
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
  if (isLoading) return <Loading />;
  if (error) return <div>An error occurred: {error.message}</div>;
  return (
    <>
      <AdminLayout
        name="Danh sách thương hiệu"
        TABLE_HEAD={brand}
        TABLE_ROWS={brands.object ? brands.object : []}
        updateContent="Chỉnh sửa"
        deleteContent="Xóa"
        size="md"
        headerDetail={"Chi tiết thương hiệu  #" + selectedId}
        bodyDetail={
          <Container>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <Typography variant="h5" color="blue-gray" className="font-bold">
                Tên thương hiệu:
              </Typography>
              <Typography variant="medium" className="my-auto">
                {selectedId === -1
                  ? ""
                  : brands.object.find((row) => row.id === selectedId)?.name ||
                    ""}
              </Typography>
            </div>
            <Typography variant="h5" color="blue-gray" className="font-bold">
              Mô tả:
            </Typography>
            <Typography variant="medium">
              {selectedId === -1
                ? ""
                : brands.object.find((row) => row.id === selectedId)
                    ?.description || ""}
            </Typography>
          </Container>
        }
        headerUpdate="Chỉnh sửa thương hiệu"
        bodyUpdate={
          <Container>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-bold my-auto"
              >
                Tên thương hiệu:
              </Typography>
              <Input
                value={
                  selectedId === -1
                    ? ""
                    : name === ""
                    ? brands.object.find((row) => row.id === selectedId)
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
                  ? brands.object.find((row) => row.id === selectedId)
                      ?.description || ""
                  : description
              }
              onChange={(e) => dispatch(setDescription(e.target.value))}
              placeholder="Nhập văn bản dưới 255 kí tự"
            />
          </Container>
        }
        updateSubmit={updateSubmit}
        handleDeleteSubmit={handleDeleteSubmit}
      >
        <div className="flex items-center justify-between gap-4">
          <Button
            className=" !border-gray-300"
            color="gray"
            variant="outlined"
            onClick={handleAddOpen}
            loading={isAdded}
          >
            {isAdded ? "Đang thêm..." : "Thêm mới"}
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
                Tên thương hiệu:
              </Typography>
              <Input
                placeholder="Nike"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => dispatch(setName(e.target.value))}
              />
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
              onChange={(e) => dispatch(setDescription(e.target.value))}
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
    </>
  );
};

export default Brand;
