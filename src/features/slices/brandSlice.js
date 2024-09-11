import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setBrand: (state, action) => {
      state.value = action.payload;
    },
    resetBrand: (state) => {
      state.value = {};
    },
  },
});

export const { setBrand, resetBrand } = brandSlice.actions;

export default brandSlice.reducer;
