import Header from "../../components/common/Header";
import { ReactComponent as ElectricityIcon } from "../../app/assets/ElectricityIcon.svg";
import { ReactComponent as CopyIcon } from "../../app/assets/CopyIcon.svg";
import { ReactComponent as DownloadIcon } from "../../app/assets/DownloadIcon.svg";
import { ReactComponent as PencilIcon } from "../../app/assets/PencilIcon.svg";

import { ReactComponent as AddIconBig } from "../../app/assets/AddIconBig.svg";
import UserIcon from "../../app/assets/UserIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  resetElectricityForm,
  setCurrentPage,
  setElectricityForm,
  setItemsPerPage,
} from "../../features/energy/electricity/electricitySlice";
import { downloadFileThunk } from "../../features/common/commonThunk";

import Table from "../../components/common/Table/Table";
import TablePagination from "../../components/common/Table/TablePagination";
import PurchaseElecricityForm from "../../components/energy/electricity/PurchaseElectricityForm";

import TableMeta from "../../components/common/Table/TableMeta";
import PurchaseElectricityEditAndCopyForm from "../../components/energy/electricity/PurchaseElectricityEditAndCopyForm";

import {
  electricityUploadEvidence,
  fetchCurrencyData,

  fetchElectricityInputData,
  fetchElectricitySourcesTypeData,
  fetchSiteData,
  fetchTransactionTypeData,
  fetchUnitData,
} from "../../features/energy/electricity/electricityThunk";

