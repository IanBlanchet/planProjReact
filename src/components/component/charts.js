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
/*,
[
    "ProjetTest",
    "C_Direction",
    new Date(2022, 2, 7),
    new Date(2022, 2, 8),
  ],
  ["ProjetTest", "Commission", new Date(2022, 2, 14), new Date(2022, 2,15)],
  ["ProjetTest", "Conseil", new Date(2022, 3, 8), new Date(2022, 3, 9)],*/