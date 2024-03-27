// import React from "react";
// import ReactEcharts from "echarts-for-react";

// export function SunburstChart({option}) {


//   return <ReactEcharts option={option} style={{ height: "600px" }} width={"100%"} />
// };

import React, { useEffect } from 'react';
import * as echarts from 'echarts';

export const SunburstChart = ({ option }) => {
  useEffect(() => {
    const chartDom = document.getElementById('sunburst-chart');
    const myChart = echarts.init(chartDom);

    myChart.setOption(option);

    // Clean up function to dispose the chart when the component unmounts
    return () => {
      myChart.dispose();
    };
  }, [option]);

  return <div id="sunburst-chart" style={{ width: '100%', height: '600px' }} />;
};


