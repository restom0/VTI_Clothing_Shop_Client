import React from "react";
import "./NavbarWithSublist.css";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input,
  Tooltip,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { useGetBrandsQuery } from "../../../apis/BrandApi";
import { useGetCategoriesQuery } from "../../../apis/CategoryApi";
import Loading from "../Loading";

// const brands = [
//   "Adidas",
//   "Nike",
//   "Puma",
//   "Converse",
//   "Vans",
//   "New Balance",
//   "Balenciaga",
//   "Gucci",
// ];
// const categories = {
//   object: [
//     { name: "Áo", id: 0 },
//     { name: "Quần", id: 1 },
//     { name: "Giày", id: 2 },
//     { name: "Phụ kiện", id: 3 },
//     { name: "Túi xách", id: 4 },
//     { name: "Đồng hồ", id: 5 },
//     { name: "Mắt kính", id: 6 },
//     { name: "Nước hoa", id: 7 },
//   ],
// };
const cart_items = [
  {
    id: 0,
    color: "red",
    price: 155000,
    quantity: 1,
    material: "cotton",
    brand: "nike",
    category: "t-shirt",
    imageUrl: "https://www.material-tailwind.com/image/product-4.png",
    title: "Abisko Trail Stretch Trousers M",
  },
];

const NavListMenu = ({ name, type, data }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  if (!data || data.length <= 0) return;
  const renderItems =
    data &&
    data.object.length > 0 &&
    data.object.map(({ name, id }, key) => (
      <a href={"/" + type + "/" + id} key={key}>
        <MenuItem className="flex items-center gap-5 rounded-lg">
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {name}
            </Typography>
          </div>
        </MenuItem>
      </a>
    ));
  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => {
                setIsMobileMenuOpen((cur) => !cur), navigate("/" + type);
              }}
            >
              {name}
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul
            className={
              "grid" +
              (data.object.length <= 3
                ? "mx-auto grid-cols-" + data.object.length
                : " grid-cols-3") +
              " gap-y-2 outline-none outline-0"
            }
          >
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
};

