import { createAsyncThunk } from "@reduxjs/toolkit";
import { setIsLoading } from "../../../features/common/commonSlice";
import { setAdminDashboardData, setRequestPanelData } from "./SettingSlices";

export const createComapnyProfile = createAsyncThunk(
    "setting/createPassword",
    async (data, { dispatch }) => {
      dispatch(setIsLoading(true))
      try {
        // Call the login API endpoint with username and password
        const response = await api.post("/create-comapny-profile", data);
  
        if(response.success){
          toast("Profile created successfully")
        }
       
  
        
      } catch (error) {
        // Handle login failure
        console.error(" failed:", error);
        throw error;
      } finally{
        dispatch(setIsLoading(false))
      }
    }
  );
  
  export const fetchAdminDashboardData = createAsyncThunk(
    "setting/fetchAdminDashboardData",
    async (_, { getState, dispatch }) => {
      const accessToken = getState().auth.accessToken;

  
        apiUrl = "/adminDashboardData";

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
          dispatch(setAdminDashboardData(response.data));
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
        console.error("Error fetching data:", error);
        throw error;
      } finally {
        dispatch(setIsLoading(false));
      }
    }
  );
  export const fetchRequestPanelData = createAsyncThunk(
    "setting/fetchRequestPanelData",
    async (_, { getState, dispatch }) => {
      const accessToken = getState().auth.accessToken;

  
        apiUrl = "/requestPanelData";

      try {
        dispatch(setIsLoading(true));
        const response = await api.get(`${apiUrl}`, {
          // headers: {
          //   Authorization: `Bearer ${accessToken}`,
          // },
        });
  
     
        if (response.status === 200 && response.data.success) {
          // console.log(response);
          dispatch(setRequestPanelData(response.data));
      
          dispatch(setIsLoading(false));
          console.log(response)
        }
  
          return response.data;
      } catch (error) {
        // Handle other API call errors
        console.error("Error fetching data:", error);
        throw error;
      } finally {
        dispatch(setIsLoading(false));
      }
    }
  );