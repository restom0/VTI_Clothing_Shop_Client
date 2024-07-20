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
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import useOpen from "../../hooks/useOpen";
import AdminLayout from "../../layouts/Admin/AdminLayout";
import { brand } from "../../constants/table_head";
import useFetch from "../../hooks/useFetch";
import { useAddBrandMutation, useGetBrandsQuery } from "../../apis/Brand";
import { useSelector } from "react-redux";
import { Toast } from "../../configs/SweetAlert2";
const TABLE_ROWS = [
  {
    name: "001",
    role: "USER",
  },
];
const Brand = () => {
  const { data: brands, error, isLoading } = useGetBrandsQuery();
  const selectedId = useSelector((state) => state.selectedId.value);
  const [addOpen, setAddOpen] = React.useState(false);
  const handleAddOpen = () => setAddOpen(!addOpen);
  const [name, setName] = React.useState(
    brands ? (brands.object ? brands.object[selectedId].name : "") : ""
  );
  const [description, setDescription] = React.useState(
    brands ? (brands.object ? brands.object[selectedId].description : "") : ""
  );
  const [addBrand, { isLoading: isAdded, error: AddError }] =
    useAddBrandMutation();

  const handleAddSubmit = async () => {
    try {
      await addBrand({ name, description })
        .unwrap()
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Thêm thương hiệu thành công",
          });
          handleAddOpen();
          setName("");
          setDescription("");
        });
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Thêm thương hiệu thất bại",
      });
    }
  };
  if (isLoading) return <div>Loading...</div>;
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
        headerDetail="Chi tiết thương hiệu"
        bodyDetail={
          <Container>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <Typography variant="h5" color="blue-gray" className="font-bold">
                Tên thương hiệu:
              </Typography>
              <Typography variant="medium" className="my-auto">
                {brands
                  ? brands.object
                    ? brands.object[selectedId].name
                    : ""
                  : ""}
              </Typography>
            </div>
            <Typography variant="h5" color="blue-gray" className="font-bold">
              Mô tả:
            </Typography>
            <Typography variant="medium">
              {brands
                ? brands.object
                  ? brands.object[selectedId].description
                  : ""
                : ""}
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
                  brands
                    ? brands.object
                      ? brands.object[selectedId].name
                      : ""
                    : ""
                }
                placeholder="Nike"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => setName(e.target.value)}
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
                brands
                  ? brands.object
                    ? brands.object[selectedId].name
                    : ""
                  : ""
              }
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập văn bản dưới 255 kí tự"
            />
          </Container>
        }
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
                Tên thương hiệu:
              </Typography>
              <Input
                placeholder="Nike"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
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
            />
          </Container>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="green"
            onClick={handleAddSubmit}
            disabled={isAdded}
          >
            <span>Thêm mới</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Brand;
