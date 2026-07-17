import { ROUTES } from "../../constants/routes.constant";
import { Card } from "@material-tailwind/react/components/Card";
import { Typography } from "@material-tailwind/react/components/Typography";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react/components/List";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { profile_menu } from "../../constants/menu_item.constant";
import { Avatar } from "@mui/material";
import { useI18n } from "../../i18n";
import { STORAGE_KEYS } from "../../constants/storage.constant";
/** Handles profile sidebar. */
const ProfileSidebar = ({ tab, setTab }) => {
  const navigate = useNavigate();
  const { t } = useI18n();
  return (
    <div>
      <Card className="profile-sidebar-card relative overflow-y-auto p-4 shadow-xl shadow-blue-gray-900/5 z-10">
        {/* <div className="mb-2 flex items-center gap-4 p-4">
          <img
          src="https://d1.awsstatic.com/partner-network/partner_marketing_web_team/600x400_VTI.d8eba650f439bfec6d3eef0034c2e59a323353c1.png"
          alt="brand"
          className="h-16 w-auto"
        />
        </div> */}
        <div className="p-10">
          <div className="flex items-center gap-4">
            <Avatar
              src={localStorage.getItem(STORAGE_KEYS.AVATAR)}
              alt="avatar"
              sx={{ width: 80, height: 80 }}
            />
            <div>
              <Typography variant="small" color="gray" className="font-normal">
                {t("profile.account_of")}
              </Typography>
              <Typography variant="h6">{localStorage.getItem(STORAGE_KEYS.NAME)}</Typography>
            </div>
          </div>
        </div>
        <List>
          {profile_menu.map(({ labelKey }, index) => (
            <ListItem key={labelKey} selected={tab === index} onClick={() => setTab(index)}>
              <ListItemPrefix>
                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
              </ListItemPrefix>
              {t(labelKey)}
            </ListItem>
          ))}
          <ListItem
            onClick={() => {
              localStorage.removeItem(STORAGE_KEYS.TOKEN);
              navigate(ROUTES.LOGIN);
            }}
          >
            <ListItemPrefix>
              <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
            </ListItemPrefix>
            {t("common.logout")}
          </ListItem>
        </List>
      </Card>
    </div>
  );
};

ProfileSidebar.propTypes = {
  tab: PropTypes.number.isRequired,
  setTab: PropTypes.func.isRequired,
};
export default ProfileSidebar;
