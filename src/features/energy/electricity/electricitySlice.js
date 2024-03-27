
import { createSlice } from "@reduxjs/toolkit";

// Assume you have thunks for login and logout (similar to the previous example)

const electricitySlice = createSlice({
  name: "electricity",
  initialState: {
    electricityRecords: [ ],
    electricityForm: {},
    electricityInputRecords: [],

    filters: null,
    sorting: null,
    transaction_type: [],
    electricityRecordType: 1,
    itemsPerPage: 10,
    totalPages: 1,
    currentPage: 1,
    totalCount: 10,
    siteData: [],
    electricityTransactionTypeData: [],
    electricitySourcesData: [],
    sourceTypeData: [],
    useTypeData: [],
    electricity_boardData: [
      { id: 1, electricity_board: "Electra" },
      { id: 2, electricity_board: "MSDCL" },
      { id: 3, electricity_board: "Telangana Power" },
      { id: 4, electricity_board: "Andhra Pradesh Power" },
      { id: 5, electricity_board: "XYZ Electric" },
      { id: 6, electricity_board: "Hydro Power Inc." },
    ],
    unitData: [],
    currencyData: [],
  },
  reducers: {
    setElectricityRecords: (state, action) => {
      state.electricityRecords = action.payload.data;
    },
    setElectricityInputRecords: (state, action) => {
      state.electricityInputRecords = action.payload;
    },
    setElectricityForm: (state, action) => {
      return {
        ...state,
        electricityForm: {
          ...state.electricityForm,
          ...action.payload,
        },
      };
    },
    resetElectricityForm: (state, action) => {
      state.electricityForm = {};
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setSorting: (state, action) => {
      state.sorting = action.payload;
    },
    setElectricityTransactionTypeData: (state, action) => {
      state.electricityTransactionTypeData = action.payload;
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
   
    setElectricitySourceTypeData: (state, action) => {
      state.electricitySourcesData = action.payload;
    },
    setUseTypeData: (state, action) => {
      state.useTypeData = action.payload;
    },
    setUnitData: (state, action) => {
      state.unitData = action.payload;
    },
    setCurrencyData: (state, action) => {
      
      state.currencyData = action.payload;
    },
    addElectricityData: (state, action) => {
      // const newRecords = [...state.electricityRecords];
      // newRecords.push(action.payload);
      // state.electricityRecords = newRecords;
    },
  },
});

export const {
  addElectricityData,
  setFilters,
  setElectricityForm,
  setElectricityRecordType,
  setElectricityRecords,
  setSorting,
  setCurrentPage,
  setItemsPerPage,
  setTotalCount,
  setTotalPages,
  setCurrencyData,
  setElectricityTypeData,
  setSiteData,
  setUnitData,
  setUseTypeData,
  setElectricityInputRecords,
  setElectricitySourceTypeData,
  setElectricityTransactionTypeData,
  resetElectricityForm,
} = electricitySlice.actions;
export default electricitySlice.reducer;
