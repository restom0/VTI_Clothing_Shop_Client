import { Button } from "@material-tailwind/react/components/Button";
import { Input } from "@material-tailwind/react/components/Input";
import { Typography } from "@material-tailwind/react/components/Typography";
import { Container, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import useOpen from "../../hooks/useOpen.hook";
import Table from "../shared/table.component";
import { user } from "../../constants/head_table.constant";
import { useGetUsersQuery } from "../../apis/user.api";
import Loading from "../shared/loading.component";

/** Handles user. */
const User = () => {
  const [active, setActive] = useState(1);
  const { detailOpen, handleDetailOpen, handleDetailClose } = useOpen();

  const { data: users, error, isLoading } = useGetUsersQuery();
  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  return (
    <Container className="mt-5">
      <div className="flex items-center justify-between mb-5">
        <Typography variant="h4" color="blue-gray" className="font-bold">
          Danh sách người dùng
        </Typography>
        <div className="flex items-center justify-between gap-4">
          <Button className=" !border-gray-300 w-full" color="gray" variant="outlined">
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
        TABLE_ROWS={users.object.length > 0 ? users.object : []}
        active={active}
        setActive={setActive}
        deleteOpen={detailOpen}
        handleDetailOpen={handleDetailOpen}
        noDelete
        noUpdate
      />
      <Dialog open={detailOpen} onClose={handleDetailClose} maxWidth="md">
        <DialogTitle className="pb-0 flex justify-between">
          <Typography variant="h4">Thông tin người dùng</Typography>
          {/* <IconButton
            className="border-none"
            variant="outlined"
            onClick={handleDetailOpen}
          >
            <CloseIcon />
          </IconButton> */}
        </DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          {users?.object.status === "BLOCKED" ? (
            <Button variant="gradient" color="green">
              <span>Khôi phục</span>
            </Button>
          ) : (
            <Button variant="gradient" color="red">
              <span>Khóa tài khoản</span>
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default User;
