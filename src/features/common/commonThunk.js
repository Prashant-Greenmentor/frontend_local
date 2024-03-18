// commonThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const downloadFileThunk = createAsyncThunk(
  "common/downloadFileThunk",
  async ({ filePath }, { getState, rejectWithValue }) => {
    try {
      const reqBody = {
        filePath: filePath
      }
      const accessToken = getState().auth.accessToken;
      const response = await api.post(`/service/download-file`, reqBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/octet-stream",
        },
      });

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filePath;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
