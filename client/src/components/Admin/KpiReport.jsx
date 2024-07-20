import React from "react";

import {
  Button,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Card,
  CardBody,
} from "@material-tailwind/react";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

const KpiCard = ({ title, percentage, price, color, icon }) => {
  return (
    <Card className="shadow-sm border border-gray-200 !rounded-lg">
      <CardBody className="p-4">
        <div className="flex justify-between items-center">
          <Typography className="!font-medium !text-xs text-gray-600">
            {title}
          </Typography>
          <div className="flex items-center gap-1">
            {icon}
            <Typography color={color} className="font-medium !text-xs">
              {percentage}
            </Typography>
          </div>
        </div>
        <Typography color="blue-gray" className="mt-1 font-bold text-2xl">
          {price}
        </Typography>
      </CardBody>
    </Card>
  );
};
const formatMoney = (money) => {
  let countNumber = String(money).split("").length;
  if (countNumber <= 9) return money.toLocaleString() + " đ";
  return `${(money / 1000000000).toFixed(1)} Tỷ VNĐ`;
};
const income = [
  {
    title: "Doanh thu",
    percentage: "12%",
    price: formatMoney(10000000),
    color: "red",
    icon: <ChevronDownIcon strokeWidth={4} className="w-3 h-3 text-red-500" />,
  },
  {
    title: "Số đơn hàng",
    percentage: "16%",
    price: "10,342",
    color: "green",
    icon: <ChevronUpIcon strokeWidth={4} className="w-3 h-3 text-green-500" />,
  },
  {
    title: "Số đơn giao thành công",
    percentage: "10%",
    price: "19,720",
    color: "green",
    icon: <ChevronUpIcon strokeWidth={4} className="w-3 h-3 text-green-500" />,
  },
  {
    title: "Tháng doanh thu cao nhất",
    price: "12",
  },
];
const category = [
  {
    title: "Tổng số danh mục",
    percentage: "12%",
    price: formatMoney(10000000),
    color: "red",
    icon: <ChevronDownIcon strokeWidth={4} className="w-3 h-3 text-red-500" />,
  },
  {
    title: "Bán nhiều nhất",
    percentage: "16%",
    price: "10,342",
    color: "green",
    icon: <ChevronUpIcon strokeWidth={4} className="w-3 h-3 text-green-500" />,
  },
  {
    title: "Doanh thu cao nhất",
    percentage: "10%",
    price: "19,720",
    color: "green",
    icon: <ChevronUpIcon strokeWidth={4} className="w-3 h-3 text-green-500" />,
  },
  {
    title: "Được yêu thích nhất",
    price: "12",
  },
];
const brand = [
  {
    title: "Tổng số thương hiệu",
    percentage: "12%",
    price: formatMoney(10000000),
    color: "red",
    icon: <ChevronDownIcon strokeWidth={4} className="w-3 h-3 text-red-500" />,
  },
  {
    title: "Bán nhiều nhất",
    percentage: "16%",
    price: "10,342",
    color: "green",
    icon: <ChevronUpIcon strokeWidth={4} className="w-3 h-3 text-green-500" />,
  },
  {
    title: "Doanh thu cao nhất",
    percentage: "10%",
    price: "19,720",
    color: "green",
    icon: <ChevronUpIcon strokeWidth={4} className="w-3 h-3 text-green-500" />,
  },
  {
    title: "Được yêu thích nhất",
    price: "12",
  },
];
const product = [
  {
    title: "Tồn kho",
    percentage: "12%",
    price: formatMoney(10000000),
    color: "red",
    icon: <ChevronDownIcon strokeWidth={4} className="w-3 h-3 text-red-500" />,
  },
  {
    title: "Số sản phẩm bán ra",
    percentage: "16%",
    price: "10,342",
    color: "green",
    icon: <ChevronUpIcon strokeWidth={4} className="w-3 h-3 text-green-500" />,
  },
  {
    title: "Bán chạy nhất",
    percentage: "10%",
    price: "19,720",
    color: "green",
    icon: <ChevronUpIcon strokeWidth={4} className="w-3 h-3 text-green-500" />,
  },
  {
    title: "Được yêu thích nhât",
    price: "12",
  },
];
const KpiReport = ({ tab }) => {
  return (
    <section className="container mx-auto py-5 px-8">
      <div className="mt-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 items-center md:gap-2.5 gap-4">
        {tab === "doanh thu" &&
          income.map((props, key) => <KpiCard key={key} {...props} />)}
        {tab === "thương hiệu" &&
          brand.map((props, key) => <KpiCard key={key} {...props} />)}
        {tab === "danh mục" &&
          category.map((props, key) => <KpiCard key={key} {...props} />)}
        {tab === "sản phẩm" &&
          product.map((props, key) => <KpiCard key={key} {...props} />)}
      </div>
    </section>
  );
};
KpiReport.propTypes = {
  tab: PropTypes.string.isRequired,
};
KpiCard.propTypes = {
  title: PropTypes.string.isRequired,
  percentage: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};
export default KpiReport;
