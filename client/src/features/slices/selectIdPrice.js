import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const selectedIdSlice = createSlice({
  name: "selectedId",
  initialState,
  reducers: {
    setSelectedId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedId } = selectedIdSlice.actions;

export default selectedIdSlice.reducer;
