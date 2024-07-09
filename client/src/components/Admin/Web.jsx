import React from "react";
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
} from "@material-tailwind/react";
import { Container, Rating } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TableHeader from "../../layouts/TableHeader";
import { web } from "../../constants/table_head";
import Table from "../../layouts/Table";
import useOpen from "../../hooks/useOpen";
import AdminLayout from "../../layouts/Admin/AdminLayout";
import { Toast } from "../../configs/SweetAlert2";
import Swal from "sweetalert2";
const Web = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
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
    },
  ];
  React.useEffect(() => {
    if (updateOpen) {
      Swal.fire({
        title: "Bạn chắc chắn muốn khôi phục chứ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#f50057",
        cancelButtonColor: "#2962ff",
      }).then((result) => {
        if (result.isConfirmed) {
          Toast.fire({
            icon: "success",
            title: "Khôi phục thành công",
          });
        }
        handleUpdateOpen();
      });
    }
  }, [updateOpen, handleUpdateOpen]);
  React.useEffect(() => {
    if (deleteOpen) {
      Swal.fire({
        title: "Bạn chắc chắn muốn bảo trì chứ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#f50057",
        cancelButtonColor: "#2962ff",
      }).then((result) => {
        if (result.isConfirmed) {
          Toast.fire({
            icon: "success",
            title: "Trang đã vào trạng thái bảo trì",
          });
        }
        handleDeleteOpen();
      });
    }
  }, [deleteOpen, handleDeleteOpen]);
  return (
    <>
      {/* <AdminLayout
        name="Danh sách trang web"
        TABLE_HEAD={web}
        TABLE_ROWS={TABLE_ROWS}
        active={active}
        setActive={setActive}
        handleUpdateOpen={handleUpdateOpen}
        handleDeleteOpen={handleDeleteOpen}
        handleDetailOpen={handleDetailOpen}
        updateContent="Khôi phục trang web"
        deleteContent="Bảo trì trang web"
      ></AdminLayout> */}
      <Container className="mt-5">
        <div className="flex items-center justify-between mb-5">
          <Typography variant="h4" color="blue-gray" className="font-bold">
            Danh sách trang web
          </Typography>
          <div className="flex items-center justify-between gap-4">
            {/* <Button
              className=" !border-gray-300"
              color="gray"
              variant="outlined"
            >
              Thêm mới
            </Button> */}
            {/* <Select label="Phân loại theo">
              <Option value="">Không có</Option>
              <Option value="Color">Thương hiệu</Option>
              <Option value="Color">Loại sản phẩm</Option>
              <Option value="Size">Kích thước</Option>
              <Option value="Material">Chất liệu</Option>
              <Option value="Type">Loại sản phẩm</Option>
            </Select>
            <Input
              size="sm"
              label="Tìm kiếm"
              iconFamily="material-icons"
              iconName="search"
              placeholder="Tìm kiếm sản phẩm"
            /> */}
          </div>
        </div>
        <Table
          TABLE_HEAD={web}
          TABLE_ROWS={TABLE_ROWS}
          active={active}
          setActive={setActive}
          handleUpdateOpen={handleUpdateOpen}
          handleDeleteOpen={handleDeleteOpen}
          handleDetailOpen={handleDetailOpen}
          updateContent="Khôi phục trang web"
          deleteContent="Bảo trì trang web"
        />
      </Container>
    </>
  );
};

export default Web;
