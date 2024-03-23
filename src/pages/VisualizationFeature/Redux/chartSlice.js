import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 
  data: [],
  electricityData: [],
  overAllData: [],
  dataForCurrentYearChange: [],
  siteOptions: [],
  moduleOptions: [],
  transactionTypeOptions:[],
  ElectricitySourceOptions:[],
  sub_moduleOptions: [],
  siteOptions: [],
  fuelTypeOptions: [],
  filter: {},
  useTypeOptions: [],
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setFuelTypeOptions(state, action) {
      state.fuelTypeOptions = action.payload;
    },
    setSiteOptions(state, action) {
      state.siteOptions = action.payload;
    },
    setElectricitySourceOptions(state, action) {
      state.ElectricitySourceOptions = action.payload;
    },
    setTransactionTypeOptions(state, action) {
      state.transactionTypeOptions = action.payload;
    },
    setSubModuleOptions(state, action) {
      state.sub_moduleOptions = action.payload;
    },
    setModuleOptions(state, action) {
      state.moduleOptions = action.payload;
    },
    setUseTypeOptions(state, action) {
      state.useTypeOptions = action.payload;
    },
    setfuelData(state, action) {
      state.data = action.payload;
    },
    setElecricityData(state, action) {
      state.electricityData = action.payload;
    },
    setOverAllData(state, action) {
      state.overAllData = action.payload;
    },
    setdataForCurrentYearChange(state, action) {
      state.dataForCurrentYearChange = action.payload;
    },

    setfuelFilter(state, action) {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

export const {
  setdataForCurrentYearChange,
  setfuelFilter,
  setFuelTypeOptions,
  setSiteOptions,
  setUseTypeOptions,
  setfuelData,
  setSubModuleOptions,
  setModuleOptions,
  setOverAllData,
  setElecricityData,
  setTransactionTypeOptions,
  setElectricitySourceOptions
} = chartSlice.actions;

export default chartSlice.reducer;
