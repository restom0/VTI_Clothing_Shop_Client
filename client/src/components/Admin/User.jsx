import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { Container } from "@mui/material";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import TableHeader from "../../layouts/TableHeader";
import { user } from "../../constants/table_head";
import Table from "../../layouts/Table";
import useOpen from "../../hooks/useOpen";

const TABLE_ROWS = [
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    status: "BLOCKED",
  },
];
const User = () => {
  const [active, setActive] = React.useState(1);
  const {
    detailOpen,
    updateOpen,
    deleteOpen,
    handleDetailOpen,
    handleUpdateOpen,
    handleDeleteOpen,
  } = useOpen();

  return (
    <Container className="mt-5">
      <div className="flex items-center justify-between mb-5">
        <Typography variant="h4" color="blue-gray" className="font-bold">
          Danh sách người dùng
        </Typography>
        <div className="flex items-center justify-between gap-4">
          <Button
            className=" !border-gray-300 w-full"
            color="gray"
            variant="outlined"
          >
            Thêm mới
          </Button>
          <Input
            size="sm"
            label="Tìm kiếm"
            iconFamily="material-icons"
            iconName="search"
            placeholder="Tìm kiếm sản phẩm"
          />
        </div>
      </div>
      <Table
        TABLE_HEAD={user}
        TABLE_ROWS={TABLE_ROWS}
        active={active}
        setActive={setActive}
        deleteOpen={detailOpen}
        handleDetailOpen={handleDetailOpen}
        noDelete
        noUpdate
      />
      <Dialog open={detailOpen} handler={handleDetailOpen} size="xs">
        <DialogHeader>Thông tin người dùng</DialogHeader>
        <DialogBody>
          <Container>
            <div className="grid grid-cols-2 text-center">
              <Typography variant="h6" color="blue-gray" className="font-bold">
                Tên đăng nhập:
              </Typography>
              <Typography variant="small" color="blue-gray">
                nguyenvana
              </Typography>
              <Typography variant="h6" color="blue-gray" className="font-bold">
                Vai trò
              </Typography>
              <Typography variant="small" color="blue-gray">
                USER
              </Typography>
              <Typography variant="h6" color="blue-gray" className="font-bold">
                Trạng thái
              </Typography>
              <Typography variant="small" color="blue-gray">
                Khóa
              </Typography>
            </div>
          </Container>
        </DialogBody>
        <DialogFooter>
          {TABLE_ROWS[0].status === "BLOCKED" ? (
            <Button variant="gradient" color="green">
              <span>Khôi phục</span>
            </Button>
          ) : (
            <Button variant="gradient" color="red">
              <span>Khóa tài khoản</span>
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </Container>
  );
};

export default User;
