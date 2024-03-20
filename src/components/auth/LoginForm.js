import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/auth/authThunks";
import { Link, useNavigate } from "react-router-dom";
const LoginForm = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  // State for username and password inputs
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Dispatch the login thunk with the credentials
      await dispatch(loginUser(credentials));
      Navigate("/create-password");
      // After successful login, you should have tokens in the Redux store
    } catch (error) {
      // Handle login failure
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen lg:w-1/2">
      <h1 className="text-3xl font-semibold mb-8 text-left w-full px-10">
        Welcome to Longsight
      </h1>
      <div className="w-full lg:px-10">
        <form
          onSubmit={handleLogin}
          className="space-y-4 p-4 lg:p-0 lg:pt-4 lg:pb-8 transition-all duration-300 ease-in-out transform "
        >
          <div>
            <label htmlFor="username" className="block mb-1 text-gray-600">
              Username<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              className="w-full p-2 border outline-none border-gray-300 rounded focus:border-green-500 focus:ring focus:ring-green-300 focus:ring-opacity-50"
              placeholder="Your username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-gray-600">
              Password<span className="text-red-500">*</span>
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full p-2 border outline-none border-gray-300 rounded focus:border-green-500 focus:ring focus:ring-green-300 focus:ring-opacity-50"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="">
            <span className="text-[#02AB6C]">
              Track, Measure, Report today!
            </span>
          </div>
          <div className="flex flex-col lg:flex-row justify-start items-center space-y-2 lg:space-y-0 lg:space-x-2">
            <button
              type="submit"
              className="w-full lg:w-auto px-10 py-3 bg-[#02AB6C] text-white rounded hover:bg-[#02AB6C] font-bold transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Login
            </button>
            <div className="flex justify-start items-center space-x-1">
              <span className="text-gray-600 text-sm">
                Forgot Your password?
              </span>
              <Link to={"/forgotPassword"} className="text-[#02AB6C] hover:underline">
                Click Here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
