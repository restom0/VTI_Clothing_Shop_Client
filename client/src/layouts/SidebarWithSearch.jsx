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
import AdminNavbar from "./Admin/AdminNavbar";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PublicIcon from "@mui/icons-material/Public";
import { SIDEBAR_SEARCH } from "../constants/sidebar_search";
import PropTypes from "prop-types";
const SidebarWithSearch = ({ tab, setTab }) => {
  const [open, setOpen] = React.useState(1);
  const [openAlert, setOpenAlert] = React.useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? -1 : value);
  };
  return (
    <div>
      <Card className="relative h-[92vh] overflow-y-auto overflow-x-hidden w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 z-10 bg-gray-100">
        {/* <div className="mb-2 flex items-center gap-4 p-4">
          <img
          src="https://d1.awsstatic.com/partner-network/partner_marketing_web_team/600x400_VTI.d8eba650f439bfec6d3eef0034c2e59a323353c1.png"
          alt="brand"
          className="h-16 w-auto"
        />
        </div> */}
        {/* <div className="p-2">
          <Input
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            label="Search"
          />
        </div> */}
        <List>
          {SIDEBAR_SEARCH.map((item, index) =>
            item.title ? (
              <>
                <Accordion
                  open={open === index}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === index ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <ListItem className="p-0" selected={open === index}>
                    <AccordionHeader
                      onClick={() => handleOpen(index)}
                      className="border-b-0 p-3"
                    >
                      <ListItemPrefix>{item.title.icon}</ListItemPrefix>
                      <Typography
                        color="blue-gray"
                        className="mr-auto font-normal"
                      >
                        {item.title.label}
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody
                    className="py-1"
                    key={"accord-body-" + item.title.label}
                  >
                    <List className="p-0" key={"list-" + item.title.label}>
                      {item.sublist.map((subitem) => (
                        <ListItem
                          selected={tab == subitem}
                          key={subitem.label}
                          onClick={() => {
                            setTab(subitem.label);
                          }}
                        >
                          <ListItemPrefix>
                            <ChevronRightIcon
                              strokeWidth={3}
                              className="h-3 w-5"
                            />
                          </ListItemPrefix>
                          {subitem.label}
                        </ListItem>
                      ))}
                    </List>
                  </AccordionBody>
                </Accordion>
              </>
            ) : (
              <>
                <ListItem
                  key={item.sublist[0].label}
                  selected={tab == item.sublist[0].label}
                  onClick={() => setTab(item.sublist[0].label)}
                >
                  <ListItemPrefix>
                    <PublicIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  {item.sublist[0].label}
                </ListItem>
              </>
            )
          )}
        </List>
      </Card>
    </div>
  );
};

SidebarWithSearch.propTypes = {
  tab: PropTypes.number.isRequired,
  setTab: PropTypes.func.isRequired,
};
export default SidebarWithSearch;
