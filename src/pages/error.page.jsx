import React from "react";
import Notificationpage from "../layouts/shop/notification.layout";
import { error } from "../constants/notification";

const Errorpage = () => {
  return <Notificationpage noti={error} />;
};

export default Errorpage;
