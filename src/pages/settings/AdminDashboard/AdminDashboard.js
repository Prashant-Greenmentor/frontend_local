import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TablePagination from "../../../components/common/Table/TablePagination";
import { setCurrentPage, setItemsPerPage } from "../Redux/SettingSlices";
import { ReactComponent as CloseIcon } from "../../../app/assets/CloseIcon.svg";

import { ReactComponent as PencilIcon } from "../../../app/assets/PencilIcon.svg";
import { ReactComponent as UserIconPlus } from "../../../app/assets/UserIconPlus.svg";
import { ReactComponent as DeleteIcon } from "../../../app/assets/DeleteIcon.svg";
import { ReactComponent as SendIcon } from "../../../app/assets/SendIcon.svg";
import Table from "../../../components/common/Table/Table";
import DashboardCard from "../components/DashboardCard";
import Popup from "./components/Row1PopUps";
const AdminDashboard = () => {
  const itemsPerPage = useSelector((state) => state.setting.itemsPerPage);
  const adminDashboardData = useSelector(
    (state) => state.setting.adminDashboardData
  );
  const totalPages = useSelector((state) => state.setting.totalPages);
  const totalCount = useSelector((state) => state.setting.totalCount);
  const currentPage = useSelector((state) => state.setting.currentPage);
  const [dataRows, setDataRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
const [title,settitle]=useState("")
  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };
  const dispatch = useDispatch();
  const headingsToDataKeyMap = {
    NAME: "name",
    ROLES: "roles",
    "DATA-I/P": "data_input",
    ANALYZE: "analyze",
    REPORT: "report",
    AUDIT: "audit",
    "RESET PASSWORD": "reset_password",
    DELETE: "delete",
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
  const handleEdit = (row) => {
    console.log("handle edit row ", row);
  };
  
  const generateCellHtml = (row, k) => {
    let cellHtml = null;
    switch (k) {
      case "reset_password":
        cellHtml = (
          <span className="w-full flex justify-center">
            <SendIcon
              className="cursor-pointer"
              onClick={() => handleEdit(row)}
            />
          </span>
        );
        break;
      case "name":
        cellHtml = (
          <div className=" flex float-start w-full space-x-2 items-center text-center">
            <img
              className="rounded-full flex flex-shrink-0 w-8 h-8 object-cover border shadow-lg"
              src={row.img}
              alt="user"
            />
            <span className="text-black">{row[k]}</span>
          </div>
        );
        break;
      case "delete":
        cellHtml = (
          <span className="w-full flex justify-center">
            <DeleteIcon
              className="cursor-pointer"
              onClick={() => handleEdit(row)}
            />
          </span>
        );
        break;

      case "audit":
      case "report":
      case "analyze":
      case "data_input":
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
    let transformedDataRows = adminDashboardData.map((row) => {
      let transformedDataRow = [];
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
  }, [adminDashboardData]);

  const handleclick=(text)=>{
    settitle(text)
    openPopup()
  }
  return (
    <div className="p-4">
    <div className="flex space-x-6">
      <DashboardCard handleclick={handleclick} text="Number of Active Users" avatars={adminDashboardData}/>
      <DashboardCard handleclick={handleclick} text="Data In" avatars={adminDashboardData}/>
      <DashboardCard handleclick={handleclick} text="Analyze" avatars={adminDashboardData}/>
      <DashboardCard handleclick={handleclick} text="Reports" avatars={adminDashboardData}/>
      <DashboardCard handleclick={handleclick} text="Audits" avatars={adminDashboardData}/>

    </div>
    <div className="flex justify-start space-x-2 items-center p-1 px-2  bg-white rounded-lg w-fit border-2 mt-3">
        <label htmlFor="role">Filter Role</label>
        <select name="role" id="" className="outline-none border-l-2 p-1">
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
        </select>
    </div>
      <div className="mt-2">
        <Table
          headings={Object.keys(headingsToDataKeyMap)}
          dataRows={dataRows}
          paginationObject={paginationConfig}
          height="60.5vh"
        />
        {paginationConfig &&
          paginationConfig?.paginationEnabled &&
          paginationConfig?.handleItemsPerPage &&
          typeof paginationConfig?.handleItemsPerPage === "function" &&
          paginationConfig?.handlePageChange &&
          typeof paginationConfig?.handlePageChange === "function" && (
            <TablePagination paginationObject={paginationConfig} />
          )}
      </div>
      <button className="flex justify-between items-center p-2 px-3 rounded-lg text-green-600 bg-[#C1EBDB]">Add New User <span><UserIconPlus/></span></button>
      {isOpen&&<Popup title={title} onClose={closePopup} data={adminDashboardData}/>}
    </div>
  );
};

export default AdminDashboard;
