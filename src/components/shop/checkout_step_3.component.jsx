import Notificationpage from "../../layouts/shop/notification.layout";
import { success_checkout } from "../../constants/notification.constant";
/** Handles step3 checkout. */
const Step3Checkout = () => {
  return <Notificationpage notification={success_checkout} />;
};

export default Step3Checkout;
