import PropTypes from "prop-types"; // Import PropTypes
import { Typography } from "@material-tailwind/react/components/Typography";
import { Button } from "@material-tailwind/react/components/Button";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n";

export function NotificationLayout({ notification, noti }) {
  const navigate = useNavigate();
  const { t } = useI18n();
  const activeNotification = notification ?? noti;

  return (
    <div className="my-10 mx-auto grid place-items-center text-center px-8">
      <div>
        {activeNotification.icon}
        <Typography
          variant="h1"
          color="blue-gray"
          className="mt-10 !text-3xl !leading-snug md:!text-4xl"
        >
          {t(activeNotification.nameKey)}
        </Typography>
        <Typography
          variant="h6"
          color="blue-gray"
          className="mt-5 !text-2xl !leading-snug md:!text-2xl"
        >
          {t(activeNotification.messageKey)}
        </Typography>
        <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-lg">
          {t(activeNotification.subtitleKey)}
        </Typography>
        <Button color="gray" className="w-full px-4 md:w-[8rem]" onClick={() => navigate("/")}>
          {t("common.back_home")}
        </Button>
      </div>
    </div>
  );
}
NotificationLayout.propTypes = {
  notification: PropTypes.shape({
    icon: PropTypes.element.isRequired,
    nameKey: PropTypes.string.isRequired,
    messageKey: PropTypes.string.isRequired,
    subtitleKey: PropTypes.string.isRequired,
  }),
  noti: PropTypes.shape({
    icon: PropTypes.element.isRequired,
    nameKey: PropTypes.string.isRequired,
    messageKey: PropTypes.string.isRequired,
    subtitleKey: PropTypes.string.isRequired,
  }),
};

export default NotificationLayout;
