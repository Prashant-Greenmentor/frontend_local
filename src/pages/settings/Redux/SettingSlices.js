import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  companyProfileForm: {},
  adminDashboardData: [
    {
      "name": "Amitav",
      "roles": "Admin",
      "data_input": "NA",
      "analyze": "NA",
      "report": "NA",
      "audit": "NA",
      "reset_password": "NA",
      "delete": "NA",
      "img": "https://img.freepik.com/premium-vector/personas-icon_1076610-12224.jpg?w=740"
    },
    {
      "name": "Chandra",
      "roles": "Admin",
      "data_input": "NA",
      "analyze": "NA",
      "report": "NA",
      "audit": "NA",
      "reset_password": "NA",
      "delete": "NA",
      "img": "https://img.freepik.com/premium-vector/personas-icon_1076610-12224.jpg?w=740"
    },
    {
      "name": "Amish",
      "roles": "Admin",
      "data_input": "NA",
      "analyze": "NA",
      "report": "NA",
      "audit": "NA",
      "reset_password": "NA",
      "delete": "NA",
      "img": "https://img.freepik.com/premium-vector/personas-icon_1076610-12224.jpg?w=740"
    },
 
    {
      "name": "Admin",
      "roles": "Admin",
      "data_input": "NA",
      "analyze": "NA",
      "report": "NA",
      "audit": "NA",
      "reset_password": "NA",
      "delete": "NA",
      "img": "https://img.freepik.com/premium-vector/personas-icon_1076610-12224.jpg?w=740"
    },
    {
      "name": "Amitav",
      "roles": "Admin",
      "data_input": "NA",
      "analyze": "NA",
      "report": "NA",
      "audit": "NA",
      "reset_password": "NA",
      "delete": "NA",
      "img": "https://img.freepik.com/premium-vector/personas-icon_1076610-12224.jpg?w=740"
    },
    {
      "name": "Chandra",
      "roles": "Admin",
      "data_input": "NA",
      "analyze": "NA",
      "report": "NA",
      "audit": "NA",
      "reset_password": "NA",
      "delete": "NA",
      "img": "https://img.freepik.com/premium-vector/personas-icon_1076610-12224.jpg?w=740"
    },
    {
      "name": "Amish",
      "roles": "Admin",
      "data_input": "NA",
      "analyze": "NA",
      "report": "NA",
      "audit": "NA",
      "reset_password": "NA",
      "delete": "NA",
      "img": "https://img.freepik.com/premium-vector/personas-icon_1076610-12224.jpg?w=740"
    },
 
    {
      "name": "Admin",
      "roles": "Admin",
      "data_input": "NA",
      "analyze": "NA",
      "report": "NA",
      "audit": "NA",
      "reset_password": "NA",
      "delete": "NA",
      "img": "https://img.freepik.com/premium-vector/personas-icon_1076610-12224.jpg?w=740"
    }
  ]
  ,
  requestPanelData: [
    {user:"Amish",request:"category 1 (Electricity)",id:1},
    {user:"Chandra",request:"category 2 (Electricity)",id:2},
    {user:"User",request:"category 3 (Electricity)",id:3}
  ],
  itemsPerPage: 10,
  totalPages: 1,
  currentPage: 1,
  totalCount: 10,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setCompanyProfileForm(state, action) {
      return {
        ...state,
        companyProfileForm: {
          ...state.companyProfileForm,
          ...action.payload,
        },
      };
    },
    setAdminDashboardData(state, action) {
      state.adminDashboardData = action.payload;
    },
    setRequestPanelData(state, action) {
      state.requestPanelData = action.payload;
    },
    resetCompanyProfileForm(state, action) {
      state.companyProfileForm = {};
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
  },
});

export const {
  setAdminDashboardData,
  setCompanyProfileForm,
  setRequestPanelData,
  resetCompanyProfileForm,
  setCurrentPage,
  setItemsPerPage,
  setTotalCount,
  setTotalPages,
} = settingSlice.actions;
export default settingSlice.reducer;
