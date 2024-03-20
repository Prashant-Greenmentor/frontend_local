import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFuelData,
  fetchUploadFuelEvidence,
  postFuelData,
  updateFuelData,
} from "../../../features/energy/fuel/fuelThunk";
import { ReactComponent as CloseIcon } from "../../../app/assets/CloseIcon.svg";
import { setFuelForm } from "../../../features/energy/fuel/fuelSlice";
import { toast } from "react-toastify";
/**
 * Component for editing and copying fuel purchase forms
 * @param {string} actionType - The type of action to perform ("copy" or "edit")
 * @param {function} handleCloseEditCopyForms - Function to close the form
 * @param {object} selectedRowData - The data of the row to be edited (if actionType is "edit" or "copy")
 */
const PurchaseFuelEditAndCopyForm = ({
  actionType,
  handleCloseEditCopyForms,
  selectedRowData,
}) => {
  
  const [formData, setFormData] = useState({
    bill_date: "",
    site: "",
    fuel_type: "",
    source_type: "",
    use_type: "",
    quantity: "",
    unit: "",
    amount_paid: "",
    currency: "",
    heat_content_of_fuel: "",
    carbon_content_of_fuel: "",
    emission_factor: "",
    evidence: "",
  });

  const { fuelForm} = useSelector((state) => state.fuel);
  const fuelRecordType = useSelector((state) => state.fuel.fuelRecordType);
  const siteData = useSelector((state) => state.fuel.siteData);
  const fuelTypeData = useSelector((state) => state.fuel.fuelTypeData);
  const sourceTypeData = useSelector((state) => state.fuel.sourceTypeData);
  const useTypeData = useSelector((state) => state.fuel.useTypeData);
  const unitData = useSelector((state) => state.fuel.unitData);
  const currencyData = useSelector((state) => state.fuel.currencyData);
  const loading = useSelector((state) => state.common.isLoading);
  const dispatch = useDispatch();

  const handleFormChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const files = e.target.files;
      if (!files) {
        toast("Please select a file");
        return;
      }
      setFormData({ ...formData, [name]: files[0] });
      dispatch(fetchUploadFuelEvidence(files));
    } else {
      setFormData({ ...formData, [name]: value });
      dispatch(setFuelForm({ ...formData, [name]: value }));
    }
  };

  const handlePurchaseFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    if (form.reportValidity()) {
      switch (actionType) {
        case "copy":
          dispatch(postFuelData(fuelForm));
          dispatch(fetchFuelData());
          break;
        case "edit":
          dispatch(updateFuelData(selectedRowData.id));
          break;
        default:
          break;
      }
    }
    setFormData({
      bill_date: "",
      site: "",
      fuel_type: "",
      source_type: "",
      use_type: "",
      quantity: "",
      unit: "",
      amount_paid: "",
      currency: "",
      heat_content_of_fuel: "",
      carbon_content_of_fuel: "",
      ef_of_fuel: "",
      evidence: "",
    });
    handleCloseEditCopyForms();
  };

  useEffect(() => {
    if (
      selectedRowData
    ) {
      const UpdateDataForPopulate = {
        ...selectedRowData,
        
        site:
         ( siteData.length > 0 )&&
          (siteData.find((s) => s.site === selectedRowData.site)?.id||""),
        currency:
          currencyData.length > 0 &&
         ( currencyData.find((s) => s.currency === selectedRowData.currency)?.id||""),
        fuel_type:
          fuelTypeData.length > 0 &&
          (fuelTypeData.find((s) => s.fuel_type === selectedRowData.fuel_type)
            ?.id||""),
        unit:
          unitData.length > 0 &&
          (unitData.find((s) => s.unit === selectedRowData.unit)?.id||""),
        use_type:
          useTypeData.length > 0 &&
         ( useTypeData.find((s) => s.use_type === selectedRowData.use_type)?.id||""),
        };
        //  setFormValues()
        setFormData((prevFormData) => {
          return { ...prevFormData, ...UpdateDataForPopulate };
        });

        dispatch(setFuelForm({ ...UpdateDataForPopulate }));
    }
    
  }, [selectedRowData,actionType,dispatch]);



 


  return (
    <>
      <div className="flex w-full h-screen overflow-hidden justify-center items-center z-[100] fixed bg-black bg-opacity-50 top-0 left-0 bottom-0">
        <div className="flex flex-col justify-center items-center w-9/12 text-xs bg-white absolute z-[1000] border border-transparent rounded-t-md">
          <div className="flex justify-between w-full bg-gray-50 py-2 px-4 border-b border-gray-300 mb-3">
            <span className="cursor-pointer">Purchased Fuel</span>
            <span
              className="cursor-pointer"
              onClick={() => handleCloseEditCopyForms()}
            >
              <CloseIcon />
            </span>
          </div>
          <form
            id="purchase-fuel-form"
            className="flex flex-col w-full"
            onSubmit={handlePurchaseFormSubmit}
          >
            <input
              type="hidden"
              name="fuel_record_type"
              value={fuelRecordType}
            />
            <div className="px-4 w-full py-3 flex gap-x-6 gap-y-4 items-center justify-start">
              <div className="w-1/4 flex flex-col">
                <label htmlFor="bill_date" className="text-xs py-1.5">
                  Bill Date<span className="text-red-500 p-1">*</span>
                </label>
                <input
                value={formData.bill_date}
                  type="date"
                  name="bill_date"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"
                  placeholder="Choose the date"
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="w-1/4 flex flex-col">
                <label htmlFor="site" className="text-xs py-1.5">
                  Site<span className="text-red-500 p-1">*</span>
                </label>
                <select
                  value={formData.site}
                  // defaultValue={""}
                  name="site"
                  onChange={handleFormChange}
                  required
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"
                >
                  <option value="" disabled>
                    Choose the site
                  </option>

                  {siteData &&
                    siteData.length > 0 &&
                    siteData.map((s) => (
                      <option
                        key={`sites-${s.id}`}
                        value={s.id}
                        className="capitalize"
                      >
                        {s.site}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-1/4 flex flex-col">
                <label htmlFor="fuel_type" className="text-xs py-1.5">
                  Fuel type<span className="text-red-500 p-1">*</span>
                </label>
                <select
                  // defaultValue={""}
                  value={formData.fuel_type}
                  name="fuel_type"
                  onChange={handleFormChange}
                  required
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"
                >
                  <option value="" disabled>
                    Choose the Fuel Type
                  </option>
                  {fuelTypeData &&
                    fuelTypeData.length > 0 &&
                    fuelTypeData.map((s) => (
                      <option
                        key={`fuel_type-${s.id}`}
                        value={s.id}
                        className="capitalize"
                      >
                        {s.fuel_type}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-1/4 flex flex-col">
                <label htmlFor="source_type" className="text-xs py-1.5">
                  Source Type<span className="text-red-500 p-1">*</span>
                </label>
                <select
                value={formData.source_type}
                  // defaultValue={""}
                  onChange={handleFormChange}
                  required
                  name="source_type"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"
                >
                  <option value="" disabled>
                    Choose the Source Type
                  </option>
                  {sourceTypeData &&
                    sourceTypeData.length > 0 &&
                    sourceTypeData.map((s) => (
                      <option
                        key={`source-type-${s}`}
                        value={s}
                        className="capitalize"
                      >
                        {s}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="px-4 w-full py-3 flex gap-x-6 gap-y-4 items-center justify-start">
              <div className="w-1/4 flex flex-col">
                <label htmlFor="use_type" className="text-xs py-1.5">
                  Use Type<span className="text-red-500 p-1">*</span>
                </label>
                <select
                  // defaultValue={""}
                  name="use_type"
                  onChange={handleFormChange}
                  value={formData.use_type}
                  required
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"
                >
                  <option value="" disabled>
                    Choose the Use Type
                  </option>
                  {useTypeData &&
                    useTypeData.length > 0 &&
                    useTypeData.map((s) => (
                      <option
                        key={`use-type-${s.id}`}
                        value={s.id}
                        className="capitalize"
                      >
                        {s.use_type}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-1/4 flex flex-col">
                <label htmlFor="quantity" className="">
                  Quantity Used
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  name="quantity"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"
                  placeholder="Enter value"
                  onChange={handleFormChange}
                />
              </div>
              <div className="w-1/4 flex flex-col">
                <label htmlFor="unit" className="text-xs py-1.5">
                  Unit
                </label>
                <select
                  // defaultValue={""}
                  value={formData.unit || ""}
                  name="unit"
                  onChange={handleFormChange}
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"
                >
                  <option value="">Choose the Unit</option>
                  {unitData &&
                    unitData.length > 0 &&
                    unitData.map((s) => (
                      <option
                        key={`unit-data-${s.id}`}
                        value={s.id}
                        className="capitalize"
                      >
                        {s.unit}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-1/4 flex flex-col">
                <label htmlFor="amount_paid" className="text-xs py-1.5">
                  Amount Paid<span className="text-red-500 p-1">*</span>
                </label>
                <input
                value={formData.amount_paid}
                  id="amount_paid"
                  type="number"
                  name="amount_paid"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"
                  placeholder="Type the value"
                  onChange={handleFormChange}
                  required
                />
              </div>
            </div>
            <div className="px-4 w-full py-3 flex gap-x-6 gap-y-4 items-center justify-start">
              <div className="w-1/4 flex flex-col">
                <label htmlFor="currency" className="text-xs py-1.5">
                  Currency<span className="text-red-500 p-1">*</span>
                </label>
                <select
                  // defaultValue={""}
                  value={formData.currency}
                  onChange={handleFormChange}
                  required
                  name="currency"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"
                >
                  <option value="" disabled>
                    Choose the currency
                  </option>
                  {currencyData &&
                    currencyData.length > 0 &&
                    currencyData.map((s) => (
                      <option
                        key={`currency-data-${s.id}`}
                        value={s.id}
                        className="capitalize"
                      >
                        {s.currency}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-1/4 flex flex-col">
                <label
                  htmlFor="heat_content_of_fuel"
                  className="text-xs py-1.5"
                >
                  Heat Content of Fuel Per Unit
                </label>
                <input
                  type="number"
                  value={formData.heat_content_of_fuel}
                  name="heat_content_of_fuel"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"
                  placeholder="Type the value"
                  onChange={handleFormChange}
                />
              </div>
              <div className="w-1/4 flex flex-col">
                <label
                  htmlFor="carbon_content_of_fuel"
                  className="text-xs py-1.5"
                >
                  Carbon Content of the Fuel Per Unit
                </label>
                <input
                  type="number"
                  value={formData.carbon_content_of_fuel}
                  name="carbon_content_of_fuel"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"
                  placeholder="Type the value"
                  onChange={handleFormChange}
                />
              </div>
              <div className="w-1/4 flex flex-col">
                <label htmlFor="ef_of_fuel" className="text-xs py-1.5">
                  Emission factor
                </label>
                <input
                  type="number"
                  value={formData.ef_of_fuel}
                  name="ef_of_fuel"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"
                  placeholder="Type the value"
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className="px-4 w-full py-3 flex gap-x-6 gap-y-4 items-center justify-start">
              <div className="w-1/4 flex flex-col">
                <label htmlFor="evidence" className="text-xs py-1.5">
                  Evidence (Upload PNG,JPEG,PDF,.zip)
                  <span className="text-red-500 p-1">*</span>
                </label>
                <input
                  type="file"
                  name="evidence"
                  accept=".jpg, .jpeg, .png, .pdf, .zip"
                  disabled={loading}
                  multiple
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"
                  placeholder="Upload PNG,JPEG,PDF,.zip"
                  onChange={handleFormChange}
                  required
                />
              </div>
            </div>
            <div className="px-4 w-full py-3 flex gap-x-6 gap-y-4 items-center justify-center">
              <div className="w-1/6 flex flex-col">
                <button
                  disabled={loading}
                  type="cancel"
                  className="py-2 px-6 text-green-600 text-sm rounded-md"
                  onClick={() => handleCloseEditCopyForms()}
                >
                  Cancel
                </button>
              </div>
              <div className="w-1/6 flex flex-col">
                <button
                  disabled={loading}
                  type="submit"
                  className="py-2 px-6 text-white text-sm bg-green-600 rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PurchaseFuelEditAndCopyForm;
