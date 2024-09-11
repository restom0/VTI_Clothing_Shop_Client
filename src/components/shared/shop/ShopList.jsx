import React, { useState } from "react";
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
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Radio,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import Pagination from "../pagination.component";
const ShopList = ({ products }) => {
  const [filter, setFilter] = useState("new");
  const handleFilter = (e) => setFilter(e);

  const [active, setActive] = useState(1);
  return (
    <div className="col-span-3">
      <div className="w-full flex items-center gap-4 justify-between mb-20">
        <div>{products.length} kết quả</div>
        <div className="flex items-center gap-5">
          <span>Phân loại:</span>
          <span>
            <Select value={filter} onChange={handleFilter} className="rounded">
              <Option value="new" defaultChecked>
                Mới nhất
              </Option>
              <Option value="old">Cũ nhất</Option>
              <Option value="A->Z">A {" -> "} Z</Option>
              <Option value="Z->A">Z {" -> "} A</Option>
              <Option value="price-asc">Giá tăng dần</Option>
              <Option value="price-desc">Giá giảm dần</Option>
            </Select>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {products.slice(active * 6 - 6, active * 6).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <Pagination
        page={Math.ceil(products.length / 6)}
        active={active}
        setActive={setActive}
      />
    </div>
  );
};
ShopList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      colors: PropTypes.arrayOf(
        PropTypes.shape({
          color: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        }).isRequired
      ).isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
export default ShopList;
