import { useParams } from "react-router-dom";
import BreadcrumbsWithIcon from "../components/shared/breadcrumbs.component";
import CategoryFilter from "../components/shared/shop/CategoryFilter";
import BrandFilter from "../components/shared/shop/BrandFilter";
import ProductFilter from "../components/shared/shop/ProductFilter";
import ShopList from "../components/shared/shop/ShopList";
import { SHOP_MOCK_PRODUCTS } from "../mocks/shop_products.mock";
const Catepage = () => {
  const { id } = useParams();
  const products = SHOP_MOCK_PRODUCTS;
  return (
    <main className="page-container shop-browse-page">
      <div className="mb-5">
        <BreadcrumbsWithIcon name={id ? id : null} />
      </div>
      <div className="shop-browse-layout">
        <aside className="shop-filter-panel">
          {!id && <CategoryFilter />}
          <BrandFilter />
          <ProductFilter />
        </aside>
        <ShopList products={products} />
      </div>
    </main>
  );
};

export default Catepage;
