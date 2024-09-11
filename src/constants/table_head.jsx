import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Option,
  Select,
} from "@material-tailwind/react";
import FilterListIcon from "@mui/icons-material/FilterList";
const allorder = [
  { label: "Mã vận đơn", col: 1 },
  { label: "Người nhận", col: 1 },
  { label: "Số điện thoại", col: 1 },
  { label: "Tổng tiền", col: 1 },
  { label: "Phương thức", col: 1 },
  { label: "Trạng thái", col: 1 },
];
const comment = [
  { label: "Username", col: 1 },
  { label: "Đánh giá", col: 1 },
  { label: "Bình luận", col: 3 },
  { label: "Ngày tạo", col: 1 },
];

const importproduct = [
  { label: "Tên", col: 1 },
  { label: "Màu sắc", col: 1 },
  { label: "Kích thước", col: 1 },
  { label: "Chất liệu", col: 1 },
  { label: "Giá nhập", col: 1 },
  { label: "Số lượng", col: 1 },
];

const inbox = [
  { label: "Username", col: 1 },
  { label: "Phản hồi", col: 3 },
  { label: "Câu trả lời", col: 3 },
];

const inventory = [
  { label: "Hình ảnh", col: 1 },
  { label: "Tên", col: 1 },
  { label: "SKU", col: 1 },
  { label: "Giá nhập", col: 1 },
  { label: "Số lượng", col: 1 },
];

const onsaleproduct = [
  {
    label: (
      <>
        <Menu>
          <MenuHandler>
            <div className="flex items-center gap-4">
              Tất cả
              <FilterListIcon className="h-5 w-5" />
            </div>
          </MenuHandler>
          <MenuList>
            <MenuItem>Tất cả</MenuItem>
            <MenuItem>Sản phẩm</MenuItem>
            <MenuItem>Thương hiệu</MenuItem>
            <MenuItem>Danh mục</MenuItem>
            <MenuItem>Màu sắc</MenuItem>
            <MenuItem>Kích thước</MenuItem>
            <MenuItem>Chất liệu</MenuItem>
          </MenuList>
        </Menu>
      </>
    ),
    col: 1,
  },
  { label: "Mã nhập", col: 1 },
  { label: "Giá bán", col: 1 },
  { label: "Giảm giá", col: 1 },
  { label: "Ngày áp dụng", col: 1 },
  { label: "Ngày kết thúc", col: 1 },
];
const voucher = [
  // {
  //   label: (
  //     <>
  //       <Menu>
  //         <MenuHandler>
  //           <div className="flex items-center gap-4">
  //             Tất cả
  //             <FilterListIcon className="h-5 w-5" />
  //           </div>
  //         </MenuHandler>
  //         <MenuList>
  //           <MenuItem>Tất cả</MenuItem>
  //           <MenuItem>Sản phẩm</MenuItem>
  //           <MenuItem>Thương hiệu</MenuItem>
  //           <MenuItem>Danh mục</MenuItem>
  //         </MenuList>
  //       </Menu>
  //     </>
  //   ),
  //   col: 1,
  // },
  //{ label: "Tên", col: 1 },
  { label: "Mã nhập", col: 1 },
  { label: "Giảm giá", col: 1 },
  { label: "Số lượng", col: 1 },
  { label: "Ngày áp dụng", col: 1 },
  { label: "Ngày kết thúc", col: 1 },
];
const productdetail = [
  { label: "Tên", col: 1 },
  { label: "Thương hiệu", col: 1 },
  { label: "Danh mục", col: 1 },
];
const user = [
  { label: "Tên", col: 1 },
  { label: "Username", col: 1 },
  
  { label: "Vai trò", col: 1 },
  { label: "Trạng thái", col: 1 },
];
const web = [
  { label: "Tên", col: 1 },
  { label: "Trạng thái", col: 1 },
];

const brand = [
  { label: "Tên", col: 3 },
  { label: "Mô tả", col: 4 },
];
const category = [
  { label: "Tên", col: 3 },
  { label: "Mô tả", col: 4 },
];
const history = [
  { label: "ID", col: 1 },
  { label: "Vai trò", col: 1 },
  { label: "Hành động", col: 1 },
  { label: "Ngày", col: 1 },
];
const order = [
  { label: "Mã đơn", col: 1 },
  { label: "Tổng tiền", col: 1 },
  { label: "Trạng thái", col: 1 },
  { label: "Ngày tạo đơn", col: 1 },
];
const changePriceList = [
  { label: "Mã SKU", col: 1 },
  { label: "Giá nhập", col: 1 },
  { label: "Giá bán", col: 1 },
];
const changePricesList = [
  { label: "Tên sản phẩm", col: 1 },
  { label: "Màu", col: 1 },
  { label: "Kích thước", col: 1 },
  { label: "Vật liệu", col: 1 },
  { label: "Giá nhập", col: 1 },
  { label: "Giá bán", col: 1 },
];
const voucherDetail = [
  { label: "Mã sản phẩm", col: 1 },
  { label: "Tên sản phẩm", col: 1 },
  { label: "Giá bán", col: 1 },
  { label: "Giá sau giảm", col: 1 },
];
export {
  allorder,
  comment,
  importproduct,
  inbox,
  inventory,
  onsaleproduct,
  productdetail,
  user,
  web,
  brand,
  category,
  history,
  order,
  changePriceList,
  changePricesList,
  voucher,
  voucherDetail,
};
