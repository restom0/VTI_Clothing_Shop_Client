import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const descriptionSlice = createSlice({
  name: "description",
  initialState,
  reducers: {
    setDescription: (state, action) => {
      state.value = action.payload;
    },
    resetDescription: (state) => {
      state.value = "";
    },
  },
});

export const { setDescription, resetDescription } = descriptionSlice.actions;

export default descriptionSlice.reducer;
