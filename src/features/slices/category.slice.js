import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    /** Sets category. */
    setCategory: (state, action) => {
      state.value = action.payload;
    },
    /** Resets category. */
    resetCategory: (state) => {
      state.value = {};
    },
  },
});

export const { setCategory, resetCategory } = categorySlice.actions;

export default categorySlice.reducer;
