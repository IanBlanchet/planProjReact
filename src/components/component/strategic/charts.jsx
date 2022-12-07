import React from "react";
import { Chart } from "react-google-charts";

export const xdata = [
  ["ok","Services", "Nombre de projets"],
  [ 1000, 400, 200],
  [ 1170, 460, 250],
  [ 660, 1120, 300],
  [ 1030, 540, 350],
];

export const options = {
  chart: {
    
    
    },
  bars: "horizontal",
  legend: {position:'none'},
  
}

export function BarChart({data}) {


  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
