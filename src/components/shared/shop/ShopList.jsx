import { useState } from "react";
import { Option, Select } from "@material-tailwind/react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import Pagination from "../pagination.component";
import VirtualizedGrid from "../VirtualizedGrid";
import usePaginatedItems from "../../../hooks/usePaginatedItems.hook";
import useResponsiveColumns from "../../../hooks/useResponsiveColumns.hook";

const PRODUCT_PAGE_SIZE = 24;
const VIRTUAL_PRODUCT_ROW_ESTIMATE = 384;

const ShopList = ({ products }) => {
  const [filter, setFilter] = useState("new");
  const handleFilter = (e) => setFilter(e);

  const [active, setActive] = useState(1);
  const columns = useResponsiveColumns();
  const { pageCount, pageItems } = usePaginatedItems(
    products,
    active,
    PRODUCT_PAGE_SIZE
  );

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
      <VirtualizedGrid
        className="virtual-shop-grid"
        columns={columns}
        estimateRowHeight={VIRTUAL_PRODUCT_ROW_ESTIMATE}
        getKey={(product) => product.id}
        items={pageItems}
        renderItem={(product) => <ProductCard {...product} />}
      />
      <Pagination
        page={pageCount}
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
