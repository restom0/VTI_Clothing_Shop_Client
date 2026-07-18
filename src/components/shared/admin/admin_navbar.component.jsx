import React from "react";
import { Navbar } from "@material-tailwind/react/components/Navbar";
import { Typography } from "@material-tailwind/react/components/Typography";
import { Button } from "@material-tailwind/react/components/Button";
import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react/components/Menu";
import { Avatar } from "@material-tailwind/react/components/Avatar";
import { IconButton } from "@material-tailwind/react/components/IconButton";
import { ChevronDownIcon, Bars2Icon } from "@heroicons/react/24/solid";
import { account_menu } from "../../../constants/menu_item.constant";
import { STORAGE_KEYS } from "../../../constants/storage.constant";

/** Checks whether desktop resize should close the admin mobile nav. */
export const shouldCloseAdminNavOnDesktop = (width) => width >= 960;

/** Handles profile menu. */
const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  /** Closes menu. */
  const closeMenu = () => setIsMenuOpen(false);
  if (!localStorage.getItem(STORAGE_KEYS.TOKEN)) {
    window.location.href = "/login";
  }
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={
              localStorage.getItem(STORAGE_KEYS.AVATAR) ||
              "https://cdn.fakercloud.com/avatars/brunodesign1206_128.jpg"
            }
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {account_menu.map(({ label, icon }, key) => {
          const isLastItem = key === account_menu.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

/** Handles admin navbar. */
const AdminNavbar = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  /** Toggles is nav open. */
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    const closeOnDesktop = () => {
      if (shouldCloseAdminNavOnDesktop(window.innerWidth)) setIsNavOpen(false);
    };

    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-3xl rounded-none px-4 py-2 sticky top-0 z-50">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography variant="h3" className="ms-5" color="blue-gray">
          <span className="text-[#006edc]">VTI</span> Shop
        </Typography>
        {/* <div className="hidden lg:block">
          <NavList />
        </div> */}
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      {/* <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav> */}
    </Navbar>
  );
};
export default AdminNavbar;
