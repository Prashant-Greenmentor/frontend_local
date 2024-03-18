// /features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Assume you have thunks for login and logout (similar to the previous example)

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: true,
    accessToken: null,
    refreshToken: null,
  },
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;
