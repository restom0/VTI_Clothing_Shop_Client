import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Add this line
import Banner from "../../components/shared/shop/Banner";
import NavbarWithSublist from "../../components/shared/shop/NavbarWithSublist";
import Footer from "../../components/shared/shop/Footer";
import { Outlet } from "react-router-dom";
import Loading from "../../components/shared/Loading";
import Errorpage from "../../pages/Errorpage";

const Layout = () => {
  const [loading, setLoading] = useState(
    localStorage.getItem("isLoading") === true
  );
  return (
    <>
      <>
        <Banner />
        <NavbarWithSublist />
        <Outlet />
        <Footer />
      </>
    </>
  );
};

export default Layout;
