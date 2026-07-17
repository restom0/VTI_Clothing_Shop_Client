import { createSlice } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../constants/storage.constant";

const initialState = {
  value: localStorage.getItem(STORAGE_KEYS.SIDEBAR_ITEM) || "Thống kê",
};

export const sidebar_itemSlice = createSlice({
  name: "sidebar_item",
  initialState,
  reducers: {
    /** Sets sidebar item. */
    setSidebarItem: (state, action) => {
      state.value = action.payload.label;
      localStorage.setItem(STORAGE_KEYS.SIDEBAR_ITEM, action.payload.label);
    },
  },
});

export const { setSidebarItem } = sidebar_itemSlice.actions;

export default sidebar_itemSlice.reducer;
