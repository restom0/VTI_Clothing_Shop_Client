import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import TableHeader from "./TableHeader";
import AdminPagination from "./admin/AdminPagination";
import SettingButton from "./admin/SettingButton";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedId } from "../../features/slices/selectIdPrice";
const Table = ({
  TABLE_HEAD,
  TABLE_ROWS,
  // active,
  // setActive,
  handleDetailOpen,
  handleUpdateOpen,
  handleDeleteOpen,
  updateContent,
  deleteContent,
  noUpdate,
  noDelete,
  data,
  handleData,
}) => {
  const active = useSelector((state) => state.active.value);
  const dispatch = useDispatch();
  return (
    <Card>
      <table className="w-full min-w-max table-auto text-center">
        <TableHeader
          TABLE_HEAD={TABLE_HEAD}
          noUpdate={noUpdate}
          noDelete={noDelete}
        />
        <tbody>
          {TABLE_ROWS.slice((active - 1) * 6, active * 6).map((row, index) => (
            <tr key={index} className="border-b border-gray-200">
              {Object.values(row).map((value, index1) => (
                <td
                  key={index1}
                  className="p-4"
                  onClick={() => {
                    handleDetailOpen(),
                      dispatch(setSelectedId(index + (active - 1) * 6));
                  }}
                  colSpan={index1 == 0 ? 1 : TABLE_HEAD[index1 - 1].col}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {value}
                  </Typography>
                </td>
              ))}
              {(!noDelete || !noUpdate) && (
                <SettingButton
                  id={index + (active - 1) * 6}
                  handleDeleteOpen={handleDeleteOpen}
                  handleUpdateOpen={handleUpdateOpen}
                  updateContent={updateContent}
                  deleteContent={deleteContent}
                  noUpdate={noUpdate}
                  noDelete={noDelete}
                />
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <AdminPagination page={Math.ceil(TABLE_ROWS.length / 6)} />
    </Card>
  );
};

Table.propTypes = {
  TABLE_HEAD: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      col: PropTypes.number.isRequired,
    })
  ).isRequired,
  TABLE_ROWS: PropTypes.array.isRequired,
  handleDetailOpen: PropTypes.func,
  handleUpdateOpen: PropTypes.func,
  handleDeleteOpen: PropTypes.func,
  updateContent: PropTypes.string,
  deleteContent: PropTypes.string,
  noUpdate: PropTypes.bool,
  noDelete: PropTypes.bool,
  data: PropTypes.array.isRequired,
  handleData: PropTypes.func.isRequired,
};
export default Table;
