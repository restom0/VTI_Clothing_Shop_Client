import React from "react";
import Kpi from "./Kpi";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { Container } from "@mui/material";
import { useGetStatQuery } from "../../apis/StatApi";
import Loading from "../shared/Loading";
const Analytic = () => {
  const [filter, setFilter] = React.useState("ALL");
  const { data: datas, isLoading, error } = useGetStatQuery();
  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  const monthlyIncome = datas.object.monthlyIncome;
  const color = ["#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6"];
  const border = ["#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6"];
  const datasets = Object.keys(monthlyIncome).map((year, index) => ({
    label: year,
    data: monthlyIncome[year],
    fill: false,
    backgroundColor: color[index],
    borderColor: border[index],
  }));

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: datasets,
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Container className="mt-5">
        <div className="flex justify-between my-auto">
          <Typography variant="h3" className="font-bold ">
            Thống kê
          </Typography>
          {/* <div className="shrink-0">
            <Menu>
              <MenuHandler>
                <Button
                  color="gray"
                  variant="outlined"
                  className="flex items-center gap-1 !border-gray-300"
                >
                  {
                    {
                      ALL: "Tất cả",
                      DAY: "Hôm nay",
                      MONTH: "Tháng này",
                      YEAR: "Năm nay",
                    }[filter]
                  }
                  <ChevronDownIcon
                    strokeWidth={4}
                    className="w-3 h-3 text-gray-900"
                  />
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem
                  onClick={(e) => setFilter(e.target.value)}
                  value="ALL"
                >
                  Tất cả
                </MenuItem>
                <MenuItem
                  onClick={(e) => setFilter(e.target.value)}
                  value="DAY"
                >
                  Hôm nay
                </MenuItem>
                <MenuItem
                  onClick={(e) => setFilter(e.target.value)}
                  value="MONTH"
                >
                  Tháng này
                </MenuItem>
                <MenuItem
                  onClick={(e) => setFilter(e.target.value)}
                  value="YEAR"
                >
                  Năm nay
                </MenuItem>
              </MenuList>
            </Menu>
          </div> */}
        </div>
      </Container>
      <div className="grid grid-cols-4">
        <section className="ms-8 me-8 mt-8 col-span-3">
          <Card>
            <CardBody className="!p-2">
              {/* <div className="flex gap-2 flex-wrap justify-between px-4 !mt-4 ">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      2022
                    </Typography>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      2023
                    </Typography>
                  </div>
                </div>
              </div> */}
              <Line data={data} options={options} />
            </CardBody>
            <CardFooter className="flex gap-6 flex-wrap items-center justify-between">
              <div>
                <Typography variant="h6" color="blue-gray">
                  Doanh thu hàng năm
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-gray-600 mt-1"
                >
                  So sánh doanh thu các tháng với năm gần nhất
                </Typography>
              </div>
              <Button variant="outlined">Xem báo cáo</Button>
            </CardFooter>
          </Card>
        </section>
        <Kpi stat={datas.object.generalStats} />
      </div>
    </>
  );
};

export default Analytic;
