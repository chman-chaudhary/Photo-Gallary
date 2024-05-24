import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photos: [],
};

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    uploadPhoto: (state, action) => {
      const inStore = state.photos.filter(
        (photo) => photo._id === action.payload._id
      );
      if (!inStore.length) {
        const photo = {
          _id: action.payload._id,
          title: action.payload.title,
          description: action.payload.description,
          url: action.payload.url,
        };
        state.photos.push(photo);
      } else {
        return state;
      }
    },
  },
});

export const { uploadPhoto } = photoSlice.actions;

export default photoSlice.reducer;
