import React, { useEffect, useState } from 'react'
import Header from '../../../components/common/Header'
import AnalyzeHeader from '../../../components/Analyze/AnalyzeHeader'

import { useDispatch, useSelector } from 'react-redux'
import Filter from '../../Charts(R and D)/components/Filter'
import { ReactComponent as FilterMenuIcon } from "../../../app/assets/FilterMenuIcon.svg";
import { ReactComponent as EmissionIcon } from "../../../app/assets/GreenhouseEffect.svg";
import { fetchChartOverAllDataThunk } from '../../Charts(R and D)/Redux/chartthunk'
import { calculateEnergyUsageChange, calculateRenewableEnergyUsageChange, currentYearLastYearEmissionDetail } from '../../Charts(R and D)/Redux/Processdata'
import MainOverAll from '../../Charts(R and D)/components/MainOverAll'



function Emissions() {
  const dispatch = useDispatch();
    const {siteOptions,overAllData,dataForCurrentYearChange,sub_moduleOptions,moduleOptions}=useSelector(state=>state.chart)
    const [emissionChange,setEmissonChange]=useState({})
    const [renewableEnergyChange,setrenewableEnergy]=useState({})
    const [EnergyChange,setEnergyChange]=useState({})
    const [chartDataArray] = useState([
      { title: "Current Year Emissions by Scope 1", dataKey: "sub_module" },
      { title: "Current Year Emissions by Scope 2", dataKey: "sub_module" },
      { title: "Current Year Emissions by Scope 3", dataKey: "sub_module" },
      { title: "Current Year Emissions by Site", dataKey: "site" },
      { title: "Current Year Energy Usage", dataKey: "source_type" },
    ]);
    const [BreakDownOptions] = useState([
      { value: "module", label: "Module" },
      { value: "site", label: "Site" },
      { value: "sub_module", label: "Sub Module" },
    ]);
    const [StackBreakDown] = useState(["sub_module", "module"]);
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
        // {
        //   title: "Energy Usage",
        //   info: EnergyChange?.currentYear+" kWh",
        //   time: "",
        //   status: (EnergyChange?.percentageChange||0) >0 ?"positive":"negative",
        //   per: `${EnergyChange?.percentageChange !== Infinity ? `${Math.abs(EnergyChange?.percentageChange)}% YOY${EnergyChange?.percentageChange > 0 ? "↑" : "↓"}` : ""}`,
    
        //   theme: "yellow",
        // },
        // {
        //   title: "Total Emissions",
        //   info: "32,456 CO2e",
        //   time: "till last quarter",
        //   status: "positive",
        //   per: "25% ↑",
        //   theme: "green",
        // },
        // {
        //   title: "Emissions intensity",
        //   info: "32 ↑",
        //   time: "till last quarter",
        //   status: "positive",
        //   per: "25",
        //   theme: "green",
        // },
        // {
        //   title: "Scope 1 Emission",
        //   info: "32 ↑",
        //   time: "till last quarter",
        //   status: "positive",
        //   per: "25",
        //   theme: "green",
        // },
        // {
        //   title: "Scope 2 Emission",
        //   info: "32 ↑",
        //   time: "till last quarter",
        //   status: "positive",
        //   per: "25",
        //   theme: "yellow",
        // },
        // {
        //   title: "Scope 3 Emission",
        //   info: "32 ↑",
        //   time: "till last quarter",
        //   status: "positive",
        //   per: "25",
        //   theme: "red",
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
    },[overAllData,dataForCurrentYearChange])
    useEffect(() => {
      dispatch(fetchChartOverAllDataThunk());
    }, [dispatch]);


  return (
    <div>
       <Header PageIcon={EmissionIcon} pageTitle={"Emissions"} />
       <div className="flex flex-col main-container w-full px-10 py-6">
        <AnalyzeHeader emissionData={emissionData} energyData={energyData} />
        <div className="flex flex-col  rounded-md mt-[18px]  w-full border p-2">
          <div className="flex justify-between py-2 items-center  bg-gray-100 rounded">
            <span className="text-xl px-2">OverAll Emission</span>
            <div className="flex justify-between items-center gap-2 px-2">
            <FilterMenuIcon className="cursor-pointer" />
            <Filter
                label="Site"
                options={siteOptions}
                selectedValue={filterBy.site}
                onChange={(value) => handleFilterChange('site', value)}
              />
             
              <Filter
                label="Module"
                options={moduleOptions}
                selectedValue={filterBy.module}
                onChange={(value) => handleFilterChange('module', value)}
              />
              <Filter
                label="Sub Module"
                options={sub_moduleOptions}
                selectedValue={filterBy.sub_module}
                onChange={(value) => handleFilterChange('sub_module', value)}
              />
             
            </div>
          </div>
          <div>
            <MainOverAll height={"500px"} width={"100%"} filterBy={filterBy} data={overAllData} chartDataArray={chartDataArray} Options={BreakDownOptions} StackBreakDown={StackBreakDown}/>
            
          </div>
         
         
        </div>
        </div>
    </div>
  )
}

export default Emissions
