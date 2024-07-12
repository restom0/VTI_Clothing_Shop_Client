import {
  Button,
  Card,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Dialog,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { Container } from "@mui/material";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import TableHeader from "../shared/TableHeader";
import { inbox } from "../../constants/table_head";
import Table from "../shared/Table";
import useOpen from "../../hooks/useOpen";
import AdminLayout from "../../layouts/Admin/AdminLayout";
const TABLE_HEAD = [
  "Username",
  "Câu hỏi",
  "Phản hồi",
  <SettingsIcon key={-1} />,
];

const TABLE_ROWS = [
  {
    name: "001",
    role: "USER",
    date: "23/04/18",
  },
];
const Inbox = () => {
  const {
    detailOpen,
    updateOpen,
    deleteOpen,
    handleDetailOpen,
    handleUpdateOpen,
    handleDeleteOpen,
  } = useOpen();
  const [active, setActive] = React.useState(1);
  return (
    <>
      <AdminLayout
        name="Phản hồi của người dùng"
        TABLE_HEAD={inbox}
        TABLE_ROWS={TABLE_ROWS}
        active={active}
        setActive={setActive}
        handleDetailOpen={handleDetailOpen}
        handleUpdateOpen={handleUpdateOpen}
        handleDeleteOpen={handleDeleteOpen}
        updateContent="Phản hồi"
        deleteContent="Báo cáo vi phạm"
        size="md"
        headerDetail={"Phản hồi của #" + "001"}
        bodyDetail={
          <Container>
            <Typography variant="h6" color="blue-gray" className="font-bold">
              Nội dung:
            </Typography>
            <Typography color="blue-gray" className="font-normal mb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              tincidunt, nunc nec ultricies tincidunt, nunc nec ultricies
              tincidunt, nunc nec ultricies?
            </Typography>
            <Typography variant="h6" color="blue-gray" className="font-bold">
              Trả lời:
            </Typography>
            <Typography color="blue-gray" className="font-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              tincidunt, nunc nec ultricies tincidunt, nunc nec ultricies
              tincidunt, nunc nec ultricies?
            </Typography>
          </Container>
        }
        headerUpdate={"Phản hồi của #" + "001"}
        bodyUpdate={
          <Container>
            <Typography variant="h6" color="blue-gray" className="font-bold">
              Nội dung:
            </Typography>
            <Typography color="blue-gray" className="font-normal mb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              tincidunt, nunc nec ultricies tincidunt, nunc nec ultricies
              tincidunt, nunc nec ultricies?
            </Typography>
            <Typography variant="h6" color="blue-gray" className="font-bold">
              Trả lời:
            </Typography>
            <Textarea color="lightBlue" size="regular" placeholder="Trả lời">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              tincidunt, nunc nec ultricies tincidunt, nunc nec ultricies
              tincidunt, nunc nec ultricies?
            </Textarea>
          </Container>
        }
      >
        <div className="flex items-center justify-between gap-4">
          <Select label="Phân loại theo" value="Tất cả">
            <Option value="Tất cả">Tất cả</Option>
            <Option value="Chưa phản hồi">Chưa phản hồi</Option>
            <Option value="Đã phản hồi">Đã phản hồi</Option>
          </Select>
        </div>
      </AdminLayout>
      {/* <Container className="mt-5">
        <div className="flex items-center justify-between mb-5">
          <Typography variant="h3" color="blue-gray" className="font-bold">
            Phản hồi của người dùng
          </Typography>
          <div className="flex items-center justify-between gap-4">
          <Button className=" !border-gray-300" color="gray" variant="outlined">
            Thêm mới
          </Button>
        </div>
        </div>
        <Table
          TABLE_HEAD={inbox}
          TABLE_ROWS={TABLE_ROWS}
          active={active}
          setActive={setActive}
          handleDetailOpen={handleDetailOpen}
          handleUpdateOpen={handleUpdateOpen}
          handleDeleteOpen={handleDeleteOpen}
          updateContent="Phản hồi"
          deleteContent="Báo cáo vi phạm"
        />
        {TABLE_ROWS.map(({ name, reply, response }, index) => (
            <tr
              key={name}
              className="even:bg-blue-gray-50/50"
              onClick={handleOpen}
            >
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {name}
                </Typography>
              </td>
              <td className="p-4" colSpan={3}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {reply}
                </Typography>
              </td>
              <td className="p-4" colSpan={3}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {response}
                </Typography>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-4 justify-around">
                  <Tooltip content="Trả lời">
                    <IconButton color="blue">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip content="Báo cáo vi phạm">
                    <IconButton color="red">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Container> */}
      {/* <Dialog open={detailOpen} handler={handleDetailOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleDetailOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleDetailOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog> */}
    </>
  );
};

export default Inbox;
