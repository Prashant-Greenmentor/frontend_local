import React, { useEffect, useState } from "react";
import ChartComponent from "./ChartComponents";
import { useDispatch, useSelector } from "react-redux";

import StackedBarChart from "./StackedBarChart";
import PieChart from "./PieChart";

import { generateOptionforSunburst, generatePieChartOptions } from "../Redux/Processdata";
import { SunburstChart } from "./SunBurstChartEmission";

function MainOverAll({ width, height, filterBy ,data,chartDataArray,Options,StackBreakDown}) {
  const [scopes,setScopes]=useState(['Scope 1','Scope 2',"Scope 3"])
  const [currentFinancialYear] = useState(2023); //set current finencial year here
  const [filtredDataByGlobleFilter, setfiltredDataByGlobleFilter] = useState(
    []
  );
  
  

 

  useEffect(() => {
    if (data && data.length > 0) {
      const filteredData = data.filter((entry) => {
        for (let key in filterBy) {
          if (filterBy[key] && entry[key] !== filterBy[key]) {
            return false;
          }
        }
        return true;
      });
      // setScopes([...new Set(filteredData.map(item=>item.module))])
      setfiltredDataByGlobleFilter(filteredData); // filter data according to globle  filter by site , useType and fuel type
    }
  }, [data, filterBy]);

  if (!Array.isArray(data) || data.length === 0) {
    return <div>No data available for Charts</div>;
  }
  return (
    <div className=" px-5">
      <div className="border rounded-md mt-[18px] px-2 py-2  w-full shadow-md">
        <ChartComponent
          height={height}
          width={width}
          BreakDownOptions={Options}
          data={filtredDataByGlobleFilter}
        />
      </div>

      <div className="grid grid-cols-2 gap-2  w-full py-3">
      <div className=" border rounded-md mt-[18px] px-2 py-2  w-full shadow-md">
      <SunburstChart option={generateOptionforSunburst(filtredDataByGlobleFilter,currentFinancialYear)}/>

      </div>
        {chartDataArray.length &&
          chartDataArray
            .map((item,i) =>
              generatePieChartOptions(
                item.title,
                item.dataKey!=="sub_module"?filtredDataByGlobleFilter:filtredDataByGlobleFilter.filter(item=>item.module==scopes[i]),
                item.dataKey,currentFinancialYear
              )
            )
            ?.map((options, index) => (
              <div key={options?.title?.text + index} className=" border rounded-md mt-[18px] px-2 py-2  w-full shadow-md">
                <PieChart  option={options} />
              </div>
            ))}
      </div>

      <div className="border rounded-md mt-[18px] px-2 py-2  w-full shadow-md">
        <StackedBarChart
          currentFinancialYear={currentFinancialYear}
          chartData={filtredDataByGlobleFilter}
          breakDownOptions={StackBreakDown}
        />
      </div>
    </div>
  );
}

export default MainOverAll;
