import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "DESC",
  id: 0,
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.id = action.payload.column;
      state.type = action.payload.order;
    },
  },
});

export const { setSort } = sortSlice.actions;

export default sortSlice.reducer;
