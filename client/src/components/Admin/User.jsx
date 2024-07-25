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
import { useState } from "react";
import useOpen from "../../hooks/useOpen";
import Table from "../shared/Table";
import { user } from "../../constants/table_head";
import CloseIcon from "@mui/icons-material/Close";
import { useGetUsersQuery } from "../../apis/UserApi";

const TABLE_ROWS = [
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    status: "BLOCKED",
  },
];
const User = () => {
  const [active, setActive] = useState(1);
  const {
    detailOpen,
    updateOpen,
    deleteOpen,
    handleDetailOpen,
    handleUpdateOpen,
    handleDeleteOpen,
  } = useOpen();

  const { data: users, error, isLoading } = useGetUsersQuery();
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
        <DialogHeader className="pb-0 flex justify-between">
          <Typography variant="h4">Thông tin người dùng</Typography>
          <IconButton
            className="border-none"
            variant="outlined"
            onClick={handleDetailOpen}
          >
            <CloseIcon />
          </IconButton>
        </DialogHeader>
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
