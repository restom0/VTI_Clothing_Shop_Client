import { useParams } from "react-router-dom";
import BreadcrumbsWithIcon from "../components/shared/breadcrumbs.component";
import BrandFilter from "../components/shared/shop/BrandFilter";
import CategoryFilter from "../components/shared/shop/CategoryFilter";
import ProductFilter from "../components/shared/shop/ProductFilter";
import ShopList from "../components/shared/shop/ShopList";
import { SHOP_MOCK_PRODUCTS } from "../mocks/shop_products.mock";
/** Handles brandpage. */
const Brandpage = () => {
  const { id } = useParams();
  const products = SHOP_MOCK_PRODUCTS;
  return (
    <main className="page-container shop-browse-page">
      <div className="mb-5">
        <BreadcrumbsWithIcon name={id ?? null} />
      </div>
      <div className="shop-browse-layout">
        <aside className="shop-filter-panel">
          {!id && <BrandFilter />}
          <CategoryFilter />
          <ProductFilter />
        </aside>
        <ShopList products={products} />
      </div>
    </main>
  );
};

export default Brandpage;
