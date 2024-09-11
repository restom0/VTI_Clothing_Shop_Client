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
import { useEffect, useState } from "react";
import { allorder_tab } from "../../constants/tab";
import { allorder } from "../../constants/table_head";
import AdminLayout from "../../layouts/admin/admin.layout";
import Pagination from "../shared/pagination.component";
import { useGetOrdersQuery } from "../../apis/order.api";
import Loading from "../shared/loading.component";
import { useSelector } from "react-redux";
const AllOrder = () => {
  const [tab, setTab] = useState("ALL");
  const selectedId = useSelector((state) => state.selectedId.value);
  const [active, setActive] = useState(1);
  const [subactive, setSubactive] = useState(1);
  const [filterOrders, setFilterOrders] = useState(null);
  const { data: orders, isLoading, error } = useGetOrdersQuery();
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
  useEffect(() => {
    if (tab === "ALL") setFilterOrders(orders?.object);
    else
      setFilterOrders(
        orders?.object.filter((order) => order.payment_status === tab)
      );
  }, [tab, orders]);
  if (isLoading) return <Loading />;
  if (error) return <div>error</div>;
  const listOrders = filterOrders?.map((order, index) => {
    return {
      id: order.id,
      order_code: order.order_code,
      name: order.receiver_name,
      phone_number: order.phone_number,
      price: Number(order.total_price).toLocaleString("en-US") + " đ",
      payment_method: order.payment_method,
      payment_status: order.payment_status,
    };
  });
  return (
    <>
      <AdminLayout
        tab={tab}
        setTab={setTab}
        name="Danh sách đơn hàng"
        tablist={allorder_tab}
        TABLE_HEAD={allorder}
        TABLE_ROWS={listOrders ? listOrders : []}
        updateContent="Chỉnh sửa"
        deleteContent="Xóa"
        noUpdate
        noDelete
        size="xl"
        headerDetail="Chi tiết đơn hàng"
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
                <div className="col-span-2 grid grid-cols-3 gap-2">
                  <Typography variant="h6" color="blue-gray">
                    Tên người nhận:
                  </Typography>
                  <Typography
                    variant="body"
                    className="col-span-2"
                    color="blue-gray"
                  >
                    {
                      orders?.object.find((order) => order.id === selectedId)
                        ?.receiver_name
                    }
                  </Typography>
                  <Typography variant="h6" color="blue-gray">
                    Địa chỉ nhận hàng:
                  </Typography>
                  <Typography
                    variant="body"
                    className="col-span-2"
                    color="blue-gray"
                  >
                    {
                      orders?.object.find((order) => order.id === selectedId)
                        ?.address
                    }
                  </Typography>
                  <Typography variant="h6" color="blue-gray">
                    Số điện thoại người nhận:
                  </Typography>
                  <Typography
                    variant="body"
                    className="col-span-2"
                    color="blue-gray"
                  >
                    {
                      orders?.object.find((order) => order.id === selectedId)
                        ?.phone_number
                    }
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
                <div className="col-span-2 grid grid-cols-3 gap-2">
                  <Typography variant="h6" color="blue-gray">
                    Hình thức thanh toán:
                  </Typography>
                  <Typography
                    variant="body"
                    className="col-span-2"
                    color="blue-gray"
                  >
                    {
                      orders?.object.find((order) => order.id === selectedId)
                        ?.payment_method
                    }
                  </Typography>
                  <Typography variant="h6" color="blue-gray">
                    Trạng thái:
                  </Typography>
                  <Typography
                    variant="body"
                    className="col-span-2"
                    color="blue-gray"
                  >
                    {
                      orders?.object.find((order) => order.id === selectedId)
                        ?.payment_status
                    }
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
                <div className="col-span-2 grid grid-cols-3 gap-2">
                  <Typography variant="h6" color="blue-gray">
                    Hình thức vận chuyển:
                  </Typography>
                  <Typography
                    variant="body"
                    className="col-span-2"
                    color="blue-gray"
                  >
                    Giao hàng tiêu chuẩn
                  </Typography>
                  <Typography variant="h6" color="blue-gray">
                    Trạng thái:
                  </Typography>
                  <Typography
                    variant="body"
                    className="col-span-2"
                    color="blue-gray"
                  >
                    {
                      orders?.object.find((order) => order.id === selectedId)
                        ?.payment_status
                    }
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
                  {orders?.object
                    .find((order) => order.id === selectedId)
                    ?.orderItems.slice((subactive - 1) * 5, subactive * 5)
                    .map((item, index) => {
                      const isLast =
                        index ===
                        orders?.object.find((order) => order.id === selectedId)
                          ?.orderItems.length -
                          1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={index}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {index + 1}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.product_id.product_id.product_id.name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.quantity.toLocaleString("en-US")}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {(
                                item.product_id.sale_price *
                                (1 - item.product_id.discount / 100)
                              ).toLocaleString("en-US")}{" "}
                              đ
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {(
                                item.product_id.sale_price *
                                (1 - item.product_id.discount / 100) *
                                item.quantity
                              ).toLocaleString("en-US")}{" "}
                              đ
                            </Typography>
                          </td>
                        </tr>
                      );
                    })}
                  <tr className="bg-blue-gray-50/50">
                    <td className="p-4">Tổng cộng</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="p-4">
                      {orders?.object
                        .find((order) => order.id === selectedId)
                        ?.total_price.toLocaleString("en-US")}{" "}
                      đ
                    </td>
                  </tr>
                </tbody>
              </table>
              <Pagination
                page={Math.ceil(
                  orders?.object.find((order) => order.id === selectedId)
                    ?.orderItems.length / 5
                )}
                active={subactive}
                setActive={setSubactive}
              />
            </CardBody>
          </Card>
        }
      >
        <div className="flex items-center justify-between gap-4">
          <Input
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
