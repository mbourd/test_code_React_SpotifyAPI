import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const albumsSlice = createSlice({
  name: "albums", initialState,
  reducers: {
    updateAlbums(state, action) {
      for (const prop of Object.getOwnPropertyNames(state)) {
        delete state[prop];
      }
      Object.assign(state, { ...action.payload })
    }
  }
});

export const { updateAlbums } = albumsSlice.actions;

export default albumsSlice.reducer;