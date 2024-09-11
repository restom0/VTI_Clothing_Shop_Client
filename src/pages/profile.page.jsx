import React from "react";
import ProfileSidebar from "../components/shared/profile_sidebar.component";
import { profile_menu } from "../constants/menu_item";

const Profilepage = () => {
  const [tab, setTab] = React.useState(0);
  return (
    <>
      <div className="grid grid-cols-4">
        <div>
          <ProfileSidebar tab={tab} setTab={setTab} />
        </div>
        <div className="px-3 py-3 col-span-3">
          {profile_menu.map(({ link }, index) => tab === index && link)}
        </div>
      </div>
    </>
  );
};

export default Profilepage;
