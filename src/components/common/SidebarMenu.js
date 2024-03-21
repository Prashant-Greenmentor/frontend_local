import { ReactComponent as LockIcon } from "../../app/assets/LockIcon.svg";
import { ReactComponent as LogoIcon } from "../../app/assets/Logo.svg";
import { ReactComponent as SettingsIcon } from "../../app/assets/SettingIconWhite.svg";
import { ReactComponent as EnergyIcon } from "../../app/assets/EnergyIcon.svg";
import { ReactComponent as FuelIcon } from "../../app/assets/FuelIcon.svg";
import { ReactComponent as ElectricityIcon } from "../../app/assets/ElectricityIcon.svg";
import { ReactComponent as Emissions } from "../../app/assets/GreenhouseEffect.svg";
import { ReactComponent as DownArrow } from "../../app/assets/DownArrow.svg";

import { ReactComponent as BRSRIcon } from "../../app/assets/BRSRIcon.svg";
import { useState } from "react";
import { NavLink } from "react-router-dom";
const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the menu open and close
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <aside
        style={{
          background: "var(--Neutral-900, #181818)",
          scrollbarWidth: "none" /* For Firefox */,
          WebkitScrollbar: {
            width: 0,
            background: "transparent",
          },
        }}
        className="flex flex-col w-full h-screen bg-black text-white overflow-y-auto"
      >
        {/* Sidebar Items */}
        <NavLink
          to="/"
          className="flex gap-2 items-center py-4 px-6 text-xs hover:bg-[#02AB6C]"
        >
          <LogoIcon />
        </NavLink>
        <span className="flex gap-2 items-center py-2 px-6  text-xs text-white font-bold ">
          DATA INPUT
        </span>
        <span
          onClick={toggleMenu}
          className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-[#02AB6C] cursor-pointer"
        >
          <EnergyIcon className="w-6 h-6" />
          Energy{" "}
          <DownArrow
            className={`ml-3 ${
              isOpen ? "transform rotate-180" : "transform rotate-0"
            } transition-all duration-300 ease-in-ou`}
          />
        </span>
        {isOpen && (
          <div className="">
            <NavLink
              to="/energy/fuel"
              className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-[#02AB6C] transition-all duration-300 ease-in-out"
              style={function({ isActive, isPending, isTransitioning }){
                if(isActive){
                  setIsOpen(true)
                }
                return {
                  background: isActive ? "#02AB6C" : "",
                 
                };
              }}
            >
              <FuelIcon className="w-6 h-6" />
              Fuel
            </NavLink>
            <NavLink
              to="/energy/electricity"
              className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-[#02AB6C]"
              style={function({ isActive, isPending, isTransitioning }){
                if(isActive){
                  setIsOpen(true)
                }
                return {
                  background: isActive ? "#02AB6C" : "",
                 
                };
              }}
            >
              <ElectricityIcon className="w-6 h-6" />
              Electricity <LockIcon className="ml-6" />
            </NavLink>
          </div>
        )}
        <NavLink
         style={function({ isActive, isPending, isTransitioning }){
                return {
                  background: isActive ? "#02AB6C" : "",
                 
                };
              }}
          to="/energy/scope3"
          className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-[#02AB6C]"
        >
          {/* <ElectricityIcon className="w-6 h-6" /> */}
          <span className="w-3 h-3 p-1 rounded-sm text-black bg-white flex flex-shrink-0 justify-center items-center">
            3
          </span>
          Scope 3 <LockIcon className="ml-6" />
        </NavLink>
        <hr className="opacity-50" />

        <span className="flex gap-2 items-center py-[11px] px-6  text-xs text-white font-bold">
          ANALYZE
        </span>
        <div>
          <NavLink
          style={function({ isActive, isPending, isTransitioning }){
                return {
                  background: isActive ? "#02AB6C" : "",
                 
                };
              }}
            to="/energy/emissions"
            className="flex gap-2 items-center py-4  px-6  text-xs hover:bg-[#02AB6C]"
          >
            <Emissions className="w-6 h-6" />
            Emissions
          </NavLink>
          <NavLink
          style={function({ isActive, isPending, isTransitioning }){
                return {
                  background: isActive ? "#02AB6C" : "",
                 
                };
              }}
            to="/energy/fuelAnalyze/scope1"
            className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-[#02AB6C]"
          >
            <span className="w-3 h-3 p-1 rounded-sm text-black bg-white flex flex-shrink-0 justify-center items-center">
              1
            </span>
            Scope 1
          </NavLink>
          <NavLink
          style={function({ isActive, isPending, isTransitioning }){
                return {
                  background: isActive ? "#02AB6C" : "",
                 
                };
              }}
            to="/energy/fuelAnalyze/scope2"
            className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-[#02AB6C]"
            aria-disabled
          >
            <span className="w-3 h-3 p-1 rounded-sm text-black bg-white flex flex-shrink-0 justify-center items-center">
              2
            </span>
            Scope 2 <LockIcon className="ml-6" />
          </NavLink>
          <NavLink
          style={function({ isActive, isPending, isTransitioning }){
                return {
                  background: isActive ? "#02AB6C" : "",
                 
                };
              }}
            aria-disabled
            to="/energy/fuelAnalyze/scope3"
            className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-[#02AB6C]"
          >
            <span className="w-3 h-3 p-1 rounded-sm text-black bg-white flex flex-shrink-0 justify-center items-center">
              3
            </span>
            Scope 3 <LockIcon className="ml-6" />
          </NavLink>
        </div>
        <hr className="opacity-50" />

        <hr className="opacity-50" />

        <span className="flex gap-2 items-center py-[11px] px-6  text-xs text-white font-bold">
          REPORT
        </span>
        <div>
          {/* <span
            className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-[#02AB6C]"
          >
            <EnergyIcon className="w-6 h-6" />
            Energy
          </span> */}
          <NavLink
          style={function({ isActive, isPending, isTransitioning }){
                return {
                  background: isActive ? "#02AB6C" : "",
                 
                };
              }}
            to="/BRSR"
            className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-[#02AB6C]"
          >
            <BRSRIcon className="w-6 h-6" />
            BRSR
          </NavLink>
          {/* <a
            href="/energy/fuelAnalyze"
            className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-[#02AB6C]"
          >
            <FuelIcon className="w-6 h-6" />
            Fuel
          </a> */}
        </div>
        <hr className="opacity-50" />

        <div>
          <NavLink
          style={function({ isActive, isPending, isTransitioning }){
                return {
                  background: isActive ? "#02AB6C" : "",
                 
                };
              }}
            to="/reduce"
            className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-[#02AB6C] font-bold"
          >
            REDUCE
          </NavLink>
        </div>
        <hr className="opacity-50" />

        <div>
          <NavLink
          style={function({ isActive, isPending, isTransitioning }){
                return {
                  background: isActive ? "#02AB6C" : "",
                 
                };
              }}
            to="/offset"
            className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-[#02AB6C] font-bold"
          >
            OFFSET
          </NavLink>
        </div>
        <hr className="opacity-50" />

        <div className="cursor-not-allowed">
          <NavLink
          style={function({ isActive, isPending, isTransitioning }){
                return {
                  background: isActive ? "#02AB6C" : "",
                 
                };
              }}
            to="/settings"
            className="flex gap-2 items-center py-4 px-6  text-xs hover:bg-[#02AB6C]"
          >
            <SettingsIcon className="w-6 h-6" />
            Settings
          </NavLink>
        </div>
        <a
          target="_blank"
          href="https://alvo.chat/3Hl2"
          className=" text-white bg-[#02AB6C] rounded text-center p-3 mx-3 m-1"
        >
          <button className=" text-white bg-[#02AB6C] rounded text-center">
            Help Center
          </button>
        </a>
      </aside>
    </>
  );
};

export default SidebarMenu;
