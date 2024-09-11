import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setSelectedId } from "../../../features/slices/select_id.slice";

const SettingButton = ({
  handleUpdateOpen,
  handleDeleteOpen,
  updateContent,
  deleteContent,
  noUpdate,
  noDelete,
  isDeleted,
  isUpdated,
  id,
}) => {
  const dispatch = useDispatch();
  return (
    <td className="p-4">
      <div className="flex items-center gap-4 justify-around">
        {!noUpdate && (
          <Tooltip content={updateContent}>
            {isUpdated ? (
              <Button color="red" loading={isUpdated}>
                {isUpdated && ""}
              </Button>
            ) : (
              <IconButton
                color="green"
                loading={isUpdated}
                onClick={() => {
                  handleUpdateOpen(), dispatch(setSelectedId(id));
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </Tooltip>
        )}
        {!noDelete && (
          <Tooltip content={deleteContent}>
            {isDeleted ? (
              <Button color="red" loading={isDeleted}>
                {isDeleted && ""}
              </Button>
            ) : (
              <IconButton
                color="red"
                onClick={() => {
                  handleDeleteOpen(), dispatch(setSelectedId(id));
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
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
