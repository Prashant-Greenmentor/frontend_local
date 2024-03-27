import React, { useRef, useState } from "react";
import { ReactComponent as Mail } from "../../../app/assets/Mail.svg";
import { ReactComponent as User } from "../../../app/assets/User.svg";
import { ReactComponent as Number123Icon } from "../../../app/assets/Number123Icon.svg";
import { ReactComponent as Phone } from "../../../app/assets/Phone.svg";
import { ReactComponent as Website } from "../../../app/assets/Website.svg";
import { ReactComponent as StockMarket } from "../../../app/assets/StockMarket.svg";
import { ReactComponent as ListedYear } from "../../../app/assets/ListedYearIcon.svg";
import { ReactComponent as CorporateIcon } from "../../../app/assets/CorporateIcon.svg";

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
                src={'https://img.freepik.com/premium-vector/personas-icon_1076610-12224.jpg?w=740'}
                alt="user"
              />
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
            label={"Company Name"}
            name={"companyName"}
            placeholder={"Enter your company name"}
            value={companyProfileForm.firstName}
            onChange={onChange}
            type="text"
            Decoration={""}
            decorationClassName="hidden"
          />
         
          <InputField
            label={"Country of Registration"}
            name={"countryOfRegistration"}
            placeholder={"Enter your country of registration"}
            value={companyProfileForm.countryOfRegistration}
            onChange={onChange}
            type="text"
            Decoration={Mail}
            inputClassName="border-l-0 rounded-tl-none rounded-bl-none"
          />
           <InputField
            label={"Year of  Incorporation"}
            name={"yearIncorporated"}
            placeholder={"YYYY"}
            value={companyProfileForm.lastName}
            onChange={onChange}
            type="text"
            Decoration={ListedYear}
            inputClassName="border-l-0 rounded-tl-none rounded-bl-none"
          />
          {/* <InputField
            label={"Phone Number"}
            name={"phoneNumber"}
            placeholder={"Enter your phone Number"}
            value={companyProfileForm.phoneNumber}
            onChange={onChange}
            type="tel"
            Decoration={Phone}
            inputClassName="border-l-0 rounded-tl-none rounded-bl-none"
          /> */}
          <InputField
            label={"Industry"}
            name={"industry"}
            placeholder={"Enter Industry"}
            value={companyProfileForm.industry}
            onChange={onChange}
            type="text"
            Decoration={StockMarket}
            inputClassName="border-l-0 rounded-tl-none rounded-bl-none"
          />
          <InputField
            label={"NIC code"}
            name={"nic_code"}
            placeholder={"Enter NIC Code"}
            value={companyProfileForm.nic_code}
            onChange={onChange}
            type="text"
            Decoration={Number123Icon}
            inputClassName="border-l-0 rounded-tl-none rounded-bl-none"
          />
          <InputField
            label={"Number of employee"}
            name={"num_employee"}
            placeholder={"Enter employee"}
            value={companyProfileForm.num_employee}
            onChange={onChange}
            type="text"
            Decoration={Number123Icon}
            inputClassName="border-l-0 rounded-tl-none rounded-bl-none"
          />
          <InputField
            label={"Listed Year ( Optional) "}
            name={"listed_year"}
            placeholder={"Enter Listed Year ( Optional) "}
            value={companyProfileForm.listed_year}
            onChange={onChange}
            type="date"
            Decoration={ListedYear}
            inputClassName="border-l-0 rounded-tl-none rounded-bl-none"
          />
          <InputField
            label={"Stock Exchange where company is listed ( Optional)"}
            name={"listed_stockexchange"}
            placeholder={"Enter Stock Exchange"}
            value={companyProfileForm.listed_stockexchange}
            onChange={onChange}
            type="text"
            Decoration={StockMarket}
            inputClassName="border-l-0 rounded-tl-none rounded-bl-none"
          />
          <InputField
            label={"Fiscal Year"}
            name={"fiscalyear"}
            placeholder={"Enter Fiscal Year"}
            value={companyProfileForm.fiscalyear}
            onChange={onChange}
            type="text"
            Decoration={ListedYear}
            inputClassName="border-l-0 rounded-tl-none rounded-bl-none"
          />
          <InputField
            label={"Website"}
            name={"website"}
            placeholder={"Enter Website"}
            value={companyProfileForm.website}
            onChange={onChange}
            type="text"
            Decoration={Website}
            inputClassName="border-l-0 rounded-tl-none rounded-bl-none"
          />
          <InputField
            label={"Corporate office"}
            name={"corporate_office"}
            placeholder={"Enter Corporate office"}
            value={companyProfileForm.corporate_office}
            onChange={onChange}
            type="text"
            Decoration={CorporateIcon}
            inputClassName="border-l-0 rounded-tl-none rounded-bl-none"
          />
        </div>
        <div className=" flex justify-end mt-4 space-x-4">
          <button className="border border-red-500 text-red-500 p-2 px-6 rounded-md">
            Cancle
          </button>
          <button
            onClick={handleSubmit}
            className="p-2 px-6 rounded-md bg-green-400 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;
