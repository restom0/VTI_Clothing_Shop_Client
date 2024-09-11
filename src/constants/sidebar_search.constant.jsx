import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

import ReceiptIcon from "@mui/icons-material/Receipt";
import Analytic from "../components/admin/analytic.component";
import Report from "../components/admin/report.component";
import History from "../components/admin/log.component";
import Brand from "../components/admin/brand.component";
import Category from "../components/admin/category.component";
import ProductList from "../components/admin/product.component";
import Comment from "../components/admin/comment.component";
import Inventory from "../components/admin/inventory.component";
import ImportProduct from "../components/admin/import_product.component";
import OnsaleProduct from "../components/admin/on_sale_product.component";
import AllOrder from "../components/admin/order.component";
import ConfirmOrder from "../components/admin/payment_channel.component";
import Voucher from "../components/admin/voucher.component";
import User from "../components/admin/user.component";
import Inbox from "../components/admin/inbox.component";
import Web from "../components/admin/web.component";
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
      { label: "Nhập hàng", elements: <ImportProduct /> },
      { label: "Nhập giá", elements: <OnsaleProduct /> },
      { label: "Kho hàng", elements: <Inventory /> },
      { label: "Lượt bình luận", elements: <Comment /> },
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
