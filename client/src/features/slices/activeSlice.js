import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 1,
};

export const activeSlice = createSlice({
  name: "active",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setActive: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, setActive } = activeSlice.actions;

export default activeSlice.reducer;
