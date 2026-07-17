import { createSlice } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../constants/storage.constant";

const initialState = {
  value: Number(localStorage.getItem(STORAGE_KEYS.OPEN_ACCORDION)) || 0,
};

export const openAccordionSlice = createSlice({
  name: "openAccordion",
  initialState,
  reducers: {
    /** Sets open accordion. */
    setOpenAccordion: (state, action) => {
      state.value = action.payload === state.value ? -1 : action.payload;
      localStorage.setItem(STORAGE_KEYS.OPEN_ACCORDION, action.payload);
    },
  },
});

export const { setOpenAccordion } = openAccordionSlice.actions;

export default openAccordionSlice.reducer;
