import Kpi from "./kpi.component";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { Button } from "@material-tailwind/react/components/Button";
import { Card, CardBody, CardFooter } from "@material-tailwind/react/components/Card";
import { Typography } from "@material-tailwind/react/components/Typography";

import { Container } from "@mui/material";
import { useGetStatQuery } from "../../apis/statistic.api";
import { getChartDatasetTheme } from "../../constants/chart_theme.constant";
import Loading from "../shared/loading.component";
import { useI18n } from "../../i18n";

/** Handles analytic. */
const Analytic = () => {
  const { t } = useI18n();
  const { data: datas, isLoading, error } = useGetStatQuery();
  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error?.message ?? "Unable to load stats"}</div>;

  const monthlyIncome = datas.object.monthlyIncome;
  const datasets = Object.keys(monthlyIncome).map((year, index) => ({
    label: year,
    data: monthlyIncome[year],
    fill: false,
    ...getChartDatasetTheme(index),
  }));

  const data = {
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
            {t("analytics.title")}
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
                  {t("analytics.annual_revenue")}
                </Typography>
                <Typography variant="small" className="font-normal text-gray-600 mt-1">
                  {t("analytics.annual_revenue_desc")}
                </Typography>
              </div>
              <Button variant="outlined">{t("analytics.view_report")}</Button>
            </CardFooter>
          </Card>
        </section>
        <Kpi stat={datas.object.generalStats} />
      </div>
    </>
  );
};

export default Analytic;
