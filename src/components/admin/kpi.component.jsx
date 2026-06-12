import React from "react";

import { Button } from "@material-tailwind/react/components/Button";
import { Typography } from "@material-tailwind/react/components/Typography";
import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react/components/Menu";
import { Card, CardBody } from "@material-tailwind/react/components/Card";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { useCurrency } from "../../currency";

const KpiCard = ({ title, percentage, price, color, icon }) => {
  return (
    <Card className="shadow-sm border border-gray-200 !rounded-lg mb-7">
      <CardBody className="p-4">
        <div className="flex justify-between items-center">
          <Typography className="!font-medium !text-xs text-gray-600">
            {title}
          </Typography>
          {/* <div className="flex items-center gap-1">
            {icon}
            <Typography color={color} className="font-medium !text-xs">
              {percentage}
            </Typography>
          </div> */}
        </div>
        <Typography color="blue-gray" className="mt-1 font-bold text-2xl">
          {price}
        </Typography>
      </CardBody>
    </Card>
  );
};
const data = [
  {
    title: "Doanh thu",
    // percentage: "12%",
    // price: formatMoney(10000000),
    // color: "red",
    // icon: <ChevronDownIcon strokeWidth={4} className="w-3 h-3 text-red-500" />,
  },
  {
    title: "Số đơn hàng",
    // percentage: "16%",
    // price: "10,342",
    // color: "green",
    // icon: <ChevronUpIcon strokeWidth={4} className="w-3 h-3 text-green-500" />,
  },
  {
    title: "Số đơn giao thành công",
    // percentage: "10%",
    // price: "19,720",
    // color: "green",
    // icon: <ChevronUpIcon strokeWidth={4} className="w-3 h-3 text-green-500" />,
  },
  {
    title: "Số người dùng",
    // percentage: "10%",
    // price: "20,000",
    // color: "red",
    // icon: <ChevronDownIcon strokeWidth={4} className="w-3 h-3 text-red-500" />,
  },
  {
    title: "Số sản phẩm bán ra",
    // percentage: "10%",
    // price: "20,000",
    // color: "red",
    // icon: <ChevronDownIcon strokeWidth={4} className="w-3 h-3 text-red-500" />,
  },
];

const Kpi = ({ stat }) => {
  const { formatPrice, locale } = useCurrency();
  const numberFormatter = new Intl.NumberFormat(locale);
  const orderUnit = `${String.fromCharCode(273)}${String.fromCharCode(417)}n`;
  const rows = data.map((item, index) => {
    const values = [
      formatPrice(stat.income),
      `${numberFormatter.format(stat.order)} ${orderUnit}`,
      `${numberFormatter.format(stat.completed)} ${orderUnit}`,
      numberFormatter.format(stat.user),
      numberFormatter.format(stat.product ?? stat.soldProduct ?? 0),
    ];

    return { ...item, price: values[index] };
  });

  return (
    <section className="container mx-auto py-5 pe-6">
      <div className="flex justify-between md:items-center"></div>
      <div className="flex flex-col">
        {rows.map((props, key) => (
          <KpiCard key={key} {...props} />
        ))}
      </div>
    </section>
  );
};
KpiCard.propTypes = {
  title: PropTypes.string.isRequired,
  percentage: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};
export default Kpi;
