import React from "react";
import Notificationpage from "../layouts/Notificationpage";
import { forbidden } from "../constants/notification";

const Forbiddenpage = () => {
  return <Notificationpage noti={forbidden} />;
};

export default Forbiddenpage;
