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
} from "@material-tailwind/react";
import { Container, Rating } from "@mui/material";
import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import Pagination from "../../layouts/Pagination";
import { importproduct } from "../../constants/table_head";
import AdminPagination from "../shared/admin/AdminPagination";
import Table from "../../layouts/Table";
import SettingButton from "../shared/admin/SettingButton";
import useOpen from "../../hooks/useOpen";
import AdminLayout from "../../layouts/Admin/AdminLayout";
const TABS = [
  {
    label: "Tất cả",
    value: "ALL",
  },
  {
    label: "Còn hàng",
    value: "AVAILABLE",
  },
  {
    label: "Hết hàng",
    value: "OUT_OF_STOCK",
  },
];
const TABLE_ROWS = [
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
];
const ImportProduct = () => {
  const {
    detailOpen,
    updateOpen,
    deleteOpen,
    handleDetailOpen,
    handleUpdateOpen,
    handleDeleteOpen,
  } = useOpen();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const [active, setActive] = useState(1);
  return (
    <>
      <AdminLayout
        name="Nhập hàng"
        TABLE_HEAD={importproduct}
        TABLE_ROWS={TABLE_ROWS}
        active={active}
        setActive={setActive}
        handleUpdateOpen={handleUpdateOpen}
        handleDeleteOpen={handleDeleteOpen}
        updateContent="Chỉnh sửa"
        deleteContent="Xóa"
        size="xl"
        headerDetail={"Chi tiết mã hàng #" + "001"}
        bodyDetail={
          <Container>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid grid-cols-2 col-span-2 gap-4">
                <div className=" my-auto mx-auto">
                  <figure>
                    <img
                      src="https://media3.coolmate.me/cdn-cgi/image/format=auto/uploads/April2024/QKK.EC.xamden4.jpg"
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
                <div className="grid grid-cols-2 gap-4">
                  <div className=" my-auto mx-auto">
                    <figure>
                      <img
                        src="https://media3.coolmate.me/cdn-cgi/image/format=auto/uploads/April2024/QKK.EC.xamden4.jpg"
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
                        src="https://media3.coolmate.me/cdn-cgi/image/format=auto/uploads/April2024/QKK.EC.xamden4.jpg"
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
                        src="https://media3.coolmate.me/cdn-cgi/image/format=auto/uploads/April2024/QKK.EC.xamden4.jpg"
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
                        src="https://media3.coolmate.me/cdn-cgi/image/format=auto/uploads/April2024/QKK.EC.xamden4.jpg"
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
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <Typography variant="h6">Sản phẩm: </Typography>
                  <Typography variant="small">Áo thun nam</Typography>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <Typography variant="h6">Mã màu: </Typography>
                  <Typography variant="small">#000000</Typography>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <Typography variant="h6">Màu sắc: </Typography>
                  <Typography variant="small">Trắng</Typography>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <Typography variant="h6">Kích thước: </Typography>
                  <Typography variant="small">XL</Typography>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <Typography variant="h6">Chất liệu: </Typography>
                  <Typography variant="small">Cotton</Typography>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <Typography variant="h6">Số lượng: </Typography>
                  <Typography variant="small">10</Typography>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <Typography variant="h6">Giá nhập </Typography>
                  <Typography variant="small">
                    {Number(1000000).toLocaleString("en-US")}đ
                  </Typography>
                </div>
              </div>
            </div>
          </Container>
        }
        sizeUpdate="xl"
        headerUpdate={"Chỉnh sửa mã hàng #" + "001"}
        bodyUpdate={
          <Container>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid grid-cols-2 col-span-2 gap-4">
                <div className=" my-auto mx-auto">
                  <figure>
                    <img
                      src="https://media3.coolmate.me/cdn-cgi/image/format=auto/uploads/April2024/QKK.EC.xamden4.jpg"
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
                <div className="grid grid-cols-2 gap-4">
                  <div className=" my-auto mx-auto">
                    <figure>
                      <img
                        src="https://media3.coolmate.me/cdn-cgi/image/format=auto/uploads/April2024/QKK.EC.xamden4.jpg"
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
                        src="https://media3.coolmate.me/cdn-cgi/image/format=auto/uploads/April2024/QKK.EC.xamden4.jpg"
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
                        src="https://media3.coolmate.me/cdn-cgi/image/format=auto/uploads/April2024/QKK.EC.xamden4.jpg"
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
                        src="https://media3.coolmate.me/cdn-cgi/image/format=auto/uploads/April2024/QKK.EC.xamden4.jpg"
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
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <Typography variant="h6">Sản phẩm: </Typography>
                  {/* <Typography variant="small">Áo thun nam</Typography> */}
                  <div className="w-[200px]">
                    <Select
                      className=" !border-blue-gray-200 focus:!border-black"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    >
                      <Option value="Áo thun nam">Áo thun nam</Option>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <Typography variant="h6">Mã màu: </Typography>
                  <div className="w-[200px]">
                    <Input
                      value={"#000000"}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <Typography variant="h6">Màu sắc: </Typography>
                  <div className="w-[200px]">
                    <Input
                      value={"Kem"}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <Typography variant="h6">Kích thước: </Typography>
                  <div className="w-[200px]">
                    <Input
                      value={"XL"}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <Typography variant="h6">Chất liệu: </Typography>
                  <div className="w-[200px]">
                    <Input
                      value={"Cotton"}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <Typography variant="h6">Số lượng: </Typography>
                  <div className="w-[200px]">
                    <Input
                      value={10}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <Typography variant="h6">Giá nhập: </Typography>
                  <div className="w-[200px]">
                    <Input
                      value={Number(1000000).toLocaleString("en-US") + " đ"}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        }
      >
        <div className="flex items-center justify-between gap-4">
          <Button
            className=" !border-gray-300 w-full"
            color="gray"
            variant="outlined"
            onClick={handleOpen}
          >
            Thêm mới
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
      <Dialog open={open} handler={handleOpen} size="xl">
        <DialogHeader>Nhập sản phẩm mới</DialogHeader>
        <DialogBody>
          <Container>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid grid-cols-2 col-span-2 gap-4">
                <div className="h-64 w-64 flex border-2 my-auto mx-auto border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                  <figure className="my-auto mx-auto">
                    <svg
                      className="w-8 h-8 mb-4 mx-auto my-auto text-gray-500 dark:text-gray-400"
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
                    <Typography
                      as="caption"
                      variant="small"
                      className="mt-2 text-center font-normal"
                    >
                      Hình đại diện
                    </Typography>
                  </figure>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 w-32 flex border-2 my-auto mx-auto border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                    <figure className="my-auto mx-auto">
                      <svg
                        className="w-8 h-8 mb-4 mx-auto my-auto text-gray-500 dark:text-gray-400"
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
                      <Typography
                        as="caption"
                        variant="small"
                        className="mt-2 text-center font-normal"
                      >
                        Hình 1
                      </Typography>
                    </figure>
                  </div>
                  <div className="h-32 w-32 flex border-2 my-auto mx-auto border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                    <figure className="my-auto mx-auto">
                      <svg
                        className="w-8 h-8 mb-4 mx-auto my-auto text-gray-500 dark:text-gray-400"
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
                      <Typography
                        as="caption"
                        variant="small"
                        className="mt-2 text-center font-normal"
                      >
                        Hình 2
                      </Typography>
                    </figure>
                  </div>
                  <div className="h-32 w-32 flex border-2 my-auto mx-auto border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                    <figure className="my-auto mx-auto">
                      <svg
                        className="w-8 h-8 mb-4 mx-auto my-auto text-gray-500 dark:text-gray-400"
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
                      <Typography
                        as="caption"
                        variant="small"
                        className="mt-2 text-center font-normal"
                      >
                        Hình 3
                      </Typography>
                    </figure>
                  </div>
                  <div className="h-32 w-32 flex border-2 my-auto mx-auto border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                    <figure className="my-auto mx-auto">
                      <svg
                        className="w-8 h-8 mb-4 mx-auto my-auto text-gray-500 dark:text-gray-400"
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
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <Typography variant="h6">Sản phẩm: </Typography>
                  {/* <Typography variant="small">Áo thun nam</Typography> */}
                  <div className="w-[200px]">
                    <Select
                      className=" !border-blue-gray-200 focus:!border-black"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    >
                      <Option value="Áo thun nam">Áo thun nam</Option>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <Typography variant="h6">Mã màu: </Typography>
                  <div className="w-[200px]">
                    <Input
                      value={"#000000"}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <Typography variant="h6">Màu sắc: </Typography>
                  <div className="w-[200px]">
                    <Input
                      value={"Kem"}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <Typography variant="h6">Kích thước: </Typography>
                  <div className="w-[200px]">
                    <Input
                      value={"XL"}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <Typography variant="h6">Chất liệu: </Typography>
                  <div className="w-[200px]">
                    <Input
                      value={"Cotton"}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <Typography variant="h6">Số lượng: </Typography>
                  <div className="w-[200px]">
                    <Input
                      value={10}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <Typography variant="h6">Giá nhập: </Typography>
                  <div className="w-[200px]">
                    <Input
                      value={Number(1000000).toLocaleString("en-US") + " đ"}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
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
      </Dialog>
    </>
  );
};

export default ImportProduct;
