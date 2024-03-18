import React, { useState } from 'react'
import FileUpload from './FileUpload'
import Header from '../../../components/common/Header'
import {ReactComponent as SettingsIcon} from "../../../app/assets/SettingsIcon.svg"
import {ReactComponent as BuildingIcon} from "../../../app/assets/BuildingIcon.svg"
import {ReactComponent as DashboardIcon} from "../../../app/assets/DashboardIcon.svg"
import {ReactComponent as RequestPanelIcon} from "../../../app/assets/RequestPanelIcon.svg"
function Main() {
  const [activeTab,setActiveTab]=useState("")

  const randerActiveTab=(tabName)=>{
       switch (tabName) {
        case "Company Profile":
           return <p>Compant Profile</p>;
        
        case "Admin Dashboard":
          return <p>Admin dashboard</p>
        
        case "Request Panel":
          return <p>Request Panel</p>
        
        case "Upload Masters":
         return  <FileUpload/>
        
       
        default:
          break;
       }
  }
  return (
    <div>
    <Header PageIcon={SettingsIcon} pageTitle={"Settings"} />
    <div className="flex flex-row w-full h-12 justify-between items-center px-2">
        <div className="flex flex-row justify-start items-center">
          <div
            className={`flex flex-row justify-center items-center w-48 h-8 cursor-pointer border border-green-600 rounded-md mr-4 ${
              activeTab === "Company Profile"
                ? "bg-green-600 text-white"
                : "bg-white text-green-600"
            }`}
            onClick={() => setActiveTab("Company Profile")}
          >
            <span className="mr-4">
              <BuildingIcon fill='white' color='white' className="colored-svg w-4 h-4" />
            </span>
            <span className="text-xs">Company Profile</span>
          </div>
          <div
            className={`flex flex-row justify-center items-center w-48 h-8 cursor-pointer border border-green-600 rounded-md mr-4 ${
              activeTab === "Admin Dashboard"
                ? "bg-green-600 text-white"
                : "bg-white text-green-600"
            }`}
            onClick={() => setActiveTab("Admin Dashboard")}
          >
            <span className="mr-4">
              <DashboardIcon fill='white' className="w-4 h-4" />
            </span>
            <span className="text-xs">Admin Dashboard</span>
          </div>
          <div
            className={`flex flex-row justify-center items-center w-48 h-8 cursor-pointer border border-green-600 rounded-md mr-4 ${
              activeTab === "Request Panel"
                ? "bg-green-600 text-white"
                : "bg-white text-green-600"
            }`}
            onClick={() => setActiveTab("Request Panel")}
          >
            <span className="mr-4">
              <RequestPanelIcon fill='white' className="w-4 h-4" />
            </span>
            <span className="text-xs">Request Panel</span>
          </div>
          <div
            className={`flex flex-row justify-center items-center w-48 h-8 cursor-pointer border border-green-600 rounded-md mr-4 ${
              activeTab === "Upload Masters"
                ? "bg-green-600 text-white"
                : "bg-white text-green-600"
            }`}
            onClick={() => setActiveTab("Upload Masters")}
          >
            <span className="mr-4">
              <RequestPanelIcon fill='white' className="w-4 h-4" />
            </span>
            <span className="text-xs">Upload Masters</span>
          </div>
        </div>
        
      </div>
      <div>
        {randerActiveTab(activeTab)}
      </div>
    </div>
  )
}

export default Main
