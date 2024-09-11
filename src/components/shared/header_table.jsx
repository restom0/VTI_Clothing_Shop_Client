import {
  Card,
  IconButton,
  Select,
  Tab,
  Tabs,
  TabsHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";
import PropTypes from "prop-types";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../features/slices/sortSlice";
const TableHeader = ({ TABLE_HEAD, noUpdate, noDelete }) => {
  const sort = useSelector((state) => state.sort);
  const dispatch = useDispatch();
  const handleHeaderClick = (column) => {
    const order = column === sort.id && sort.type === "ASC" ? "DESC" : "ASC";
    dispatch(setSort({ column, order }));
  };
  return (
    <>
      <thead>
        <tr className="text-gray-900  uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {/* <th
            className=" border-blue-gray-100 cursor-pointer bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
            onClick={() => handleHeaderClick(0)}
          >
            <Typography className="flex items-center justify-center font-bold text-sm leading-none opacity-70">
              Mã số
              <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
            </Typography>
          </th> */}
          {TABLE_HEAD.map(({ label, col }, index) => (
            <th
              key={index}
              className=" border-blue-gray-100 cursor-pointer bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
              colSpan={col}
              onClick={() => handleHeaderClick(index + 1)}
            >
              <Typography className="flex items-center justify-center font-bold text-sm leading-none opacity-70">
                {label}
                {label.type !== React.Fragment && (
                  <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                )}
              </Typography>
            </th>
          ))}
          {(!noDelete || !noUpdate) && (
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography className="font-bold text-sm leading-none opacity-70">
                <SettingsIcon key={-1} />
              </Typography>
            </th>
          )}
        </tr>
      </thead>
    </>
  );
};

TableHeader.propTypes = {
  TABLE_HEAD: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      col: PropTypes.number.isRequired,
    })
  ).isRequired,
  noUpdate: PropTypes.bool,
  noDelete: PropTypes.bool,
};

export default TableHeader;
