import React from "react";
import ReactECharts from "echarts-for-react";


const PieChart = ({ option}) => {

  

  return (
    <ReactECharts
      option={option}
      style={{ height: "400px", width: "100%" }}
      opts={{ renderer: "canvas" }}
      notMerge={true}
  lazyUpdate={true}
    />
  );
};

export default PieChart;



// import React, { useEffect } from "react";
// import * as echarts from "echarts";

// const PieChart = ({ option }) => {
//   useEffect(() => {
//     const chartDom = document.getElementById("pie-chart");
//     const myChart = echarts.init(chartDom);

//     myChart.setOption(option);

//     // Clean up function to dispose the chart when the component unmounts
//     return () => {
//       myChart.dispose();
//     };
//   }, [option]);

//   return <div id="pie-chart" style={{ width: '100%', height: '400px' }} />;
// };

// export default PieChart;
