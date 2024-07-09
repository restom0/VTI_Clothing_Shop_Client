import React from "react";
import PropTypes from "prop-types"; // Add this line
import Banner from "./Banner";
import NavbarWithSublist from "./NavbarWithSublist";
import Footer from "./Footer";
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
