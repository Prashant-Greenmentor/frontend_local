import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import {
  calculateRenewableEnergyData,
  formatText,
  generateSeriesDataForStackedChart,
  generateStackedChartOptions,
  processStackedChartData,
} from "../Redux/Processdata";

const StackedBarChart = ({
  breakDownOptions,
  currentFinancialYear,
  chartData,
}) => {
  const [typeBreakdown, setTypeBreakdown] = useState("");

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
  const [, setLegendData] = useState([]);
  useEffect(() => {
    setLegendData([]);
  }, [typeBreakdown]);
  const onLegendSelectChanged = (params) => {
    setLegendData(params.selected);
  };
  useEffect(() => {
    updateOptions();
  }, [chartData, typeBreakdown]);

  const updateOptions = () => {
    const processed = processStackedChartData(
      chartData,
      currentFinancialYear,
      typeBreakdown
    ); // get proccesed data
    const renewableEnergyData = calculateRenewableEnergyData(chartData,currentFinancialYear); //for line chart renewable energy chart
    const { series, legends } = generateSeriesDataForStackedChart(processed,renewableEnergyData); //get series and legends data
    const xAxisData = Object.keys(processed);
    const updatedOptions = generateStackedChartOptions(
      chartData,
      currentFinancialYear,
      typeBreakdown,
      legends,
      xAxisData,
      series
    );

    setOptions(updatedOptions);
  };

  const handleTypeBreakdownChange = (e) => {
    setTypeBreakdown(e.target.value);
  };

  return (
    <>
      <div className=" w-full flex justify-end px-3 gap-3 items-center">
        <label htmlFor="breakpoint">Breakdown :</label>
        <select
          name="breakpoint"
          value={typeBreakdown}
          onChange={handleTypeBreakdownChange}
          className=" py-2 px-4 ml-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm "
        >
          <option value="">No Breakdown</option>
          {breakDownOptions.map((option, index) => (
            <option key={`${option}_${index}`} value={option}>
              {formatText(option)}
            </option>
          ))}
        </select>
      </div>
      <ReactECharts
        option={{ ...options }}
        style={{ height: "500px", width: "100%" }}
        // onEvents={{
        //   legendselectchanged: onLegendSelectChanged,
        // }}
        notMerge={true}
  lazyUpdate={true}
      />
    </>
  );
};

export default StackedBarChart;
