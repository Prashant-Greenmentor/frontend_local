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
  "chart/fetchChartElectricityDataThunk",

  
  async (_, { getState, dispatch }) => {
    const apiUrl =`/energy/electricity/electricity-data`;
    dispatch(setdataForCurrentYearChange([]))
    dispatch(setIsLoading(true))
    try {
      dispatch(setIsLoading(true));

      const accessToken = getState().auth.accessToken;
      const response = await api.get(`${apiUrl}`, {
      // //   // headers: {
      // //   //   Authorization: `Bearer ${accessToken}`,
      // //   // },
      });
  
      
        let mapeddata = response?.data?.data.map((item)=>{
          return {
            ...item,
            bill_date: new Date(item.bill_date).toISOString().split('T')[0],
            site: item.site_master.site,
            electricity_source: item.electricity_source?.electricity_source,
            unit: item.unit_master["unit"],
            year: parseFloat(item?.year),
            quarter: parseFloat(item?.quarter),
            usage_in_kwh: parseFloat(item?.usage_in_kwh).toFixed(6),
            total_co2e_kg: parseFloat(item?.total_co2e_kg).toFixed(6),
          };
        });

        function transformData(data) {
          return {
            month: data.month,
            quarter: data.quarter,
            year: data.year,
            site: data.site,
            electricity_source: data.electricity_source,
            source_type: "renewable",
            transaction_type: data.transaction_type,
            usage_in_kwh: Number(data.usage_in_kwh),
            total_co2e_kg: Number(data.total_co2e_kg),
          };
        }
        let dataTrans = mapeddata.map((item) => transformData(item));
     
        const siteOptions = Array.from(
          new Set(dataTrans?.map((entry) => entry.site))
        );
        const useElectricitySource = Array.from(
          new Set(dataTrans?.map((entry) => entry.electricity_source))
        );
        const transactionTypeOptions = Array.from(
          new Set(dataTrans?.map((entry) => entry.transaction_type))
        );
        dispatch(setElectricitySourceOptions(useElectricitySource));
        dispatch(setTransactionTypeOptions(transactionTypeOptions));
        dispatch(setSiteOptions(siteOptions));
        dispatch(setdataForCurrentYearChange(dataTrans));
        dispatch(setElecricityData(dataTrans));
       

      dispatch(setIsLoading(false))
     
    } catch (error) {
      dispatch(setIsLoading(false));
      console.error("Error fetching chart data:", error);
    }
  }
);
export const fetchChartOverAllDataThunk = createAsyncThunk(
  "chart/fetchChartOverAllDataThunk",
  async (_, { getState, dispatch }) => {
    let organization_id=1
    const apiUrl =`/energy/${organization_id}/summary-data`;
    dispatch(setIsLoading(true))
    try {
      dispatch(setIsLoading(true));

      const accessToken = getState().auth.accessToken;
      const response = await api.get(`${apiUrl}`, {
         // headers: {
         //   Authorization: `Bearer ${accessToken}`,
         // },
      });
  
        if(response.status==200&&response.data.success){
      const data=response.data.data.map((item)=>{
        return transformData(item)
      })
      function  transformData(data){
        return {
            organization_id: parseInt(data.organization_id), // Convert to integer if needed
            module: data.ModuleMaster.module,
            sub_module: data.SubModuleMaster.sub_module,
            month: data.month, // Convert month abbreviation to number
            quarter: parseInt(data.quarter), // Convert to integer if needed
            year: parseInt(data.year), // Convert to integer if needed
            site: data.site_master.site,
            usage_in_kwh: parseFloat(data.usage_in_kwh), // Convert to float if needed
            total_co2e_kg: parseFloat(data.total_co2e_kg), // Convert to float if needed
            source_type: 'renewable' // Convert to lowercase
        };
    }

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
      }
    } catch (error) {
      dispatch(setIsLoading(false));
      console.error("Error fetching chart data:", error);
    }
  }
);
