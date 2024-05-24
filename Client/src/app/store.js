import { configureStore } from "@reduxjs/toolkit";
import photoReducer from "../features/photoSlice.js";

export const store = configureStore({
  reducer: photoReducer,
});
