import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react/components/Accordion";
import { Card } from "@material-tailwind/react/components/Card";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react/components/List";
import { Typography } from "@material-tailwind/react/components/Typography";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import PublicIcon from "@mui/icons-material/Public";
import { useDispatch, useSelector } from "react-redux";
import { SIDEBAR_SEARCH } from "../../constants/sidebar_search.constant";
import { setOpenAccordion } from "../../features/slices/open_accordion.slice";
import { setSidebarItem } from "../../features/slices/sidebar_item.slice";

/** Gets sidebar item class name. */
const getSidebarItemClassName = (isActive) => (isActive ? "sidebar-item-active" : "");

/** Handles sidebar with search. */
const SidebarWithSearch = () => {
  const sidebarItem = useSelector((state) => state.sidebar_item.value);
  const openAccordion = useSelector((state) => state.openAccordion.value);
  const dispatch = useDispatch();

  return (
    <div>
      <Card className="relative h-[92vh] overflow-y-auto overflow-x-hidden w-full max-w-[20rem] py-4 shadow-xl shadow-blue-gray-900/5 z-10 bg-gray-100">
        <List className="px-2">
          {SIDEBAR_SEARCH.map((item, index) =>
            item.title ? (
              <Accordion
                key={item.title.label}
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
                    <Typography color="blue-gray" className="mr-auto font-normal">
                      {item.title.label}
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1" key={`accord-body-${item.title.label}`}>
                  <List className="p-0" key={`list-${item.title.label}`}>
                    {item.sublist.map((subitem) => {
                      const isActive = sidebarItem === subitem.label;

                      return (
                        <ListItem
                          selected={isActive}
                          key={subitem.label}
                          onClick={() => dispatch(setSidebarItem({ label: subitem.label }))}
                          className={getSidebarItemClassName(isActive)}
                        >
                          <ListItemPrefix>
                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                          </ListItemPrefix>
                          {subitem.label}
                        </ListItem>
                      );
                    })}
                  </List>
                </AccordionBody>
              </Accordion>
            ) : (
              item.sublist.map((subitem) => {
                const isActive = sidebarItem === subitem.label;

                return (
                  <ListItem
                    key={subitem.label}
                    selected={isActive}
                    onClick={() => dispatch(setSidebarItem({ label: subitem.label }))}
                    className={getSidebarItemClassName(isActive)}
                  >
                    <ListItemPrefix>
                      <PublicIcon className="h-3 w-5" />
                    </ListItemPrefix>
                    {subitem.label}
                  </ListItem>
                );
              })
            )
          )}
        </List>
      </Card>
    </div>
  );
};

export default SidebarWithSearch;
