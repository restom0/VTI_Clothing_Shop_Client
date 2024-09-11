import Notificationpage from "../layouts/shop/notification.layout";
import { not_found } from "../constants/notification.constant";

const NotFoundpage = () => {
  return <Notificationpage noti={not_found} />;
};

export default NotFoundpage;
