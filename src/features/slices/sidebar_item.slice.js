import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: localStorage.getItem("sidebar_item") || "Thống kê",
};

export const sidebar_itemSlice = createSlice({
  name: "sidebar_item",
  initialState,
  reducers: {
    setSidebarItem: (state, action) => {
      state.value = action.payload.label;
      localStorage.setItem("sidebar_item", action.payload.label);
    },
  },
});

export const { setSidebarItem } = sidebar_itemSlice.actions;

export default sidebar_itemSlice.reducer;
