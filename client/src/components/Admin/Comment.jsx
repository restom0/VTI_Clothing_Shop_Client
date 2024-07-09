import {
  Button,
  Card,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
  Dialog,
  Tooltip,
  Input,
  Tabs,
  TabsHeader,
  Tab,
  Select,
  Option,
  CardFooter,
} from "@material-tailwind/react";
import { Container, Rating, TableHead } from "@mui/material";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import Pagination from "../../layouts/Pagination";
import { comment } from "../../constants/table_head";
import TableHeader from "../../layouts/TableHeader";
import SettingButton from "../../layouts/Admin/SettingButton";
import useOpen from "../../hooks/useOpen";
import AdminPagination from "../../layouts/Admin/AdminPagination";
import Table from "../../layouts/Table";
import AdminLayout from "../../layouts/Admin/AdminLayout";

const Comment = () => {
  const [active, setActive] = React.useState(1);
  const {
    detailOpen,
    handleDetailOpen,
    updateOpen,
    handleUpdateOpen,
    deleteOpen,
    handleDeleteOpen,
  } = useOpen();

  const TABLE_ROWS = [
    {
      name: "001",
      role: "USER",
      action: "Tạo tài khoản",
      date: "23/04/18",
    },
  ];
  return (
    <>
      <AdminLayout
        name="Lượt bình luận"
        TABLE_HEAD={comment}
        TABLE_ROWS={TABLE_ROWS}
        active={active}
        setActive={setActive}
        handleUpdateOpen={handleUpdateOpen}
        handleDeleteOpen={handleDeleteOpen}
        updateContent=""
        deleteContent="Khóa bình luận"
        noUpdate
        size="lg"
        headerDetail="Chi tiết bình luận #001"
        bodyDetail={
          <Container>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-4">
                  <Typography variant="h6">Người bình luận: </Typography>
                  <Typography variant="small">Nguyễn Văn A</Typography>
                </div>
                <div className="flex items-center gap-4">
                  <Typography variant="h6">Sản phẩm: </Typography>
                  <Typography variant="small">Áo thun nam</Typography>
                </div>
                <div className="flex items-center gap-4">
                  <Typography variant="h6">Đánh giá: </Typography>
                  <Rating value={4} readOnly />
                </div>
                <div className="flex items-center gap-4">
                  <Typography variant="h6">Nội dung: </Typography>
                </div>
                <Typography variant="small">
                  Áo thun đẹp, chất lượng tốt, giá hợp lý
                </Typography>
              </div>
              <div className="mx-auto">
                <img
                  src="https://media3.coolmate.me/cdn-cgi/image/format=auto/uploads/April2024/QKK.EC.xamden4.jpg"
                  alt=""
                  className="w-64 h-64 object-cover"
                />
              </div>
            </div>
          </Container>
        }
        headerUpdate=""
        bodyUpdate=""
      >
        <div className="flex items-center justify-between gap-4">
          <Select label="Phân loại theo">
            <Option value="new" defaultChecked>
              Mới nhất
            </Option>
            <Option value="old">Cũ nhất</Option>
          </Select>
        </div>
      </AdminLayout>
    </>
  );
};

export default Comment;
