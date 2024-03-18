// /app/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/common/PrivateRoute";
import PublicRoute from "../components/common/PublicRoute";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import { useDispatch, useSelector } from "react-redux";
import { refreshTokens } from "../features/auth/authThunks";
import FuelPage from "../pages/energy/FuelPage";
import ElectricityPage from "../pages/energy/ElectricityPage";
import Spinner from "../components/common/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FuelAnalyzePage from "../pages/energy/FuelAnalyzePage";
import Main from "../pages/settings/MastersUploadPage/Main";
import Index from "../pages/BRSR/Index";
import Scope3 from "../pages/energy/Scope3";


import AnalyzeScope2 from "../pages/energy/AnalyzeScope/AnalyzeScope2";
import AnalyzeScope3 from "../pages/energy/AnalyzeScope/AnalyzeScope3";
import Offset from "../pages/Offset";
import Reduce from "../pages/Reduce";
import AnalyzeScope1 from "../pages/energy/AnalyzeScope/AnalyzeScope1";
import Emissions from "../pages/energy/AnalyzeScope/Emissions";


function App() {
  const dispatch = useDispatch();
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  const loading = useSelector((state) => state.common.isLoading);

  useEffect(() => {
    // Attempt to refresh tokens when the app mounts
    if (refreshToken) {
      dispatch(refreshTokens(refreshToken));
    }
  }, [dispatch, refreshToken]);

  return (
    <Router>
      <ToastContainer autoClose={1500} />
      {loading && <Spinner />}
      <Routes>
        <Route
          path="/"
          element={<PublicRoute element={<HomePage />} restricted={false} />}
        />
        <Route
          path="/login"
          element={<PublicRoute element={<LoginPage />} restricted={true} />}
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={DashboardPage} />}
        />
        <Route
          path="/energy/fuel"
          element={<PrivateRoute element={FuelPage} />}
        />
        <Route
          path="/energy/electricity"
          element={<PrivateRoute element={ElectricityPage} />}
        />
        <Route
          path="/energy/scope3"
          element={<PrivateRoute element={Scope3} />}
        />
        <Route
          path="/energy/emissions"
          element={<PrivateRoute element={Emissions} />}
        />
        <Route
          path="/energy/fuelAnalyze"
          element={<PrivateRoute element={FuelAnalyzePage} />}
        />
        <Route
          path="/energy/fuelAnalyze/scope1"
          element={<PrivateRoute element={AnalyzeScope1} />}
        />
        <Route
          path="/energy/fuelAnalyze/scope2"
          element={<PrivateRoute element={AnalyzeScope2} />}
        />
        <Route
          path="/energy/fuelAnalyze/scope3"
          element={<PrivateRoute element={AnalyzeScope3} />}
        />
        <Route
          path="/settings"
          element={<PrivateRoute element={Main} />}
        />
        <Route
          path="/reduce"
          element={<PrivateRoute element={Reduce} />}
        />
        <Route
          path="/offset"
          element={<PrivateRoute element={Offset} />}
        />
        <Route
          path="/BRSR"
          element={<PrivateRoute element={Index} />}
        />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
