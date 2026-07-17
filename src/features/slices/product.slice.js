import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    /** Sets product. */
    setProduct: (state, action) => {
      state.value = action.payload;
    },
    /** Resets product. */
    resetProduct: (state) => {
      state.value = {};
    },
  },
});

export const { setProduct, resetProduct } = productSlice.actions;

export default productSlice.reducer;
