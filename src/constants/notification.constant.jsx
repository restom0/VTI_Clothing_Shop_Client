import { FlagIcon } from "@heroicons/react/24/solid";
import IconError from "../assets/error_icon.asset";
const success_checkout = {
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-20 h-20 text-green-600 mx-auto"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  ),
  nameKey: "notification.checkout_success_name",
  messageKey: "notification.checkout_success_message",
  subtitleKey: "notification.checkout_success_subtitle",
};
const fail_checkout = {
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-20 h-20 text-red-600"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
      />
    </svg>
  ),
  nameKey: "notification.checkout_failed_name",
  messageKey: "notification.checkout_failed_message",
  subtitleKey: "notification.checkout_failed_subtitle",
};
const not_found = {
  icon: <FlagIcon color="red" className="w-20 h-20 mx-auto" />,
  nameKey: "notification.not_found_name",
  messageKey: "notification.not_found_message",
  subtitleKey: "notification.not_found_subtitle",
};
const forbidden = {
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-20 h-20 text-red-600 mx-auto"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
      />
    </svg>
  ),
  nameKey: "notification.forbidden_name",
  messageKey: "notification.forbidden_message",
  subtitleKey: "notification.forbidden_subtitle",
};
const error = {
  icon: <IconError />,
  nameKey: "notification.error_name",
  messageKey: "notification.error_message",
  subtitleKey: "notification.error_subtitle",
};
export { success_checkout, fail_checkout, not_found, forbidden, error };
