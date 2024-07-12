import Notificationpage from "../components/shared/Notificationpage";
import { not_found } from "../constants/notification";

const NotFoundpage = () => {
  return <Notificationpage noti={not_found} />;
};

export default NotFoundpage;
