// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk"; // Import the 'thunk' function directly
import authReducer from "../features/auth/authSlice";
import commonReducer from "../features/common/commonSlice";
import fuelReducer from "../features/energy/fuel/fuelSlice";
import electricityReducer from "../features/energy/electricity/electricitySlice";
import tokenRefreshMiddleware from "../middleware/tokenRefresh";
import chartSlice from "../pages/VisualizationFeature/Redux/chartSlice";
import SettingSlices from "../pages/settings/Redux/SettingSlices";


const store = configureStore({
  reducer: {
    auth: authReducer,
    fuel: fuelReducer,
    electricity: electricityReducer,
    common: commonReducer,
    chart:chartSlice,
    setting:SettingSlices
    // other reducers...
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenRefreshMiddleware, thunk),
});

export default store;
