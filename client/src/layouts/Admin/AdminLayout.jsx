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
import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import useOpen from "../../hooks/useOpen";
import Table from "../../components/shared/Table";
import Tablist from "../../components/shared/Tablist";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { Toast } from "../../configs/SweetAlert2";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteBrandMutation } from "../../apis/BrandApi";

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
}) => {
  const [tab, setTab] = useState("ALL");
  const selectedId = useSelector((state) => state.selectedId.value);

  const {
    detailOpen,
    updateOpen,
    deleteOpen,
    handleDetailOpen,
    handleUpdateOpen,
    handleDeleteOpen,
  } = useOpen();
  React.useEffect(() => {
    if (deleteOpen) {
      Swal.fire({
        title:
          "Bạn có chắc chắn muốn xóa?" +
          (selectedId === -1 ? "" : TABLE_ROWS.find(row => row.id === selectedId)?.name || ""),
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
        handleDeleteOpen();
      });
    }
  }, [
    deleteOpen,
    handleDeleteOpen,
    TABLE_ROWS,
    selectedId,
    handleDeleteSubmit,
  ]);
  const handleUpdateSubmit = async () => {
    try {
      const message = await updateSubmit();
      if (message.data.statusCode === 200) {
        Toast.fire({
          icon: "success",
          title: "Cập nhật thành công",
        }).then(() => {
          handleUpdateOpen();
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
        handler={handleDetailOpen}
        size={size}
        className={overflow ? "h-[80vh] overflow-auto" : ""}
      >
        <DialogHeader>{headerDetail}</DialogHeader>
        <DialogBody>{bodyDetail}</DialogBody>
        <div className="flex items-center justify-end">
          {!noUpdate && (
            <DialogFooter>
              <Button
                variant="gradient"
                color="green"
                onClick={() => {
                  handleDetailOpen(), handleUpdateOpen();
                }}
              >
                <span>Cập nhật</span>
              </Button>
            </DialogFooter>
          )}
          {!noDelete && (
            <DialogFooter>
              <Button
                variant="gradient"
                color="red"
                loading={isDeleted}
                onClick={() => {
                  handleDetailOpen(), handleDeleteOpen();
                }}
              >
                <span>Xóa</span>
              </Button>
            </DialogFooter>
          )}
        </div>
      </Dialog>
      <Dialog open={updateOpen} handler={handleUpdateOpen} size={sizeUpdate}>
        <DialogHeader>{headerUpdate}</DialogHeader>
        <DialogBody>{bodyUpdate}</DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="green"
            loading={isUpdated}
            onClick={handleUpdateSubmit}
          >
            {!isUpdated && <span>Xác nhận</span>}
          </Button>
        </DialogFooter>
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
