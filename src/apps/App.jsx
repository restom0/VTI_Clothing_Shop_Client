import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layouts/shop/shop.layout";
import Homepage from "../pages/home.page";
import Loginpage from "../pages/login.page";
import Registerpage from "../pages/register.page";
import Brandpage from "../pages/brand.page";
import Catepage from "../pages/category.page";
import ProductDetailpage from "../pages/detail_product.page";
import Productpage from "../pages/list_product.page";
import Cartpage from "../pages/cart.page";
import Profilepage from "../pages/profile.page";
import Checkoutpage from "../pages/checkout.page";
import Forbiddenpage from "../pages/forbidden.page";
import NotFoundpage from "../pages/not_found.page";
import Adminpage from "../pages/admin.page";
import CareerLayout from "../layouts/career/career.layout";
import HelpCenterLayout from "../layouts/helpcenter/help_center.layout";
import Errorpage from "../pages/error.page";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="login" element={<Loginpage />} />
          <Route path="register" element={<Registerpage />} />
          <Route path="brand" element={<Brandpage />} />
          <Route path="brand/:id" element={<Brandpage />} />
          <Route path="category" element={<Catepage />} />
          <Route path="category/:id" element={<Catepage />} />
          <Route path="product/:id" element={<ProductDetailpage />} />
          <Route path="product" element={<Productpage />} />
          <Route path="cart" element={<Cartpage />} />
          <Route path="profile" element={<Profilepage />} />
          <Route path="checkout" element={<Checkoutpage />} />
          <Route path="forbidden" element={<Forbiddenpage />} />
          <Route path="*" element={<NotFoundpage />} />
        </Route>
        <Route path="/error" element={<Errorpage />} />
        <Route path="/dashboard" element={<Adminpage />} />
        <Route path="/careers/" element={<CareerLayout />}></Route>
        <Route path="/help-center/" element={<HelpCenterLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
