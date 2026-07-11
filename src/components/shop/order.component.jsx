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

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: false,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    job: "Executive",
    org: "Projects",
    online: false,
    date: "19/09/17",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: true,
    date: "24/12/08",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    job: "Manager",
    org: "Executive",
    online: false,
    date: "04/10/21",
  },
];

const Order = () => {
  const [tab, setTab] = React.useState("ALL");
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Danh sách đơn hàng
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <div className="w-full md:w-72">
              <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
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
                        value={status}
                        color={
                          status === "ONHOLD"
                            ? "blue-gray"
                            : status === "CONFIRMED"
                              ? "cyan"
                              : status === "DELIVERING"
                                ? "blue"
                                : status === "COMPLETED"
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
                    <Tooltip content="Hủy đơn hàng">
                      <IconButton variant="text" color="red" disabled={status === "CANCELLED"}>
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
