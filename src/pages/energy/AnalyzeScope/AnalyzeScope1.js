import React, { useEffect, useState } from "react";

import { ReactComponent as FilterMenuIcon } from "../../../app/assets/FilterMenuIcon.svg";
import { ReactComponent as FuelIcon } from "../../../app/assets/FuelIcon.svg";
import Header from "../../../components/common/Header";
import Main from "../../VisualizationFeature/components/Main"
import AnalyzeHeader from "../../../components/Analyze/AnalyzeHeader";

import { 

  useDispatch,
   useSelector } from "react-redux";
import { calculateEnergyUsageChange, calculateRenewableEnergyUsageChange, currentYearLastYearEmissionDetail } from "../../VisualizationFeature/Redux/Processdata";
import Filter from "../../VisualizationFeature/components/Filter";
import { fetchChartDataThunk } from "../../VisualizationFeature/Redux/chartthunk";
function AnalyzeScope1() {
  const dispatch = useDispatch();
  const [StackBreakDown] = useState(["use_type", "fuel_type"]);
  const {useTypeOptions,siteOptions,fuelTypeOptions,data,dataForCurrentYearChange}=useSelector(state=>state.chart)
  const [emissionChange,setEmissonChange]=useState({})
  const [renewableEnergyChange,setrenewableEnergy]=useState({})
  const [EnergyChange,setEnergyChange]=useState({})
  const [chartDataArray] = useState([
    { title: "Current Year Emissions by Use Type", dataKey: "use_type" },
    { title: "Current Year Emissions by Fuel Type", dataKey: "fuel_type" },
    { title: "Current Year Emissions by Site", dataKey: "site" },
    { title: "Current Year Energy Usage", dataKey: "source_type" },
  ]); 
  const [fuelBreakDownOptions] = useState([
    { value: "use_type", label: "Use Type" },
    { value: "site", label: "Site" },
    { value: "fuel_type", label: "Fuel Type" },
  ]);
  const [filterBy, setFilterBy] = useState({
    site: '',
    fuel_type: '',
    use_type: ''
  });
  const handleFilterChange = (name, value) => {
    setFilterBy(prevFilterBy => ({
      ...prevFilterBy,
      [name]: value
    }));
  };
  
  const emissionData = [
    {
      title: "Emissions",
      info: (emissionChange?.currentYear||0)+" Co2e",
      time: "till last quarter",
      status: (emissionChange?.percentageChange||0) >0 ?"positive":"negative",
      per:  `${emissionChange?.percentageChange !== Infinity ? `${Math.abs(emissionChange?.percentageChange)}% YOY${emissionChange?.percentageChange > 0 ? "↑" : "↓"}` : ""}`,
      theme: "red",
    },
    {
      title: "Energy Usage",
      info: EnergyChange?.currentYear+" kWh",
      time: "",
      status: (EnergyChange?.percentageChange||0) >0 ?"positive":"negative",
      per: `${EnergyChange?.percentageChange !== Infinity ? `${Math.abs(EnergyChange?.percentageChange)}% YOY${EnergyChange?.percentageChange > 0 ? "↑" : "↓"}` : ""}`,

      theme: "yellow",
    },
    // {
    //   title: "Emissions intensity",
    //   info: "32",
    //   time: "till last quarter",
    //   status: "positive",
    //   per: "25",
    //   theme: "green",
    // },
  ];
 
  const energyData = [
    {
        status: (renewableEnergyChange?.percentageChange || 0) > 0 ? "positive" : "negative",
        title: "Renewable Energy Use",
        info: `${renewableEnergyChange?.currentYearPercentage !== Infinity ? `${Math.abs(renewableEnergyChange?.currentYearPercentage)}%` : ""}`,
        percentage: `${renewableEnergyChange?.percentageChange !== Infinity ?
           `${Math.abs(renewableEnergyChange?.percentageChange)}% YOY${renewableEnergyChange?.percentageChange > 0 ? "↑" : "↓"}`
            : ""}`
    }
];

useEffect(()=>{
  setEmissonChange(currentYearLastYearEmissionDetail(dataForCurrentYearChange,2023))
  setrenewableEnergy(calculateRenewableEnergyUsageChange(dataForCurrentYearChange,2023))
  setEnergyChange(calculateEnergyUsageChange(dataForCurrentYearChange,2023))
},[data,dataForCurrentYearChange])
useEffect(() => {
  dispatch(fetchChartDataThunk());
}, [dispatch]);
  return (
    <>
     <Header PageIcon={FuelIcon} pageTitle={"Scope 1"} />
      <div className="flex flex-col main-container w-full px-10 py-6">
        <AnalyzeHeader emissionData={emissionData} energyData={energyData} />

        {/* filter */}

        <div className="flex flex-col  rounded-md mt-[18px]  w-full border p-2">
          <div className="flex justify-between py-2 items-center  bg-gray-100 rounded">
            <span className="text-xl px-2">Scope 1</span>
            <div className="flex justify-between items-center gap-2 px-2">
            <FilterMenuIcon className="cursor-pointer" />
            <Filter
                label="Site"
                options={siteOptions}
                selectedValue={filterBy.site}
                onChange={(value) => handleFilterChange('site', value)}
              />
              {/* Fuel filter */}
              <Filter
                label="Fuel Type"
                options={fuelTypeOptions}
                selectedValue={filterBy.fuel_type}
                onChange={(value) => handleFilterChange('fuel_type', value)}
              />
              {/* Use filter */}
              <Filter
                label="Use Type"
                options={useTypeOptions}
                selectedValue={filterBy.use_type}
                onChange={(value) => handleFilterChange('use_type', value)}
              />
            </div>
          </div>
          <div>
            <Main height={"500px"} width={"100%"} filterBy={filterBy} data={data} chartDataArray={chartDataArray} Options={fuelBreakDownOptions} StackBreakDown={StackBreakDown}/>
          </div>
         
         
         
        </div>
      </div>
    
    </>
  );
}

export default AnalyzeScope1;
