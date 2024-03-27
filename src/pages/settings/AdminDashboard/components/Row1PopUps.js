import React, { useEffect, useState } from "react";

import { ReactComponent as DeleteIcon } from "../../../../app/assets/DeleteIcon.svg";
import { Table } from "../components/Table";
const Popup = ({ title, data, onClose }) => {
  const [dataRows, setDataRows] = useState();
  const headingsToDataKeyMap = {
    NAME: "name",
    ROLES: "roles",
    DELETE: "delete",
  };
  const generateCellHtml = (row, k) => {
    let cellHtml = null;
    switch (k) {
      case "delete":
        cellHtml = (
          <span className="w-full flex justify-center">
            <DeleteIcon
              className="cursor-pointer"
              // onClick={() => handleEdit(row)}
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
    let transformedDataRows = data.map((row) => {
      let transformedDataRow = [];
      Object.values(headingsToDataKeyMap).forEach((k) => {
        if (k.toString().trim() !== "") {
          transformedDataRow.push(generateCellHtml(row, k));
        }
      });
      return transformedDataRow;
    });

    setDataRows(transformedDataRows);
  }, [data]);
  console.log(dataRows);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-3xl mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="flex  justify-between items-center p-3 border-b border-solid border-gray-200 rounded-t">
            <h3 className=" font-semibold">{title}</h3>
            <button
              className="  ml-auto bg-transparent flex items-center justify-center text-center  text-gray-500 float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onClose}
            >
              <span className="bg-transparent flex items-center justify-center text-center text-gray-500 h-6 w-6 text-xl  outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <div className="relative p-6 flex-auto">
            <Table
              headings={Object.keys(headingsToDataKeyMap)}
              dataRows={dataRows}
            />
            <button className="p-1 px-5 rounded-md bg-green-500 text-white font-semibold float-right">Save</button>
          </div>
        
         
        </div>
      </div>
    </div>
  );
};

export default Popup;
