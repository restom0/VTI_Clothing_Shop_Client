import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 1,
};

export const activeSlice = createSlice({
  name: "active",
  initialState,
  reducers: {
    /** Handles increment. */
    increment: (state) => {
      state.value += 1;
    },
    /** Handles decrement. */
    decrement: (state) => {
      state.value -= 1;
    },
    /** Sets active. */
    setActive: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, setActive } = activeSlice.actions;

export default activeSlice.reducer;
