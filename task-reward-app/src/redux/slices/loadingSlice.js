// src/redux/slices/loadingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: false, // initial state is not loading
  reducers: {
    setLoading: (state, action) => action.payload, // set loading to true or false
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
