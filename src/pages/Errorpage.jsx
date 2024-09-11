import React from "react";
import Notificationpage from "../components/shared/Notificationpage";
import { error } from "../constants/notification";

const Errorpage = () => {
  return <Notificationpage noti={error} />;
};

export default Errorpage;
