import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import DeleteIcon from "@mui/icons-material/Delete";
import { Card, CardHeader, CardBody } from "@material-tailwind/react/components/Card";
import { Input } from "@material-tailwind/react/components/Input";
import { Typography } from "@material-tailwind/react/components/Typography";
import { Chip } from "@material-tailwind/react/components/Chip";
import { IconButton } from "@material-tailwind/react/components/IconButton";
import { Tooltip } from "@material-tailwind/react/components/Tooltip";
import Pagination from "../shared/pagination.component";
import Tablist from "../shared/list_tab.component";
import { allorder_tab } from "../../constants/tab.constant";
import TableHeader from "../shared/header_table";
import { order } from "../../constants/head_table.constant";
import { useI18n } from "../../i18n";
import { ORDER_STATUS } from "../../constants/status.constant";

const ORDER_STATUS_LABEL_KEYS = {
  CANCELLED: "order.status_cancelled",
  COMPLETED: "order.status_completed",
  CONFIRMED: "order.status_confirmed",
  DELIVERING: "order.status_delivering",
  ON_HOLD: "order.status_on_hold",
  NOT_CONFIRMED: "order.status_on_hold",
};

const TABLE_ROWS = [
  {
    id: "ORD-1001",
    sum: "1,200,000",
    status: ORDER_STATUS.ON_HOLD,
    date: "23/04/18",
  },
  {
    id: "ORD-1002",
    sum: "950,000",
    status: ORDER_STATUS.CONFIRMED,
    date: "23/04/18",
  },
  {
    id: "ORD-1003",
    sum: "800,000",
    status: ORDER_STATUS.DELIVERING,
    date: "19/09/17",
  },
  {
    id: "ORD-1004",
    sum: "2,400,000",
    status: ORDER_STATUS.COMPLETED,
    date: "24/12/08",
  },
  {
    id: "ORD-1005",
    sum: "300,000",
    status: ORDER_STATUS.CANCELLED,
    date: "04/10/21",
  },
];

/** Handles order. */
const Order = () => {
  const [tab, setTab] = React.useState("ALL");
  const { t } = useI18n();
  /** Gets order status label. */
  const getOrderStatusLabel = (status) =>
    t(ORDER_STATUS_LABEL_KEYS[status] ?? "order.status_unknown");
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              {t("order.list_title")}
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <div className="w-full md:w-72">
              <Input
                label={t("common.search")}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </div>
        <Tablist TABS={allorder_tab} tab={tab} setTab={setTab} />
      </CardHeader>
      <CardBody className="overflow-auto px-0">
        <table className="w-full min-w-max table-auto text-left">
          <TableHeader TABLE_HEAD={order} />
          <tbody>
            {TABLE_ROWS.map(({ id, sum, status, date }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {id}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {sum}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={getOrderStatusLabel(status)}
                        color={
                          status === ORDER_STATUS.ON_HOLD
                            ? "blue-gray"
                            : status === ORDER_STATUS.CONFIRMED
                              ? "cyan"
                              : status === ORDER_STATUS.DELIVERING
                                ? "blue"
                                : status === ORDER_STATUS.COMPLETED
                                  ? "green"
                                  : "red"
                        }
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {date}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content={t("order.cancel_order")}>
                      <IconButton
                        variant="text"
                        color="red"
                        disabled={status === ORDER_STATUS.CANCELLED}
                      >
                        <DeleteIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <Pagination />
    </Card>
  );
};
export default Order;
