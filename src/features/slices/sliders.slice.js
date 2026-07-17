import { createSlice } from "@reduxjs/toolkit";
import { handleDelete } from "../../utils/delete_image.util";

const initialImageState = { value: "", publicId: "" };

const initialState = {
  slider1: { ...initialImageState },
  slider2: { ...initialImageState },
  slider3: { ...initialImageState },
  slider4: { ...initialImageState },
};

export const slidersSlice = createSlice({
  name: "sliders",
  initialState,
  reducers: {
    /** Sets slider. */
    setSlider: (state, action) => {
      const { index, value, publicId } = action.payload;
      state[`slider${index}`] = { value, publicId };
    },
    /** Deletes slider. */
    deleteSlider: (state, action) => {
      const key = `slider${action.payload}`;
      handleDelete(state[key]);
      state[key] = { ...initialImageState };
    },
    /** Resets slider. */
    resetSlider: (state, action) => {
      state[`slider${action.payload}`] = { ...initialImageState };
    },
    /** Resets all sliders. */
    resetAllSliders: (state) => {
      state.slider1 = { ...initialImageState };
      state.slider2 = { ...initialImageState };
      state.slider3 = { ...initialImageState };
      state.slider4 = { ...initialImageState };
    },
  },
});

export const { setSlider, deleteSlider, resetSlider, resetAllSliders } = slidersSlice.actions;

export default slidersSlice.reducer;
