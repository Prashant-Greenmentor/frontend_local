import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const CompanyDetailsInputForm = () => {
  const [formData, setFormData] = useState({
    companyRegistrationNumber: "",
    companyName:"",
    yearOfIncorporation: "",
    industry: "",
    countryOfRegistration: "",
    fiscalYear: "",
    stockExchange: "",
    logo: null,
   
  });
 
 
  const Navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      logo: file,
    }));
  };

  const handleContinue = (e) => {
    e.preventDefault();
    console.log(formData);
    
    Navigate("/userasign");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen lg:w-1/2">
      <h1 className="text-2xl font-semibold text-left w-full px-10">
        Company Details
      </h1>
      <div className="w-full lg:px-10">
        <form
          onSubmit={handleContinue}
          className="space-y-1 p-1 lg:p-0 lg:pt-4 lg:pb-8 transition-all duration-300 ease-in-out transform "
        >
          <div>
            <label
              htmlFor="companyName"
              className="block mb-1 text-gray-600"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full p-2 border outline-none border-gray-300 rounded focus:border-green-500 focus:ring focus:ring-green-300 focus:ring-opacity-50"
              placeholder="Company Registration Number"
              required
            />
          </div>
          <div>
            <label
              htmlFor="companyRegistrationNumber"
              className="block mb-1 text-gray-600"
            >
              Company Registration Number
            </label>
            <input
              type="text"
              id="companyRegistrationNumber"
              name="companyRegistrationNumber"
              value={formData.companyRegistrationNumber}
              onChange={handleInputChange}
              className="w-full p-2 border outline-none border-gray-300 rounded focus:border-green-500 focus:ring focus:ring-green-300 focus:ring-opacity-50"
              placeholder="Company Registration Number"
              required
            />
          </div>
          <div>
            <label
              htmlFor="yearOfIncorporation"
              className="block mb-1 text-gray-600"
            >
              Year of Incorporation
            </label>
            <input
              type="text"
              id="yearOfIncorporation"
              name="yearOfIncorporation"
              value={formData.yearOfIncorporation}
              onChange={handleInputChange}
              className="w-full p-2 border outline-none border-gray-300 rounded focus:border-green-500 focus:ring focus:ring-green-300 focus:ring-opacity-50"
              placeholder="Year of Incorporation"
              required
            />
          </div>
          <div>
            <label htmlFor="industry" className="block mb-1 text-gray-600">
              Industry
            </label>
            <input
              type="text"
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className="w-full p-2 border outline-none border-gray-300 rounded focus:border-green-500 focus:ring focus:ring-green-300 focus:ring-opacity-50"
              placeholder="Industry"
              required
            />
          </div>
          <div>
            <label
              htmlFor="countryOfRegistration"
              className="block mb-1 text-gray-600"
            >
              Country of Registration
            </label>
            <input
              type="text"
              id="countryOfRegistration"
              name="countryOfRegistration"
              value={formData.countryOfRegistration}
              onChange={handleInputChange}
              className="w-full p-2 border outline-none border-gray-300 rounded focus:border-green-500 focus:ring focus:ring-green-300 focus:ring-opacity-50"
              placeholder="Country of Registration"
              required
            />
          </div>
          <div>
            <label htmlFor="fiscalYear" className="block mb-1 text-gray-600">
              Fiscal Year
            </label>
             <select
              id="fiscalYear"
              name="fiscalYear"
              value={formData.fiscalYear}
              onChange={handleInputChange}
              className="w-full p-2 border outline-none border-gray-300 rounded focus:border-green-500 focus:ring focus:ring-green-300 focus:ring-opacity-50"
              required
            >
              <option value="">Select fiscal Year</option>
              <option value="1">Jan to Dec</option>
              <option value="1">Apr to March</option>
             
            </select> 
           
          </div>
          
          <div>
            <label htmlFor="logo" className="block mb-1 text-gray-600">
              Logo
            </label>
            <input
              type="file"
              id="logo"
              name="logo"
              onChange={handleFileChange}
              className="w-full p-2 border outline-none border-gray-300 rounded focus:border-green-500 focus:ring focus:ring-green-300 focus:ring-opacity-50"
            />
          </div>
          
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="w-full lg:w-auto px-10 py-3 bg-[#02AB6C] text-white rounded hover:bg-[#02AB6C] font-bold transition-all duration-300 ease-in-out transform hover:scale-105 mt-5"
          >
            Continue
          </button>

        </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyDetailsInputForm;
