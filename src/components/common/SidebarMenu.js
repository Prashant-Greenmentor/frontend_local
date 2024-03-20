
import {ReactComponent as LockIcon} from "../../app/assets/LockIcon.svg"
import {ReactComponent as LogoIcon} from "../../app/assets/Logo.svg"
import {ReactComponent as SettingsIcon} from "../../app/assets/SettingIconWhite.svg"
import {ReactComponent as EnergyIcon} from "../../app/assets/EnergyIcon.svg"
import {ReactComponent as FuelIcon} from "../../app/assets/FuelIcon.svg"
import {ReactComponent as ElectricityIcon} from "../../app/assets/ElectricityIcon.svg"
import {ReactComponent as Emissions} from "../../app/assets/GreenhouseEffect.svg"
import {ReactComponent as DownArrow} from "../../app/assets/DownArrow.svg"

import { ReactComponent as BRSRIcon } from "../../app/assets/BRSRIcon.svg";
import { useState } from "react";
const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the menu open and close
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
    return (
      <>
        <aside
          style={{ background: "var(--Neutral-900, #181818)", scrollbarWidth: 'none', /* For Firefox */
      WebkitScrollbar: { 
        width: 0, 
        background: 'transparent' 
      }  }}
          className="flex flex-col w-full h-screen bg-black text-white overflow-y-auto"
        >
          {/* Sidebar Items */}
          <a
            href="/"
            className="flex gap-2 items-center py-4 px-6 text-xs hover:bg-green-500"
          >
            <LogoIcon />
          </a>
          <span className="flex gap-2 items-center py-2 px-6  text-xs text-white font-bold ">DATA INPUT</span>
       <span
       onClick={toggleMenu}
            className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-green-500 cursor-pointer"
          >
            <EnergyIcon className="w-6 h-6" />
            Energy <DownArrow className={`ml-3 ${isOpen?'transform rotate-180':'transform rotate-0'} transition-all duration-300 ease-in-ou` }/>
          </span> 
          {isOpen && (
        <div className="">
          <a
            href="/energy/fuel"
            className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-green-500 transition-all duration-300 ease-in-out"
          >
            <FuelIcon className="w-6 h-6" />
            
            Fuel 
          </a>
          <a
            href="/energy/electricity"
            className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-green-500"
          >
<ElectricityIcon className="w-6 h-6" /> 
            Electricity <LockIcon className="ml-6"/>
          </a>
          </div>)}
          <a
            href="/energy/scope3"
            className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-green-500"
          >
            {/* <ElectricityIcon className="w-6 h-6" /> */}
            <span className="w-3 h-3 p-1 rounded-sm text-black bg-white flex flex-shrink-0 justify-center items-center">3</span>
            Scope 3 <LockIcon className="ml-6"/>
          </a>
          <hr className="opacity-50"/>
         
          <span className="flex gap-2 items-center py-[11px] px-6  text-xs text-white font-bold">ANALYZE</span>
          <div >
          <a
            href="/energy/emissions"
            className="flex gap-2 items-center py-4  px-6  text-xs hover:bg-green-500"
          >
            <Emissions className="w-6 h-6" />
            Emissions
          </a> 
          <a
            href="/energy/fuelAnalyze/scope1"
            className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-green-500"
          >
           
            <span className="w-3 h-3 p-1 rounded-sm text-black bg-white flex flex-shrink-0 justify-center items-center">1</span>
           Scope 1
          </a>
          <a
            href="/energy/fuelAnalyze/scope2"
            className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-green-500"
            aria-disabled
          >
         
            <span className="w-3 h-3 p-1 rounded-sm text-black bg-white flex flex-shrink-0 justify-center items-center">2</span>
           Scope 2 <LockIcon className="ml-6"/>
          </a>
          <a
           aria-disabled
            href="/energy/fuelAnalyze/scope3"
            className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-green-500"
          >
           
            <span className="w-3 h-3 p-1 rounded-sm text-black bg-white flex flex-shrink-0 justify-center items-center">3</span>
           Scope 3 <LockIcon className="ml-6"/>
          </a>
          
          </div>
          <hr className="opacity-50"/>
         
         
          
          <hr className="opacity-50"/>
         
          <span className="flex gap-2 items-center py-[11px] px-6  text-xs text-white font-bold">REPORT</span>
          <div >
          {/* <span
            className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-green-500"
          >
            <EnergyIcon className="w-6 h-6" />
            Energy
          </span> */}
          <a
            href="/BRSR"
            className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-green-500"
          >
            <BRSRIcon className="w-6 h-6" />
      
           BRSR
          </a>
          {/* <a
            href="/energy/fuelAnalyze"
            className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-green-500"
          >
            <FuelIcon className="w-6 h-6" />
            Fuel
          </a> */}
          </div>
          <hr className="opacity-50"/>
         
       
          <div >
         
          <a
            href="/reduce"
            className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-green-500 font-bold"
          >
           
      
            REDUCE
          </a>
       
          </div>
          <hr className="opacity-50"/>
         
       
          <div >
         
          <a
            href="/offset"
            className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-green-500 font-bold"
          >
           
      
            OFFSET
          </a>
       
          </div>
          <hr className="opacity-50"/>
       
          <div className="cursor-not-allowed">
          <a
            href="/settings"
            className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-green-500"
          >
            <SettingsIcon className="w-6 h-6" />
            Settings
          </a>
          </div>
          <a target="_blank" href="https://alvo.chat/3Hl2" className=" text-white bg-green-500 rounded text-center p-3 mx-3 m-1">
          <button className=" text-white bg-green-500 rounded text-center">Help Center</button>
          </a>
        </aside>
      </>
    );
}

export default SidebarMenu;