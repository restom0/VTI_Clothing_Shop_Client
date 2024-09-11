import Notificationpage from "../components/shared/Notificationpage";
import { forbidden } from "../constants/notification";

const Forbiddenpage = () => {
  return <Notificationpage noti={forbidden} />;
};

export default Forbiddenpage;
