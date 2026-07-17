import { Suspense, useMemo } from "react";
import AdminNavbar from "../components/shared/admin/admin_navbar.component";
import SidebarWithSearch from "../components/shared/search_sidebar.component";
import Loading from "../components/shared/loading.component";
import { getSidebarItemByLabel } from "../constants/sidebar_search.constant";
import { useSelector } from "react-redux";

/** Handles adminpage. */
const Adminpage = () => {
  const sidebar_item = useSelector((state) => state.sidebar_item.value);
  /** Handles active sidebar item. */
  const activeSidebarItem = useMemo(() => getSidebarItemByLabel(sidebar_item), [sidebar_item]);
  const ActivePanel = activeSidebarItem.Component;

  return (
    <div>
      <AdminNavbar />
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <SidebarWithSearch />
        </div>
        <div className="col-span-10">
          <Suspense
            fallback={
              <div className="admin-panel-fallback">
                <Loading />
              </div>
            }
          >
            <ActivePanel />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Adminpage;
