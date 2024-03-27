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
  setSiteData,
  setUnitData,
  addElectricityData,
  setElectricitySourceTypeData,
  setElectricityTransactionTypeData,
  setElectricityInputRecords,
  setElectricityForm,
} from "./electricitySlice";
import { toast } from "react-toastify";
import {
  setElecricityData,
  setElectricitySourceOptions,
  setSiteOptions,
  setTransactionTypeOptions,
  setdataForCurrentYearChange,
} from "../../../pages/VisualizationFeature/Redux/chartSlice";
import { PASSWORD, USERNAME } from "../../../appconfig";


export const fetchElectricityInputData = createAsyncThunk(
  "electricity/fetchElectricityInputData",
  async (_, { getState, dispatch }) => {
    dispatch(setIsLoading(true));
    const accessToken = getState().auth.accessToken;

    let apiUrl = "/energy/electricity/electricity-input-data";

    try {
      const response = await api.get(`${apiUrl}`, {
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
      });
   
      if (response.status === 200 && response.data.success) {
        dispatch(setElectricityRecords(response.data));
          // dispatch(setCurrentPage(response.data.currentPage));
        // dispatch(setItemsPerPage(response.data.itemsPerPage));
        // dispatch(setTotalPages(response.data.totalPages));
        // dispatch(setTotalCount(response.data.totalCount));
        // return response
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const fetchSiteData = createAsyncThunk(
  "electricity/fetchSiteData",
  async (_, { getState, dispatch }) => {
    dispatch(setIsLoading(true));
    const accessToken = getState().auth.accessToken;
    let organization_id = 1;
    try {
      const response = await api.get(
        `/energy/electricity/${organization_id}/sites`,
        {
          // headers: {
          //   Authorization: `Bearer ${accessToken}`,
          // },
        }
      );

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
export const fetchElectricitySourcesTypeData = createAsyncThunk(
  "electricity/fetchElectricitySourcesTypeData",
  async (_, { getState, dispatch }) => {
    dispatch(setIsLoading(true));
    const accessToken = getState().auth.accessToken;
    try {
      const response = await api.get(
        `/energy/electricity/electricity-sources`
        // {
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // }
      );

      if (response.status === 200 && response.data.success) {
        dispatch(setElectricitySourceTypeData(response.data.data));
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
  async (_, { getState, dispatch }) => {
    dispatch(setIsLoading(true));
    const accessToken = getState().auth.accessToken;
    try {
      const response = await api.get(`/energy/electricity/units`, {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });

      if (response.status === 200 && response.data.success) {
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
export const fetchTransactionTypeData = createAsyncThunk(
  "electricity/fetchTransactionTypeData",
  async (electricity_source_id, { getState, dispatch }) => {
    dispatch(setIsLoading(true));
    const accessToken = getState().auth.accessToken;
    const { id, ...electricityForm } = getState().electricity.electricityForm;
    // let electricity_source_id=electricityForm.electricity_source
    try {
      const response = await api.get(
        `/energy/electricity/${electricity_source_id}/transaction-types`,
        {
          // headers: {
          //   Authorization: `Bearer ${accessToken}`,
          // },
        }
      );

      console.log(response.data.data);
      if (response.status === 200 && response.data.success) {
        dispatch(setElectricityTransactionTypeData(response.data.data));
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
  async (_, { getState, dispatch }) => {
    dispatch(setIsLoading(true));
    const accessToken = getState().auth.accessToken;
    try {
      const response = await api.get(`/energy/electricity/currencies`, {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });

      console.log(response.data.data);
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
export const postElectricityData = createAsyncThunk(
  "electricity/postElectricityData",
  async (_, { getState, dispatch }) => {
    dispatch(setIsLoading(true));
    const accessToken = getState().auth.accessToken;
    const { id, ...electricityForm } = getState().electricity.electricityForm;
    console.log(electricityForm,"elelctricity form");
    try {
      const response = await api.post(
        `/energy/electricity/1/data/`,
        { ...electricityForm, source_type: "Renewable" },
        {
          // headers: {
          //   Authorization: `Bearer ${accessToken}`,
          // },
        }
      );
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        dispatch(fetchElectricityInputData());
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
    }
  }
);
export const electricityUploadEvidence = createAsyncThunk(
  "electricity/electricityUploadEvidence",
  async (files, { getState, dispatch }) => {
    dispatch(setIsLoading(true));
    const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    const accessToken = getState().auth.accessToken;
    let organization_id = 1;
    try {
      const response = await api.post(
        `/energy/electricity/${organization_id}/data/evidence`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Basic ${btoa(USERNAME + ":" + PASSWORD)}`,
          },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
       
        dispatch(setIsLoading(false));

        dispatch(setElectricityForm({ evidence: response?.data?.path }));
        toast.success("Evidence Uploded successfully", {
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error uploading evidence", error);
      toast.error("uploading evidence failed", {
        theme: "dark",
      });
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const updateElectricityData = createAsyncThunk(
  "electricity/updateElectricityData",
  async (_, { getState, dispatch }) => {
    dispatch(setIsLoading(true));
    const accessToken = getState().auth.accessToken;
    const {id,...electricityForm } = getState().electricity.electricityForm;
    console.log(electricityForm,id )

    try {
      const response = await api.put(
        `/energy/electricity/1/data/${id}`,
        electricityForm,
        // {
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // }
      );

      if (response.status === 200 || response.status === 201) {
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
    }
  }
);
