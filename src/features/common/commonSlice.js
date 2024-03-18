// /features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Assume you have thunks for login and logout (similar to the previous example)

const commonSlice = createSlice({
  name: "common",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    }
  },
});

export const { setIsLoading } = commonSlice.actions;
export default commonSlice.reducer;
