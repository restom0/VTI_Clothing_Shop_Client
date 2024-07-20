import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: Number(localStorage.getItem("open_accordion")) || 0,
};

export const openAccordionSlice = createSlice({
  name: "openAccordion",
  initialState,
  reducers: {
    setOpenAccordion: (state, action) => {
      state.value = action.payload === state.value ? -1 : action.payload;
      localStorage.setItem("open_accordion", action.payload);
    },
  },
});

export const { setOpenAccordion } = openAccordionSlice.actions;

export default openAccordionSlice.reducer;
