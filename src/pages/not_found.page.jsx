import Notificationpage from "../layouts/shop/notification.layout";
import { not_found } from "../constants/notification.constant";

/** Handles not foundpage. */
const NotFoundpage = () => {
  return <Notificationpage noti={not_found} />;
};

export default NotFoundpage;
