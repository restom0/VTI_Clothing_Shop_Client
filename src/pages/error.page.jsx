import Notificationpage from "../layouts/shop/notification.layout";
import { error } from "../constants/notification.constant";

/** Handles errorpage. */
const Errorpage = () => {
  return <Notificationpage noti={error} />;
};

export default Errorpage;
