import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layouts/shop/shop.layout";
import Loading from "../components/shared/loading.component";

/** Handles adminpage. */
const Adminpage = lazy(() => import("../pages/admin.page"));
/** Handles brandpage. */
const Brandpage = lazy(() => import("../pages/brand.page"));
/** Handles cartpage. */
const Cartpage = lazy(() => import("../pages/cart.page"));
/** Handles catepage. */
const Catepage = lazy(() => import("../pages/category.page"));
/** Handles checkoutpage. */
const Checkoutpage = lazy(() => import("../pages/checkout.page"));
/** Handles errorpage. */
const Errorpage = lazy(() => import("../pages/error.page"));
/** Handles forbiddenpage. */
const Forbiddenpage = lazy(() => import("../pages/forbidden.page"));
/** Handles homepage. */
const Homepage = lazy(() => import("../pages/home.page"));
/** Handles loginpage. */
const Loginpage = lazy(() => import("../pages/login.page"));
/** Handles not foundpage. */
const NotFoundpage = lazy(() => import("../pages/not_found.page"));
/** Handles product detailpage. */
const ProductDetailpage = lazy(() => import("../pages/detail_product.page"));
/** Handles productpage. */
const Productpage = lazy(() => import("../pages/list_product.page"));
/** Handles profilepage. */
const Profilepage = lazy(() => import("../pages/profile.page"));
/** Handles registerpage. */
const Registerpage = lazy(() => import("../pages/register.page"));
/** Handles career layout. */
const CareerLayout = lazy(() => import("../layouts/career/career.layout"));
/** Handles help center layout. */
const HelpCenterLayout = lazy(() => import("../layouts/helpcenter/help_center.layout"));
/** Handles about us page. */
const AboutUsPage = lazy(() =>
  import("../pages/static_content.page").then((module) => ({
    default: module.AboutUsPage,
  }))
);
/** Handles contact page. */
const ContactPage = lazy(() =>
  import("../pages/static_content.page").then((module) => ({
    default: module.ContactPage,
  }))
);
/** Handles faq page. */
const FaqPage = lazy(() =>
  import("../pages/static_content.page").then((module) => ({
    default: module.FaqPage,
  }))
);
/** Handles policy page. */
const PolicyPage = lazy(() =>
  import("../pages/static_content.page").then((module) => ({
    default: module.PolicyPage,
  }))
);
/** Handles terms page. */
const TermsPage = lazy(() =>
  import("../pages/static_content.page").then((module) => ({
    default: module.TermsPage,
  }))
);

/** Handles route fallback. */
const RouteFallback = () => (
  <div className="route-fallback">
    <Loading />
  </div>
);

/** Handles lazy route. */
const lazyRoute = (Component) => (
  <Suspense fallback={<RouteFallback />}>
    <Component />
  </Suspense>
);

/** Handles app. */
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
