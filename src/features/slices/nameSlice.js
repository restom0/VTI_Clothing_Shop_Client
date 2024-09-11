import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.value = action.payload;
    },
    resetName: (state) => {
      state.value = "";
    },
  },
});

export const { setName, resetName } = nameSlice.actions;

export default nameSlice.reducer;
