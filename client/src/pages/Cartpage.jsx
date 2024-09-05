import {
  Button,
  Card,
  Checkbox,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/shared/Pagination";
import { useGetCartQuery } from "../apis/OrderApi";
import Loading from "../components/shared/Loading";
import { useUpdateOrderItemMutation } from "../apis/OrderItemApi";
import { Toast } from "../configs/SweetAlert2";
import { useState } from "react";
const Cartpage = () => {
  const navigate = useNavigate();
  const [select, setSelect] = useState(-1);
  if (!localStorage.getItem("token")) window.location.replace("/login");
  const {
    data: cart,
    isLoading,
    error,
  } = useGetCartQuery({ skip: !localStorage.getItem("token") });
  const [updateOrderItem, { isLoading: isUpdating, error: updateError }] =
    useUpdateOrderItemMutation();
  const handleUpdateOrderItem = async (id, quantity) => {
    try {
      await updateOrderItem({
        id: localStorage.getItem("order_id"),
        product_id: cart.object.orderItems[0].product_id.product_id,
        quantity: 10,
      }).then((res) => {
        Toast.fire({
          icon: "success",
          title: "Cập nhật thành công",
        });
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Cập nhật thất bại",
      });
    }
  };
  if (isLoading)
    return (
      <div className="h-96">
        <Loading />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <div className="m-10 grid grid-cols-4 gap-10">
        <div className="col-span-3">
          <Typography variant="h2" color="blue-gray" className="mb-5">
            Giỏ hàng
          </Typography>
          <Card className="shadow-none rounded-b-none border-2 grid grid-cols-12 items-center text-center border-blue-gray-200 p-5">
            <Checkbox color="blue" />
            <Typography className="col-span-2" variant="body" color="blue-gray">
              Sản phẩm
            </Typography>
            <Typography className="col-span-2" variant="body" color="blue-gray">
              Sản phẩm
            </Typography>
            <Typography className="col-span-2" variant="body" color="blue-gray">
              Đơn giá
            </Typography>
            <Typography variant="body" color="blue-gray">
              Số lượng
            </Typography>
            <Typography className="col-span-3" variant="body" color="blue-gray">
              Thành tiền
            </Typography>
            <Tooltip content="Xóa toàn bộ">
              <IconButton color="white">
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </Card>
          {cart.object.orderItems.map((item, index) => (
            <Card
              className="rounded-none border-l-2 border-r-2 border-b-2 grid grid-cols-12 items-center text-center p-5 border-blue-gray-200"
              key={index}
            >
              <Checkbox color="blue" className="my-auto" />
              <div className="col-span-2">
                <img
                  src={item.product_id.product_id.image_url}
                  alt="hello"
                  className="w-20 h-20"
                />
              </div>
              <Typography className="col-span-2" color="blue-gray">
                {item.product_id.product_id.product_id.name}
              </Typography>
              <Typography
                className="col-span-2"
                variant="body"
                color="blue-gray"
              >
                {(
                  item.product_id.sale_price *
                  (1 - item.product_id.discount / 100)
                ).toLocaleString()}{" "}
                đ
              </Typography>
              <div className="relative flex items-center">
                <button
                  type="button"
                  id="decrement-button"
                  data-input-counter-decrement="counter-input"
                  className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                  onClick={() => handleUpdateOrderItem(item.id, item.quantity - 1)}
                >
                  <svg
                    className="w-2.5 h-2.5 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  id="counter-input"
                  data-input-counter
                  className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                  placeholder=""
                  value={item.quantity}
                  required
                />
                <button
                  type="button"
                  id="increment-button"
                  data-input-counter-increment="counter-input"
                  className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                >
                  <svg
                    className="w-2.5 h-2.5 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
              <Typography
                className="col-span-3"
                variant="body"
                color="blue-gray"
              >
                {Number(
                  item.product_id.sale_price *
                    (1 - item.product_id.discount / 100) *
                    item.quantity
                ).toLocaleString("en-US")}{" "}
                đ
              </Typography>
              <IconButton color="white">
                <DeleteIcon color="error" />
              </IconButton>
            </Card>
          ))}
          <Pagination page={1} />
        </div>
        <div>
          <Card className="border-1 border-blue-gray-200 p-5 mb-1">
            <Typography variant="h6" color="blue-gray">
              Giảm giá
            </Typography>
            <div className="flex justify-between items-center mt-5">
              <Typography variant="body" color="blue-gray">
                USD200
              </Typography>
              <Typography variant="body" color="blue-gray">
                - 0%
              </Typography>
            </div>
            <Button className="w-full mt-5 text-white p-3 rounded">
              Nhập mã giảm giá
            </Button>
          </Card>
          <Card className="border-1 border-blue-gray-200 p-5 mb-1">
            <div className="flex justify-between items-center">
              <Typography variant="body" color="blue-gray">
                Tạm tính
              </Typography>
              <Typography variant="body" color="blue-gray">
                2,000,000 đ
              </Typography>
            </div>
            <div className="flex justify-between items-center mt-5">
              <Typography variant="body" color="blue-gray">
                Giảm giá
              </Typography>
              <Typography variant="body" color="blue-gray">
                0 đ
              </Typography>
            </div>
            <div className="flex justify-between items-center mt-5">
              <Typography variant="body" color="blue-gray">
                Tổng cộng
              </Typography>
              <Typography variant="h6" color="blue-gray">
                2,000,000 đ
              </Typography>
            </div>
            <Button
              className="w-full mt-5 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded"
              onClick={() => navigate("/checkout")}
            >
              Thanh toán
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Cartpage;
