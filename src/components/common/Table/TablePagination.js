import React, { useState, useRef } from "react";
import { ReactComponent as CaretIcon } from "../../../app/assets/CaretIcon.svg";

const TablePagination = ({ paginationObject }) => {
  const tableDefaults = {
    paginationEnabled: false,
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    handleItemsPerPage: null,
    handlePageChange: null,
  };

  const [paginationConfig] = useState({ ...tableDefaults, ...paginationObject });

  const [disabledNext] = useState( ((parseInt(paginationConfig.currentPage) + 1) > parseInt(paginationConfig.totalPages)) );
  const [disabledPrev] = useState( ((parseInt(paginationConfig.currentPage) - 1) < 1) );

  const {
    currentPage,
    itemsPerPage,
    handleItemsPerPage,
    handlePageChange,
  } = paginationConfig;
  const [selectedOption, setSelectedOption] = useState(
    itemsPerPage ? itemsPerPage : 10
  );

  const selectRef = useRef(null);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    handleItemsPerPage(event.target.value);
  };

  const handlePageNavigation = (event, direction) => {
    if(direction === 'next') {
      let nextPage = parseInt(paginationConfig.currentPage) + 1;
      if(nextPage <= paginationConfig.totalPages && nextPage < currentPage) {
        handlePageChange(nextPage);
      }
    } else {
      let prevPage = parseInt(paginationConfig.currentPage) - 1;
      if (prevPage > 0 && prevPage < currentPage) {
        handlePageChange(prevPage);
      }
    }
  }

  if (paginationConfig && paginationConfig?.paginationEnabled) {
    return (
      <div className="flex flex-row justify-end items-center px-4  border-t border-gray-300 text-xs  h-12">
        <div className="flex flex-row items-center justify-center mr-2 my-2 border-r border-gray-300">
          <span className="px-4">Show</span>
          <div className="relative inline-block border border-green-300 rounded-md px-2 py-1 cursor-pointer">
            <span className="px-2 border-r border-gray-300 mr-2">
              {selectedOption} rows
            </span>
            <select
              className="absolute opacity-0 w-full left-0"
              value={selectedOption}
              onChange={handleSelectChange}
              ref={selectRef}
            >
              <option value={10}>10 rows</option>
              <option value={20}>20 rows</option>
              <option value={30}>30 rows</option>
              <option value={40}>40 rows</option>
              <option value={50}>50 rows</option>
            </select>
            <CaretIcon />
          </div>
          <span className="mx-2">per page</span>
        </div>
        <div className="flex flex-row items-center justify-center mr-6">
          <div className="flex flex-row border border-green-300 rounded-md mr-2 my-2  px-2 py-1 cursor-pointer w-auto">
            <span className="px-1 border-r border-gray-300 mr-2">
              <CaretIcon
                className={`transform rotate-90 w-4 h-4`}
                disabled={disabledPrev}
                onClick={(e) => handlePageNavigation(e, "prev")}
              />
            </span>
            <span className="flex flex-row text-xs px-2 border-r border-gray-300 mr-2">
              Pg&nbsp;{paginationConfig.currentPage}/
              {paginationConfig.totalPages}
            </span>
            <span className="px-1">
              <CaretIcon
                className={`transform -rotate-90 w-4 h-4`}
                disabled={disabledNext}
                onClick={(e) => handlePageNavigation(e, "next")}
              />
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default TablePagination;
