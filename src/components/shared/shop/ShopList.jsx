import { useState } from "react";
import { Option, Select } from "@material-tailwind/react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import Pagination from "../pagination.component";
const ShopList = ({ products }) => {
  const [filter, setFilter] = useState("new");
  const handleFilter = (e) => setFilter(e);

  const [active, setActive] = useState(1);
  return (
    <section className="shop-results">
      <div className="shop-list-toolbar">
        <div>{products.length} kết quả</div>
        <div className="cluster-sm">
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
      <div className="shop-grid">
        {products.slice(active * 6 - 6, active * 6).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <Pagination
        page={Math.ceil(products.length / 6)}
        active={active}
        setActive={setActive}
      />
    </section>
  );
};
ShopList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default ShopList;
