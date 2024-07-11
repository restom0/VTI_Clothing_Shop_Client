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
}) => {
  const [tab, setTab] = useState("ALL");
  const [active, setActive] = useState(1);
  const {
    detailOpen,
    updateOpen,
    deleteOpen,
    data,
    handleDetailOpen,
    handleUpdateOpen,
    handleDeleteOpen,
    handleData,
  } = useOpen();
  React.useEffect(() => {
    if (deleteOpen) {
      Swal.fire({
        title: "Bạn có chắc chắn muốn xóa?",
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
            title: "Xóa thành công",
          });
        }
        handleDeleteOpen();
      });
    }
  }, [deleteOpen, handleDeleteOpen]);
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
            active={active}
            setActive={setActive}
            handleUpdateOpen={handleUpdateOpen}
            handleDeleteOpen={handleDeleteOpen}
            updateContent={updateContent}
            deleteContent={deleteContent}
            noDelete={noDelete}
            noUpdate={noUpdate}
            data={data}
            handleData={handleData}
          />
        ) : (
          <Table
            TABLE_HEAD={TABLE_HEAD}
            TABLE_ROWS={TABLE_ROWS}
            active={active}
            setActive={setActive}
            handleUpdateOpen={handleUpdateOpen}
            handleDeleteOpen={handleDeleteOpen}
            handleDetailOpen={handleDetailOpen}
            updateContent={updateContent}
            deleteContent={deleteContent}
            noDelete={noDelete}
            noUpdate={noUpdate}
            data={data}
            handleData={handleData}
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
          <Button variant="gradient" color="green" onClick={handleUpdateOpen}>
            <span>Xác nhận</span>
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
  updateContent: PropTypes.node.isRequired,
  deleteContent: PropTypes.node.isRequired,
  headerDetail: PropTypes.node.isRequired,
  bodyDetail: PropTypes.node.isRequired,
  headerUpdate: PropTypes.node.isRequired,
  bodyUpdate: PropTypes.node.isRequired,
  size: PropTypes.string.isRequired,
};
export default AdminLayout;
