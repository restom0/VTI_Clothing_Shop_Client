import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layouts/Shop/Layout";
import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";
import Registerpage from "../pages/Registerpage";
import Brandpage from "../pages/Brandpage";
import Catepage from "../pages/Catepage";
import ProductDetailpage from "../pages/ProductDetailpage";
import Productpage from "../pages/Productpage";
import Cartpage from "../pages/Cartpage";
import Profilepage from "../pages/Profilepage";
import Checkoutpage from "../pages/Checkoutpage";
import Forbiddenpage from "../pages/Forbiddenpage";
import NotFoundpage from "../pages/NotFoundpage";
import Adminpage from "../pages/Adminpage";
import CareerLayout from "../layouts/Career/CareerLayout";
import HelpCenterLayout from "../layouts/HelpCenter/HelpCenterLayout";
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
        <Route path="/dashboard" element={<Adminpage />} />
        <Route path="/careers/" element={<CareerLayout />}></Route>
        <Route path="/help-center/" element={<HelpCenterLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