const ElectricityPage = () => {
  const electricityRecords = useSelector(
    (state) => state.electricity.electricityRecords
  );
  const electricityRecordType = useSelector(
    (state) => state.electricity.electricityRecordType
  );
 

  const itemsPerPage = useSelector((state) => state.electricity.itemsPerPage);
  const totalPages = useSelector((state) => state.electricity.totalPages);
  const totalCount = useSelector((state) => state.electricity.totalCount);
  const currentPage = useSelector((state) => state.electricity.currentPage);
  const [dataRows, setDataRows] = useState([]);

  const [isPurchaseFormOpen, setPurchaseFormOpen] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [manualEntry, setManualEntry] = useState(true);
  const [apiIntegration, setApiIntegration] = useState(false);
  const [trendLine, setTrendLine] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isEditCopyFormOpen, setIsEditCopyFormOpen] = useState(false);
  const handleCloseEditCopyForms = () => {
    setIsEditCopyFormOpen(false);
  };

  const dispatch = useDispatch();

  //  Handle edit , add and copy
  const openPopupForm = () => {
    dispatch(resetElectricityForm());

    setPurchaseFormOpen(true);
  };

  const closePurchasePopupForm = () => {
    setPurchaseFormOpen(false);
  };
  const handleEdit = (row) => {
    setStartDate(row["bill_start"]); // for seting start date in form

    setActionType("edit");
    setSelectedRowData(row); // Set the selected row data
    setIsEditCopyFormOpen(true);
  };
  const handleCopy = (selectedData) => {
    setStartDate(selectedData["bill_start"]);
    setSelectedRowData(selectedData); // Set the selected row dat
    setActionType("copy");
    setIsEditCopyFormOpen(true);
  };

  // maping Table head
  const headingsToDataKeyMap = {
    " ": "",
    "BILL DATE": "bill_date",
    "BILLING START PERIOD": "bill_start",
    "BILLING END PERIOD": "bill_end",
    SITE: "site",
    "ELECTRICITY SOURCE": "electricity_source",
    "SOURCE TYPE": "source_type",
    "TRANSACTION TYPE": "transaction_type",
    "ELECTRICITY BOARD": "electricity_board",
    "UNIT USED": "consumed_value",
    UNIT: "unit",
    "AMOUNT PAID": "amount_paid",
    CURRENCY: "currency_id",
    "EMISSION FACTOR": "emission_factor",
    EVIDENCE: "evidence",
    STATUS: "status",
    FEEDBACK: "feedback",
    "SUBMITTED BY": "submitted_by",
    "APPROVED BY": "approved_by",
    EDIT: "edit",
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
    dispatch(downloadFileThunk({ filePath }));
  };

  const generateCellHtml = (row, k) => {
    let cellHtml = null;
    switch (k) {
      case "electricity_resource":
        cellHtml = (
          <span className="w-full flex justify-center">
            <span
              className={`px-2 py-1 border border-transparent rounded-md ${
                row["electricity_source"] === "wind"
                  ? "bg-green-200 text-green-600"
                  : row["electricity_source"] === "hydro"
                  ? "text-blue-800 bg-blue-200"
                  : row["electricity_source"] === "solar"
                  ? "text-yellow-700 bg-yellow-200"
                  : row["electricity_source"] === "gas" ||
                    row["electricity_source"] === "diesel"
                  ? "text-red-600 bg-red-200"
                  : row["electricity_source"] === "mixed renewable"
                  ? "bg-green-200 text-green-600"
                  : "text-black bg-gray-200"
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
                row[k] === "Uploaded"
                  ? "bg-green-600 text-white"
                  : "bg-red-200 text-red-600"
              }`}
            >
              {row[k] || "Panding"}
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
      case "edit":
        cellHtml = (
          <span className="w-full flex justify-center">
            <PencilIcon
              className="cursor-pointer"
              onClick={() => handleEdit(row)}
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

  useEffect(() => {
    let transformedDataRows =
      electricityRecords &&
      electricityRecords?.map((row) => {
        let transformedDataRow = [];
        transformedDataRow.push(
          <span className="w-full flex justify-center cursor-pointer">
            <CopyIcon onClick={() => handleCopy(row)} />
          </span>
        );
        Object.values(headingsToDataKeyMap).forEach((k) => {
          if (k.toString().trim() !== "") {
            transformedDataRow.push(generateCellHtml(row, k));
          }
        });
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
  }, [electricityRecords]);

  useEffect(() => {}, [itemsPerPage, currentPage]);
  useEffect(() => {
    dispatch(fetchElectricityInputData()).then(() => {
      dispatch(fetchCurrencyData());
      dispatch(fetchSiteData());
      dispatch(fetchUnitData());

      dispatch(fetchElectricitySourcesTypeData());
    });
  }, []);
  //  handle add ,edit and copy electricityform
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    // Calendar Validation
    if (name == "electricity_source") {
      dispatch(fetchTransactionTypeData(value));
    }
    if (name === "bill_start") {
      setStartDate(value);
    }
    if (name === "evidence") {
      dispatch(electricityUploadEvidence());
    }
    //  implemented other input for electricity_board
    if (value === "other") {
      setIsOtherSelected(true);
      dispatch(setElectricityForm({ [name]: "" }));
    } else if (
      value !== "other" &&
      e.target.tagName === "SELECT" &&
      name === "electricity_board"
    ) {
      setIsOtherSelected(false);
    }
    dispatch(setElectricityForm({ [name]: value }));
  };

  return (
    <>
      <Header PageIcon={ElectricityIcon} pageTitle={"Scope 2"} />

      <div className="flex flex-col main-container w-full px-10 py-6">
        <div className="flex flex-col border border-gray-300 rounded-md mt-[18px] relative">
          <TableMeta
            recordType={electricityRecordType}
            totalCount={totalCount}
            openPopUpForm={openPopupForm}
            switchTab={switchTab}
            selectedTab={selectedTab}
          />
          {manualEntry && (
            <>
              {dataRows && (
                <Table
                  headings={Object.keys(headingsToDataKeyMap)}
                  dataRows={dataRows}
                  paginationObject={paginationConfig}
                />
              )}
              <div className="flex w-fit py-4 px-2 absolute bottom-20 right-6 cursor-pointer">
                {/* Add */}
                <AddIconBig
                  onClick={() => openPopupForm(electricityRecordType)}
                />
              </div>
              {paginationConfig &&
                paginationConfig?.paginationEnabled &&
                paginationConfig?.handleItemsPerPage &&
                typeof paginationConfig?.handleItemsPerPage === "function" &&
                paginationConfig?.handlePageChange &&
                typeof paginationConfig?.handlePageChange === "function" && (
                  <TablePagination paginationObject={paginationConfig} />
                )}{" "}
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
        <PurchaseElecricityForm
          handleFormChange={handleFormChange}
          closePurchasePopupForm={closePurchasePopupForm}
          isOtherSelected={isOtherSelected}
          startDate={startDate}
        />
      )}
      {isEditCopyFormOpen && (
        <PurchaseElectricityEditAndCopyForm
          selectedRowData={selectedRowData}
          closePurchasePopupForm={handleCloseEditCopyForms}
          actionType={actionType}
          startDate={startDate}
        />
      )}
    </>
  );
};

export default ElectricityPage;
