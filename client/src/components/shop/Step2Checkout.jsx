import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  IconButton,
  Input,
  List,
  ListItem,
  Radio,
  Step,
  Stepper,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Container, Divider, Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Step2Checkout = ({ handleNext, handlePrev }) => {
  const [check, setCheck] = React.useState(
    localStorage.getItem("token") ? true : false
  );

  const [check1, setCheck1] = React.useState(false);
  const [check2, setCheck2] = React.useState(false);
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-3 mb-1">
      <Card className="mt-6 col-span-2">
        <CardBody>
          <div className="flex items-center my-auto mb-2">
            <IconButton
              variant="outlined"
              className="border-none"
              onClick={handlePrev}
            >
              <ArrowBackIcon color="black" />
            </IconButton>
            <Typography variant="h5" color="blue-gray" className="">
              Cổng thanh toán
            </Typography>
          </div>
          <img
            className="h-96 w-1/2 object-cover object-center mx-auto mt-1"
            src="/public/1719545334144.6924.png"
            alt="QR code"
          />
          <Typography
            variant="body"
            color="blue-gray"
            className="mt-1 text-center"
          >
            Hoặc chuyển qua ngân hàng OCB
          </Typography>
          <Typography
            variant="body"
            color="blue-gray"
            className="mt-1 text-center"
          >
            Số tài khoản: 123456789
          </Typography>
          <Typography
            variant="body"
            color="blue-gray"
            className="mt-1 text-center"
          >
            Tên chủ tài khoản: Nguyễn Văn A
          </Typography>
          <Typography
            variant="body"
            color="blue-gray"
            className="mt-1 text-center"
          >
            Nội dung chuyển tiền: Mã đơn hàng + Số điện thoại
          </Typography>
        </CardBody>
      </Card>
      <Card className="mt-6">
        <CardBody>
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Chi tiết đơn hàng #MX2001
            </Typography>
            <Typography as="a" href="/cart" color="cyan">
              Sửa
            </Typography>
          </div>
          <Divider />
          <div className="flex items-center justify-between mt-4">
            <Typography className="" variant="body" color="blue-gray">
              1 x{" "}
              <span className="text-cyan-300 w-[100px] text-wrap">
                Áo thun nam
              </span>
            </Typography>
            <div className="flex flex-col">
              <Typography variant="body" color="blue-gray">
                58000đ
              </Typography>
              <Typography className="line-through text-gray-400" variant="body">
                58000đ
              </Typography>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Typography variant="body" color="blue-gray">
              Tạm tính
            </Typography>
            <Typography variant="body" color="blue-gray">
              2,000,000 đ
            </Typography>
          </div>
          <div className="flex justify-between items-center mt-2">
            <Typography variant="body" color="blue-gray">
              Giảm giá
            </Typography>
            <Typography variant="body" color="blue-gray">
              0 đ
            </Typography>
          </div>
          <div className="flex justify-between items-center mt-2">
            <Typography variant="body" color="blue-gray">
              Phí vận chuyển
            </Typography>
            <Typography variant="body" color="blue-gray">
              27,000 đ
            </Typography>
          </div>
          <div className="flex justify-between items-center mt-2">
            <Typography variant="body" color="blue-gray">
              Phí gói quà
            </Typography>
            <Typography variant="body" color="blue-gray">
              10,000 đ
            </Typography>
          </div>
          <div className="mt-5 mb-5">
            <Divider />
          </div>
          <div className="flex justify-between items-center mt-2">
            <Typography variant="body" color="blue-gray">
              Tổng cộng
            </Typography>
            <Typography variant="h6" color="blue-gray">
              2,000,000 đ
            </Typography>
          </div>
          <div className="flex items-center justify-between mt-10">
            <Typography variant="h5" color="blue-gray">
              Giao tới
            </Typography>
            <Typography color="cyan" onClick={handlePrev}>
              Thay đổi
            </Typography>
          </div>
          <div className="flex justify-around items-center mt-5">
            <Typography variant="body" color="blue-gray">
              Rạng thái
            </Typography>
            <Divider variant="body" />
            <Typography variant="body" color="blue-gray">
              0912345678
            </Typography>
          </div>
          <div className="mt-5">
            <Typography variant="body" color="blue-gray">
              Số nhà 1, đường 1, phường 1, quận 1, TP.HCM
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button color="red" fullWidth onClick={handleNext}>
            Xác nhận
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Step2Checkout;
