import {
  Button,
  Card,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { Container } from "@mui/material";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import useOpen from "../../hooks/useOpen";
import AdminLayout from "../../layouts/Admin/AdminLayout";
import { history } from "../../constants/table_head";

const TABLE_ROWS = [
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
];
const History = () => {
  return (
    <>
      <AdminLayout
        name="Lịch sử hoạt động"
        TABLE_HEAD={history}
        TABLE_ROWS={TABLE_ROWS}
        noUpdate
        noDelete
        noDetail
      >
        <div className="flex items-center justify-between gap-4">
          <div className="shrink-0">
            <Menu>
              <MenuHandler>
                <Button
                  color="gray"
                  variant="outlined"
                  className="flex items-center gap-1 !border-gray-300"
                >
                  last 24h
                  <ChevronDownIcon
                    strokeWidth={4}
                    className="w-3 h-3 text-gray-900"
                  />
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem>last hour</MenuItem>
                <MenuItem>last 24 hours</MenuItem>
                <MenuItem>last week</MenuItem>
                <MenuItem>last month</MenuItem>
                <MenuItem>all time</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </AdminLayout>
    </>
    // <Container className="mt-5">
    //   <div className="flex items-center justify-between mb-5">
    //     <Typography variant="h3" color="blue-gray" className="font-bold">
    //       Lịch sử
    //     </Typography>
    //     <div className="flex items-center justify-between gap-4">
    //       <div className="shrink-0">
    //         <Menu>
    //           <MenuHandler>
    //             <Button
    //               color="gray"
    //               variant="outlined"
    //               className="flex items-center gap-1 !border-gray-300"
    //             >
    //               last 24h
    //               <ChevronDownIcon
    //                 strokeWidth={4}
    //                 className="w-3 h-3 text-gray-900"
    //               />
    //             </Button>
    //           </MenuHandler>
    //           <MenuList>
    //             <MenuItem>last hour</MenuItem>
    //             <MenuItem>last 24 hours</MenuItem>
    //             <MenuItem>last week</MenuItem>
    //             <MenuItem>last month</MenuItem>
    //             <MenuItem>all time</MenuItem>
    //           </MenuList>
    //         </Menu>
    //       </div>
    //       <Button className=" !border-gray-300" color="gray" variant="outlined">
    //         Export
    //       </Button>
    //     </div>
    //   </div>
    //   {
    //     <Table
    //       TABLE_HEAD={history}
    //       TABLE_ROWS={TABLE_ROWS}
    //       active={active}
    //       setActive={setActive}
    //       noUpdate={true}
    //       noDelete={true}
    //       handleDeleteOpen={handleDeleteOpen}
    //       handleUpdateOpen={handleUpdateOpen}
    //       handleDetailOpen={handleDetailOpen}
    //       updateOpen={updateOpen}
    //       deleteOpen={deleteOpen}
    //       deleteContent="Xóa"
    //       updateContent="Chỉnh sửa"
    //     />
    //   }
    //   {/* <Card>
    //     <table className="w-full min-w-max table-auto text-center">
    //       <TableHeader TABLE_HEAD={history} />
    //       <tbody>
    //         {TABLE_ROWS.map(({ name, role, action, date }, index) => (
    //           <tr key={name} className="even:bg-blue-gray-50/50">
    //             <td className="p-4">
    //               <Typography
    //                 variant="small"
    //                 color="blue-gray"
    //                 className="font-normal"
    //               >
    //                 {name}
    //               </Typography>
    //             </td>
    //             <td className="p-4">
    //               <Typography
    //                 variant="small"
    //                 color="blue-gray"
    //                 className="font-normal"
    //               >
    //                 {role}
    //               </Typography>
    //             </td>
    //             <td className="p-4">
    //               <Typography
    //                 variant="small"
    //                 color="blue-gray"
    //                 className="font-normal"
    //               >
    //                 {action}
    //               </Typography>
    //             </td>
    //             <td className="p-4">
    //               <Typography
    //                 variant="small"
    //                 color="blue-gray"
    //                 className="font-normal"
    //               >
    //                 {date}
    //               </Typography>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </Card> */}
    // </Container>
  );
};

export default History;
