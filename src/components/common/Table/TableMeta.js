import {ReactComponent as KeyBoadrdIcon} from "../../../app/assets/KeyboardIcon.svg";
import {ReactComponent as ApiIcon} from "../../../app/assets/ApiIntegrationIcon.svg";
import {ReactComponent as TrendLineIcon} from "../../../app/assets/TrendLineIcon.svg";
import {ReactComponent as DownloadIcon} from "../../../app/assets/DownloadIcon.svg";
import { downloadFileThunk } from "../../../features/common/commonThunk";
import { useDispatch } from "react-redux";
import filetoSave from "./savedFile.csv"
const TableMeta = ({
  recordType,
  totalCount,
  openPopUpForm,
  switchTab,
  selectedTab,
}) => {
  const dispatch=useDispatch()
  const handleFileDownload = (filePath) => {
    const link = document.createElement('a');
    link.href = filetoSave;
    link.download = 'filename.csv'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
   
  };
  return (
    <>
      <div className="flex flex-row w-full h-12 justify-between items-center px-2">
        <div className="flex flex-row justify-start items-center">
          <div
            className={`flex flex-row justify-center items-center w-48 h-8 cursor-pointer border border-green-600 rounded-md mr-4 ${
              selectedTab === 1
                ? "bg-green-600 text-white"
                : "bg-white text-green-600"
            }`}
            onClick={() => switchTab(1)}
          >
            <span className="mr-4">
              <KeyBoadrdIcon className="colored-svg w-4 h-4" />
            </span>
            <span className="text-xs">Manual Entry</span>
          </div>
          <div
            className={`flex flex-row justify-center items-center w-48 h-8 cursor-pointer border border-green-600 rounded-md mr-4 ${
              selectedTab === 2
                ? "bg-green-600 text-white"
                : "bg-white text-green-600"
            }`}
            onClick={() => switchTab(2)}
          >
            <span className="mr-4">
              <ApiIcon className="w-4 h-4" />
            </span>
            <span className="text-xs">API Integration</span>
          </div>
          <div
            className={`flex flex-row justify-center items-center w-48 h-8 cursor-pointer border border-green-600 rounded-md mr-4 ${
              selectedTab === 3
                ? "bg-green-600 text-white"
                : "bg-white text-green-600"
            }`}
            onClick={() => switchTab(3)}
          >
            <span className="mr-4">
              <TrendLineIcon className="w-4 h-4" />
            </span>
            <span className="text-xs">Trend Line</span>
          </div>
        </div>
        <div className="flex flex-row justify-end items-center">
          <div className="flex flex-row justify-center items-center h-8 text-green-600 mr-2">
            <span className="text-xs border-r pr-2 border-gray-400 ">
              {totalCount} Entries
            </span>
          </div>
          <a href="./savedFile.csv" download >

          <div onClick={()=>handleFileDownload("./savedFile.csv")} className="flex flex-row justify-center items-center w-28 h-8 cursor-pointer border border-green-600 rounded-md text-green-600 hover:bg-green-600 hover:text-white mr-2">
          

            <span className="mr-2">
              <DownloadIcon className="colored-svg w-6 h-6" />
            </span>
            <span className="text-xs">Download</span>
           
          </div> 

          </a>
        </div>
      </div>
    </>
  );
};

export default TableMeta;