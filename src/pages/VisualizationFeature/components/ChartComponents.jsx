import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

import {
  generateChartOption,
  processData,
  processDataToLablesAndDataSets,
} from "../Redux/Processdata";

const ChartComponent = ({ height, width, BreakDownOptions, data }) => {
  const [legendData, setLegendData] = useState([]);

  const [options, setOptions] = useState({
    title: {
      text: "Stacked Bar Chart",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: [],
    },
    label: {
      show: true,
      formatter: "{b}",
    },
    xAxis: [
      {
        type: "category",
        data: [],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [],
  });
  const [breakPoint, setBreakPoint] = useState("");
  const [timeInterval, setTimeInterval] = useState("Quarter"); //default
  const handleChartIntervalChange = (event) => {
    setTimeInterval(event.target.value);
  };
  const handleChartBreakPointChange = (event) => {
    setBreakPoint(event.target.value);
  };
  useEffect(() => {
    const proccesedData = processData(data, timeInterval, breakPoint);
    const { xAxisLabels, series } =
      processDataToLablesAndDataSets(proccesedData);
    const option = generateChartOption(
      "Emissions",
      legendData,
      xAxisLabels,
      series
    ); //generate chart options
    setOptions(option);
  }, [breakPoint, timeInterval, data]);

  const onLegendSelectChanged = (params) => {
    setLegendData(params.selected);
  };

  return (
    <>
      <div className=" w-full flex justify-end px-3 gap-3 items-center text-center">
        <label htmlFor="interval">Time Interval :</label>
        <select
          name="interval"
          id="timeInterval"
          className=" py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          value={timeInterval}
          onChange={handleChartIntervalChange}
        >
          <option value="" disabled>
            Select Option
          </option>

          <option value="Quarter">Quarterly</option>
          <option value="Year">Yearly</option>
          <option value="Month">Monthly</option>
        </select>

        <label htmlFor="breakpoint">Breakdown :</label>
        <select
          name="breakpoint"
          id="breakpoint"
          className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          value={breakPoint}
          onChange={handleChartBreakPointChange}
        >
          <option value="">No Breakdown</option>
          {BreakDownOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <ReactECharts
        style={{ height, width }}
        option={options}
        notMerge={true}
  lazyUpdate={true}
        // onEvents={{
        //   legendselectchanged: onLegendSelectChanged,
        // }}
      />
    </>
  );
};

export default ChartComponent;
