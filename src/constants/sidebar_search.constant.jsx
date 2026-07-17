import { lazy } from "react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

import ReceiptIcon from "@mui/icons-material/Receipt";

/** Handles analytic. */
const Analytic = lazy(() => import("../components/admin/analytic.component"));
/** Handles report. */
const Report = lazy(() => import("../components/admin/report.component"));
/** Handles history. */
const History = lazy(() => import("../components/admin/log.component"));
/** Handles brand. */
const Brand = lazy(() => import("../components/admin/brand.component"));
/** Handles category. */
const Category = lazy(() => import("../components/admin/category.component"));
/** Handles product list. */
const ProductList = lazy(() => import("../components/admin/product.component"));
/** Handles comment. */
const Comment = lazy(() => import("../components/admin/comment.component"));
/** Handles inventory. */
const Inventory = lazy(() => import("../components/admin/inventory.component"));
/** Handles import product. */
const ImportProduct = lazy(() => import("../components/admin/import_product.component"));
/** Handles onsale product. */
const OnsaleProduct = lazy(() => import("../components/admin/on_sale_product.component"));
/** Handles all order. */
const AllOrder = lazy(() => import("../components/admin/order.component"));
/** Handles confirm order. */
const ConfirmOrder = lazy(() => import("../components/admin/payment_channel.component"));
/** Handles voucher. */
const Voucher = lazy(() => import("../components/admin/voucher.component"));
/** Handles user. */
const User = lazy(() => import("../components/admin/user.component"));
/** Handles inbox. */
const Inbox = lazy(() => import("../components/admin/inbox.component"));
/** Handles web. */
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

/** Gets sidebar item by label. */
const getSidebarItemByLabel = (label) =>
  SIDEBAR_ITEMS.find((item) => item.label === label) ?? SIDEBAR_ITEMS[0];

export { SIDEBAR_SEARCH, getSidebarItemByLabel };
