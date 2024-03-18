import React from 'react'
import {ReactComponent as DownloadIcon} from "../../../app/assets/DownloadIcon.svg";
import {ReactComponent as QuestionMark} from "../../../app/assets/QuestionMark.svg";

function TableElectricityMeta({ totalCount }) {
  
  return (
    <>
    <div className="flex flex-row w-full h-12 justify-between items-center px-2">
      <div className="flex flex-row justify-start items-center">
       <span>Electricity</span><span className='px-2'><QuestionMark/></span>
      </div>
      <div className="flex flex-row justify-end items-center">
        <div className="flex flex-row justify-center items-center h-8 text-green-600 mr-2">
          <span className="text-xs border-r pr-2 border-gray-400 ">
            {totalCount} Entries
          </span>
        </div>
        <div className="flex flex-row justify-center items-center w-28 h-8 cursor-pointer border border-green-600 rounded-md text-green-600 hover:bg-green-600 hover:text-white mr-2">
          <span className="mr-2">
            <DownloadIcon className="colored-svg w-6 h-6" />
          </span>
          <span className="text-xs">Download</span>
        </div>
      </div>
    </div>
  </>
  )
}

export default TableElectricityMeta
