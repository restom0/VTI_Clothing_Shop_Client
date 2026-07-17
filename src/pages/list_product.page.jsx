import BreadcrumbsWithIcon from "../components/shared/breadcrumbs.component";
import BrandFilter from "../components/shared/shop/BrandFilter";
import CategoryFilter from "../components/shared/shop/CategoryFilter";
import ProductFilter from "../components/shared/shop/ProductFilter";
import ShopList from "../components/shared/shop/ShopList";
import { SHOP_MOCK_PRODUCTS } from "../mocks/shop_products.mock";

/** Handles productpage. */
const Productpage = () => {
  const products = SHOP_MOCK_PRODUCTS;

  return (
    <main className="page-container shop-browse-page">
      <div className="mb-5">
        <BreadcrumbsWithIcon />
      </div>
      <div className="shop-browse-layout">
        <aside className="shop-filter-panel">
          <BrandFilter />
          <CategoryFilter />
          <ProductFilter />
        </aside>
        <ShopList products={products} />
      </div>
    </main>
  );
};

export default Productpage;
