import { createSlice } from "@reduxjs/toolkit";
import { handleDelete } from "../../utils/delete_image.util";

const initialState = {
  value: "",
  publicId: "",
};
export const avatarSlice = createSlice({
  name: "avatar_url",
  initialState,
  reducers: {
    /** Sets avatar. */
    setAvatar: (state, action) => {
      state.value = action.payload.value;
      state.publicId = action.payload.publicId;
    },
    /** Deletes avatar. */
    deleteAvatar: (state) => {
      handleDelete(state);
      state.value = "";
      state.publicId = "";
    },
    /** Resets avatar. */
    resetAvatar: (state) => {
      state.value = "";
      state.publicId = "";
    },
  },
});

export const { setAvatar, resetAvatar, deleteAvatar } = avatarSlice.actions;

export default avatarSlice.reducer;
