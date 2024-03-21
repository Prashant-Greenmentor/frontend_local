import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postCompanyDetails } from "../../features/auth/authThunks";
const CompanyDetailsInputForm = () => {
  const [yearOfIncorporationoptions,setyearOfIncorporationoptions]=useState([])
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
const dispatch =useDispatch()
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

  const handleContinue =async (e) => {
    e.preventDefault();
    try {
      await dispatch(postCompanyDetails(formData))
        Navigate("/userasign");
    
      
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    const options = [];
    for (let year = 1800; year <= new Date().getFullYear(); year++) {
      options.push({ id: year, yearOfIncorporation: String(year) });
    }
    setyearOfIncorporationoptions(options.reverse());
  }, []); 

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
              Company Name<span className="text-red-500">*</span>
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
              Company Registration Number<span className="text-red-500">*</span>
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
              Year of Incorporation<span className="text-red-500">*</span>
            </label>
            <select
              id="yearOfIncorporation"
              name="yearOfIncorporation"
              value={formData.yearOfIncorporation}
              onChange={handleInputChange}
              className="w-full p-2 border outline-none border-gray-300 rounded focus:border-green-500 focus:ring focus:ring-green-300 focus:ring-opacity-50"
              required
            >
            <option value="">Select year</option>
             {yearOfIncorporationoptions.map((item)=>{
              return <option className="w-fit" key={`${item.id}`}>{item.yearOfIncorporation}</option>;
             })}
             
            </select> 
          </div>
          <div>
            <label htmlFor="industry" className="block mb-1 text-gray-600">
              Industry<span className="text-red-500">*</span>
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
              Country of Registration<span className="text-red-500">*</span>
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
              Fiscal Year<span className="text-red-500">*</span>
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
              <option value="1">Jan-Dec</option>
              <option value="1">Apr-March</option>
             
            </select> 
           
          </div>
          
          <div>
            <label htmlFor="logo" className="block mb-1 text-gray-600">
              Logo <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="logo"
              name="logo"
              onChange={handleFileChange}
              className="w-full p-2 border outline-none border-gray-300 rounded focus:border-green-500 focus:ring focus:ring-green-300 focus:ring-opacity-50"
              required
            />


          </div>
          
        <div className="mt-4 flex justify-start">
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
