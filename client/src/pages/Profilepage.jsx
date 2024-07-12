import React from "react";
import ProfileSidebar from "../components/shared/ProfileSidebar";
import { Container } from "postcss";
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
