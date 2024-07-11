import React from "react";
import PropTypes from "prop-types"; // Add this line
import Banner from "../../components/shared/shop/Banner";
import NavbarWithSublist from "../../components/shared/shop/NavbarWithSublist";
import Footer from "../../components/shared/shop/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Banner />
      <NavbarWithSublist />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
