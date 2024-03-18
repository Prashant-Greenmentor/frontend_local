import React from "react";
import ReactEcharts from "echarts-for-react";

export function SunburstChart({option}) {


  return <ReactEcharts option={option} style={{ height: "400px" }} />
};