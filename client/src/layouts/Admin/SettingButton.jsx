import { IconButton, Tooltip } from "@material-tailwind/react";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";

const SettingButton = ({
  handleUpdateOpen,
  handleDeleteOpen,
  updateContent,
  deleteContent,
  noUpdate,
  noDelete,
}) => {
  return (
    <td className="p-4">
      <div className="flex items-center gap-4 justify-around">
        {!noUpdate && (
          <Tooltip content={updateContent}>
            <IconButton color="green" onClick={handleUpdateOpen}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        {!noDelete && (
          <Tooltip content={deleteContent}>
            <IconButton color="red" onClick={handleDeleteOpen}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </td>
  );
};

SettingButton.propTypes = {
  handleUpdateOpen: PropTypes.func.isRequired,
  handleDeleteOpen: PropTypes.func.isRequired,
  updateContent: PropTypes.string.isRequired,
  deleteContent: PropTypes.string.isRequired,
  noUpdate: PropTypes.bool,
  noDelete: PropTypes.bool,
};

export default SettingButton;
