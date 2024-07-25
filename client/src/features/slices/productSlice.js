import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.value = action.payload;
    },
    resetProduct: (state) => {
      state.value = {};
    },
  },
});

export const { setProduct, resetProduct } = productSlice.actions;

export default productSlice.reducer;
