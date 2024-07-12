import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

import ReceiptIcon from "@mui/icons-material/Receipt";
import Analytic from "../components/Admin/Analytic";
import Report from "../components/Admin/Report";
import History from "../components/Admin/History";
import Brand from "../components/Admin/Brand";
import Category from "../components/Admin/Category";
import ProductList from "../components/Admin/ProductList";
import Comment from "../components/Admin/Comment";
import Inventory from "../components/Admin/Inventory";
import ImportProduct from "../components/Admin/ImportProduct";
import OnsaleProduct from "../components/Admin/OnsaleProduct";
import AllOrder from "../components/Admin/AllOrder";
import ConfirmOrder from "../components/Admin/ConfirmOrder";
import Voucher from "../components/Admin/Voucher";
import User from "../components/Admin/User";
import Inbox from "../components/Admin/Inbox";
import Web from "../components/Admin/Web";
const SIDEBAR_SEARCH = [
  {
    title: {
      label: "Tổng quan",
      icon: <PresentationChartBarIcon className="h-5 w-5" />,
    },
    sublist: [
      { label: "Thống kê", elements: <Analytic /> },
      { label: "Báo cáo", elements: <Report /> },
      { label: "Lịch sử", elements: <History /> },
    ],
  },
  {
    title: {
      label: "Sản phẩm",
      icon: <ShoppingBagIcon className="h-5 w-5" />,
    },
    sublist: [
      { label: "Thương hiệu", elements: <Brand /> },
      { label: "Loại sản phẩm", elements: <Category /> },
      { label: "Danh sách sản phẩm", elements: <ProductList /> },
      { label: "Lượt bình luận", elements: <Comment /> },
      { label: "Kho hàng", elements: <Inventory /> },
      { label: "Nhập hàng", elements: <ImportProduct /> },
      { label: "Nhập giá", elements: <OnsaleProduct /> },
    ],
  },
  {
    title: {
      label: "Đơn hàng",
      icon: <ReceiptIcon className="h-5 w-5" />,
    },
    sublist: [
      { label: "Tất cả", elements: <AllOrder /> },
      { label: "Kênh thanh toán", elements: <ConfirmOrder /> },
      { label: "Khuyến mãi", elements: <Voucher /> },
    ],
  },
  {
    title: {
      label: "Người dùng",
      icon: <UserCircleIcon className="h-5 w-5" />,
    },
    sublist: [
      { label: "Danh sách người dùng", elements: <User /> },
      { label: "Phản hồi", elements: <Inbox /> },
    ],
  },
  {
    title: null,
    sublist: [{ label: "Trang web", elements: <Web /> }],
  },
];

export { SIDEBAR_SEARCH };
