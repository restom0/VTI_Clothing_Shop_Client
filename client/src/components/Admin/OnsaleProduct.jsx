import React from "react";
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
} from "@material-tailwind/react";
import { Container, Divider, Pagination, Rating } from "@mui/material";
import useOpen from "../../hooks/useOpen";
import { changePriceList, onsaleproduct } from "../../constants/table_head";
import AdminLayout from "../../layouts/Admin/AdminLayout";
import TableHeader from "../shared/TableHeader";
import CloseIcon from "@mui/icons-material/Close";

const TABLE_ROWS = [
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
];
const OnsaleProduct = () => {
  const [active, setActive] = React.useState(1);
  const [subActive, setSubActive] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const handleOpens = () => setOpens(!opens);
  const {
    detailOpen,
    handleDetailOpen,
    updateOpen,
    handleUpdateOpen,
    deleteOpen,
    handleDeleteOpen,
  } = useOpen();

  return (
    <>
      <AdminLayout
        name="Nhập giá"
        TABLE_HEAD={onsaleproduct}
        TABLE_ROWS={TABLE_ROWS}
        updateContent="Chỉnh sửa"
        deleteContent="Xóa"
        size="xl"
        headerDetail={"Chi tiết lần nhập giá #" + "001"}
        bodyDetail={
          <Container>
            <div className="grid grid-cols-3 mb-5">
              <Typography
                variant="h3"
                color="blue-gray"
                className="font-bold col-span-3 text-center mb-5"
              >
                Thông tin nhập
              </Typography>
              <div className="mx-auto">
                <div className="text-center flex items-center gap-4">
                  <Typography variant="h6" color="blue-gray">
                    Loại nhập:
                  </Typography>
                  <Typography variant="body" className="" color="blue-gray">
                    Thương hiệu
                  </Typography>
                </div>
                <div className="text-center flex items-center gap-4">
                  <Typography variant="h6" color="blue-gray">
                    Tên:
                  </Typography>
                  <Typography variant="body" className="" color="blue-gray">
                    Adidas
                  </Typography>
                </div>
              </div>
              <div className="mx-auto">
                <div className="text-center flex items-center gap-4">
                  <Typography variant="h6" color="blue-gray">
                    Giá trị gia tăng:
                  </Typography>
                  <Typography variant="body" className="" color="blue-gray">
                    30%
                  </Typography>
                </div>
                <div className="text-center flex items-center gap-4">
                  <Typography variant="h6" color="blue-gray">
                    Giảm giá:
                  </Typography>
                  <Typography variant="body" className="" color="blue-gray">
                    15%
                  </Typography>
                </div>
              </div>
              <div className="mx-auto">
                <div className="text-center flex items-center gap-4">
                  <Typography variant="h6" color="blue-gray">
                    Ngày áp dụng
                  </Typography>
                  <Typography variant="body" className="" color="blue-gray">
                    23/04/18
                  </Typography>
                </div>
                <div className="text-center flex items-center gap-4">
                  <Typography variant="h6" color="blue-gray">
                    Ngày kết thúc
                  </Typography>
                  <Typography variant="body" className="" color="blue-gray">
                    23/04/18
                  </Typography>
                </div>
              </div>
            </div>
            <Divider />
            <table className="w-full min-w-max table-auto text-left">
              <TableHeader noDelete noUpdate TABLE_HEAD={changePriceList} />
              <tbody>
                {TABLE_ROWS.slice((subActive - 1) * 6, subActive * 6).map(
                  (row, index) => (
                    <tr
                      key={index}
                      className="text-center border-b border-gray-200"
                    >
                      {Object.values(row).map((value, index) => (
                        <td key={index}>{value}</td>
                      ))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <Pagination
              page={Math.ceil(TABLE_ROWS.length / 6)}
              active={subActive}
              setActive={setSubActive}
            />
          </Container>
        }
        sizeUpdate="xl"
        headerUpdate={"Chỉnh sửa lần nhập giá #" + "001"}
        bodyUpdate={
          <Container>
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-5">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="font-bold col-span-3 text-center mb-5"
                >
                  Thông tin nhập
                </Typography>
                <div className="mx-auto">
                  <div className="text-center flex items-center justify-between gap-4 mb-5">
                    <Typography variant="h6" color="blue-gray">
                      Loại nhập:
                    </Typography>
                    <div>
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
                  <div className="text-center flex items-center justify-between gap-4 mb-5">
                    <Typography variant="h6" color="blue-gray">
                      Tên:
                    </Typography>
                    <div>
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
                </div>
                <div className="mx-auto">
                  <div className="text-center flex items-center justify-between gap-4 mb-5">
                    <Typography variant="h6" color="blue-gray">
                      Giá trị gia tăng:
                    </Typography>
                    <div>
                      <Input
                        value={"Kem"}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-center flex items-center justify-between gap-4 mb-5">
                    <Typography variant="h6" color="blue-gray">
                      Giảm giá:
                    </Typography>
                    <div>
                      <Input
                        value={"Kem"}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="mx-auto">
                  <div className="text-center flex items-center justify-between gap-4 mb-5">
                    <Typography variant="h6" color="blue-gray">
                      Ngày áp dụng
                    </Typography>
                    <div>
                      <Input
                        value={"Kem"}
                        type="date"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-center flex items-center justify-between gap-4">
                    <Typography variant="h6" color="blue-gray">
                      Ngày kết thúc
                    </Typography>
                    <div>
                      <Input
                        value={"Kem"}
                        type="date"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-7">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="font-bold text-center mb-5"
                >
                  Danh sách sản phẩm
                </Typography>
                <table className="w-full min-w-max table-auto text-left">
                  <TableHeader noDelete noUpdate TABLE_HEAD={changePriceList} />
                  <tbody>
                    {TABLE_ROWS.slice((subActive - 1) * 6, subActive * 6).map(
                      (row, index) => (
                        <tr
                          key={index}
                          className="text-center border-b border-gray-200"
                        >
                          {Object.values(row).map((value, index) => (
                            <td className="p-2" key={index}>
                              {value}
                            </td>
                          ))}
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
                <Pagination
                  page={Math.ceil(TABLE_ROWS.length / 6)}
                  active={subActive}
                  setActive={setSubActive}
                />
              </div>
            </div>
          </Container>
        }
      >
        <div className="w-8/12 flex items-center justify-between gap-8">
          <Button
            className=" !border-gray-300 w-full"
            color="gray"
            variant="outlined"
            onClick={handleOpens}
          >
            Nhập giá hàng loạt
          </Button>
          <Button
            className=" !border-gray-300 w-full"
            color="gray"
            variant="outlined"
            onClick={handleOpen}
          >
            Nhập giá sản phẩm
          </Button>
          <Input
            size="sm"
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
      <Dialog
        open={open}
        handler={handleOpen}
        size="lg"
        className="overflow-y-auto"
      >
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
          <Container>
            <div>
              <Typography
                variant="h4"
                color="blue-gray"
                className="font-bold text-center mb-5"
              >
                Thông tin nhập
              </Typography>
              <div className="mx-auto grid grid-cols-2 gap-8 mb-5">
                <div className="text-center flex items-center justify-between gap-4">
                  <Typography variant="h6" color="blue-gray">
                    Loại nhập:
                  </Typography>
                  <div>
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
                <div className="text-center flex items-center justify-between gap-4">
                  <Typography variant="h6" color="blue-gray">
                    Tên:
                  </Typography>
                  <div>
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
                <div className="text-center flex items-center justify-between gap-4">
                  <Typography variant="h6" color="blue-gray">
                    Giá trị gia tăng:
                  </Typography>
                  <div>
                    <Input
                      value={"Kem"}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>
                <div className="text-center flex items-center justify-between gap-4">
                  <Typography variant="h6" color="blue-gray">
                    Giảm giá:
                  </Typography>
                  <div>
                    <Input
                      value={"Kem"}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>
                <div className="text-center flex items-center justify-between gap-4">
                  <Typography variant="h6" color="blue-gray">
                    Ngày áp dụng
                  </Typography>
                  <div>
                    <Input
                      value={"Kem"}
                      type="date"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>
                <div className="text-center flex items-center justify-between gap-4">
                  <Typography variant="h6" color="blue-gray">
                    Ngày kết thúc
                  </Typography>
                  <div>
                    <Input
                      value={"Kem"}
                      type="date"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Divider />
            <div>
              <Typography
                variant="h4"
                color="blue-gray"
                className="font-bold text-center mt-5 mb-5"
              >
                Xem trước
              </Typography>
              <table className="w-full min-w-max table-auto text-left">
                <TableHeader noDelete noUpdate TABLE_HEAD={changePriceList} />
                <tbody>
                  {TABLE_ROWS.slice(0, 1).map((row, index) => (
                    <tr
                      key={index}
                      className="text-center border-b border-gray-200"
                    >
                      {Object.values(row).map((value, index) => (
                        <td className="p-2" key={index}>
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
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
      <Dialog open={opens} handler={handleOpens} size="xl">
        <DialogHeader className="pb-0 flex justify-between">
          <Typography variant="h4">Nhập giá hàng loạt</Typography>
          <IconButton
            className="border-none"
            variant="outlined"
            onClick={handleOpens}
          >
            <CloseIcon />
          </IconButton>
        </DialogHeader>
        <DialogBody>
          <Container>
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-5">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="font-bold col-span-3 text-center mb-5"
                >
                  Thông tin nhập
                </Typography>
                <div className="mx-auto">
                  <div className="text-center flex items-center justify-between gap-4 mb-5">
                    <Typography variant="h6" color="blue-gray">
                      Loại nhập:
                    </Typography>
                    <div>
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
                  <div className="text-center flex items-center justify-between gap-4 mb-5">
                    <Typography variant="h6" color="blue-gray">
                      Tên:
                    </Typography>
                    <div>
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
                </div>
                <div className="mx-auto">
                  <div className="text-center flex items-center justify-between gap-4 mb-5">
                    <Typography variant="h6" color="blue-gray">
                      Giá trị gia tăng:
                    </Typography>
                    <div>
                      <Input
                        value={"Kem"}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-center flex items-center justify-between gap-4 mb-5">
                    <Typography variant="h6" color="blue-gray">
                      Giảm giá:
                    </Typography>
                    <div>
                      <Input
                        value={"Kem"}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="mx-auto">
                  <div className="text-center flex items-center justify-between gap-4 mb-5">
                    <Typography variant="h6" color="blue-gray">
                      Ngày áp dụng
                    </Typography>
                    <div>
                      <Input
                        value={"Kem"}
                        type="date"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-center flex items-center justify-between gap-4">
                    <Typography variant="h6" color="blue-gray">
                      Ngày kết thúc
                    </Typography>
                    <div>
                      <Input
                        value={"Kem"}
                        type="date"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-7">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="font-bold text-center mb-5"
                >
                  Danh sách sản phẩm
                </Typography>
                <table className="w-full min-w-max table-auto text-left">
                  <TableHeader noDelete noUpdate TABLE_HEAD={changePriceList} />
                  <tbody>
                    {TABLE_ROWS.slice((subActive - 1) * 6, subActive * 6).map(
                      (row, index) => (
                        <tr
                          key={index}
                          className="text-center border-b border-gray-200"
                        >
                          {Object.values(row).map((value, index) => (
                            <td className="p-2" key={index}>
                              {value}
                            </td>
                          ))}
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
                <Pagination
                  page={Math.ceil(TABLE_ROWS.length / 6)}
                  active={subActive}
                  setActive={setSubActive}
                />
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

export default OnsaleProduct;
