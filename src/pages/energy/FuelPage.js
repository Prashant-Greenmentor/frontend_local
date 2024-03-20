/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../../components/common/Header";
import UserIcon from "../../app/assets/UserIcon.svg";
import { ReactComponent as FuelIcon } from "../../app/assets/FuelIcon.svg";
import { ReactComponent as PurchasedIcon } from "../../app/assets/PurchasedIcon.svg";
// import { ReactComponent as InventoryIcon } from "../../app/assets/InventoryIcon.svg";
import { ReactComponent as CopyIcon } from "../../app/assets/CopyIcon.svg";
import { ReactComponent as PencilIcon } from "../../app/assets/PencilIcon.svg";
import { ReactComponent as AddIconBig } from "../../app/assets/AddIconBig.svg";
import { ReactComponent as DownloadIcon } from "../../app/assets/DownloadIcon.svg";
import Table from "../../components/common/Table/Table";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  setCurrentPage,
  setFuelForm,
  setFuelRecordType,
  setItemsPerPage,
} from "../../features/energy/fuel/fuelSlice";
import {
  fetchCurrencyData,
  fetchFuelData,
  fetchFuelTypeData,
  fetchSiteData,
  fetchUnitData,
  fetchUploadFuelEvidence,
  fetchUseTypeData,
} from "../../features/energy/fuel/fuelThunk";
import TableMeta from "../../components/common/Table/TableMeta";
import PurchaseFuelForm from "../../components/energy/fuel/PurchaseFuelForm";
import TablePagination from "../../components/common/Table/TablePagination";
import { downloadFileThunk } from "../../features/common/commonThunk";
import { toast } from "react-toastify";
import PurchaseFuelEditAndCopyForm from "../../components/energy/fuel/PurchaseFuelEditAndCopyForm";



