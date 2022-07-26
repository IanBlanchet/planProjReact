import React from "react";
import { Chart } from "react-google-charts";


export const data = [
    [
      { type: "string", id: "Projet" },
      { type: "string", id: "Name" },
      { type:"string", role:"tooltip", 'p': {'html': true}},
      { type: "date", id: "Start" },
      { type: "date", id: "End" },
    ]
  ];




export const options = {
    timeline: {
      title: 'jalon timeline',
      groupByRowLabel: true,
      alternatingRowStyle:true,
      focusTarget: 'category',
      allowHtml: true,
      tooltip: {isHtml: true}
       

    },
  };




export function TimelineChart(props) {
    return (
    <Chart
      chartType="Timeline"
      width="100%"
      height="400px"
      data={[...data, ...props.newData]}
      options={options}
    />
    );
}




const dataGauge = [
    ["Label", "Value"]    
    
  ];


export const optionsGauge = {
  width: 300,
  height: 200,
  redFrom: 0,
  redTo: 20,
  yellowFrom: 20,
  yellowTo: 50,
  greenFrom:50,
  greenTo:100,
  minorTicks: 5,
};

export function GaugeChart(props) {
 

  return (
    <Chart
      chartType="Gauge"
      width="100%"
      height="400px"
      data={props.data}
      options={optionsGauge}
    />
  );
}
