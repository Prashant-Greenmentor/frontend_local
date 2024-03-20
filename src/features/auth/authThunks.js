// features/auth/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { setTokens } from "./authSlice";

export const refreshTokens = createAsyncThunk(
  "auth/refreshTokens",
  async (refreshTokenValue, { dispatch }) => {
    try {
      const response = await api.post("/refresh-token", {
        refreshToken: refreshTokenValue,
      });
      const { accessToken, refreshToken: newRefreshToken } = response.data;

      // Update tokens in the Redux store
      dispatch(setTokens({ accessToken, refreshToken: newRefreshToken }));

      return accessToken;
    } catch (error) {
      // Handle token refresh failure
      console.error("Token refresh failed:", error);
      throw error;
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { dispatch }) => {
    console.log(username,password)
    try {
      // Call the login API endpoint with username and password
      const response = await api.post("/login-user", {
        username,
        password,
      });

      // Extract tokens from the response
      const { accessToken, refreshToken } = response.data;

      // Update tokens in the Redux store
      dispatch(setTokens({ accessToken, refreshToken }));

      // Return accessToken as the fulfilled value
      return accessToken;
    } catch (error) {
      // Handle login failure
      console.error("Login failed:", error);
      throw error;
    }
  }
);
