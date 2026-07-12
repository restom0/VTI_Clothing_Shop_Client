import React from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import { Button } from "@material-tailwind/react/components/Button";
import { Card, CardBody } from "@material-tailwind/react/components/Card";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react/components/Menu";
import { Typography } from "@material-tailwind/react/components/Typography";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Container } from "@mui/material";
import KpiReport from "./kpi_report.component";
import { report_items } from "../../constants/menu_item.constant";
import Table from "../shared/table.component";
import { CHART_TITLE_FONT_SIZE, getChartDatasetTheme } from "../../constants/chart_theme.constant";
import { useI18n } from "../../i18n";

const Report = () => {
  const { t } = useI18n();
  const [tab, setTab] = React.useState("revenue");
  const activeTab = report_items.find((item) => item.id === tab);
  const tabLabel = activeTab ? t(activeTab.labelKey) : tab;
  const lineData = {
    labels: [
      t("month.1"),
      t("month.2"),
      t("month.3"),
      t("month.4"),
      t("month.5"),
      t("month.6"),
      t("month.7"),
      t("month.8"),
      t("month.9"),
      t("month.10"),
      t("month.11"),
      t("month.12"),
    ],
    datasets: [
      {
        label: "2022",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        fill: false,
        ...getChartDatasetTheme(0),
      },
      {
        label: "2023",
        data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 10, 5, 1],
        fill: false,
        ...getChartDatasetTheme(1),
      },
      {
        label: "2024",
        data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 10, 5, 1],
        fill: false,
        ...getChartDatasetTheme(2),
      },
      {
        label: "2025",
        data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 10, 5, 1],
        fill: false,
        ...getChartDatasetTheme(3),
      },
      {
        label: "2026",
        data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 10, 5, 1],
        fill: false,
        ...getChartDatasetTheme(4),
      },
    ],
  };
  const barData = {
    labels: [
      t("month.1"),
      t("month.2"),
      t("month.3"),
      t("month.4"),
      t("month.5"),
      t("month.6"),
      t("month.7"),
      t("month.8"),
      t("month.9"),
      t("month.10"),
      t("month.11"),
      t("month.12"),
    ],
    datasets: [
      {
        label: "2024",
        data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 10, 5, 1],
        fill: false,
        ...getChartDatasetTheme(0),
      },
    ],
  };
  const lineOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: t("report.chart_top5", { tab: tabLabel, year: new Date().getFullYear() }),
        font: {
          size: CHART_TITLE_FONT_SIZE,
        },
      },
    },
  };
  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: t("report.chart_bar", { tab: tabLabel }),
        font: {
          size: CHART_TITLE_FONT_SIZE,
        },
      },
    },
  };
  const TABLE_HEAD = [
    { label: t("report.col_name"), col: 1 },
    { label: t("report.col_quantity_sold"), col: 1 },
    { label: t("kpi.revenue"), col: 1 },
    { label: t("report.col_rating"), col: 1 },
  ];
  const TABLE_ROWS = [
    {
      name: "Nike",
      quantity: 100,
      revenue: 1000000,
      rating: 5,
    },
    {
      name: "Adidas",
      quantity: 90,
      revenue: 900000,
      rating: 4,
    },
    {
      name: "Puma",
      quantity: 80,
      revenue: 800000,
      rating: 3,
    },
    {
      name: "Converse",
      quantity: 70,
      revenue: 700000,
      rating: 2,
    },
    {
      name: "Balenciaga",
      quantity: 60,
      revenue: 600000,
      rating: 1,
    },
    {
      name: "Gucci",
      quantity: 50,
      revenue: 500000,
      rating: 5,
    },
    {
      name: "Dior",
      quantity: 40,
      revenue: 400000,
      rating: 4,
    },
    {
      name: "Louis Vuitton",
      quantity: 30,
      revenue: 300000,
      rating: 3,
    },
    {
      name: "Hermes",
      quantity: 20,
      revenue: 200000,
      rating: 2,
    },
    {
      name: "Chanel",
      quantity: 10,
      revenue: 100000,
      rating: 1,
    },
  ];
  return (
    <>
      <Container className="mt-5">
        <div className="flex justify-between my-auto">
          <Typography variant="h3" className="font-bold ">
            {t("report.title")}
          </Typography>
          <div className="flex items-center justify-between gap-4">
            <div className="shrink-0">
              <Menu>
                <MenuHandler>
                  <Button
                    color="gray"
                    variant="outlined"
                    className="flex items-center gap-1 !border-gray-300"
                  >
                    {tabLabel}
                    <ChevronDownIcon strokeWidth={4} className="w-3 h-3 text-gray-900" />
                  </Button>
                </MenuHandler>
                <MenuList>
                  {report_items.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item.id}
                      onClick={() => setTab(item.id)}
                      className="uppercase"
                    >
                      {t(item.labelKey)}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </div>
            <Button className=" !border-gray-300" color="gray" variant="outlined">
              {t("report.export")}
            </Button>
          </div>
        </div>
      </Container>
      <div>
        <KpiReport tab={tab} />
        <section className="mx-8 grid grid-cols-2 gap-4 ">
          <Card>
            <CardBody className="mx-auto my-auto w-full ">
              <Line data={lineData} options={lineOptions} />
            </CardBody>
          </Card>
          <Card>
            <CardBody className="mx-auto my-auto w-full">
              <Bar data={barData} options={barOptions} />
            </CardBody>
          </Card>
        </section>
        <Container className="mt-5">
          <Table
            TABLE_HEAD={TABLE_HEAD}
            TABLE_ROWS={TABLE_ROWS}
            noDelete
            noUpdate
            data
            handleData
          />
        </Container>
      </div>
    </>
  );
};

export default Report;
