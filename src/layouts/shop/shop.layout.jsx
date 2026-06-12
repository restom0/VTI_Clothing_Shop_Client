import Banner from "../../components/shared/shop/Banner";
import NavbarWithSublist from "../../components/shared/shop/NavbarWithSublist";
import Footer from "../../components/shared/shop/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      {/* Banner + Navbar = landmark header */}
      <header role="banner">
        <Banner />
        <NavbarWithSublist />
      </header>

      {/* main-content là target của skip-to-content link */}
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;
