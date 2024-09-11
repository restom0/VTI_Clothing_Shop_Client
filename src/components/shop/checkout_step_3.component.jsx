import { useState } from "react";
import Notificationpage from "../../layouts/shop/notification.layout";
import {
  fail_checkout,
  success_checkout,
} from "../../constants/notification.constant";
const Step3Checkout = () => {
  const [check, setCheck] = useState(true);
  return <Notificationpage noti={check ? success_checkout : fail_checkout} />;
};

export default Step3Checkout;
