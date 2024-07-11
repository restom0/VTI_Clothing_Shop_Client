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
import useOpen from "../../hooks/useOpen";
import TableHeader from "../../layouts/TableHeader";
import { brand } from "../../constants/table_head";
import SettingButton from "../shared/admin/SettingButton";
import Table from "../../layouts/Table";
import AdminLayout from "../../layouts/Admin/AdminLayout";

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
        <DialogHeader>Thêm thương hiệu</DialogHeader>
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
      {/* <Container className="mt-5">
        <div className="flex items-center justify-between mb-5">
          <Typography variant="h3" color="blue-gray" className="font-bold">
            Thương hiệu
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
          TABLE_HEAD={brand}
          TABLE_ROWS={TABLE_ROWS}
          active={active}
          setActive={setActive}
          handleDetailOpen={handleDetailOpen}
          handleUpdateOpen={handleUpdateOpen}
          handleDeleteOpen={handleDeleteOpen}
          updateContent="Chỉnh sửa"
          deleteContent="Xóa"
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

export default Brand;
