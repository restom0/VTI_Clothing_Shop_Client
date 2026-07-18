import React, { useEffect } from "react";
import { Input } from "@material-tailwind/react/components/Input";
import dayjs from "dayjs";

import {
  IconButton,
  Dialog,
  Container,
  Divider,
  FormControl,
  InputLabel,
  Pagination,
  Select,
  MenuItem,
  TextField,
  DialogTitle,
  DialogContent,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { Typography } from "@material-tailwind/react/components/Typography";
import { Button } from "@material-tailwind/react/components/Button";
import {
  changePriceList,
  changePricesList,
  onsaleproduct,
} from "../../constants/head_table.constant";
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
import { useCurrency } from "../../currency";

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

/** Clamps a numeric field to a minimum value. */
const clampMinimum = (raw, min = 0) => {
  const value = Number(raw);
  if (Number.isNaN(value)) return min;
  return Math.max(value, min);
};

/** Clamps a numeric field to a percentage range. */
const clampPercent = (raw) => Math.min(clampMinimum(raw), 100);

/** Handles onsale product. */
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
  const [importProductRows, setImportProductRows] = React.useState(null);
  const [updateImportProductRows, setUpdateImportProductRows] = React.useState(null);
  const [updateSalePercentage, setUpdateSalePercentage] = React.useState(100);
  const [updateDiscount, setUpdateDiscount] = React.useState(0);
  const [updateStartDate, setUpdateStartDate] = React.useState(null);
  const [updateEndDate, setUpdateEndDate] = React.useState(null);
  const [updateFilter, setUpdateFilter] = React.useState(null);
  const [updateFilterId, setUpdateFilterId] = React.useState(null);
  const [subActive, setSubActive] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  /** Handles open. */
  const handleOpen = () => {
    setFilters("PRODUCT");
    setOpen(true);
  };
  /** Handles opens. */
  const handleOpens = () => setOpens(true);
  const selectedId = useSelector((state) => state.selectedId.value);
  const { formatPrice } = useCurrency();
  const { data: inputSale, error, isLoading } = useGetInputSalesQuery();
  const {
    data: products,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsQuery();
  const { data: brands, error: brandsError, isLoading: brandsLoading } = useGetBrandsQuery();
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery();
  const { data: colors, error: colorsError, isLoading: colorsLoading } = useGetColorsQuery();
  const { data: sizes, error: sizesError, isLoading: sizesLoading } = useGetSizesQuery();
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
  const { data: previews } = useGetImportedProductQuery(
    { filter: filters, id: values },
    {
      skip: !values && filters !== "ALL",
    }
  );

  const { data: updatePreviews } = useGetImportedProductQuery(
    { filter: updateFilter, id: updateFilterId },
    {
      skip: !updateFilterId && updateFilter !== "ALL",
    }
  );

  useEffect(() => {
    if (values || (!values && filters === "ALL")) {
      setImportProductRows(
        previews?.object.map((preview) => {
          return {
            sku: preview.product_id.name,
            color: preview.color_id.color_name,
            size: preview.size_id.size,
            material: preview.material_id.name,
            importPrice: formatPrice(preview.importPrice),
            salePrice: formatPrice(((preview.importPrice * prices) / 100) * (1 - discounts / 100)),
          };
        }) || []
      );
    }
  }, [values, previews, filters, prices, discounts, formatPrice]);
  useEffect(() => {
    if (updateFilterId || (!updateFilterId && updateFilter === "ALL")) {
      setUpdateImportProductRows(
        updatePreviews?.object.map((preview) => {
          return {
            sku: preview.product_id.name,
            importPrice: formatPrice(preview.importPrice),
            salePrice: formatPrice(
              ((preview.importPrice * updateSalePercentage) / 100) * (1 - updateDiscount / 100)
            ),
          };
        }) || []
      );
    }
  }, [
    updateFilter,
    updateFilterId,
    updatePreviews,
    updateSalePercentage,
    updateDiscount,
    discounts,
    prices,
    formatPrice,
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
  const [createInputSale] = useCreateInputSaleMutation();
  const [updateInputSale] = useUpdateInputSaleMutation();
  const [deleteInputSale] = useDeleteInputSaleMutation();
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
  /** Handles close opens. */
  const handleCloseOpens = () => {
    setOpens(false);
  };
  /** Handles close open. */
  const handleCloseOpen = () => {
    setOpen(false);
  };
  /** Handles add imported product. */
  const handleAddImportedProduct = async () => {
    try {
      await createInputSale({
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
  /** Handles add imported products. */
  const handleAddImportedProducts = async () => {
    try {
      await createInputSale({
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
  /** Handles reset add imported product. */
  const handleResetAddImportedProduct = async () => {
    setPrice(100);
    setDiscount(0);
    setValue(null);
    setStartDate(null);
    setEndDate(null);
  };
  /** Handles reset add imported products. */
  const handleResetAddImportedProducts = async () => {
    setFilters("ALL");
    setPrices(100);
    setDiscounts(0);
    setValues(null);
    setStartDates(null);
    setEndDates(null);
  };
  const ListInputSales = inputSale?.object.map((item) => {
    return {
      id: item.id,
      filter: item.filter,
      filter_id: item.filter_id,
      salePercentage: item.salePercentage + "%",
      discount: item.discount + "%",
      available_date: new Date(item.available_date).toLocaleDateString("en-GB"),
      end_date: item.end_date ? new Date(item.end_date).toLocaleDateString("en-GB") : "Không có",
    };
  });
  /** Handles update input sales. */
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
  /** Handles delete submit. */
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
        TABLE_ROWS={ListInputSales ?? []}
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
                    {inputSale.object.find((item) => item.id === selectedId)?.filter}
                  </Typography>
                </div>
                <div className="text-center flex items-center gap-4">
                  <Typography variant="h6" color="blue-gray">
                    Tên:
                  </Typography>
                  <Typography variant="body" className="" color="blue-gray">
                    {inputSale.object.find((item) => item.id === selectedId)?.filter_id}
                  </Typography>
                </div>
              </div>
              <div className="mx-auto">
                <div className="text-center flex items-center gap-4">
                  <Typography variant="h6" color="blue-gray">
                    Giá trị gia tăng:
                  </Typography>
                  <Typography variant="body" className="" color="blue-gray">
                    {inputSale.object.find((item) => item.id === selectedId)?.salePercentage + "%"}
                  </Typography>
                </div>
                <div className="text-center flex items-center gap-4">
                  <Typography variant="h6" color="blue-gray">
                    Giảm giá:
                  </Typography>
                  <Typography variant="body" className="" color="blue-gray">
                    {inputSale.object.find((item) => item.id === selectedId)?.discount + "%"}
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
                        inputSale.object.find((item) => item.id === selectedId)?.available_date
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
                    {inputSale.object.find((item) => item.id === selectedId)?.end_date
                      ? new Date(inputSale.object.find((item) => item.id === selectedId).end_date)
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
                  {updateImportProductRows &&
                    updateImportProductRows.length > 0 &&
                    updateImportProductRows.slice((subActive - 1) * 5, subActive * 5).map((row) => (
                      <tr key={row.sku} className="text-center border-b border-gray-200">
                        {Object.entries(row).map(([key, value]) => (
                          <td className="p-2" key={key}>
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="flex justify-between mt-3">
                <Typography variant="p">
                  Tất cả: {updateImportProductRows?.length || 0} sản phẩm
                </Typography>
                {Math.ceil((updateImportProductRows?.length || 0) / 5) > 1 && (
                  <Pagination
                    count={Math.ceil(updateImportProductRows.length / 5)}
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
                    <FormControl size="small" className="col-span-2" fullWidth required>
                      <Select id="demo-simple-select2" value={updateFilter} disabled>
                        {filter_items.map((item) => (
                          <MenuItem key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Typography variant="h6" className="my-auto" color="blue-gray">
                      Tên:
                    </Typography>
                    <FormControl size="small" className="col-span-2" fullWidth required disabled>
                      <Select
                        id="demo-simple-select2"
                        value={filter_items}
                        onChange={(e) => setUpdateFilterId(e.target.value)}
                      >
                        {filter_items.map((item) => (
                          <MenuItem key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Typography variant="h6" color="blue-gray" className="my-auto">
                      Giá trị gia tăng:
                    </Typography>
                    <OutlinedInput
                      endAdornment={<InputAdornment position="end">%</InputAdornment>}
                      className="col-span-2"
                      size="small"
                      value={updateSalePercentage}
                      onChange={(e) => setUpdateSalePercentage(clampMinimum(e.target.value))}
                    />
                    <Typography variant="h6" color="blue-gray" className="my-auto">
                      Giảm giá:
                    </Typography>
                    <OutlinedInput
                      className="col-span-2"
                      size="small"
                      value={updateDiscount}
                      onChange={(e) => setUpdateDiscount(clampPercent(e.target.value))}
                      endAdornment={<InputAdornment position="end">%</InputAdornment>}
                    />
                    <Typography variant="h6" color="blue-gray" className="my-auto">
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
                            onChange={(newValue) => setUpdateStartDate(newValue)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                    <Typography variant="h6" color="blue-gray" className="my-auto">
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
                <Typography variant="h5" color="blue-gray" className="font-bold text-center mb-5">
                  Danh sách sản phẩm
                </Typography>
                <table className="w-full min-w-max table-auto text-left">
                  <TableHeader noDelete noUpdate TABLE_HEAD={changePriceList} />
                  <tbody>
                    {updateImportProductRows &&
                      updateImportProductRows.length > 0 &&
                      updateImportProductRows
                        .slice((subActive - 1) * 5, subActive * 5)
                        .map((row) => (
                          <tr key={row.sku} className="text-center border-b border-gray-200">
                            {Object.entries(row).map(([key, value]) => (
                              <td className="p-2" key={key}>
                                {value}
                              </td>
                            ))}
                          </tr>
                        ))}
                  </tbody>
                </table>
                <div className="flex justify-between mt-3">
                  <Typography variant="p">
                    Tất cả: {updateImportProductRows?.length || 0} sản phẩm
                  </Typography>
                  {Math.ceil((updateImportProductRows?.length || 0) / 5) > 1 && (
                    <Pagination
                      count={Math.ceil(updateImportProductRows.length / 5)}
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
          <Button className="w-full border-gray-400" variant="outlined" onClick={handleOpens}>
            Nhập nhiều
          </Button>
          <Button className="w-full border-gray-400" variant="outlined" onClick={handleOpen}>
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
          <IconButton className="border-none" variant="outlined" onClick={handleCloseOpen}>
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
                      {products?.object?.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
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
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    required
                    size="medium"
                    id="outlined-basic"
                    variant="outlined"
                    value={price}
                    onChange={(e) => setPrice(clampMinimum(e.target.value))}
                  />
                </div>
                <div>
                  <TextField
                    className="w-full"
                    label="Giảm giá"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    required
                    size="medium"
                    id="outlined-basic"
                    variant="outlined"
                    value={discount}
                    onChange={(e) => setDiscount(clampPercent(e.target.value))}
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
                  <Button variant="contained" color="red" onClick={handleResetAddImportedProduct}>
                    Hủy
                  </Button>
                </div>
              </div>
              <div className="col-span-7">
                <Typography variant="h4" color="blue-gray" className="font-bold text-center !mb-5">
                  Danh sách sản phẩm
                </Typography>
                <table className="w-full text-center table-auto ">
                  <TableHeader noDelete noUpdate TABLE_HEAD={changePriceList} />
                  <tbody>
                    {import_products?.object
                      ?.filter((product) => product.product_id.id === value)
                      .map((product) => (
                        <tr key={product.id} className="text-center border-b border-gray-200">
                          {/* <td className="p-2">{product.id}</td> */}
                          <td className="p-2">{product.sku}</td>
                          {/* <td className="p-2">{product.color_id.color_name}</td>
                          <td className="p-2">{product.size_id.size}</td>
                          <td className="p-2">{product.material_id.name}</td> */}
                          <td className="p-2">{formatPrice(product.importPrice)}</td>
                          <td className="p-2">
                            {formatPrice(
                              ((product.importPrice * price) / 100) * (1 - discount / 100)
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="flex justify-between mt-3">
                  <Typography variant="p">
                    Tất cả:{" "}
                    {
                      import_products?.object?.filter((product) => product.product_id.id === value)
                        .length
                    }{" "}
                    lô hàng
                  </Typography>
                  {Math.ceil(
                    import_products?.object?.filter((product) => product.product_id.id === value)
                      .length / 5
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
          <IconButton className="border-none" variant="outlined" onClick={handleCloseOpens}>
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
                  <InputLabel id="demo-simple-select-label1">Loại nhập</InputLabel>
                  <Select
                    label="Loại nhập"
                    labelId="demo-simple-select-label1"
                    id="demo-simple-select1"
                    value={filters}
                    onChange={(e) => setFilters(e.target.value)}
                  >
                    {filter_items.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
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
                        products?.object?.map((brand) => (
                          <MenuItem key={brand.id} value={brand.id}>
                            {brand.name}
                          </MenuItem>
                        ))}
                      {filters === "BRAND" &&
                        brands?.object?.map((brand) => (
                          <MenuItem key={brand.id} value={brand.id}>
                            {brand.name}
                          </MenuItem>
                        ))}
                      {filters === "CATEGORY" &&
                        categories?.object?.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      {filters === "COLOR" &&
                        colors?.object?.map((color) => (
                          <MenuItem key={color.id} value={color.id}>
                            {color.color_name}
                          </MenuItem>
                        ))}
                      {filters === "SIZE" &&
                        sizes?.object?.map((size) => (
                          <MenuItem key={size.id} value={size.id}>
                            {size.size}
                          </MenuItem>
                        ))}
                      {filters === "MATERIAL" &&
                        materials?.object?.map((material) => (
                          <MenuItem key={material.id} value={material.id}>
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
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    required
                    size="medium"
                    id="outlined-basic"
                    variant="outlined"
                    value={prices}
                    onChange={(e) => setPrices(clampMinimum(e.target.value))}
                  />
                </div>
                <div>
                  <TextField
                    className="w-full"
                    label="Giảm giá"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    required
                    size="medium"
                    id="outlined-basic"
                    variant="outlined"
                    value={discounts}
                    onChange={(e) => setDiscounts(clampPercent(e.target.value))}
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
                  <Button variant="outlined" color="red" onClick={handleResetAddImportedProducts}>
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
                <Typography variant="h4" color="blue-gray" className="font-bold text-center !mb-5">
                  Danh sách sản phẩm
                </Typography>
                <table className="w-full text-center table-auto ">
                  <TableHeader noDelete noUpdate TABLE_HEAD={changePricesList} />
                  <tbody>
                    {importProductRows &&
                      importProductRows.length > 0 &&
                      importProductRows.slice((subActive - 1) * 5, subActive * 5).map((row) => (
                        <tr key={row.sku} className="text-center border-b border-gray-200">
                          {Object.entries(row).map(([key, value]) => (
                            <td className="p-2" key={key}>
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="flex justify-between mt-3">
                  <Typography variant="p">
                    Tất cả: {importProductRows?.length || 0} sản phẩm
                  </Typography>
                  {Math.ceil((importProductRows?.length || 0) / 5) > 1 && (
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
