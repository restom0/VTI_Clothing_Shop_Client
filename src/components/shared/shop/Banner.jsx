import React from "react";
import {
  Navbar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Button,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { account_menu } from "../../../constants/menu_item.constant";
import { useI18n } from "../../../i18n";
import { getAccountMenuItems, getBannerLabels } from "./banner.helpers";

const hasAuthToken = () => Boolean(localStorage.getItem("token"));

export const ProfileMenuView = ({
  accountItems,
  avatarUrl,
  isMenuOpen,
  onMenuOpenChange,
}) => (
  <Menu open={isMenuOpen} handler={onMenuOpenChange} placement="bottom-end">
    <MenuHandler>
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
      >
        <Avatar
          variant="circular"
          size="sm"
          alt="avatar"
          className="border border-gray-900 p-0.5"
          src={avatarUrl}
        />
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
        />
      </Button>
    </MenuHandler>
    <MenuList className="p-1">
      {accountItems.map(({ href, icon, isDanger, label, labelKey, text }) => (
        <MenuItem
          key={labelKey ?? label}
          className={`flex items-center gap-2 rounded ${
            isDanger ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" : ""
          }`}
        >
          {React.createElement(icon, {
            className: `h-4 w-4 ${isDanger ? "text-red-500" : ""}`,
            strokeWidth: 2,
          })}
          <a
            href={href}
            className={`text-sm font-normal ${isDanger ? "text-red-500" : ""}`}
          >
            {text}
          </a>
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);

ProfileMenuView.propTypes = {
  accountItems: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      isDanger: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
      labelKey: PropTypes.string,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  avatarUrl: PropTypes.string,
  isMenuOpen: PropTypes.bool.isRequired,
  onMenuOpenChange: PropTypes.func.isRequired,
};

const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { t } = useI18n();

  return (
    <ProfileMenuView
      accountItems={getAccountMenuItems(account_menu, t)}
      avatarUrl={localStorage.getItem("avatar")}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    />
  );
};

export const BannerView = ({
  isAuthenticated,
  labels,
  onLoginClick,
  onRegisterClick,
}) => (
  <Navbar className="mx-auto max-w-screen-3xl rounded-none p-0">
    <div className="shop-banner-bar text-blue-gray-900">
      <span className="text-sm font-semibold">{labels.freeShipping}</span>

      {!isAuthenticated ? (
        <div className="flex items-center gap-1">
          <button className="btn-ghost px-3 py-1 text-sm" onClick={onLoginClick}>
            {labels.login}
          </button>
          <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>/</span>
          <button className="btn-ghost px-3 py-1 text-sm" onClick={onRegisterClick}>
            {labels.register}
          </button>
        </div>
      ) : (
        <ProfileMenu />
      )}
    </div>
  </Navbar>
);

BannerView.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  labels: PropTypes.shape({
    freeShipping: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    register: PropTypes.string.isRequired,
  }).isRequired,
  onLoginClick: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
};

const Banner = () => {
  const navigate = useNavigate();
  const { t } = useI18n();

  React.useEffect(() => {
    const close = () => window.innerWidth >= 960;
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <BannerView
      isAuthenticated={hasAuthToken()}
      labels={getBannerLabels(t)}
      onLoginClick={() => navigate("/login")}
      onRegisterClick={() => navigate("/register")}
    />
  );
};

export default Banner;
