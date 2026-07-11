import { lazy } from "react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

import ReceiptIcon from "@mui/icons-material/Receipt";

const Analytic = lazy(() => import("../components/admin/analytic.component"));
const Report = lazy(() => import("../components/admin/report.component"));
const History = lazy(() => import("../components/admin/log.component"));
const Brand = lazy(() => import("../components/admin/brand.component"));
const Category = lazy(() => import("../components/admin/category.component"));
const ProductList = lazy(() => import("../components/admin/product.component"));
const Comment = lazy(() => import("../components/admin/comment.component"));
const Inventory = lazy(() => import("../components/admin/inventory.component"));
const ImportProduct = lazy(() => import("../components/admin/import_product.component"));
const OnsaleProduct = lazy(() => import("../components/admin/on_sale_product.component"));
const AllOrder = lazy(() => import("../components/admin/order.component"));
const ConfirmOrder = lazy(() => import("../components/admin/payment_channel.component"));
const Voucher = lazy(() => import("../components/admin/voucher.component"));
const User = lazy(() => import("../components/admin/user.component"));
const Inbox = lazy(() => import("../components/admin/inbox.component"));
const Web = lazy(() => import("../components/admin/web.component"));

const SIDEBAR_SEARCH = [
  {
    title: {
      label: "Tổng quan",
      icon: <PresentationChartBarIcon className="h-5 w-5" />,
    },
    sublist: [
      { label: "Thống kê", Component: Analytic },
      { label: "Báo cáo", Component: Report },
      { label: "Lịch sử", Component: History },
    ],
  },
  {
    title: {
      label: "Sản phẩm",
      icon: <ShoppingBagIcon className="h-5 w-5" />,
    },
    sublist: [
      { label: "Thương hiệu", Component: Brand },
      { label: "Loại sản phẩm", Component: Category },
      { label: "Danh sách sản phẩm", Component: ProductList },
      { label: "Nhập hàng", Component: ImportProduct },
      { label: "Nhập giá", Component: OnsaleProduct },
      { label: "Kho hàng", Component: Inventory },
      { label: "Lượt bình luận", Component: Comment },
    ],
  },
  {
    title: {
      label: "Đơn hàng",
      icon: <ReceiptIcon className="h-5 w-5" />,
    },
    sublist: [
      { label: "Tất cả", Component: AllOrder },
      { label: "Kênh thanh toán", Component: ConfirmOrder },
      { label: "Khuyến mãi", Component: Voucher },
    ],
  },
  {
    title: {
      label: "Người dùng",
      icon: <UserCircleIcon className="h-5 w-5" />,
    },
    sublist: [
      { label: "Danh sách người dùng", Component: User },
      { label: "Phản hồi", Component: Inbox },
    ],
  },
  {
    title: null,
    sublist: [{ label: "Trang web", Component: Web }],
  },
];

const SIDEBAR_ITEMS = SIDEBAR_SEARCH.flatMap((item) => item.sublist);

const getSidebarItemByLabel = (label) =>
  SIDEBAR_ITEMS.find((item) => item.label === label) ?? SIDEBAR_ITEMS[0];

export { SIDEBAR_SEARCH, getSidebarItemByLabel };
