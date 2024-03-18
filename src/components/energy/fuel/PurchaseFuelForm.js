import { ReactComponent as CloseIcon } from "../../../app/assets/CloseIcon.svg";
import {useDispatch, useSelector} from "react-redux";
import { fetchFuelData, postFuelData } from "../../../features/energy/fuel/fuelThunk";

const PurchaseFuelForm = ({ handleFormChange, closePurchasePopupForm }) => {
    const dispatch = useDispatch();
   
    const fuelRecordType = useSelector((state) => state.fuel.fuelRecordType);
    const siteData = useSelector((state) => state.fuel.siteData);
    const fuelTypeData = useSelector((state) => state.fuel.fuelTypeData);
    const sourceTypeData = useSelector((state) => state.fuel.sourceTypeData);
    const useTypeData = useSelector((state) => state.fuel.useTypeData);
    const unitData = useSelector((state) => state.fuel.unitData);
    const currencyData = useSelector((state) => state.fuel.currencyData);
    const loading = useSelector((state) => state.common.isLoading);
    const handlePurchaseFormSubmit = (e) => {
        e.preventDefault();
        const form = document.querySelector("#purchase-fuel-form");
        
        if(form.length && form.checkValidity()) {
            dispatch(postFuelData());
            closePurchasePopupForm()
            dispatch(fetchFuelData());
        } else if(form.length) {
            form.querySelector('input[type="submit"]').click();
        }
    }

  return (
    <>
      <div className="flex w-full h-screen overflow-hidden justify-center items-center z-[100] fixed bg-black bg-opacity-50 top-0 left-0 bottom-0">
        <div className="flex flex-col justify-center items-center w-9/12 text-xs bg-white absolute z-[1000] border border-transparent rounded-t-md">
          <div className="flex justify-between w-full bg-gray-50 py-2 px-4 border-b border-gray-300 mb-3 items-center">
            <span className="cursor-pointer">Purchased Fuel</span>
            <span
              className="cursor-pointer"
              onClick={() => closePurchasePopupForm()}
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
                  defaultValue={""}
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
                  defaultValue={""}
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
                  defaultValue={""}
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
                  defaultValue={""}
                  name="use_type"
                  onChange={handleFormChange}
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
                  Fuel Consumed
                </label>
                <input
                  type="number"
                  name="quantity"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"
                  placeholder="Enter value"
                  step="any"
                  onChange={handleFormChange}
                />
              </div>
              <div className="w-1/4 flex flex-col">
                <label htmlFor="unit" className="text-xs py-1.5">
                  Unit
                </label>
                <select
                  defaultValue={""}
                  name="unit"
                  onChange={handleFormChange}
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"
                >
                  <option value="" >
                    Choose the Unit
                  </option>
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
                  type="number"
                  step="any"
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
                  defaultValue={""}
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
                  step="any"
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
                  step="any"
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
                  step="any"
                  name="ef_of_fuel"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"
                  placeholder="Type the value"
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className="px-4 w-full py-3 flex gap-x-6 gap-y-4 items-center justify-start">
              <div className="w-1/4 flex flex-col">

                <label htmlFor="currency" className="text-xs py-1.5">
                  Evidence (Upload PNG,JPEG,PDF,.zip)<span className="text-red-500 p-1">*</span>

   
             
                </label>
                <input
                  type="file"
                  name="evidence"
                  disabled={loading}
                  multiple
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"
                  placeholder="Upload PNG,JPEG,PDF,.zip"
                  accept=".jpg, .jpeg, .png, .pdf, .zip"
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
                  onClick={() => closePurchasePopupForm()}
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
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PurchaseFuelForm;
