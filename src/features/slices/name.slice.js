import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    /** Sets name. */
    setName: (state, action) => {
      state.value = action.payload;
    },
    /** Resets name. */
    resetName: (state) => {
      state.value = "";
    },
  },
});

export const { setName, resetName } = nameSlice.actions;

export default nameSlice.reducer;
