import React from "react";
import Banner from "../layouts/Shop/Banner";
import NavbarWithSublist from "../layouts/Shop/NavbarWithSublist";
import SidebarWithSearch from "../layouts/SidebarWithSearch";
import ProfileSidebar from "../layouts/ProfileSidebar";
import Footer from "../layouts/Shop/Footer";
import UserInfo from "../components/UserInfo";
import { Container } from "@mui/material";
import Order from "../components/Order";
import ProductSeen from "../components/ProductSeen";
import ProductLove from "../components/ProductLove";
import ProductRating from "../components/ProductRating";
import Voucher from "../components/Voucher";
import { profile_menu } from "../constants/menu_item";

const Profilepage = () => {
  const [tab, setTab] = React.useState(0);
  return (
    <>
      <div className="grid grid-cols-4">
        <div>
          <ProfileSidebar tab={tab} setTab={setTab} />
        </div>
        <Container className="p-5 col-span-3">
          {profile_menu.map(({ link }, index) => tab === index && link)}
        </Container>
      </div>
    </>
  );
};

export default Profilepage;
