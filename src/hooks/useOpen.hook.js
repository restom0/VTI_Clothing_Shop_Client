import { useState } from "react";

/** Uses open. */
const useOpen = () => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  /** Handles detail open. */
  const handleDetailOpen = () => {
    setDetailOpen(true);
  };
  /** Handles detail close. */
  const handleDetailClose = () => {
    setDetailOpen(false);
  };
  /** Handles update open. */
  const handleUpdateOpen = () => {
    setUpdateOpen(true);
  };
  /** Handles update close. */
  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };
  /** Handles delete open. */
  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };
  /** Handles delete close. */
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  return {
    detailOpen,
    updateOpen,
    deleteOpen,
    handleDetailOpen,
    handleUpdateOpen,
    handleDeleteOpen,
    handleDetailClose,
    handleUpdateClose,
    handleDeleteClose,
  };
};

export default useOpen;
