// Fuel thunk
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { setIsLoading } from "../../common/commonSlice";
import {
  resetFuelForm,
  setCurrencyData,
  setCurrentPage,
  setFuelForm,
  setFuelRecords,
  setFuelTypeData,
  setItemsPerPage,
  setSiteData,
  setSourceTypeData,
  setTotalCount,
  setTotalPages,
  setUnitData,
  setUseTypeData,
} from "./fuelSlice";
import { toast } from "react-toastify";
import { BASE_URL, PASSWORD, USERNAME } from "../../../appconfig";
import axios from "axios";

export const fetchFuelData = createAsyncThunk(
  "fuel/fetchFuelData",
  async (_, { getState, dispatch }) => {
    const accessToken = getState().auth.accessToken;
    const fuelRecordType = getState().fuel.fuelRecordType;
    let apiUrl = "";
    if (fuelRecordType === 1) {
      apiUrl = "/energy/fuel/1/purchased-fuel";
    } else {
      apiUrl = "/energy/fuel/1/inventory-fuel";
    }
    try {
      dispatch(setIsLoading(true));
      const response = await api.get(`${apiUrl}`, {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });

      //   set all data fuelREcords, pageDetails, totalCount etc.
      if (response.status === 200 && response.data.success) {
        // console.log(response);
        dispatch(setFuelRecords(response.data));
        // dispatch(setCurrentPage(response.data.currentPage));
        // dispatch(setItemsPerPage(response.data.itemsPerPage));
        // dispatch(setTotalPages(response.data.totalPages));
        // dispatch(setTotalCount(response.data.totalCount));
        dispatch(setIsLoading(false));
        console.log(response)
      }

        return response.data;
    } catch (error) {
      // Handle other API call errors
      toast(error.message||"Error getting fuel information");
      console.error("Error fetching data:", error);
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
export const fetchSiteData = createAsyncThunk(
  "fuel/fetchSiteData",
  async (_, { getState, dispatch }) => {
    dispatch(setIsLoading(true));
    const accessToken = getState().auth.accessToken;
    try {
      const response = await api.get(`/energy/fuel/1/sites`, {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });

      //   set all data fuelREcords, pageDetails, totalCount etc.

      if (response.status === 200 && response.data.success) {
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
export const fetchFuelTypeData = createAsyncThunk(
  "fuel/fetchFuelTypeData",
  async (_, { getState, dispatch }) => {
    dispatch(setIsLoading(true));
    const accessToken = getState().auth.accessToken;
    try {
      const response = await api.get(`/energy/fuel/fuel-types`, {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });

      //   set all data fuelREcords, pageDetails, totalCount etc.

      if (response.status === 200 && response.data.success) {
        dispatch(setFuelTypeData(response.data.data));
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
  "fuel/fetchUseTypeData",
  async (_, { getState, dispatch }) => {
    dispatch(setIsLoading(true));
    const accessToken = getState().auth.accessToken;
    try {
      const response = await api.get(`/energy/fuel/use-types`, {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });

      //   set all data fuelREcords, pageDetails, totalCount etc.

      if (response.status === 200 && response.data.success) {
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
  "fuel/fetchUnitData",
  async (_, { getState, dispatch }) => {
    dispatch(setIsLoading(true));
    const accessToken = getState().auth.accessToken;
    try {
      const response = await api.get(`/energy/fuel/units`, {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });

      //   set all data fuelREcords, pageDetails, totalCount etc.

      if (response.status === 200 && response.data.success) {
        dispatch(setUnitData(response?.data?.data));
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
  "fuel/fetchCurrencyData",
  async (_, { getState, dispatch }) => {
    dispatch(setIsLoading(true));
    const accessToken = getState().auth.accessToken;
    try {
      const response = await api.get(`/energy/fuel/currencies`, {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });

      //   set all data fuelREcords, pageDetails, totalCount etc.

      if (response.status === 200 && response.data.success) {
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
export const postFuelData = createAsyncThunk(
  "fuel/postFuelData",
  async (_, { getState, dispatch }) => {
    const accessToken = getState().auth.accessToken;
    const {id,...fuelForm} = getState().fuel.fuelForm;
   
    const fuel_record_type = getState().fuel.fuelRecordType;
    
    dispatch(resetFuelForm());

    dispatch(setIsLoading(true));
    try {
 
      const response = await api.post(
        `/energy/fuel/1/data/${fuel_record_type}`,
        fuelForm,
        {
          // headers: {
          //   Authorization: `Bearer ${accessToken}`,
          // },
        }
      );

      if (
        (response.status === 200 || response.status === 201) &&
        response.data.success
      ) {
        toast.success("Record created successfully", {
          theme: "dark",
        });
        dispatch(fetchFuelData());
      }
    } catch (error) {
      // Handle other API call errors
      console.error("Error posting data:", error);
      toast.error(error?.response?.data?.error||"Record created failed", {
        theme: "dark",
      });
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
export const updateFuelData = createAsyncThunk(
  "fuel/updateFuelData",
  async (id, { getState, dispatch }) => {
    const accessToken = getState().auth.accessToken;
    const fuelForm = getState().fuel.fuelForm;
    const fuel_record_type = getState().fuel.fuelRecordType;
    
    dispatch(resetFuelForm());

    dispatch(setIsLoading(true));
    try {
 
      const response = await api.put(
        `/energy/fuel/1/data/${id}`,
        fuelForm,
        {
          // headers: {
          //   Authorization: `Bearer ${accessToken}`,
          // },
        }
      );

      if (
        (response.status === 200 || response.status === 201) &&
        response.data.success
      ) {
        toast.success("Record Updated successfully", {
          theme: "dark",
        });
        dispatch(fetchFuelData());
      }
    } catch (error) {
      // Handle other API call errors
      console.error("Error posting data:", error);
      toast.error(error?.response?.data?.error||"Record created failed", {
        theme: "dark",
      });
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
export const fetchUploadFuelEvidence = createAsyncThunk(
  "fuel/fetchUploadFuelEvidence",
  async (files, { getState, dispatch }) => {
    try {
      dispatch(setIsLoading(true));
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      console.log(files)
      const fuel_record_type = getState().fuel.fuelRecordType;

      const response = await axios.post(
        `${BASE_URL}/energy/fuel/1/data/${fuel_record_type}/evidence`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Basic ${btoa(USERNAME + ":" + PASSWORD)}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(setIsLoading(false));

        dispatch(setFuelForm({ evidence: response?.data?.path }));
        toast("Evidence Uploaded");
      } else {
        dispatch(setIsLoading(false));

        toast("Evidence Upload Failed");
        throw new Error("Failed to upload files");
      }
    } catch (error) {
      dispatch(setIsLoading(false));
      toast(error?.response?.data?.error || "Evidence Upload Failed");

      console.log("Error:", error);
      throw error;
    }
  }
);
