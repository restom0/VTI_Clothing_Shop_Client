import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetSelectedId } from "../features/slices/selectIdSlice";
import { resetName } from "../features/slices/nameSlice";
import { resetDescription } from "../features/slices/descriptionSlice";
import { resetBrand } from "../features/slices/brandSlice";
import { resetProduct } from "../features/slices/productSlice";
import { resetImportedProduct } from "../features/slices/importedProductSlice";
import { resetAvatar } from "../features/slices/avatar_urlSlice";
import { resetSlider1 } from "../features/slices/slider1Slice";
import { resetSlider2 } from "../features/slices/slider2Slice";
import { resetSlider3 } from "../features/slices/slider3Slice";
import { resetSlider4 } from "../features/slices/slider4Slice";

const useOpen = () => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const selectedId = useSelector((state) => state.selectedId.value);
  const dispatch = useDispatch();

  const handleDetailOpen = () => {
    setDetailOpen(!detailOpen);
    // if (detailOpen && selectedId) {
    //   dispatch(resetSelectedId());
    //   dispatch(resetName());
    //   dispatch(resetDescription());
    //   dispatch(resetBrand());
    //   dispatch(resetProduct());
    //   dispatch(resetImportedProduct());
    //   dispatch(resetAvatar());
    //   dispatch(resetSlider1());
    //   dispatch(resetSlider2());
    //   dispatch(resetSlider3());
    //   dispatch(resetSlider4());
    // }
  };
  const handleUpdateOpen = () => {
    setUpdateOpen(!updateOpen);
    // if (!updateOpen && selectedId !== -1) {
    //   dispatch(resetSelectedId());
    //   dispatch(resetName());
    //   dispatch(resetDescription());
    //   dispatch(resetBrand());
    //   dispatch(resetProduct());
    //   dispatch(resetImportedProduct());
    //   dispatch(resetAvatar());
    //   dispatch(resetSlider1());
    //   dispatch(resetSlider2());
    //   dispatch(resetSlider3());
    //   dispatch(resetSlider4());
    // }
  };
  const handleDeleteOpen = () => {
    setDeleteOpen(!deleteOpen);
  };

  return {
    detailOpen,
    updateOpen,
    deleteOpen,
    handleDetailOpen,
    handleUpdateOpen,
    handleDeleteOpen,
  };
};

export default useOpen;
