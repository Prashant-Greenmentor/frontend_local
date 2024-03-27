import React, { useRef, useState } from "react";
import { ReactComponent as Mail } from "../../../app/assets/Mail.svg";
import { ReactComponent as User } from "../../../app/assets/User.svg";
import { ReactComponent as Key } from "../../../app/assets/Key.svg";
import { ReactComponent as Phone } from "../../../app/assets/Phone.svg";
import userImage from "../../../app/assets/Amish.png";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCompanyProfileForm,
  setCompanyProfileForm,
} from "../Redux/SettingSlices";
import { toast } from "react-toastify";
import { InputField } from "../components/InputField";
function CompanyProfile() {
  const { companyProfileForm } = useSelector((state) => state.setting);
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    // You can now handle the file upload logic, such as uploading it to a server or updating state with the new image.
    console.log("Selected file:", file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  function onChange(e) {
    const { name, value } = e.target;
    dispatch(setCompanyProfileForm({ ...companyProfileForm, [name]: value }));
  }
  function handleSubmit() {
    if (
      companyProfileForm.newPassword !== companyProfileForm.confirmNewPassword
    ) {
      toast("Password Mismatch");
    }
  }
  function handleCancel() {
    dispatch(resetCompanyProfileForm());
  }
  console.log(companyProfileForm);
  return (
    <div className="w-full border h-full">
      <div className="p-5 w-full h-full">
        <div className="flex justify-between w-full">
          <div className="flex justify-center items-center text-left space-x-2">
            <div className="w-24 h-24 object-cover">
              <img
                className="rounded-full flex flex-shrink-0"
                src={userImage}
                alt="user"
              />
            </div>
            <div>
              <p className="text-[#384D6C] font-semibold">Amish Singh</p>
              <p className="text-[#6B7280]">Manager</p>
              <p className="text-[#6B7280]">Company Name</p>
            </div>
          </div>
          <div className="p-2 px-4 flex space-x-4 items-center">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleUpload}
            />
            <button
              onClick={handleButtonClick}
              className="text-white p-2 px-[2vw] flex flex-shrink-0  rounded-md bg-green-500"
            >
              Upload New Photo
            </button>
            <button className="p-2 px-[5vw] flex flex-shrink-0 rounded-md border border-green-500 text-green-500 bg-white">
              Delete
            </button>
          </div>
        </div>
        <div className=" mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
          <InputField
            label={"First Name"}
            name={"firstName"}
            placeholder={"Enter your first name"}
            value={companyProfileForm.firstName}
            onChange={onChange}
            type="text"
            Decoration={""}
            decorationClassName="hidden"
          />
          <InputField
            label={"Last Name"}
            name={"lastName"}
            placeholder={"Enter your Last name"}
            value={companyProfileForm.lastName}
            onChange={onChange}
            type="text"
            Decoration={""}
            decorationClassName="hidden"
          />
          <InputField
            label={"Email Address"}
            name={"email"}
            placeholder={"Enter your email address"}
            value={companyProfileForm.email}
            onChange={onChange}
            type="email"
            Decoration={Mail}
            inputClassName="border-l-0 rounded-tl-none rounded-bl-none"
          />
          <InputField
            label={"Phone Number"}
            name={"phoneNumber"}
            placeholder={"Enter your phone Number"}
            value={companyProfileForm.phoneNumber}
            onChange={onChange}
            type="tel"
            Decoration={Phone}
            inputClassName="border-l-0 rounded-tl-none rounded-bl-none"
          />
          <InputField
            label={"Designation"}
            name={"designation"}
            placeholder={"Enter your phone Number"}
            value={companyProfileForm.designation}
            onChange={onChange}
            type="text"
            Decoration={User}
            inputClassName="border-l-0 rounded-tl-none rounded-bl-none"
          />
        </div>
        <div className="w-full grid grid-cols-2 gap-2 mt-4">
          <InputField
            label={"Current Password"}
            name={"currentPassword"}
            placeholder={"Enter Current Password"}
            value={companyProfileForm.currentPassword}
            onChange={onChange}
            type="password"
            Decoration={Key}
            inputClassName="border-l-0 rounded-tl-none rounded-bl-none"
          />
          <InputField
            label={"New Password"}
            name={"newPassword"}
            placeholder={"Enter New Password"}
            value={companyProfileForm.newPassword}
            onChange={onChange}
            type="password"
            Decoration={Key}
            inputClassName="border-l-0 rounded-tl-none rounded-bl-none"
          />
          <div className="col-span-2">
            <InputField
              label={"Confirm Password"}
              name={"ConfirmPassword"}
              placeholder={"Enter Confirm Password"}
              value={companyProfileForm.ConfirmPassword}
              onChange={onChange}
              type="password"
              Decoration={Key}
             
              inputClassName="border-l-0 rounded-tl-none rounded-bl-none"
            />
          </div>
        </div>
        <div className=" flex justify-end mt-4 space-x-4">
          <button className="border border-red-500 text-red-500 p-2 px-6 rounded-md">
            Cancle
          </button>
          <button
            onClick={handleSubmit}
            className="p-2 px-6 rounded-md bg-green-400 text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;