const NavList = () => {
  const navigate = useNavigate();
  const {
    data: brands,
    error: error_1,
    isLoading: isLoading_1,
  } = useGetBrandsQuery();
  const {
    data: categories,
    error: error_2,
    isLoading: isLoading_2,
  } = useGetCategoriesQuery();
  if (error_1 || error_2) return navigate("/error");
  return (
    <>
      {isLoading_1 || isLoading_2 ? (
        <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
          <Typography
            as="div"
            variant="small"
            className="rounded-lg w-[158.85px] bg-gray-300"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4">
              &nbsp;
            </ListItem>
          </Typography>
          <Typography
            as="div"
            variant="small"
            className="rounded-lg w-[128.28px] bg-gray-300"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4">
              &nbsp;
            </ListItem>
          </Typography>
          <Typography
            as="div"
            variant="small"
            className="rounded-lg w-[139.99px] bg-gray-300"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4">
              &nbsp;
            </ListItem>
          </Typography>
          <Typography
            as="div"
            variant="small"
            className="rounded-lg w-[105.78px] bg-gray-300"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4">
              &nbsp;
            </ListItem>
          </Typography>
          <Typography
            as="div"
            variant="small"
            className="rounded-lg w-[73.04px] bg-gray-300"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4">
              &nbsp;
            </ListItem>
          </Typography>
        </List>
      ) : (
        <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
          <Typography
            as="a"
            href="/product"
            variant="small"
            color="blue-gray"
            className="font-medium"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4">
              Danh sách sản phẩm
            </ListItem>
          </Typography>
          <NavListMenu name="Thương hiệu" type="brand" data={brands} />
          <NavListMenu name="Loại sản phẩm" type="category" data={categories} />
          <Typography
            as="a"
            href="/about-us"
            variant="small"
            color="blue-gray"
            className="font-medium"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4">
              Về chúng tôi
            </ListItem>
          </Typography>
          <Typography
            as="a"
            href="/contact"
            variant="small"
            color="blue-gray"
            className="font-medium"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4">
              Liên hệ
            </ListItem>
          </Typography>
        </List>
      )}
    </>
  );
};
const NavbarWithSublist = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-3xl rounded-none px-4 py-2 sticky top-0 z-50">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          variant="h3"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          <span className="text-[#006edc]">VTI</span> Shop
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          <div className="hidden items-center gap-x-2 lg:flex">
            {/* <div className="relative flex w-full gap-2 md:w-max">
              <Input
                type="search"
                placeholder="Search"
                containerProps={{
                  className: "min-w-[288px]",
                }}
                className=" !border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div className="!absolute left-3 top-[13px]">
                <svg
                  width="13"
                  height="14"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                    fill="#CFD8DC"
                  />
                  <path
                    d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                    stroke="#CFD8DC"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div> */}
            <div className="relative flex w-full max-w-[24rem]">
              <Input
                type="text"
                label="Search"
                placeholder="Tìm kiếm"
                // value={email}
                // onChange={onChange}
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
              />
              <Button
                size="sm"
                variant="outlined"
                color="white"
                // color={email ? "gray" : "blue-gray"}
                // disabled={!email}
                className="!absolute right-1 top-1 rounded"
              >
                <svg
                  width="13"
                  height="14"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                    fill="#CFD8DC"
                  />
                  <path
                    d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                    stroke="#CFD8DC"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
            <Tooltip
              placement="bottom-end"
              className="bg-white text-black shadow-lg"
              content={
                <>
                  <div className="flex items-center justify-between gap-2 w-[500px]">
                    <Typography variant="h6">Giỏ hàng</Typography>
                    <Typography variant="small">
                      {cart_items.length} sản phẩm
                    </Typography>
                  </div>
                  <div className="my-4">
                    <Divider />
                  </div>
                  <div className="grid grid-cols-1 gap-4 w-[500px]">
                    {cart_items.map((item) => (
                      <div key={item.id} className="grid grid-cols-5 gap-4">
                        <img
                          src={item.imageUrl}
                          width={48}
                          height={48}
                          className="mx-auto my-auto"
                        />
                        <Typography variant="h6" className="my-auto mx-auto">
                          {item.title}
                        </Typography>
                        <Typography variant="small" className="my-auto mx-auto">
                          {item.quantity} x
                        </Typography>
                        <Typography variant="small" className="my-auto mx-auto">
                          {item.price.toLocaleString("en-US")}đ
                        </Typography>
                        <Typography variant="small" className="my-auto mx-auto">
                          {(item.price * item.quantity).toLocaleString("en-US")}
                          đ
                        </Typography>
                      </div>
                    ))}
                  </div>
                  <div className="my-4">
                    <Divider />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <Typography variant="h6">Tổng cộng</Typography>
                    <Typography variant="h6">
                      {cart_items
                        .reduce(
                          (total, { quantity, price }) =>
                            total + quantity * price,
                          0
                        )
                        .toLocaleString("en-US")}
                      đ
                    </Typography>
                  </div>
                </>
              }
            >
              <Button
                size="sm"
                color="white"
                className="rounded-lg w-full"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCartIcon className="w-full" />
              </Button>
            </Tooltip>
          </div>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Button variant="gradient" size="sm" color="blue-gray" fullWidth>
            <Typography as="a" href="/login">
              Đăng nhập
            </Typography>
          </Button>
          <div className="hidden  items-center gap-x-2 lg:flex">
            <div className="relative flex w-full gap-2 md:w-max">
              <Input
                type="search"
                placeholder="Search"
                containerProps={{
                  className: "min-w-[288px]",
                }}
                className=" !border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div className="!absolute left-3 top-[13px]">
                <svg
                  width="13"
                  height="14"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                    fill="#CFD8DC"
                  />
                  <path
                    d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                    stroke="#CFD8DC"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <Button size="md" className="rounded-lg ">
              Search
            </Button>
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
};
NavListMenu.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.shape({
    object: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};
export default NavbarWithSublist;
