import { configureStore } from "@reduxjs/toolkit";
import albumsReducer from "../../config/store/reducer/albumsSlice"
export const store = configureStore({
  reducer: {
    albums: albumsReducer
  }
})