const FuelPage = () => {
  const headingsToDataKeyMap = {
    " ": "",
    "BILL DATE": "bill_date",
    SITE: "site",
    "FUEL TYPE": "fuel_type",
    "SOURCE TYPE": "source_type",
    "USE TYPE": "use_type",
    "QUANTITY USED": "quantity",
    UNIT: "unit",
    'AMOUNT PAID': "amount_paid",
    CURRENCY: "currency",
    "HEAT CONTENT OF THE FUEL": "heat_content_of_fuel",
    "CARBON CONTENT OF THE FUEL": "carbon_content_of_fuel",
    "EMISSION FACTOR": "ef_of_fuel",
    EVIDENCE: "evidence",
    STATUS: "status",
    FEEDBACK: "comments",
    "SUBMITTED BY": "submitted_by",
    "APPROVED BY": "approved_by",
    EDIT: "",
  };

  const fuelRecords = useSelector((state) => state.fuel.fuelRecords);
  const fuelRecordType = useSelector((state) => state.fuel.fuelRecordType);
  const itemsPerPage = useSelector((state) => state.fuel.itemsPerPage);
  const totalPages = useSelector((state) => state.fuel.totalPages);
  const totalCount = useSelector((state) => state.fuel.totalCount);
  const currentPage = useSelector((state) => state.fuel.currentPage);
 
  const [dataRows, setDataRows] = useState([]);
  const [isPurchaseFormOpen, setPurchaseFormOpen] = useState(false);
  const [manualEntry, setManualEntry] = useState(true);
  const [apiIntegration, setApiIntegration] = useState(false);
  const [trendLine, setTrendLine] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);
  const dispatch = useDispatch();
  const [actionType, setActionType] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isEditCopyFormOpen, setIsEditCopyFormOpen] = useState(false);
  // console.log(fuelRecords)

  // Function to handle editing a row
  const handleEdit = (row) => {
    // dispatch(fetchCurrencyData());
    // dispatch(fetchSiteData());
    // dispatch(fetchFuelTypeData());
    // dispatch(fetchUnitData());
    // dispatch(fetchUseTypeData());
    setActionType("edit")
    setSelectedRowData(row); // Set the selected row data
    setIsEditCopyFormOpen(true); // Open the edit form
  };

  // Function to handle copying a row
  const handleCopy = (row) => {
    // dispatch(fetchCurrencyData());
    // dispatch(fetchSiteData());
    // dispatch(fetchFuelTypeData());
    // dispatch(fetchUnitData());
    // dispatch(fetchUseTypeData());
    setActionType("copy");
    setSelectedRowData(row);
    setIsEditCopyFormOpen(true); // Open the copy form
  };

  // Function to close edit and copy forms
  const handleCloseEditCopyForms = () => {
    setIsEditCopyFormOpen(false);
   
  };

  
  const switchTab = (tabId) => {
    switch (tabId) {
      case 1:
        setManualEntry(true);
        setApiIntegration(false);
        setTrendLine(false);
        break;
      case 2:
        setManualEntry(false);
        setApiIntegration(true);
        setTrendLine(false);
        break;
      case 3:
        setManualEntry(false);
        setApiIntegration(false);
        setTrendLine(true);
        break;
      default:
        setManualEntry(true);
        setApiIntegration(false);
        setTrendLine(false);
        break;
    }
    setSelectedTab(tabId);
  };

  const openPopupForm = (fuelRecordType) => {
    if (fuelRecordType === 1) {
      // dispatch(fetchCurrencyData());
      // dispatch(fetchSiteData());
      // dispatch(fetchFuelTypeData());
      // dispatch(fetchUnitData());
      // dispatch(fetchUseTypeData());
      setPurchaseFormOpen(true);
    } else {
    }
  };

  const closePurchasePopupForm = () => {
    setPurchaseFormOpen(false);
  };

  const [paginationConfig, setPaginationConfig] = useState({
    paginationEnabled: true,
    currentPage: 1,
    totalPage: 1,
    itemsPerPage: 10,
    handleItemsPerPage: null,
    handlePageChange: null,
  });

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleItemsPerPage = (itemCount) => {
    dispatch(setItemsPerPage(itemCount));
  };

  const handleFileDownload = (filePath) => {
    
    // dispatch(downloadFileThunk({ filePath }));
    if(filePath){
      const link = document.createElement('a');
      link.href = filePath;
      link.target="_blank"
      link.download = 'filename.zip'; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }else{
      toast("No evidance atteched")
    }
  };

  const generateCellHtml = (row, k) => {
   
    let cellHtml = null;
    switch(k) {
      case 'fuel_type':
        cellHtml = (
          <span className="w-full flex justify-center">
            <span
              className={`px-2 py-1 border border-transparent rounded-md ${
                row["source_type"].toString().toLowerCase() ===
                "Renewable".toLowerCase()
                  ? "bg-green-200 text-green-600"
                  : "bg-red-200 text-red-600"
              }`}
            >
              {row[k]}
            </span>
          </span>
        );
        break;
      case "status":
        cellHtml = (
          <span className="w-full flex justify-center">
            <span
              className={`px-2 py-1 border border-transparent rounded-md ${
                row[k].toString().toLowerCase() === "Accepted".toLowerCase()
                  ? "bg-green-200 text-green-600"
                  : row[k].toString().toLowerCase() ===
                    "Submitted".toLowerCase()
                  ? "bg-blue-200 text-blue-600"
                  : "bg-red-200 text-red-600"
              }`}
            >
              {row[k]}
            </span>
          </span>
        );
        break;
      case "evidence":
        cellHtml = (
          <span className="w-full flex justify-center">
            <DownloadIcon
              className="cursor-pointer"
              onClick={() => handleFileDownload(row[k])}
            />
          </span>
        );
        break;
      case "submitted_by":
      case "approved_by":
        cellHtml = (
          <span className="w-full flex justify-center">
            <img
              src={`${UserIcon}`}
              className="cursor-pointer w-[32px] h-[32px] border border-transparent rounded-[50%]"
              alt={`${k}`}
            />
          </span>
        );
        break;
      default:
        cellHtml = <span className="w-full flex justify-center">{row[k]}</span>;
        break;
    }
    return cellHtml;
  };
