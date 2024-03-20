import React, { useState } from "react";
import SuccessPopUp from "./Components/SuccessPopUp";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ReactComponent as LeftArrow } from "../../app/assets/←.svg";
function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpenPopUp, setisOpenPopUp] = useState(false);
  // State for password inputs
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setisOpenPopUp(true);
      setTimeout(() => {
        //   navigate("/company-details");
        setisOpenPopUp(false);
      }, 1000);
      // Dispatch the Reset password thunk with the password data
      //   await dispatch(ResetPassword(passwordData));

      // After successful password Reset, you can handle the response or redirect the user
    } catch (error) {
      // Handle password Reset failure
      console.error("Password Reset failed:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full  h-screen ">
        <div className="w-1/2 lg:px-10">
        <h1 className="text-3xl font-semibold mb-8 w-full text-left">
          Reset password
        </h1>
          <form
            onSubmit={handleResetPassword}
            className="space-y-4 p-4 lg:p-0 lg:pt-4 lg:pb-8 transition-all duration-300 ease-in-out transform "
          >
            <div>
              <label htmlFor="newPassword" className="block mb-1 text-gray-600">
                New Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleInputChange}
                className="w-full p-2 border outline-none border-gray-300 rounded focus:border-green-500 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                placeholder="New Password"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-1 text-gray-600"
              >
                Confirm Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-2 border outline-none border-gray-300 rounded focus:border-green-500 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                placeholder="Confirm Password"
                required
              />
            </div>
            <div className="flex flex-col justify-start items-start space-y-3 ">
              <button
                type="submit"
                className="w-full lg:w-auto px-10 py-3 bg-[#02AB6C] text-white rounded hover:bg-[#02AB6C] font-bold transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Update Password
              </button>
              <Link
                to={"/login"}
                className="w-full px-10 py-3 flex items-center justify-start gap-3 text-right"
              >
                <LeftArrow /> Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
      {isOpenPopUp && (
        <SuccessPopUp
          text={"Password Updated"}
          textColor={"#02AB6C"}
          bgColor={"#EEFFF9"}
        />
      )}
    </>
  );
}

export default ResetPassword;
