import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setBrand: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setBrand } = brandSlice.actions;

export default brandSlice.reducer;
