import { createAsyncThunk } from "@reduxjs/toolkit";
import { setIsLoading } from "../../../features/common/commonSlice";
import {
  setElecricityData,
  setElectricitySourceOptions,
  setFuelTypeOptions,
  setModuleOptions,
  setOverAllData,
  setSiteOptions,
  setSubModuleOptions,
  setTransactionTypeOptions,
  setUseTypeOptions,
  setdataForCurrentYearChange,
  setfuelData,


} from "./chartSlice";

import api from "../../../services/api";
import { ElectricityData, overAllData, sampledata } from "./Processdata";
import { toast } from "react-toastify";

export const fetchChartDataThunk = createAsyncThunk(
  "chart/fetchData",
  async (_, { getState, dispatch }) => {
    const apiUrl =`/energy/fuel/fuel-data`;
    dispatch(setIsLoading(true))
    try {
      dispatch(setIsLoading(true));

      const accessToken = getState().auth.accessToken;
      const response = await api.get(`${apiUrl}`, {
      //   // headers: {
      //   //   Authorization: `Bearer ${accessToken}`,
      //   // },
      });
  
      const data=response?.data?.data.map((item)=>{
      // const data=sampledata.map((item)=>{
        return {...item,
          site:item?.site_master?.site,
          fuel_type:item?.FuelType?.fuel_type,
          use_type:item?.use_type_master?.use_type,
          year:Number(item.year),
          quarter:Number(item.quarter),
          usage_in_kwh:Number(item.usage_in_kwh),
          total_co2e_kg:Number(item.total_co2e_kg),
           month:new Date(item.bill_date).getMonth() + 1

        }
      })
   
      dispatch(setIsLoading(false));
  
      const siteOptions = Array.from(
        new Set(data?.map((entry) => entry.site))
      );
      const useTypeOptions = Array.from(
        new Set(data?.map((entry) => entry.use_type))
      );
      const fuelTypeOptions = Array.from(
        new Set(data?.map((entry) => entry.fuel_type))
      );

      dispatch(setdataForCurrentYearChange(data))
      dispatch(setfuelData(data));
      dispatch(setFuelTypeOptions(fuelTypeOptions));
      dispatch(setUseTypeOptions(useTypeOptions));
      dispatch(setSiteOptions(siteOptions));
     
    } catch (error) {
      dispatch(setIsLoading(false));
      toast(error.message||"Error getting fuel information");
      console.error("Error fetching chart data:", error);
    }
  }
);
export const fetchChartElectricityDataThunk = createAsyncThunk(
  "chart/fetchData",
  async (_, { getState, dispatch }) => {
    const apiUrl =`/energy/electricity/electricity-data`;
    dispatch(setdataForCurrentYearChange([]))
    dispatch(setIsLoading(true))
    try {
      dispatch(setIsLoading(true));

      const accessToken = getState().auth.accessToken;
      // const response = await api.get(`${apiUrl}`, {
      // //   // headers: {
      // //   //   Authorization: `Bearer ${accessToken}`,
      // //   // },
      // });
  
      // const data=response?.data?.data.map((item)=>{
      const data=ElectricityData.map((item)=>{
        return {...item,
          // site:item?.site_master?.site,
          // fuel_type:item?.FuelType?.fuel_type,
          // use_type:item?.use_type_master?.use_type,
          year:Number(item.year),
          quarter:Number(item.quarter),
          usage_in_kwh:Number(item.usage_in_kwh),
          total_co2e_kg:Number(item.total_co2e_kg),
          //  month:new Date(item.bill_date).getMonth() + 1

        }
      })

      dispatch(setIsLoading(false));
  
      const siteOptions = Array.from(
        new Set(data?.map((entry) => entry.site))
      );
      const useElectricitySource = Array.from(
        new Set(data?.map((entry) => entry.electricity_source))
      );
      const transactionTypeOptions = Array.from(
        new Set(data?.map((entry) => entry.transaction_type))
      );

      dispatch(setdataForCurrentYearChange(data))
      dispatch(setElecricityData(data));
      dispatch(setElectricitySourceOptions(useElectricitySource));
      dispatch(setTransactionTypeOptions(transactionTypeOptions));
      dispatch(setSiteOptions(siteOptions));
     
    } catch (error) {
      dispatch(setIsLoading(false));
      console.error("Error fetching chart data:", error);
    }
  }
);
export const fetchChartOverAllDataThunk = createAsyncThunk(
  "chart/fetchData",
  async (_, { getState, dispatch }) => {
    const apiUrl =`/energy/fuel/fuel-data`;
    dispatch(setIsLoading(true))
    try {
      // dispatch(setIsLoading(true));

      const accessToken = getState().auth.accessToken;
      // const response = await api.get(`${apiUrl}`, {
      //   // headers: {
      //   //   Authorization: `Bearer ${accessToken}`,
      //   // },
      // });
  
      // const data=response?.data?.data.map((item)=>{
      const data=overAllData.map((item)=>{
        return {...item,
       
          year:Number(item.year),
          quarter:Number(item.quarter),
          usage_in_kwh:Number(item.usage_in_kwh),
          total_co2e_kg:Number(item.total_co2e_kg)
        }
      })
 
      dispatch(setIsLoading(false));
  
      const siteOptions = Array.from(
        new Set(data?.map((entry) => entry.site))
      );
      const useSubModuleOptions = Array.from(
        new Set(data?.map((entry) => entry.sub_module))
      );
      const moduleOptions = Array.from(
        new Set(data?.map((entry) => entry.module))
      );

      dispatch(setdataForCurrentYearChange(data))
      dispatch(setOverAllData(data));
      dispatch(setSiteOptions(siteOptions));
      dispatch(setSubModuleOptions(useSubModuleOptions));
      dispatch(setModuleOptions(moduleOptions));
     
    } catch (error) {
      dispatch(setIsLoading(false));
      console.error("Error fetching chart data:", error);
    }
  }
);
