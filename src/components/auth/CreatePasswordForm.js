import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { updatePassword } from "../../features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import SuccessPopUp from "../../pages/UserAuthPages/Components/SuccessPopUp";
import { createPassword } from "../../features/auth/authThunks";
import OTPPopup from "../../pages/UserAuthPages/Components/OtpPopup";
import { toast } from "react-toastify";
const CreatePasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpenPopUp, setisOpenPopUp] = useState(false);
  const [isOTPVisible, setOTPVisible] = useState(false);
  const [otp, setOTP] = useState("");

  // Function to open the OTP popup
  const openOTPModal = () => {
    setOTPVisible(true);
  };

  // Function to close the OTP popup
  const closeOTPModal = () => {
    setOTPVisible(false);
  };

  // Function to handle OTP submission
  const handleOTPSubmit = async (otp) => {
    if (otp == "1234") {
      try {
        // Dispatch the update password thunk with the password data
        await dispatch(
          createPassword({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
          })
        );
        setisOpenPopUp(true);
        setTimeout(() => {
          setisOpenPopUp(false);
          closeOTPModal();
          navigate("/company-details");
        }, 1000);
        // After successful password update, you can handle the response or redirect the user
      } catch (error) {
        // Handle password update failure
        closeOTPModal();
        console.error("Password update failed:", error);
      }
    } else {
      toast("Wrong Otp");
      
    }
    setOTP(otp);
  };
  // State for password inputs
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
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

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    openOTPModal();
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen lg:w-1/2">
        <h1 className="text-3xl font-semibold mb-8 text-left w-full px-10">
          Create Password
        </h1>
        <div className="w-full lg:px-10">
          <form
            onSubmit={handleUpdatePassword}
            className="space-y-4 p-4 lg:p-0 lg:pt-4 lg:pb-8 transition-all duration-300 ease-in-out transform "
          >
            <div>
              <label
                htmlFor="currentPassword"
                className="block mb-1 text-gray-600"
              >
                Current Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handleInputChange}
                className="w-full p-2 border outline-none border-gray-300 rounded focus:border-green-500 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                placeholder="Current Password"
                required
              />
            </div>
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
            <div className="flex flex-col lg:flex-row justify-start items-center space-y-2 lg:space-y-0 lg:space-x-2">
              <button
                type="submit"
                className="w-full lg:w-auto px-10 py-3 bg-[#02AB6C] text-white rounded hover:bg-[#02AB6C] font-bold transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Update Password
              </button>
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
      <OTPPopup
        isOpen={isOTPVisible}
        onClose={closeOTPModal}
        onSubmit={handleOTPSubmit}
      />
    </>
  );
};

export default CreatePasswordForm;
