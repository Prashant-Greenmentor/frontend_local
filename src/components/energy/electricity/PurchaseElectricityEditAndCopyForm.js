
import { ReactComponent as CloseIcon } from "../../../app/assets/CloseIcon.svg";
import { useDispatch, useSelector } from "react-redux";
// import {
//   postElectricityData
// } from "../../../features/energy/electricity/electricityThunk";
import CustomSelectBox from "../../Analyze/CustomSelectBox";
import { useEffect, useState } from "react";
import { setElectricityForm } from "../../../features/energy/electricity/electricitySlice";
import { toast } from "react-toastify";
import { electricityUploadEvidence, fetchElectricityInputData, fetchTransactionTypeData, postElectricityData, updateElectricityData } from "../../../features/energy/electricity/electricityThunk";

const PurchaseElectricityEditAndCopyForm = ({

  closePurchasePopupForm,
  selectedRowData,
  startDate,
  actionType,
}) => {
  const [formData, setFormData] = useState({
  });
  const [, setSelectedElectricityBoard] = useState("");
  let formValue = useSelector((state) => state.electricity.electricityForm);
  const [transactionTypeOptions, ] = useState([
    "Purchased",
    "Captive",
  ]);
  // const transactionTypeOptions = useSelector(
  //   (state) => state.electricity.electricityTransactionTypeData
  // );

  const handleElectricityBoardChange = (value) => {
    setSelectedElectricityBoard(value);
  };
  const dispatch = useDispatch();
  const electricityRecordType = useSelector(
    (state) => state.electricity.electricityRecordType
  );
  const electricitySourcesData = useSelector(
    (state) => state.electricity.electricitySourcesData
  );
  const currencyData = useSelector(
    (state) => state.electricity.currencyData
  );
  const unitData = useSelector(
    (state) => state.electricity.unitData
  );
  const electricity_boardOption = useSelector(
    (state) => state.electricity.electricity_boardData
  );
  const siteData = useSelector(
    (state) => state.electricity.siteData
  );
  const handleFormChange = (e) => {
    const { name, value, type } = e.target;
    if (name == "electricity_source") {
      dispatch(fetchTransactionTypeData(value));
    }
    if (type === "file") {
      const files = e.target.files;
      if (!files) {
        toast("Please select a file");
        return;
      }
      // setFormData({ ...formData, [name]: files[0] });
      dispatch(electricityUploadEvidence(files));
    } else {
      setFormData({ ...formData, [name]: value });
      dispatch(setElectricityForm({ ...formData, [name]: value }));
    }
  };
  const handlePurchaseFormSubmit = (e) => {
    e.preventDefault();

    const form = document.querySelector("#purchase-electricity-form");
    if (form.length && form.checkValidity()) {
      
      switch (actionType) {
        case "edit":
          dispatch(updateElectricityData());
          break;
        case "copy":
          dispatch(postElectricityData());
          console.log(formValue,formData)
          break;
        default:
          break;
      }
      closePurchasePopupForm();
    } else if (form.length) {
      form.querySelector('input[type="submit"]').click();
    }
  };
  useEffect(() => {
   
    if (
      selectedRowData
    ) {
      const UpdateDataForPopulate = {
        ...selectedRowData,
        site:
          siteData.length > 0 &&
          siteData.find((s) => (s.site?.toLowerCase() === selectedRowData.site?.toLowerCase()))?.id||"",
        currency:
          currencyData.length > 0 &&
          currencyData.find((s) => (s.currency?.toLowerCase() === selectedRowData.currency?.toLowerCase()))?.id||"",
        electricity_board:
          electricity_boardOption.length > 0 &&
          electricity_boardOption.find((s) => (s.electricity_board?.toLowerCase() === selectedRowData.electricity_board?.toLowerCase())
            )?.id||"",
        unit:
          unitData.length > 0 &&
          unitData.find((s) => (s.unit?.toLowerCase() === selectedRowData.unit?.toLowerCase()))?.id||"",
          electricity_source:
          electricitySourcesData.length > 0 &&
          electricitySourcesData.find((s) => (s.electricity_source?.toLowerCase() === selectedRowData.electricity_source?.toLowerCase()))?.id||"",
        };
        //  setFormValues()
      
        setFormData((prevFormData) => {
          return { ...prevFormData, ...UpdateDataForPopulate };
        });

        dispatch(setElectricityForm({ ...UpdateDataForPopulate }));
    }
    
  }, [selectedRowData,actionType,dispatch,transactionTypeOptions]);

  return (
    <>
   <div className="mainContainer flex w-full h-screen overflow-hidden justify-center items-center z-[100] fixed bg-black bg-opacity-50 top-0 left-0 bottom-0">
        <div className="flex flex-col justify-center items-center w-9/12 text-xs bg-white absolute z-[1000] border border-transparent rounded-t-md">
          <div className="flex justify-between w-full bg-gray-50 py-2 px-4 border-b border-gray-300 mb-3">
            <span className="cursor-pointer">Electricity</span>
            <span
              className="cursor-pointer"
              onClick={() => closePurchasePopupForm()}
            >
              <CloseIcon />
            </span>
          </div>
         <form
            id="purchase-electricity-form"
            className="flex flex-col w-full py-4"
            onSubmit={handlePurchaseFormSubmit}
          >
            <input
              type="hidden"
              name="electricity_record_type"
              value={electricityRecordType}
            />
            <div className="grid grid-cols-4 gap-4 px-8 mb-4 justify-around ">
              <div className="col-span-1 flex flex-col">
                <label htmlFor="bill_date" className="text-xs py-1.5">
                  Bill Date<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="bill_date"
                  id="bill_date"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"

                  value={formValue.bill_date || ""}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <label htmlFor="bill_start" className="text-xs py-1.5">
                  Bill Start Date<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="bill_start"
                  id="bill_start"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"

                  value={formValue.bill_start || ""}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <label htmlFor="bill_end" className="text-xs py-1.5">
                  Bill End Date<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="bill_end"
                  id="bill_end"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"

                  value={formValue.bill_end || ""}
                  min={startDate}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <label htmlFor="site" className="text-xs py-1.5">
                  Site<span className="text-red-500">*</span>
                </label>
                <select
                  name="site"
                  onChange={handleFormChange}
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"

                  required
                  value={formValue.site || ""}
                >
                  <option value="" disabled>
                    Choose the site number
                  </option>
                  {siteData&&siteData.map((site, index) => (
                    <option key={site.id} value={site.id}>
                      {site.site}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-1 flex flex-col">
                <label
                  htmlFor="electricity_source"
                  className="text-xs py-1.5"
                >
                  Electricity Source<span className="text-red-500">*</span>
                </label>
                 <select
                  name="electricity_source"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"

                  value={formValue.electricity_source || ""}
                  onChange={handleFormChange}
                  required
                >
                  <option value="" disabled>
                    Choose the source
                  </option>
                  {electricitySourcesData &&
                    electricitySourcesData.map((source, index) => (
                      <option key={source.id} value={source.id}>
                        {source.electricity_source}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-span-1 flex flex-col">
                <label htmlFor="transaction_type" className="text-xs py-1.5">
                  Transaction Type<span className="text-red-500">*</span>
                </label>
                <select
                  value={formValue.transaction_type || ""}
                  name="transaction_type"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"

                  onChange={handleFormChange}
                  required
                >
                  <option value="" disabled>
                    Choose the type
                  </option>
                  {transactionTypeOptions.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-1 flex flex-col">
                <label htmlFor="electricity_board" className="text-xs py-1.5">
                  Electricity Board
                </label>
                <select
                  // defaultValue={""}
                  onChange={handleFormChange}
                  required
                  value={formValue.electricity_board || ""}
                  name="electricity_board"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"
                >
                  <option value="" disabled>
                    Choose the electricity_board
                  </option>
                  {electricity_boardOption &&
                    electricity_boardOption.map((board, index) => (
                      <option key={board.id} value={board.id}>
                        {board.electricity_board}
                      </option>
                    ))}
                </select>
              </div>

              
             
            
              <div className="col-span-1 flex flex-col">
                <label htmlFor="unit_used" className="text-xs py-1.5">
                  Unit Used
                </label>
                <input
                  type="number"
                  value={formValue.unit_used || ""}
                  name="unit_used"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"
                  placeholder="Type the value"
                  onChange={handleFormChange}
                  min={"0"}
                  // required
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <label htmlFor="unit" className="text-xs py-1.5">
                  Unit
                </label>
                <select
                  // defaultValue={""}
                  onChange={handleFormChange}
                  // required
                  value={formValue.unit||""}
                  name="unit"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"
                >
                  <option value="" >
                    Choose the unit
                  </option>
                  {unitData?.map((type, index) => (
                    <option key={index} value={type.id}>
                      {type.unit}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="col-span-1 flex flex-col">
                <label htmlFor="amount_paid" className="text-xs py-1.5">
                  Amount Paid<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"

                  name="amount_paid"
                  value={formValue.amount_paid || ""}
                  onChange={handleFormChange}
                  min={"0"}
                  required
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <label htmlFor="currency" className="text-xs py-1.5">
                  Currency<span className="text-red-500">*</span>
                </label>
                <select
                  value={formValue.currency || ""}
                  name="currency"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"

                  onChange={handleFormChange}
                  required
                >
                  <option value="" disabled>
                    Choose the currency
                  </option>
                  {currencyData.map((currency, index) => (
                    <option key={index} value={currency.id}>
                      {currency.currency}
                    </option>
                  ))}
                </select> 
              </div>
              
              <div className="col-span-1 flex flex-col">
                <label htmlFor="emission_factor" className="text-xs py-1.5">
                  Emission factor
                </label>
                <input
                  type="number"
                  name="emission_factor"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"

                  value={formValue.emission_factor || ""}
                  onChange={handleFormChange}
                  
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <label htmlFor="evidence" className="text-xs py-1.5">
                  Evidence <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="evidence"
                  className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"

                  multiple
                  accept=".jpg, .jpeg, .png, .pdf, .zip"
                  onChange={handleFormChange}
                  // required
                />
              </div>
            </div>
           
            <div className="px-4 w-full py-3 flex gap-x-6 gap-y-4 items-center justify-center">
              <div className="w-1/6 flex flex-col">
                <button
                  type="cancel"
                  className="py-2 px-6 text-green-600 text-sm rounded-md"
                  onClick={() => closePurchasePopupForm()}
                >
                  Cancel
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

export default PurchaseElectricityEditAndCopyForm;
