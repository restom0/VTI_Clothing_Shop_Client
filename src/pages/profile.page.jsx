import React from "react";
import ProfileSidebar from "../components/shared/profile_sidebar.component";
import { profile_menu } from "../constants/menu_item.constant";

const Profilepage = () => {
  const [tab, setTab] = React.useState(0);
  return (
    <>
      <div className="page-container profile-page">
        <div>
          <ProfileSidebar tab={tab} setTab={setTab} />
        </div>
        <div className="profile-content">
          {profile_menu.map(({ link }, index) => tab === index && link)}
        </div>
      </div>
    </>
  );
};

export default Profilepage;
