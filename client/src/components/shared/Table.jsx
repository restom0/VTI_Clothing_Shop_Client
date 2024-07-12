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
const Table = ({
  TABLE_HEAD,
  TABLE_ROWS,
  active,
  setActive,
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
              <td className="p-4">{index + 1}</td>
              {Object.values(row).map((value, index) => (
                <td
                  key={index}
                  className="p-4"
                  onClick={handleDetailOpen}
                  colSpan={TABLE_HEAD[index].col}
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
      <AdminPagination
        page={Math.ceil(TABLE_ROWS.length / 6)}
        active={active}
        setActive={setActive}
      />
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
  active: PropTypes.number.isRequired,
  setActive: PropTypes.func.isRequired,
  handleDetailOpen: PropTypes.func.isRequired,
  handleUpdateOpen: PropTypes.func.isRequired,
  handleDeleteOpen: PropTypes.func.isRequired,
  updateContent: PropTypes.string.isRequired,
  deleteContent: PropTypes.string.isRequired,
  noUpdate: PropTypes.bool,
  noDelete: PropTypes.bool,
  data: PropTypes.object.isRequired,
  handleData: PropTypes.func.isRequired,
};
export default Table;
