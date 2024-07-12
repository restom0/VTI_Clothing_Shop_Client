import React from "react";
import AdminNavbar from "../components/shared/admin/AdminNavbar";
import SidebarWithSearch from "../components/shared/SidebarWithSearch";
import { SIDEBAR_SEARCH } from "../constants/sidebar_search";

const Adminpage = () => {
  const [tab, setTab] = React.useState("Thống kê");
  return (
    <div>
      <AdminNavbar />
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <SidebarWithSearch tab={tab} setTab={setTab} />
        </div>
        <div className="col-span-10">
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
