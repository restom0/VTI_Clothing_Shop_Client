import Notificationpage from "../layouts/shop/notification.layout";
import { forbidden } from "../constants/notification.constant";

/** Handles forbiddenpage. */
const Forbiddenpage = () => {
  return <Notificationpage noti={forbidden} />;
};

export default Forbiddenpage;
