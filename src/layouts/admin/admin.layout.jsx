import {
  Button,
  Card,
  IconButton,
  Typography,
  Tooltip,
  Input,
  Tabs,
  TabsHeader,
  Tab,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Container,
  Rating,
} from "@mui/material";
import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import useOpen from "../../hooks/useOpen.hook";
import Table from "../../components/shared/table.component";
import Tablist from "../../components/shared/list_tab.component";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { Toast } from "../../configs/sweetalert2.config";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteBrandMutation } from "../../apis/brand.api";

const AdminLayout = ({
  children,
  name,
  tablist,
  TABLE_HEAD,
  TABLE_ROWS,
  noDelete,
  noUpdate,
  noDetail,
  updateContent,
  deleteContent,
  headerDetail,
  bodyDetail,
  headerUpdate,
  bodyUpdate,
  size,
  sizeUpdate,
  overflow,
  updateSubmit,
  handleDeleteSubmit,
  isUpdated,
  isDeleted,
  tab,
  setTab,
}) => {
  const selectedId = useSelector((state) => state.selectedId.value);

  const {
    detailOpen,
    updateOpen,
    deleteOpen,
    handleDetailOpen,
    handleUpdateOpen,
    handleDeleteOpen,
    handleDetailClose,
    handleUpdateClose,
    handleDeleteClose,
  } = useOpen();
  React.useEffect(() => {
    if (deleteOpen) {
      Swal.fire({
        title:
          "Bạn có chắc chắn muốn xóa?" +
          (selectedId === -1
            ? ""
            : TABLE_ROWS.find((row) => row.id === selectedId)?.name || ""),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#f50057",
        cancelButtonColor: "#2962ff",
      }).then((result) => {
        if (result.isConfirmed) {
          handleDeleteSubmit();
        }
        handleDeleteClose();
      });
    }
  }, [
    deleteOpen,
    TABLE_ROWS,
    selectedId,
    handleDeleteSubmit,
    handleDeleteClose,
  ]);
  const handleUpdateSubmit = async () => {
    try {
      const message = await updateSubmit();
      if (message.data.statusCode === 200) {
        Toast.fire({
          icon: "success",
          title: "Cập nhật thành công",
        }).then(() => {
          handleUpdateClose();
        });
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Cập nhật thất bại",
      });
    }
  };

  return (
    <>
      <Container className="mt-5">
        <div className="flex items-center justify-between mb-5">
          <Typography variant="h4" color="blue-gray" className="font-bold">
            {name}
          </Typography>
          {children}
        </div>

        {tablist && <Tablist TABS={tablist} tab={tab} setTab={setTab} />}

        {noDetail ? (
          <Table
            TABLE_HEAD={TABLE_HEAD}
            TABLE_ROWS={TABLE_ROWS}
            handleUpdateOpen={handleUpdateOpen}
            handleDeleteOpen={handleDeleteOpen}
            updateContent={updateContent}
            deleteContent={deleteContent}
            noDelete={noDelete}
            noUpdate={noUpdate}
            isDeleted={isDeleted}
          />
        ) : (
          <Table
            TABLE_HEAD={TABLE_HEAD}
            TABLE_ROWS={TABLE_ROWS}
            handleUpdateOpen={handleUpdateOpen}
            handleDeleteOpen={handleDeleteOpen}
            handleDetailOpen={handleDetailOpen}
            updateContent={updateContent}
            deleteContent={deleteContent}
            noDelete={noDelete}
            noUpdate={noUpdate}
            isDeleted={isDeleted}
          />
        )}
      </Container>
      <Dialog
        open={detailOpen}
        onClose={handleDetailClose}
        maxWidth={size}
        className={overflow ? "h-[100vh] overflow-auto" : ""}
      >
        <DialogTitle>
          <Typography variant="h4">{headerDetail}</Typography>
        </DialogTitle>
        <DialogContent>{bodyDetail}</DialogContent>
        <DialogActions className="flex items-center justify-end">
          {!noUpdate && (
            <Button
              variant="gradient"
              color="green"
              onClick={() => {
                handleDetailClose(), handleUpdateOpen();
              }}
            >
              <span>Cập nhật</span>
            </Button>
          )}
          {!noDelete && (
            <Button
              variant="gradient"
              color="red"
              loading={isDeleted}
              onClick={() => {
                handleDetailClose(), handleDetailOpen();
              }}
            >
              <span>Xóa</span>
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Dialog
        open={updateOpen}
        onClose={handleUpdateClose}
        maxWidth={sizeUpdate}
      >
        <DialogTitle>
          <Typography variant="h4">{headerUpdate}</Typography>
        </DialogTitle>
        <DialogContent>{bodyUpdate}</DialogContent>
        <DialogActions>
          <Button
            variant="gradient"
            color="green"
            loading={isUpdated}
            onClick={handleUpdateSubmit}
          >
            {!isUpdated && <span>Xác nhận</span>}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  tablist: PropTypes.array,
  TABLE_HEAD: PropTypes.array.isRequired,
  TABLE_ROWS: PropTypes.array.isRequired,
  noDelete: PropTypes.bool,
  noUpdate: PropTypes.bool,
  noDetail: PropTypes.bool,
  updateContent: PropTypes.string,
  deleteContent: PropTypes.string,
  headerDetail: PropTypes.string,
  bodyDetail: PropTypes.node,
  headerUpdate: PropTypes.string,
  bodyUpdate: PropTypes.node,
  size: PropTypes.string,
  sizeUpdate: PropTypes.string,
  overflow: PropTypes.bool,
};
export default AdminLayout;
