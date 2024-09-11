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
import PublicIcon from "@mui/icons-material/Public";
import { SIDEBAR_SEARCH } from "../../constants/sidebar_search.constant";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarItem } from "../../features/slices/sidebar_item.slice";
import { setOpenAccordion } from "../../features/slices/open_accordion.slice";
const SidebarWithSearch = () => {
  const sidebar_item = useSelector((state) => state.sidebar_item.value);
  const openAccordion = useSelector((state) => state.openAccordion.value);
  const dispatch = useDispatch();

  return (
    <div>
      <Card className="relative h-[92vh] overflow-y-auto overflow-x-hidden w-full max-w-[20rem] py-4 shadow-xl shadow-blue-gray-900/5 z-10 bg-gray-100">
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
        <List className="px-2">
          {SIDEBAR_SEARCH.map((item, index) =>
            item.title ? (
              <>
                <Accordion
                  open={openAccordion === index}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        openAccordion === index ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <ListItem className="p-0" selected={openAccordion === index}>
                    <AccordionHeader
                      onClick={() => dispatch(setOpenAccordion(index))}
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
                          selected={sidebar_item == subitem}
                          key={subitem.label}
                          onClick={() => dispatch(setSidebarItem(subitem))}
                          style={{
                            backgroundColor:
                              sidebar_item === subitem.label
                                ? "white"
                                : "transparent",
                            color:
                              sidebar_item === subitem.label
                                ? "#006edc"
                                : "inherit",
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
                  selected={sidebar_item == item.sublist[0].label}
                  onClick={() => dispatch(setSidebarItem(item.sublist[0]))}
                  style={{
                    backgroundColor:
                      sidebar_item === item.sublist[0].label
                        ? "white"
                        : "transparent",
                    color:
                      sidebar_item === item.sublist[0].label
                        ? "#006edc"
                        : "inherit",
                  }}
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
  tab: PropTypes.string.isRequired,
  setTab: PropTypes.func.isRequired,
};
export default SidebarWithSearch;
