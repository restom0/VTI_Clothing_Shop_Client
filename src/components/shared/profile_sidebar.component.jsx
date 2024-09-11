import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import AdminNavbar from "./admin/admin_navbar.component";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { profile_menu } from "../../constants/menu_item";
import { Avatar } from "@mui/material";
const ProfileSidebar = ({ tab, setTab }) => {
  const [open, setOpen] = React.useState(1);
  const [openAlert, setOpenAlert] = React.useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const navigate = useNavigate();
  return (
    <div>
      <Card className="relative h-[84vh] overflow-y-auto w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 z-10">
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
              src={localStorage.getItem("avatar")}
              alt="avatar"
              sx={{ width: 80, height: 80 }}
            />
            <div>
              <Typography variant="small" color="gray" className="font-normal">
                Tài khoản của
              </Typography>
              <Typography variant="h6">
                {localStorage.getItem("name")}
              </Typography>
            </div>
          </div>
        </div>
        <List>
          {profile_menu.map(({ label }, index) => (
            <ListItem
              key={label}
              selected={tab === index}
              onClick={() => setTab(index)}
            >
              <ListItemPrefix>
                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
              </ListItemPrefix>
              {label}
            </ListItem>
          ))}
          <ListItem
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            <ListItemPrefix>
              <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
            </ListItemPrefix>
            Đăng xuất
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
