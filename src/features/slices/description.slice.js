import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const descriptionSlice = createSlice({
  name: "description",
  initialState,
  reducers: {
    /** Sets description. */
    setDescription: (state, action) => {
      state.value = action.payload;
    },
    /** Resets description. */
    resetDescription: (state) => {
      state.value = "";
    },
  },
});

export const { setDescription, resetDescription } = descriptionSlice.actions;

export default descriptionSlice.reducer;
