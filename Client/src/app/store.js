import { configureStore } from "@reduxjs/toolkit";
import photoReducer from "../features/photoSlice.js";

// Create Store
export const store = configureStore({
  reducer: photoReducer,
});
