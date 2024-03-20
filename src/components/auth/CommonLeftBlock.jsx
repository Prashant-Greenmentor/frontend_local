import React from "react";
import { ReactComponent as SEBIlogo } from "../../app/assets/SEBIlogo.svg";
import { ReactComponent as DataBaseLogo } from "../../app/assets/DataBaseLogo.svg";
import { ReactComponent as GoldLogo } from "../../app/assets/GoldStanderdLogo.svg";
// import { ReactComponent as TSFClogo } from "../../app/assets/TCFDlogo.svg";
import TSFClogo  from "../../app/assets/Tcfd.png";
import GRILogo  from "../../app/assets/GRILogo.png";
import GreenHouseGasProtocol  from "../../app/assets/GreenHouseGasProtocol.png";
import GoldStanderdLogo  from "../../app/assets/GoldStanderdLogo.png";

function CommonLeftBlock() {
  return (
    <div className="bg-[#02AB6C] w-full h-screen ">
      <div className="flex w-full text-left  flex-col">
      <h1 className="text-4xl lg:text-7xl text-white p-4 lg:p-10 text- float-left">LongSight</h1>

        <p className="flex flex-wrap text-start px-10 text-white font-extrabold text-xl">
          More than 100 clients trust us 
          <br />with their climate and ESG strategy.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-5 p-10">
          <SEBIlogo />
          <img src={GRILogo} alt="GRILogo"/>
          <img src={GreenHouseGasProtocol} alt="greenhousegasProtocol"/>
          <img src={GoldStanderdLogo} alt="GoldStanderdLogo"/>
          <img src={TSFClogo} alt="tsfc"  height="auto"/>
          
        </div>
      </div>
    </div>
  );
}

export default CommonLeftBlock;
