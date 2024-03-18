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
