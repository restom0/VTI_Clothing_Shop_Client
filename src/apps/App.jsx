import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layouts/shop/shop.layout";
import Loading from "../components/shared/loading.component";

const Adminpage = lazy(() => import("../pages/admin.page"));
const Brandpage = lazy(() => import("../pages/brand.page"));
const Cartpage = lazy(() => import("../pages/cart.page"));
const Catepage = lazy(() => import("../pages/category.page"));
const Checkoutpage = lazy(() => import("../pages/checkout.page"));
const Errorpage = lazy(() => import("../pages/error.page"));
const Forbiddenpage = lazy(() => import("../pages/forbidden.page"));
const Homepage = lazy(() => import("../pages/home.page"));
const Loginpage = lazy(() => import("../pages/login.page"));
const NotFoundpage = lazy(() => import("../pages/not_found.page"));
const ProductDetailpage = lazy(() => import("../pages/detail_product.page"));
const Productpage = lazy(() => import("../pages/list_product.page"));
const Profilepage = lazy(() => import("../pages/profile.page"));
const Registerpage = lazy(() => import("../pages/register.page"));
const CareerLayout = lazy(() => import("../layouts/career/career.layout"));
const HelpCenterLayout = lazy(() => import("../layouts/helpcenter/help_center.layout"));
const AboutUsPage = lazy(() =>
  import("../pages/static_content.page").then((module) => ({
    default: module.AboutUsPage,
  }))
);
const ContactPage = lazy(() =>
  import("../pages/static_content.page").then((module) => ({
    default: module.ContactPage,
  }))
);
const FaqPage = lazy(() =>
  import("../pages/static_content.page").then((module) => ({
    default: module.FaqPage,
  }))
);
const PolicyPage = lazy(() =>
  import("../pages/static_content.page").then((module) => ({
    default: module.PolicyPage,
  }))
);
const TermsPage = lazy(() =>
  import("../pages/static_content.page").then((module) => ({
    default: module.TermsPage,
  }))
);

const RouteFallback = () => (
  <div className="route-fallback">
    <Loading />
  </div>
);

const lazyRoute = (Component) => (
  <Suspense fallback={<RouteFallback />}>
    <Component />
  </Suspense>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={lazyRoute(Homepage)} />
          <Route path="login" element={lazyRoute(Loginpage)} />
          <Route path="register" element={lazyRoute(Registerpage)} />
          <Route path="brand" element={lazyRoute(Brandpage)} />
          <Route path="brand/:id" element={lazyRoute(Brandpage)} />
          <Route path="category" element={lazyRoute(Catepage)} />
          <Route path="category/:id" element={lazyRoute(Catepage)} />
          <Route path="product/:id" element={lazyRoute(ProductDetailpage)} />
          <Route path="product" element={lazyRoute(Productpage)} />
          <Route path="cart" element={lazyRoute(Cartpage)} />
          <Route path="profile" element={lazyRoute(Profilepage)} />
          <Route path="checkout" element={lazyRoute(Checkoutpage)} />
          <Route path="about-us" element={lazyRoute(AboutUsPage)} />
          <Route path="contact" element={lazyRoute(ContactPage)} />
          <Route path="terms" element={lazyRoute(TermsPage)} />
          <Route path="policy" element={lazyRoute(PolicyPage)} />
          <Route path="faqs" element={lazyRoute(FaqPage)} />
          <Route path="help-center" element={lazyRoute(HelpCenterLayout)} />
          <Route path="career" element={lazyRoute(CareerLayout)} />
          <Route path="careers" element={lazyRoute(CareerLayout)} />
          <Route path="forbidden" element={lazyRoute(Forbiddenpage)} />
          <Route path="*" element={lazyRoute(NotFoundpage)} />
        </Route>
        <Route path="/error" element={lazyRoute(Errorpage)} />
        <Route path="/dashboard" element={lazyRoute(Adminpage)} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
