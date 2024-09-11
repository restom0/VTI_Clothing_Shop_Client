import React, { useEffect } from "react";
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
  Option,
} from "@material-tailwind/react";
import {
  TextField,
  Select,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Menu,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { Container, Divider } from "@mui/material";
import {
  changePriceList,
  onsaleproduct,
  voucher,
  voucherDetail,
} from "../../constants/table_head";
import useOpen from "../../hooks/useOpen";
import Pagination from "../shared/Pagination";
import TableHeader from "../shared/TableHeader";
import AdminLayout from "../../layouts/Admin/AdminLayout";
import CloseIcon from "@mui/icons-material/Close";
import {
  useAddVoucherMutation,
  useDeleteVoucherMutation,
  useGetVouchersQuery,
  useUpdateVoucherMutation,
} from "../../apis/VoucherApi";
import Loading from "../shared/Loading";
import Errorpage from "../../pages/Errorpage";
import { useSelector } from "react-redux";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { Toast } from "../../configs/SweetAlert2";
const TABLE_ROWS = [
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
  {
    name: "001",
    role: "USER",
    action: "Tạo tài khoản",
    date: "23/04/18",
  },
];
const Voucher = () => {
  const [subActive, setSubActive] = React.useState(1);
  const [code, setCode] = React.useState(null);
  const [inputStock, setInputStock] = React.useState(null);
  const [value, setValue] = React.useState(null);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [updateCode, setUpdateCode] = React.useState(null);
  const [updateInputStock, setUpdateInputStock] = React.useState(null);
  const [updateValue, setUpdateValue] = React.useState(null);
  const [updateStartDate, setUpdateStartDate] = React.useState(null);
  const [updateEndDate, setUpdateEndDate] = React.useState(null);
  const selectedId = useSelector((state) => state.selectedId.value);

  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpens = () => setOpens(true);
  const handleClose = () => setOpen(false);
  const handleCloses = () => setOpen(false);
  const {
    data: vouchers,
    isLoading: vouchersLoading,
    isError: vouchersError,
  } = useGetVouchersQuery();
  const [addVoucher, { isLoading: isAdded, isError: addError }] =
    useAddVoucherMutation();
  const [updateVoucher, { isLoading: isUpdated, isError: updateError }] =
    useUpdateVoucherMutation();
  const [deleteVoucher, { isLoading: isDeleted, isError: deleteError }] =
    useDeleteVoucherMutation();
  useEffect(() => {
    if (selectedId !== 1) {
      setUpdateCode(
        vouchers?.object.find((voucher) => voucher.id === selectedId)?.code
      );
      setUpdateValue(
        vouchers?.object.find((voucher) => voucher.id === selectedId)?.value
      );
      setUpdateInputStock(
        vouchers?.object.find((voucher) => voucher.id === selectedId)?.stock
      );
      setUpdateStartDate(
        new Date(
          vouchers?.object.find(
            (voucher) => voucher.id === selectedId
          )?.available_date
        )
      );
      setUpdateEndDate(
        new Date(
          vouchers?.object.find(
            (voucher) => voucher.id === selectedId
          )?.expired_date
        )
      );
    }
  }, [selectedId, vouchers?.object]);
  if (vouchersLoading) return <Loading />;
  if (vouchersError) return <Errorpage />;

  const handleAddSubmit = async () => {
    try {
      const message = await addVoucher({
        code,
        input_stock: inputStock,
        value,
        available_date: startDate,
        expired_date: endDate,
      }).unwrap();
      Toast.fire({
        icon: "success",
        title: "Thêm thành công",
      }).then(() => {
        setCode(null);
        setInputStock(null);
        setValue(null);
        setStartDate(null);
        setEndDate(null);
        handleClose();
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.data.message,
      });
    }
  };
  const handleUpdateSubmit = async () => {
    try {
      const message = await updateVoucher({
        id: selectedId,
        code: updateCode,
        input_stock: updateInputStock,
        value: updateValue,
        available_date: updateStartDate,
        expired_date: updateEndDate,
      });
      return message;
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.data.message,
      });
    }
  };
  const listVouchers = vouchers.object.map((item, index) => {
    return {
      id: item.id,
      code: item.code,
      value: item.value + " %",
      input_stock: item.stock,
      available_date: new Date(item.available_date).toLocaleDateString("en-GB"),
      expired_date: new Date(item.expired_date).toLocaleDateString("en-GB"),
    };
  });
  return (
    <>
      <AdminLayout
        name="Khuyến mãi"
        updateSubmit={handleUpdateSubmit}
        TABLE_HEAD={voucher}
        TABLE_ROWS={listVouchers ? listVouchers : []}
        updateContent="Chỉnh sửa"
        deleteContent="Xóa"
        size="xl"
        headerDetail={"Chi tiết Voucher #" + "001"}
        bodyDetail={
          <Container>
            <div>
              <Typography
                variant="h4"
                color="blue-gray"
                className="font-bold col-span-2 text-center mb-5"
              >
                Thông tin nhập
              </Typography>
              <div className="mx-auto">
                <div className="grid grid-cols-3 gap-4 mb-5">
                  <Typography
                    variant="h6"
                    className="my-auto"
                    color="blue-gray"
                  >
                    Mã nhập:
                  </Typography>
                  <Typography className="my-auto col-span-2" color="blue-gray">
                    {
                      vouchers?.object.find(
                        (voucher) => voucher.id === selectedId
                      )?.code
                    }
                  </Typography>

                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="my-auto"
                  >
                    Giảm giá:
                  </Typography>
                  <Typography className="my-auto col-span-2" color="blue-gray">
                    {vouchers?.object.find(
                      (voucher) => voucher.id === selectedId
                    )?.value + " %"}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="my-auto"
                  >
                    Số lượng:
                  </Typography>
                  <Typography className="my-auto col-span-2" color="blue-gray">
                    {
                      vouchers?.object.find(
                        (voucher) => voucher.id === selectedId
                      )?.stock
                    }
                  </Typography>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="my-auto"
                  >
                    Ngày áp dụng:
                  </Typography>
                  <Typography className="my-auto col-span-2" color="blue-gray">
                    {new Date(
                      vouchers?.object.find(
                        (voucher) => voucher.id === selectedId
                      )?.available_date
                    ).toLocaleDateString("en-GB")}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="my-auto"
                  >
                    Ngày kết thúc:
                  </Typography>
                  {new Date(
                    vouchers?.object.find(
                      (voucher) => voucher.id === selectedId
                    )?.expired_date
                  ).toLocaleDateString("en-GB")}
                </div>
              </div>
            </div>
          </Container>
        }
        sizeUpdate="xl"
        headerUpdate={"Chỉnh sửa lần nhập giá #" + "001"}
        bodyUpdate={
          <Container>
            <div>
              <Typography
                variant="h4"
                color="blue-gray"
                className="font-bold col-span-2 text-center mb-5"
              >
                Thông tin nhập
              </Typography>
              <div className="mx-auto">
                <div className="grid grid-cols-3 gap-4 mb-5">
                  <Typography
                    variant="h6"
                    className="my-auto"
                    color="blue-gray"
                  >
                    Mã nhập:
                  </Typography>
                  <TextField
                    className="col-span-2"
                    size="small"
                    value={updateCode}
                    onChange={(e) => setUpdateCode(e.target.value)}
                  />

                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="my-auto"
                  >
                    Giảm giá:
                  </Typography>
                  <OutlinedInput
                    className="col-span-2"
                    size="small"
                    value={updateValue}
                    onChange={(e) =>
                      setUpdateValue(
                        isNaN(e.target.value) || e.target.value < 0
                          ? 0
                          : e.target.value > 100
                          ? 100
                          : e.target.value
                      )
                    }
                    endAdornment={
                      <InputAdornment position="end">%</InputAdornment>
                    }
                  />
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="my-auto"
                  >
                    Số lượng:
                  </Typography>
                  <OutlinedInput
                    endAdornment={
                      <InputAdornment position="end">đơn vị</InputAdornment>
                    }
                    className="col-span-2"
                    size="small"
                    value={updateInputStock}
                    onChange={(e) =>
                      setUpdateInputStock(
                        isNaN(e.target.value) || e.target.value < 0
                          ? 0
                          : e.target.value
                      )
                    }
                  />
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="my-auto"
                  >
                    Ngày áp dụng:
                  </Typography>
                  <div className="col-span-2">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          //label="Ngày áp dụng"
                          slotProps={{
                            textField: {
                              size: "medium",
                              required: true,
                              className: "w-full",
                            },
                          }}
                          value={dayjs(updateStartDate)}
                          onChange={(newValue) => setUpdateStartDate(newValue)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="my-auto"
                  >
                    Ngày kết thúc:
                  </Typography>
                  <div className="col-span-2">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          slotProps={{
                            textField: {
                              size: "medium",
                              required: true,
                              className: "w-full",
                            },
                          }}
                          value={dayjs(updateEndDate)}
                          onChange={(newValue) => setUpdateEndDate(newValue)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        }
      >
        <div className="w-5/12 flex items-center justify-between gap-8">
          <Button
            className=" !border-gray-300 w-full"
            color="gray"
            variant="outlined"
            onClick={handleOpen}
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

          {/* <Select label="Phân loại theo">
              <Option value="">Không có</Option>
              <Option value="Color">Thương hiệu</Option>
              <Option value="Color">Loại sản phẩm</Option>
              <Option value="Size">Kích thước</Option>
              <Option value="Material">Chất liệu</Option>
              <Option value="Type">Loại sản phẩm</Option>
            </Select> */}
        </div>
      </AdminLayout>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        className="overflow-y-auto"
      >
        <DialogTitle className="pb-0 flex justify-between">
          <Typography variant="h4">Thêm mã giảm giá</Typography>
          <IconButton
            className="border-none"
            variant="outlined"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Container>
            <div>
              <Typography
                variant="h4"
                color="blue-gray"
                className="font-bold col-span-2 text-center mb-5"
              >
                Thông tin nhập
              </Typography>
              <div className="mx-auto">
                <div className="grid grid-cols-3 gap-4 mb-5">
                  <Typography
                    variant="h6"
                    className="my-auto"
                    color="blue-gray"
                  >
                    Mã nhập:
                  </Typography>
                  <TextField
                    className="col-span-2"
                    size="small"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />

                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="my-auto"
                  >
                    Giảm giá:
                  </Typography>
                  <OutlinedInput
                    className="col-span-2"
                    size="small"
                    value={value}
                    onChange={(e) =>
                      setValue(
                        isNaN(e.target.value) || e.target.value < 0
                          ? 0
                          : e.target.value > 100
                          ? 100
                          : e.target.value
                      )
                    }
                    endAdornment={
                      <InputAdornment position="end">%</InputAdornment>
                    }
                  />
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="my-auto"
                  >
                    Số lượng:
                  </Typography>
                  <OutlinedInput
                    endAdornment={
                      <InputAdornment position="end">đơn vị</InputAdornment>
                    }
                    className="col-span-2"
                    size="small"
                    value={inputStock}
                    onChange={(e) =>
                      setInputStock(
                        isNaN(e.target.value) || e.target.value < 0
                          ? 0
                          : e.target.value
                      )
                    }
                  />
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="my-auto"
                  >
                    Ngày áp dụng:
                  </Typography>
                  <div className="col-span-2">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          //label="Ngày áp dụng"
                          slotProps={{
                            textField: {
                              size: "medium",
                              required: true,
                              className: "w-full",
                            },
                          }}
                          value={dayjs(startDate)}
                          onChange={(newValue) => setStartDate(newValue)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="my-auto"
                  >
                    Ngày kết thúc:
                  </Typography>
                  <div className="col-span-2">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          slotProps={{
                            textField: {
                              size: "medium",
                              required: true,
                              className: "w-full",
                            },
                          }}
                          value={dayjs(endDate)}
                          onChange={(newValue) => setEndDate(newValue)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button variant="gradient" color="green" onClick={handleAddSubmit}>
            <span>Xác nhận</span>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Voucher;
