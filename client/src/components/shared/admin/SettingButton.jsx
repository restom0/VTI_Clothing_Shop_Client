import { IconButton, Tooltip } from "@material-tailwind/react";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setSelectedId } from "../../../features/slices/selectIdPrice";

const SettingButton = ({
  handleUpdateOpen,
  handleDeleteOpen,
  updateContent,
  deleteContent,
  noUpdate,
  noDelete,
  id,
}) => {
  const dispatch = useDispatch();
  return (
    <td className="p-4">
      <div className="flex items-center gap-4 justify-around">
        {!noUpdate && (
          <Tooltip content={updateContent}>
            <IconButton
              color="green"
              onClick={() => {
                handleUpdateOpen(), dispatch(setSelectedId(id));
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        {!noDelete && (
          <Tooltip content={deleteContent}>
            <IconButton
              color="red"
              onClick={() => {
                handleDeleteOpen(), dispatch(setSelectedId(id));
              }}
            >
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
  id: PropTypes.number.isRequired,
};

export default SettingButton;
