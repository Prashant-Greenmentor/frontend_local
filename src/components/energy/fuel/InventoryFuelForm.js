import { ReactComponent as CloseIcon } from "../../../app/assets/CloseIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { postFuelData } from "../../../features/energy/fuel/fuelThunk";

const InventoryFuelForm = ({ handleFormChange, closePopupForm }) => {
  const dispatch = useDispatch();
  const fuelRecordType = useSelector((state) => state.fuel.fuelRecordType);

  const handlePurchaseFormSubmit = (e) => {
    e.preventDefault();
    const form = document.querySelector("#purchase-fuel-form");

    if (form.length && form.checkValidity()) {
      dispatch(postFuelData());
    } else if (form.length) {
      form.querySelector('input[type="submit"]').click();
    }
  };

  return (
    <>
      <div className="flex w-full h-screen overflow-hidden justify-center items-center z-[100] fixed bg-black bg-opacity-50 top-0 left-0 bottom-0">
        <div className="flex flex-col justify-center items-center w-9/12 text-xs bg-white absolute z-[1000] border border-transparent rounded-t-md">
          <div className="flex justify-between w-full bg-gray-50 py-2 px-4 border-b border-gray-300 mb-3">
            <span className="cursor-pointer">Purchased</span>
            <span className="cursor-pointer" onClick={() => closePopupForm()}>
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
                  Bill Date
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
                  Site
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
                  <option value="IOCL">IOCL</option>
                  <option value="BPCL">BPCL</option>
                  <option value="HPCL">HPCL</option>
                </select>
              </div>
              <div className="w-1/4 flex flex-col">
                <label htmlFor="fuel_type" className="text-xs py-1.5">
                  Fuel type
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
                  <option value="Biodiesel">Biodiesel</option>
                  <option value="Biomass">Biomass</option>
                  <option value="Coal">Coal</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Cng">Cng</option>
                  <option value="Lpg">Lpg</option>
                </select>
              </div>
              <div className="w-1/4 flex flex-col">
                <label htmlFor="source_type" className="text-xs py-1.5">
                  Source Type
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
                  <option value="Renewable">Renewable</option>
                  <option value="Non-Renewable">Non-Renewable</option>
                </select>
              </div>
            </div>
            <div className="px-4 w-full py-3 flex gap-x-6 gap-y-4 items-center justify-start">
              <div className="w-1/4 flex flex-col">
                <label htmlFor="use_type" className="text-xs py-1.5">
                  Use Type
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
                  <option value="Stationary">Stationary</option>
                  <option value="Mobile">Mobile</option>
                </select>
              </div>
              <div className="w-1/4 flex flex-col">
                <label htmlFor="quantity" className="">
                  Fuel Consumed
                </label>
                <input
                  type="number"
                  step="any"
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
                  defaultValue={""}
                  name="unit"
                  onChange={handleFormChange}
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"
                >
                  <option value="" disabled>
                    Choose the Unit
                  </option>
                  <option value="Litres">Litres</option>
                  <option value="Kilolitres">Kilolitres</option>
                  <option value="Kilograms">Kilograms</option>
                  <option value="Tonnes">Tonnes</option>
                  <option value="Quintals">Quintals</option>
                  <option value="GJ">GJ</option>
                </select>
              </div>
              <div className="w-1/4 flex flex-col">
                <label htmlFor="amount_paid" className="text-xs py-1.5">
                  Amount Paid
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
                  Currency
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
                  <option value="Renewable">Renewable</option>
                  <option value="Non-Renewable">Non-Renewable</option>
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
                <label htmlFor="evidence" className="text-xs py-1.5">
                  Evidence (Upload PNG,JPEG,PDF,.zip)
                </label>
                <input
                  type="file"
                  name="evidence"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"
                  placeholder="Upload PNG,JPEG,PDF,.zip"
                  accept=".jpg, .jpeg, .png, .pdf, .zip"
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className="px-4 w-full py-3 flex gap-x-6 gap-y-4 items-center justify-center">
              <div className="w-1/6 flex flex-col">
                <button
                  type="cancel"
                  className="py-2 px-6 text-green-600 text-sm rounded-md"
                  onClick={() => closePopupForm()}
                >
                  Cancell
                </button>
              </div>
              <div className="w-1/6 flex flex-col">
                <button
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

export default InventoryFuelForm;
