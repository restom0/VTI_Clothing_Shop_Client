import { useState } from "react";

const useOpen = () => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDetailOpen = () => {
    setDetailOpen(true);
  };
  const handleDetailClose = () => {
    setDetailOpen(false);
  };
  const handleUpdateOpen = () => {
    setUpdateOpen(true);
  };
  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };
  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };
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
