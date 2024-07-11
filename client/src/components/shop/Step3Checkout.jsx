import React, { useState } from "react";

import Notificationpage from "../layouts/Notificationpage";
import { fail_checkout, success_checkout } from "../../constants/notification";
const Step3Checkout = () => {
  const [check, setCheck] = useState(true);
  return <Notificationpage noti={check ? success_checkout : fail_checkout} />;
};

export default Step3Checkout;
