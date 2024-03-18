import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { setIsLoading } from "../../common/commonSlice";
import {
  setElectricityRecords,
  setCurrentPage,
  setItemsPerPage,
  setTotalCount,
  setTotalPages,
  setCurrencyData,
  setElectricityTypeData,
  setSiteData,
  setSourceTypeData,
  setUnitData,
  setUseTypeData,
  addElectricityData,
} from "./electricitySlice";
import { toast } from "react-toastify";
import { resetFuelForm } from "../fuel/fuelSlice";
export const fetchElectricityData = createAsyncThunk(
  "electricity/fetchELECTRICITYData",
  async (_, { getState, thunkAPI }) => {
    const { dispatch } = thunkAPI;
    dispatch(setIsLoading(true));
    const accessToken = getState().auth.accessToken;
    const electricityRecordType = getState().electricity.electricityRecordType;
    let apiUrl = "";
    if (electricityRecordType === 1) {
      apiUrl = "/energy/electricity/1/purchased-electricity";
    } else {
      apiUrl = "/energy/electricity/1/inventory-electricity";
    }
    try {
      // const response = await api.get(`${apiUrl}`, {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // });

      //   set all data ElectricityREcords, pageDetails, totalCount etc.

      // if (response.status === 200 && response.success) {
        // dispatch(setElectricityRecords(response.data.data));
        // dispatch(setCurrentPage(response.data.currentPage));
        // dispatch(setItemsPerPage(response.data.itemsPerPage));
        // dispatch(setTotalPages(response.data.totalPages));
        // dispatch(setTotalCount(response.data.totalCount));
      // }

      //   return response.data;
    } catch (error) {
      // Handle other API call errors
      console.error("Error fetching data:", error);
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const fetchSiteData = createAsyncThunk(
  "electricity/fetchSiteData",
  async (_, { getState, thunkAPI }) => {
    const { dispatch } = thunkAPI;
    dispatch(setIsLoading(true));
    const accessToken = getState().auth.accessToken;
    try {
      const response = await api.get(`/energy/electricity/site-data`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      //   set all data ElectricityREcords, pageDetails, totalCount etc.

      if (response.status === 200 && response.success) {
        dispatch(setSiteData(response.data.data));
      }

      //   return response.data;
    } catch (error) {
      // Handle other API call errors
      console.error("Error fetching data:", error);
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
export const fetchElectricityTypeData = createAsyncThunk(
  "electricity/fetchElectricityTypeData",
  async (_, { getState, thunkAPI }) => {
    const { dispatch } = thunkAPI;
    dispatch(setIsLoading(true));
    const accessToken = getState().auth.accessToken;
    try {
      const response = await api.get(
        `/energy/electricity/electricity-type-data`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      //   set all data ElectricityREcords, pageDetails, totalCount etc.

      if (response.status === 200 && response.success) {
        dispatch(setElectricityTypeData(response.data.data));
      }

      //   return response.data;
    } catch (error) {
      // Handle other API call errors
      console.error("Error fetching data:", error);
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
export const fetchSourceTypeData = createAsyncThunk(
  "electricity/fetchSourceTypeData",
  async (_, { getState, thunkAPI }) => {
    const { dispatch } = thunkAPI;
    dispatch(setIsLoading(true));
    const accessToken = getState().auth.accessToken;
    try {
      const response = await api.get(`/energy/electricity/source-type-data`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      //   set all data ElectricityREcords, pageDetails, totalCount etc.

      if (response.status === 200 && response.success) {
        dispatch(setSourceTypeData(response.data.data));
      }

      //   return response.data;
    } catch (error) {
      // Handle other API call errors
      console.error("Error fetching data:", error);
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
export const fetchUseTypeData = createAsyncThunk(
  "electricity/fetchUseTypeData",
  async (_, { getState, thunkAPI }) => {
    const { dispatch } = thunkAPI;
    dispatch(setIsLoading(true));
    const accessToken = getState().auth.accessToken;
    try {
      const response = await api.get(`/energy/electricity/use-type-data`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      //   set all data ElectricityREcords, pageDetails, totalCount etc.

      if (response.status === 200 && response.success) {
        dispatch(setUseTypeData(response.data.data));
      }

      //   return response.data;
    } catch (error) {
      // Handle other API call errors
      console.error("Error fetching data:", error);
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
export const fetchUnitData = createAsyncThunk(
  "electricity/fetchUnitData",
  async (_, { getState, thunkAPI }) => {
    const { dispatch } = thunkAPI;
    dispatch(setIsLoading(true));
    const accessToken = getState().auth.accessToken;
    try {
      const response = await api.get(`/energy/electricity/unit-data`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      //   set all data ElectricityREcords, pageDetails, totalCount etc.

      if (response.status === 200 && response.success) {
        dispatch(setUnitData(response.data.data));
      }

      //   return response.data;
    } catch (error) {
      // Handle other API call errors
      console.error("Error fetching data:", error);
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
export const fetchCurrencyData = createAsyncThunk(
  "electricity/fetchCurrencyData",
  async (_, { getState, thunkAPI }) => {
    const { dispatch } = thunkAPI;
    dispatch(setIsLoading(true));
    const accessToken = getState().auth.accessToken;
    try {
      const response = await api.get(`/energy/electricity/currency-data`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      //   set all data ElectricityREcords, pageDetails, totalCount etc.

      if (response.status === 200 && response.success) {
        dispatch(setCurrencyData(response.data.data));
      }

      //   return response.data;
    } catch (error) {
      // Handle other API call errors
      console.error("Error fetching data:", error);
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
export const postElectricityData = createAsyncThunk(
  "electricity/postElectricityData",
  async (_, { getState, dispatch }) => {
    dispatch(setIsLoading(true));
    const accessToken = getState().auth.accessToken;
    const { id,...electricityForm } = getState().electricity.electricityForm;
   dispatch(addElectricityData(electricityForm))
    try {
      const response = await api.post(
        `/energy/electricity/data`,
        electricityForm,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        dispatch(fetchElectricityData());
        toast.success("Record created successfully", {
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error posting data:", error);
      toast.error("Record creation failed", {
        theme: "dark",
      });
    } finally {
      dispatch(setIsLoading(false));
      dispatch(resetFuelForm());
    }
  }
);

export const updateElectricityData = createAsyncThunk(
  "electricity/updateElectricityData",
  async (_, { getState, dispatch }) => {
    dispatch(setIsLoading(true));
    const accessToken = getState().auth.accessToken;
    const { electricityForm } = getState().electricity;
    const { id } = electricityForm;

    try {
      const response = await api.post(
        `/energy/electricity/data/${id}`,
        electricityForm,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        dispatch(fetchElectricityData());
        toast.success("Record updated successfully", {
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Record update failed", {
        theme: "dark",
      });
    } finally {
      dispatch(setIsLoading(false));
      dispatch(resetFuelForm());
    }
  }
);
