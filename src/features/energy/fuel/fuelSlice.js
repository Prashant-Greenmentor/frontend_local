// /features/auth/fuelSlice.js
import { createSlice } from "@reduxjs/toolkit";

const fuelSlice = createSlice({
  name: "fuel",
  initialState: {
    fuelRecords: [],
    fuelForm: {},
    filters: null,
    sorting: null,
    fuelRecordType: 1,
    itemsPerPage: 10,
    totalPages: 1,
    currentPage: 1,
    totalCount: 10,
    siteData: [],
    fuelTypeData: [],
    sourceTypeData: ["renewable","non-renewable"],
    useTypeData: [],
    unitData: [],
    currencyData: [],
  },
  reducers: {
    setFuelRecords: (state, action) => {
      
      state.fuelRecords = action.payload.data;
    },
    setFuelForm: (state, action) => {
      
      return {
        ...state,
        fuelForm: {
          ...state.fuelForm,
          ...action.payload,
        },
      };
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    resetFuelForm: (state, action) => {
    
      state.fuelForm = {};
    },
    setSorting: (state, action) => {
      state.sorting = action.payload;
    },
    setFuelRecordType: (state, action) => {
      state.fuelRecordType = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setSiteData: (state, action) => {
      state.siteData = action.payload;
    },
    setFuelTypeData: (state, action) => {
      state.fuelTypeData = action.payload;
    },
    setSourceTypeData: (state, action) => {
      state.sourceTypeData = action.payload;
    },
    setUseTypeData: (state, action) => {
      state.useTypeData = action.payload;
    },
    setUnitData: (state, action) => {
      state.unitData = action.payload;
    },
    setCurrencyData: (state, action) => {
      state.currencyData = action.payload;
    }
    
  },
});

export const {
  setFilters,
  setFuelForm,
  setFuelRecordType,
  setFuelRecords,
  setSorting,
  setCurrentPage,
  setItemsPerPage,
  setTotalCount,
  setTotalPages,
  setCurrencyData,
  setFuelTypeData,
  setSiteData,
  setSourceTypeData,
  setUnitData,
  setUseTypeData,
  resetFuelForm
} = fuelSlice.actions;

export default fuelSlice.reducer;
