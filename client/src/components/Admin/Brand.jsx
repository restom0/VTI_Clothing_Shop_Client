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
const TABLE_ROWS = [
  {
    name: "001",
    role: "USER",
  },
];
const Brand = () => {
  const {
    detailOpen,
    updateOpen,
    deleteOpen,
    handleDetailOpen,
    handleUpdateOpen,
    handleDeleteOpen,
  } = useOpen();
  const [active, setActive] = React.useState(1);
  const [addOpen, setAddOpen] = React.useState(false);
  const handleAddOpen = () => setAddOpen(!addOpen);
  return (
    <>
      <AdminLayout
        name="Danh sách thương hiệu"
        TABLE_HEAD={brand}
        TABLE_ROWS={TABLE_ROWS}
        active={active}
        setActive={setActive}
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
                Nike
              </Typography>
            </div>
            <Typography variant="h5" color="blue-gray" className="font-bold">
              Mô tả:
            </Typography>
            <Typography variant="medium">
              Thương hiệu thể thao hàng đầu thế giới
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
                value={"Nike"}
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
              value={"Thương hiệu thể thao hàng đầu thế giới"}
              placeholder="Thương hiệu thể thao hàng đầu thế giới"
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
            onClick={handleDetailOpen}
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
          <Button variant="gradient" color="green" onClick={handleAddOpen}>
            <span>Cập nhật</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Brand;
