import React from "react";
import ReactECharts from "echarts-for-react";


const PieChart = ({ option}) => {

  

  return (
    <ReactECharts
      option={option}
      style={{ height: "400px", width: "100%" }}
      opts={{ renderer: "canvas" }}
    />
  );
};

export default PieChart;
