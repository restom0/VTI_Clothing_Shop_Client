import React from "react";
import SidebarWithSearch from "../layouts/SidebarWithSearch";
import Analytic from "../components/Admin/Analytic";
import History from "../components/Admin/History";
import Brand from "../components/Admin/Brand";
import AdminNavbar from "../layouts/Admin/AdminNavbar";
import Category from "../components/Admin/Category";
import ProductList from "../components/Admin/ProductList";
import Inventory from "../components/Admin/Inventory";
import ImportProduct from "../components/Admin/ImportProduct";
import OnsaleProduct from "../components/Admin/OnsaleProduct";
import Report from "../components/Admin/Report";
import AllOrder from "../components/Admin/AllOrder";
import ConfirmOrder from "../components/Admin/ConfirmOrder";
import User from "../components/Admin/User";
import Web from "../components/Admin/Web";
import Inbox from "../components/Admin/Inbox";
import Comment from "../components/Admin/Comment";
import { SIDEBAR_SEARCH } from "../constants/sidebar_search";

const Adminpage = () => {
  const [tab, setTab] = React.useState("Thống kê");
  return (
    <div>
      <AdminNavbar />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <SidebarWithSearch tab={tab} setTab={setTab} />
        </div>
        <div className="col-span-9">
          {SIDEBAR_SEARCH.map((item) =>
            item.sublist.map(
              (subitem) => subitem.label === tab && subitem.elements
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Adminpage;
