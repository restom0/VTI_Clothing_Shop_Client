import React, { useEffect, useState } from "react";
import { input, Input, Option } from "@material-tailwind/react";
import dayjs from "dayjs";

import {
  Card,
  IconButton,
  Dialog,
  Container,
  Divider,
  FormControl,
  InputLabel,
  Pagination,
  Rating,
  Select,
  MenuItem,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { Typography, Button } from "@material-tailwind/react";
import {
  changePriceList,
  changePricesList,
  onsaleproduct,
} from "../../constants/head_table";
import AdminLayout from "../../layouts/admin/admin.layout";
import TableHeader from "../shared/header_table";
import CloseIcon from "@mui/icons-material/Close";
import {
  useCreateInputSaleMutation,
  useDeleteInputSaleMutation,
  useGetInputSalesQuery,
  useUpdateInputSaleMutation,
} from "../../apis/input_on_sale.api";
import Loading from "../shared/loading.component";
import { filter_items } from "../../constants/menu_item.constant";
import { useGetBrandsQuery } from "../../apis/brand.api";
import { useGetCategoriesQuery } from "../../apis/category.api";
import {
  useGetColorsQuery,
  useGetImportedProductQuery,
  useGetImportedProductsQuery,
  useGetMaterialsQuery,
  useGetSizesQuery,
} from "../../apis/import_product.api";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useGetProductsQuery } from "../../apis/product.api";
import { useSelector } from "react-redux";
import { Toast } from "../../configs/sweetalert2.config";

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
const OnsaleProduct = () => {
  const [filters, setFilters] = React.useState("ALL");
  const [values, setValues] = React.useState(null);
  const [prices, setPrices] = React.useState(100);
  const [discounts, setDiscounts] = React.useState(0);
  const [startDates, setStartDates] = React.useState(null);
  const [endDates, setEndDates] = React.useState(null);
  const [value, setValue] = React.useState(null);
  const [price, setPrice] = React.useState(100);
  const [discount, setDiscount] = React.useState(0);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [import_product, setImport_Product] = React.useState(null);
  const [updateImport_Product, setUpdateImport_Product] = React.useState(null);
  const [updateSalePercentage, setUpdateSalePercentage] = React.useState(100);
  const [updateDiscount, setUpdateDiscount] = React.useState(0);
  const [updateStartDate, setUpdateStartDate] = React.useState(null);
  const [updateEndDate, setUpdateEndDate] = React.useState(null);
  const [updateFilter, setUpdateFilter] = React.useState(null);
  const [updateFilterId, setUpdateFilterId] = React.useState(null);
  const [active, setActive] = React.useState(1);
  const [subActive, setSubActive] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const handleOpen = () => {
    setFilters("PRODUCT");
    setOpen(true);
  };
  const handleOpens = () => setOpens(true);
  const selectedId = useSelector((state) => state.selectedId.value);
  const { data: inputSale, error, isLoading } = useGetInputSalesQuery();
  const {
    data: products,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsQuery();
  const {
    data: brands,
    error: brandsError,
    isLoading: brandsLoading,
  } = useGetBrandsQuery();
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery();
  const {
    data: colors,
    error: colorsError,
    isLoading: colorsLoading,
  } = useGetColorsQuery();
  const {
    data: sizes,
    error: sizesError,
    isLoading: sizesLoading,
  } = useGetSizesQuery();
  const {
    data: materials,
    error: materialsError,
    isLoading: materialsLoading,
  } = useGetMaterialsQuery();
  const {
    data: import_products,
    error: import_productsError,
    isLoading: import_productsLoading,
  } = useGetImportedProductsQuery();
  const {
    data: previews,
    error: previewsError,
    isLoading: previewsLoading,
  } = useGetImportedProductQuery(
    { filter: filters, id: values },
    {
      skip: !values && filters !== "ALL",
    }
  );

  const {
    data: updatePreviews,
    error: updatePreviewsError,
    isLoading: updatePreviewsLoading,
  } = useGetImportedProductQuery(
    { filter: updateFilter, id: updateFilterId },
    {
      skip: !updateFilterId && updateFilter !== "ALL",
    }
  );

  useEffect(() => {
    if (values || (!values && filters === "ALL")) {
      setImport_Product(
        previews?.object.map((preview) => {
          return {
            sku: preview.product_id.name,
            color: preview.color_id.color_name,
            size: preview.size_id.size,
            material: preview.material_id.name,
            importPrice: preview.importPrice.toLocaleString("en-US"),
            salePrice: (
              ((preview.importPrice * prices) / 100) *
              (1 - discounts / 100)
            ).toLocaleString("en-US"),
          };
        }) || []
      );
    }
  }, [values, previews, filters, prices, discounts]);
  useEffect(() => {
    if (setUpdateFilter || (!setUpdateFilter && updateFilter === "ALL")) {
      setUpdateImport_Product(
        updatePreviews?.object.map((preview) => {
          return {
            sku: preview.product_id.name,
            importPrice: preview.importPrice.toLocaleString("en-US"),
            salePrice: (
              ((preview.importPrice * updateSalePercentage) / 100) *
              (1 - updateDiscount / 100)
            ).toLocaleString("en-US"),
          };
        }) || []
      );
    }
  }, [
    updateFilter,
    updatePreviews,
    updateSalePercentage,
    updateDiscount,
    discounts,
    prices,
  ]);
  useEffect(() => {
    if (selectedId !== -1) {
      const search = inputSale?.object.find((item) => item.id === selectedId);
      setUpdateFilter(search?.filter);
      setUpdateFilterId(search?.filter_id);
      setUpdateSalePercentage(search?.salePercentage);
      setUpdateDiscount(search?.discount);
      setUpdateStartDate(search?.available_date);
      setUpdateEndDate(search?.end_date);
    }
  }, [selectedId, inputSale?.object]);
  const [createInputSale, { error: addError, isLoading: isAdded }] =
    useCreateInputSaleMutation();
  const [updateInputSale, { error: updateError, isLoading: isUpdated }] =
    useUpdateInputSaleMutation();
  const [deleteInputSale, { error: deleteError, isLoading: isDeleted }] =
    useDeleteInputSaleMutation();
  if (
    isLoading ||
    brandsLoading ||
    colorsLoading ||
    sizesLoading ||
    categoriesLoading ||
    materialsLoading ||
    productsLoading ||
    import_productsLoading
  )
    return <Loading />;
  else if (
    error ||
    brandsError ||
    categoriesError ||
    materialsError ||
    sizesError ||
    colorsError ||
    productsError ||
    import_productsError
  )
    return <div>Error: {error.message}</div>;
  const handleCloseOpens = () => {
    setOpens(false);
  };
  const handleCloseOpen = () => {
    setOpen(false);
  };
  const handleAddImportedProduct = async () => {
    try {
      const message = await createInputSale({
        filter: filters,
        filter_id: value,
        salePercentage: Number(price),
        discount: Number(discount),
        available_date: startDate,
        end_date: endDate,
      }).unwrap();
      Toast.fire({
        icon: "success",
        title: "Thêm sản phẩm thành công",
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.data.message,
      });
    }
  };
  const handleAddImportedProducts = async () => {
    try {
      const message = await createInputSale({
        filter: filters,
        filter_id: values || 1,
        salePercentage: Number(prices),
        discount: Number(discounts),
        available_date: startDates,
        end_date: endDates,
      }).unwrap();
      Toast.fire({
        icon: "success",
        title: "Thêm sản phẩm thành công",
      }).then(() => {
        handleCloseOpen();
        handleCloseOpens();
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.data.message,
      });
    }
  };
  const handleResetAddImportedProduct = async () => {
    setPrice(100);
    setDiscount(0);
    setValue(null);
    setStartDate(null);
    setEndDate(null);
  };
  const handleResetAddImportedProducts = async () => {
    setFilters("ALL");
    setPrices(100);
    setDiscounts(0);
    setValues(null);
    setStartDates(null);
    setEndDates(null);
  };
  const ListInputSales = inputSale?.object.map((item, index) => {
    return {
      id: item.id,
      filter: item.filter,
      filter_id: item.filter_id,
      salePercentage: item.salePercentage + "%",
      discount: item.discount + "%",
      available_date: new Date(item.available_date).toLocaleDateString("en-GB"),
      end_date: item.end_date
        ? new Date(item.end_date).toLocaleDateString("en-GB")
        : "Không có",
    };
  });
  const handleUpdateInputSales = async () => {
    try {
      const message = await updateInputSale({
        id: selectedId,
        salePercentage: Number(updateSalePercentage),
        discount: Number(updateDiscount),
        available_date: updateStartDate,
        end_date: updateEndDate,
      });
      return message;
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error,
      });
    }
  };
  const handleDeleteSubmit = async () => {
    try {
      const message = await deleteInputSale(selectedId);
      return message;
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error,
      });
    }
  };
  return (
    <>
      <AdminLayout
        updateSubmit={handleUpdateInputSales}
        name="Lên giá sản phẩm"
        TABLE_HEAD={onsaleproduct}
        TABLE_ROWS={ListInputSales ? ListInputSales : []}
        updateContent="Chỉnh sửa"
        deleteContent="Xóa"
        size="xl"
        handleDeleteSubmit={handleDeleteSubmit}
        headerDetail={"Chi tiết lần nhập giá"}
        bodyDetail={
          <Container>
            <div className="grid grid-cols-3 mb-5">
              <Typography
                variant="h4"
                color="blue-gray"
                className="font-bold col-span-3 text-center mb-5"
              >
                Thông tin nhập
              </Typography>
              <div className="mx-auto">
                <div className="text-center flex items-center gap-4">
                  <Typography variant="h6" color="blue-gray">
                    Loại nhập:
                  </Typography>
                  <Typography variant="body" className="" color="blue-gray">
                    {
                      inputSale.object.find((item) => item.id === selectedId)
                        ?.filter
                    }
                  </Typography>
                </div>
                <div className="text-center flex items-center gap-4">
                  <Typography variant="h6" color="blue-gray">
                    Tên:
                  </Typography>
                  <Typography variant="body" className="" color="blue-gray">
                    {
                      inputSale.object.find((item) => item.id === selectedId)
                        ?.filter_id
                    }
                  </Typography>
                </div>
              </div>
              <div className="mx-auto">
                <div className="text-center flex items-center gap-4">
                  <Typography variant="h6" color="blue-gray">
                    Giá trị gia tăng:
                  </Typography>
                  <Typography variant="body" className="" color="blue-gray">
                    {inputSale.object.find((item) => item.id === selectedId)
                      ?.salePercentage + "%"}
                  </Typography>
                </div>
                <div className="text-center flex items-center gap-4">
                  <Typography variant="h6" color="blue-gray">
                    Giảm giá:
                  </Typography>
                  <Typography variant="body" className="" color="blue-gray">
                    {inputSale.object.find((item) => item.id === selectedId)
                      ?.discount + "%"}
                  </Typography>
                </div>
              </div>
              <div className="mx-auto">
                <div className="text-center flex items-center gap-4">
                  <Typography variant="h6" color="blue-gray">
                    Ngày áp dụng
                  </Typography>
                  <Typography variant="body" className="" color="blue-gray">
                    {
                      new Date(
                        inputSale.object.find(
                          (item) => item.id === selectedId
                        )?.available_date
                      )
                        .toLocaleString("en-GB")
                        .split(",")[0]
                    }
                  </Typography>
                </div>
                <div className="text-center flex items-center gap-4">
                  <Typography variant="h6" color="blue-gray">
                    Ngày kết thúc
                  </Typography>
                  <Typography variant="body" className="" color="blue-gray">
                    {inputSale.object.find((item) => item.id === selectedId)
                      ?.end_date
                      ? new Date(
                          inputSale.object.find(
                            (item) => item.id === selectedId
                          ).end_date
                        )
                          .toLocaleString("en-GB")
                          .split(",")[0]
                      : "Không có"}
                  </Typography>
                </div>
              </div>
            </div>
            <Divider />
            <div className="col-span-7">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-bold text-center mb-5 mt-2"
              >
                Danh sách sản phẩm
              </Typography>
              <table className="w-full min-w-max table-auto text-left">
                <TableHeader noDelete noUpdate TABLE_HEAD={changePriceList} />
                <tbody>
                  {updateImport_Product &&
                    updateImport_Product.length > 0 &&
                    updateImport_Product
                      .slice((subActive - 1) * 5, subActive * 5)
                      .map((row, index) => (
                        <tr
                          key={index}
                          className="text-center border-b border-gray-200"
                        >
                          {Object.values(row).map((value, index) => (
                            <td className="p-2" key={index}>
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                </tbody>
              </table>
              <div className="flex justify-between mt-3">
                <Typography variant="p">
                  Tất cả: {updateImport_Product?.length || 0} sản phẩm
                </Typography>
                {Math.ceil((updateImport_Product?.length || 0) / 5) > 1 && (
                  <Pagination
                    count={Math.ceil(updateImport_Product.length / 5)}
                    page={subActive}
                    onChange={(e, value) => setSubActive(value)}
                  />
                )}
              </div>
            </div>
          </Container>
        }
        sizeUpdate="xl"
        headerUpdate="Chỉnh sửa lần nhập giá"
        bodyUpdate={
          <Container>
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-5">
                <Typography
                  variant="h3"
                  color="blue-gray"
                  className="font-bold col-span-3 text-center mb-5"
                >
                  Thông tin nhập
                </Typography>
                <div className="mx-auto">
                  <div className="grid grid-cols-3 gap-4 mb-5">
                    <Typography variant="h6" color="blue-gray">
                      Loại nhập:
                    </Typography>
                    <FormControl
                      size="small"
                      className="col-span-2"
                      fullWidth
                      required
                    >
                      <Select
                        id="demo-simple-select2"
                        value={updateFilter}
                        disabled
                      >
                        {filter_items.map((item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Typography
                      variant="h6"
                      className="my-auto"
                      color="blue-gray"
                    >
                      Tên:
                    </Typography>
                    <FormControl
                      size="small"
                      className="col-span-2"
                      fullWidth
                      required
                      disabled
                    >
                      <Select
                        id="demo-simple-select2"
                        value={filter_items}
                        onChange={(e) => setUpdateFilterId(e.target.value)}
                      >
                        {filter_items.map((item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="my-auto"
                    >
                      Giá trị gia tăng:
                    </Typography>
                    <OutlinedInput
                      endAdornment={
                        <InputAdornment position="end">%</InputAdornment>
                      }
                      className="col-span-2"
                      size="small"
                      value={updateSalePercentage}
                      onChange={(e) =>
                        setUpdateSalePercentage(
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
                      Giảm giá:
                    </Typography>
                    <OutlinedInput
                      className="col-span-2"
                      size="small"
                      value={updateDiscount}
                      onChange={(e) =>
                        setUpdateDiscount(
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
                      Ngày áp dụng:
                    </Typography>
                    <div className="col-span-2">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            //label="Ngày áp dụng"
                            slotProps={{
                              textField: { size: "medium", required: true },
                            }}
                            value={dayjs(updateStartDate)}
                            onChange={(newValue) =>
                              setUpdateStartDate(newValue)
                            }
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
                              textField: { size: "medium", required: true },
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
              <div className="col-span-7">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="font-bold text-center mb-5"
                >
                  Danh sách sản phẩm
                </Typography>
                <table className="w-full min-w-max table-auto text-left">
                  <TableHeader noDelete noUpdate TABLE_HEAD={changePriceList} />
                  <tbody>
                    {updateImport_Product &&
                      updateImport_Product.length > 0 &&
                      updateImport_Product
                        .slice((subActive - 1) * 5, subActive * 5)
                        .map((row, index) => (
                          <tr
                            key={index}
                            className="text-center border-b border-gray-200"
                          >
                            {Object.values(row).map((value, index) => (
                              <td className="p-2" key={index}>
                                {value}
                              </td>
                            ))}
                          </tr>
                        ))}
                  </tbody>
                </table>
                <div className="flex justify-between mt-3">
                  <Typography variant="p">
                    Tất cả: {updateImport_Product?.length || 0} sản phẩm
                  </Typography>
                  {Math.ceil((updateImport_Product?.length || 0) / 5) > 1 && (
                    <Pagination
                      count={Math.ceil(updateImport_Product.length / 5)}
                      page={subActive}
                      onChange={(e, value) => setSubActive(value)}
                    />
                  )}
                </div>
              </div>
            </div>
          </Container>
        }
      >
        <div className="w-7/12 flex items-center justify-between gap-4">
          <Button
            className="w-full border-gray-400"
            variant="outlined"
            onClick={handleOpens}
          >
            Nhập nhiều
          </Button>
          <Button
            className="w-full border-gray-400"
            variant="outlined"
            onClick={handleOpen}
          >
            Nhập đơn
          </Button>
          <Input
            size="small"
            className="w-full"
            label="Tìm kiếm"
            iconFamily="material-icons"
            iconName="search"
            placeholder="Tìm kiếm lần nhập"
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
      <Dialog maxWidth="xl" open={open} onClose={handleCloseOpen}>
        <DialogTitle className="pb-0 flex justify-between">
          <Typography variant="h5">Nhập giá từng sản phẩm</Typography>
          <IconButton
            className="border-none"
            variant="outlined"
            onClick={handleCloseOpen}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Container>
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-5 grid grid-cols-2 gap-4">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="font-bold text-center col-span-2"
                >
                  Thông tin nhập
                </Typography>
                <div className="w-full col-span-2">
                  <FormControl size="medium" fullWidth required>
                    <InputLabel id="demo-simple-select-label2">Tên</InputLabel>
                    <Select
                      label="Tên"
                      labelId="demo-simple-select-label2"
                      id="demo-simple-select2"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    >
                      {products?.object?.map((product, index) => (
                        <MenuItem key={index} value={product.id}>
                          {product.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <TextField
                    className="w-full"
                    label="Giá trị gia tăng"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    required
                    size="medium"
                    id="outlined-basic"
                    variant="outlined"
                    value={price}
                    onChange={(e) =>
                      setPrice(
                        isNaN(e.target.value) || e.target.value < 0
                          ? 0
                          : e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <TextField
                    className="w-full"
                    label="Giảm giá"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    required
                    size="medium"
                    id="outlined-basic"
                    variant="outlined"
                    value={discount}
                    onChange={(e) =>
                      setDiscount(
                        isNaN(e.target.value) || e.target.value < 0
                          ? 0
                          : e.target.value > 100
                          ? 100
                          : e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Ngày áp dụng"
                        slotProps={{
                          textField: { size: "medium", required: true },
                        }}
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Ngày kết thúc"
                        slotProps={{
                          textField: {
                            size: "medium",
                          },
                        }}
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className="h-full">
                  <Button
                    variant="outlined"
                    color="white"
                    className="h-full bg-green-600"
                    onClick={handleAddImportedProduct}
                  >
                    Áp dụng
                  </Button>
                </div>
                <div className="flex justify-end gap-8">
                  <Button
                    variant="contained"
                    color="red"
                    onClick={handleResetAddImportedProduct}
                  >
                    Hủy
                  </Button>
                </div>
              </div>
              <div className="col-span-7">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="font-bold text-center !mb-5"
                >
                  Danh sách sản phẩm
                </Typography>
                <table className="w-full text-center table-auto ">
                  <TableHeader noDelete noUpdate TABLE_HEAD={changePriceList} />
                  <tbody>
                    {import_products?.object
                      ?.filter((product) => product.product_id.id === value)
                      .map((product, index) => (
                        <tr
                          key={index}
                          className="text-center border-b border-gray-200"
                        >
                          {/* <td className="p-2">{product.id}</td> */}
                          <td className="p-2">{product.sku}</td>
                          {/* <td className="p-2">{product.color_id.color_name}</td>
                          <td className="p-2">{product.size_id.size}</td>
                          <td className="p-2">{product.material_id.name}</td> */}
                          <td className="p-2">
                            {product.importPrice.toLocaleString("en-US")} đ
                          </td>
                          <td className="p-2">
                            {(
                              ((product.importPrice * price) / 100) *
                              (1 - discount / 100)
                            ).toLocaleString("en-US")}{" "}
                            đ
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="flex justify-between mt-3">
                  <Typography variant="p">
                    Tất cả:{" "}
                    {
                      import_products?.object?.filter(
                        (product) => product.product_id.id === value
                      ).length
                    }{" "}
                    lô hàng
                  </Typography>
                  {Math.ceil(
                    import_products?.object?.filter(
                      (product) => product.product_id.id === value
                    ).length / 5
                  ) > 1 && (
                    <Pagination
                      count={Math.ceil(
                        import_products?.object?.filter(
                          (product) => product.product_id.id === value
                        ).length / 5
                      )}
                      page={subActive}
                      onChange={(e, value) => setSubActive(value)}
                    />
                  )}
                </div>
              </div>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
      <Dialog maxWidth="xl" open={opens} onClose={handleCloseOpens}>
        <DialogTitle className="pb-0 flex justify-between">
          <Typography variant="h5">Nhập giá nhiều sản phẩm</Typography>
          <IconButton
            className="border-none"
            variant="outlined"
            onClick={handleCloseOpens}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Container>
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-5 grid grid-cols-2 gap-4">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="font-bold text-center col-span-2"
                >
                  Thông tin nhập
                </Typography>
                <FormControl size="medium" fullWidth required>
                  <InputLabel id="demo-simple-select-label1">
                    Loại nhập
                  </InputLabel>
                  <Select
                    label="Loại nhập"
                    labelId="demo-simple-select-label1"
                    id="demo-simple-select1"
                    value={filters}
                    onChange={(e) => setFilters(e.target.value)}
                  >
                    {filter_items.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <div className="w-full">
                  <FormControl size="medium" fullWidth required>
                    <InputLabel id="demo-simple-select-label2" className="">
                      Tên
                    </InputLabel>
                    <Select
                      label="Tên"
                      labelId="demo-simple-select-label2"
                      id="demo-simple-select2"
                      disabled={filters === "ALL"}
                      value={values}
                      onChange={(e) => setValues(e.target.value)}
                    >
                      {filters === "PRODUCT" &&
                        products?.object?.map((brand, index) => (
                          <MenuItem key={index} value={brand.id}>
                            {brand.name}
                          </MenuItem>
                        ))}
                      {filters === "BRAND" &&
                        brands?.object?.map((brand, index) => (
                          <MenuItem key={index} value={brand.id}>
                            {brand.name}
                          </MenuItem>
                        ))}
                      {filters === "CATEGORY" &&
                        categories?.object?.map((category, index) => (
                          <MenuItem key={index} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      {filters === "COLOR" &&
                        colors?.object?.map((color, index) => (
                          <MenuItem key={index} value={color.id}>
                            {color.color_name}
                          </MenuItem>
                        ))}
                      {filters === "SIZE" &&
                        sizes?.object?.map((size, index) => (
                          <MenuItem key={index} value={size.id}>
                            {size.size}
                          </MenuItem>
                        ))}
                      {filters === "MATERIAL" &&
                        materials?.object?.map((material, index) => (
                          <MenuItem key={index} value={material.id}>
                            {material.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <TextField
                    className="w-full"
                    label="Giá trị gia tăng"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    required
                    size="medium"
                    id="outlined-basic"
                    variant="outlined"
                    value={prices}
                    onChange={(e) =>
                      setPrices(
                        isNaN(e.target.value) || e.target.value < 0
                          ? 0
                          : e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <TextField
                    className="w-full"
                    label="Giảm giá"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    required
                    size="medium"
                    id="outlined-basic"
                    variant="outlined"
                    value={discounts}
                    onChange={(e) =>
                      setDiscounts(
                        isNaN(e.target.value) || e.target.value < 0
                          ? 0
                          : e.target.value > 100
                          ? 100
                          : e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Ngày áp dụng"
                        slotProps={{
                          textField: { size: "medium", required: true },
                        }}
                        onChange={(newValue) => setStartDates(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Ngày kết thúc"
                        slotProps={{
                          textField: {
                            size: "medium",
                            required: true,
                          },
                        }}
                        onChange={(newValue) => setEndDates(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className="flex justify-end gap-8 col-span-2">
                  <Button
                    variant="outlined"
                    color="red"
                    onClick={handleResetAddImportedProducts}
                  >
                    Hủy
                  </Button>
                  <Button
                    variant="contained"
                    color="green"
                    className="h-full"
                    onClick={handleAddImportedProducts}
                  >
                    Áp dụng
                  </Button>
                </div>
              </div>
              <div className="col-span-7">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="font-bold text-center !mb-5"
                >
                  Danh sách sản phẩm
                </Typography>
                <table className="w-full text-center table-auto ">
                  <TableHeader
                    noDelete
                    noUpdate
                    TABLE_HEAD={changePricesList}
                  />
                  <tbody>
                    {import_product &&
                      import_product.length > 0 &&
                      import_product
                        .slice((subActive - 1) * 5, subActive * 5)
                        .map((row, index) => (
                          <tr
                            key={index}
                            className="text-center border-b border-gray-200"
                          >
                            {Object.values(row).map((value, index) => (
                              <td className="p-2" key={index}>
                                {value}
                              </td>
                            ))}
                          </tr>
                        ))}
                  </tbody>
                </table>
                <div className="flex justify-between mt-3">
                  <Typography variant="p">
                    Tất cả: {import_product?.length || 0} sản phẩm
                  </Typography>
                  {Math.ceil((import_product?.length || 0) / 5) > 1 && (
                    <Pagination
                      count={Math.ceil(TABLE_ROWS.length / 5)}
                      page={subActive}
                      onChange={(e, value) => setSubActive(value)}
                    />
                  )}
                </div>
              </div>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OnsaleProduct;