// console.log(fuelRecords)
 
  const handleFormChange = async (e) => {
    const { name, type, value, checked } = e.target;

    if (type === "checkbox") {
      dispatch(setFuelForm({ [name]: checked }));
    } else if (type === "file") {
      const files = e.target.files;
      if (!files) {
        toast("Please select a file");
        return;
      }
      dispatch(fetchUploadFuelEvidence(files));
    } else{
      dispatch(setFuelForm({ [name]: value }));
    }
  };

  const handleFuelTypeChange = (recordType) => {
    dispatch(setFuelRecordType(recordType));
  };

 useEffect(() => {
 
  let transformedDataRows = fuelRecords.map((row) => {
    let transformedDataRow = [];
    transformedDataRow.push(
      <span className="w-full flex justify-center">
        <CopyIcon className="cursor-pointer" onClick={()=>handleCopy(row)}/>
      </span>
    );
    Object.values(headingsToDataKeyMap).forEach((k) => {
      if (k.toString().trim() !== "") {
        transformedDataRow.push(generateCellHtml(row, k));
      }
    });
    transformedDataRow.push(
      <span className="w-full flex justify-center">
        <PencilIcon className="cursor-pointer" onClick={()=>handleEdit(row)} />
      </span>
    );
    return transformedDataRow;
  });

  setDataRows(transformedDataRows);
  setPaginationConfig({
    ...paginationConfig,
    currentPage: currentPage,
    totalPages: totalPages,
    itemsPerPage: itemsPerPage,
    handleItemsPerPage: handleItemsPerPage,
    handlePageChange: handlePageChange,
  });
}, [fuelRecords]);

useEffect(() => {
  
}, [itemsPerPage, currentPage]);
useEffect(()=>{
  dispatch(fetchFuelData()).then(()=>{
    
    dispatch(fetchCurrencyData());
    dispatch(fetchSiteData());
    dispatch(fetchFuelTypeData());
    dispatch(fetchUnitData());
    dispatch(fetchUseTypeData());
   })

},[])

 return (
    <>
      <Header PageIcon={FuelIcon} pageTitle={"Scope 1"} />

      <div className="flex flex-col main-container w-full px-10 py-6">
        <div className="flex  justify-between items-center text-xs">
          <div className="flex">
            <button
              className={`flex border items-center rounded-md mr-4 cursor-pointer px-2  ${
                fuelRecordType === 1
                  ? "border-green-600 focus:bg-green-600 text-white white-svg bg-green-600"
                  : "text-green-600 bg-white border-gray-100 hover:bg-green-600 hover:text-white hover-white-svg"
              }`}
              onClick={() => handleFuelTypeChange(1)}
            >
              <PurchasedIcon />
              <span className="px-2">Purchased fuel</span>
            </button>
            {/* <button
              className={`flex border items-center rounded-md mr-4 cursor-pointer px-2 ${
                fuelRecordType === 2
                  ? "border-green-600 focus:bg-green-600 text-white white-svg bg-green-600"
                  : "text-green-600 bg-white border-gray-100 hover:bg-green-600 hover:text-white hover-white-svg"
              }`}
              onClick={() => handleFuelTypeChange(2)}
            >
              <InventoryIcon />
              <span className="px-2">Inventory fuel</span>
            </button> */}
          </div>
          <div className="flex"></div>
        </div>
        <div className="flex flex-col border border-gray-300 rounded-md mt-[10px] relative">
          <TableMeta
            recordType={fuelRecordType}
            totalCount={totalCount}
            openPopUpForm={openPopupForm}
            switchTab={switchTab}
            selectedTab={selectedTab}
          />
          {manualEntry && (
            <>
              <Table
                headings={Object.keys(headingsToDataKeyMap)}
                dataRows={dataRows}
                paginationObject={paginationConfig}
              />
              <div className="flex w-fit py-4 px-2 absolute bottom-20 right-6 cursor-pointer">
              
                  {/* Add */}
                  <AddIconBig  onClick={() => openPopupForm(fuelRecordType)}/>
              
              </div>
              {paginationConfig &&
                paginationConfig?.paginationEnabled &&
                paginationConfig?.handleItemsPerPage &&
                typeof paginationConfig?.handleItemsPerPage === "function" &&
                paginationConfig?.handlePageChange &&
                typeof paginationConfig?.handlePageChange === "function" && (
                  <TablePagination paginationObject={paginationConfig} />
                )}
            </>
          )}
          {apiIntegration && (
            <>
              <h1>API Integration tab</h1>
            </>
          )}
          {trendLine && (
            <>
              <h1>TrendLine tab</h1>
            </>
          )}
        </div>
      </div>

      {isPurchaseFormOpen && (
        <PurchaseFuelForm
          handleFormChange={handleFormChange}
          closePurchasePopupForm={closePurchasePopupForm}
          
        />
      )}
      {isEditCopyFormOpen && (
        <PurchaseFuelEditAndCopyForm
          selectedRowData={selectedRowData}
          handleCloseEditCopyForms={handleCloseEditCopyForms}
          actionType= {actionType}
        />
      )}
    </>
  );
};

export default FuelPage;
