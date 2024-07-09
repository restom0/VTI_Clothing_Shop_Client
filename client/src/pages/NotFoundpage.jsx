import React from "react";
import Notificationpage from "../layouts/Notificationpage";
import { not_found } from "../constants/notification";

const NotFoundpage = () => {
  return <Notificationpage noti={not_found} />;
};

export default NotFoundpage;
