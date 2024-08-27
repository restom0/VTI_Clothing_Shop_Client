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
  CardBody,
} from "@material-tailwind/react";
import { Container, Divider, Rating, TextField } from "@mui/material";
import { useState } from "react";
import { allorder_tab } from "../../constants/tab";
import { allorder } from "../../constants/table_head";
import AdminLayout from "../../layouts/Admin/AdminLayout";
import Pagination from "../shared/Pagination";
const AllOrder = () => {
  const [tab, setTab] = useState("ALL");
  const [active, setActive] = useState(1);
  const [subactive, setSubactive] = useState(1);
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
  ];
  const TABLE_HEAD = ["STT", "Tên sản phẩm", "Số lượng", "Giá", "Tổng tiền"];
  return (
    <>
      <AdminLayout
        name="Danh sách đơn hàng"
        tablist={allorder_tab}
        TABLE_HEAD={allorder}
        TABLE_ROWS={TABLE_ROWS}
        updateContent="Chỉnh sửa"
        deleteContent="Xóa"
        noUpdate
        noDelete
        size="xl"
        headerDetail="Chi tiết đơn hàng #001"
        overflow
        bodyDetail={
          <Card>
            <CardBody>
              <div className="grid grid-cols-3 mb-5">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="font-bold"
                >
                  Thông tin liên hệ
                </Typography>
                <div className="col-span-2 grid grid-cols-3">
                  <Typography variant="h6" color="blue-gray">
                    Tên người nhận:
                  </Typography>
                  <Typography
                    variant="body"
                    className="col-span-2"
                    color="blue-gray"
                  >
                    Nguyễn Văn A
                  </Typography>
                  <Typography variant="h6" color="blue-gray">
                    Địa chỉ nhận hàng:
                  </Typography>
                  <Typography
                    variant="body"
                    className="col-span-2"
                    color="blue-gray"
                  >
                    123, Đường ABC, Quận XYZ, TP. HCM
                  </Typography>
                  <Typography variant="h6" color="blue-gray">
                    Số điện thoại người nhận:
                  </Typography>
                  <Typography
                    variant="body"
                    className="col-span-2"
                    color="blue-gray"
                  >
                    0123456789
                  </Typography>
                </div>
              </div>
              <Divider />
              <div className="grid grid-cols-3 mt-5 mb-5">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="font-bold"
                >
                  Phương thức thanh toán
                </Typography>
                <div className="col-span-2 grid grid-cols-3">
                  <Typography variant="h6" color="blue-gray">
                    Hình thức thanh toán
                  </Typography>
                  <Typography
                    variant="body"
                    className="col-span-2"
                    color="blue-gray"
                  >
                    Thanh toán khi nhận hàng
                  </Typography>
                  <Typography variant="h6" color="blue-gray">
                    Trạng thái
                  </Typography>
                  <Typography
                    variant="body"
                    className="col-span-2"
                    color="blue-gray"
                  >
                    Đã thanh toán
                  </Typography>
                </div>
              </div>
              <Divider />
              <div className="grid grid-cols-3 mt-5 mb-5">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="font-bold"
                >
                  Phương thức vận chuyển
                </Typography>
                <div className="col-span-2 grid grid-cols-3">
                  <Typography variant="h6" color="blue-gray">
                    Hình thức vận chuyển
                  </Typography>
                  <Typography
                    variant="body"
                    className="col-span-2"
                    color="blue-gray"
                  >
                    Giao hàng tiêu chuẩn
                  </Typography>
                  <Typography variant="h6" color="blue-gray">
                    Trạng thái
                  </Typography>
                  <Typography
                    variant="body"
                    className="col-span-2"
                    color="blue-gray"
                  >
                    Đang vận chuyển
                  </Typography>
                </div>
              </div>
              <Divider />
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-bold mt-5"
              >
                Danh sách sản phẩm
              </Typography>
              <table className="w-full min-w-max table-auto text-left mt-5">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.slice((subactive - 1) * 5, subactive * 5).map(
                    ({ name, job, date }, index) => {
                      const isLast = index === TABLE_ROWS.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={name}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {job}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {date}
                            </Typography>
                          </td>
                        </tr>
                      );
                    }
                  )}
                  <tr className="bg-blue-gray-50/50">
                    <td className="p-4">Tổng cộng</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="p-4">1000000</td>
                  </tr>
                </tbody>
              </table>
              <Pagination
                page={Math.ceil(TABLE_ROWS.length / 5)}
                active={subactive}
                setActive={setSubactive}
              />
            </CardBody>
          </Card>
        }
      >
        <div className="flex items-center justify-between gap-4">
          <TextField
            className="w-full"
            size="small"
            label="Tìm kiếm sản phẩm"
            variant="outlined"
            autoComplete="off"
            placeholder="Tìm kiếm sản phẩm"
          />
        </div>
      </AdminLayout>
    </>
  );
};

export default AllOrder;
