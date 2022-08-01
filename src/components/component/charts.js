import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { FcUp, FcDown } from "react-icons/fc";
import { IconButton, Box, Stack } from '@chakra-ui/react'

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

const blanckNature = {'nature': [' '], 'justification':[' '], 'refus':[' '], 'tempsCharge':0, 'tempsTech' :0, 'services':[], 'avancement':0}

export function GaugeChart(props) {
 
  
  const [nature, setNature] = useState(blanckNature)
  

  const handleClickUp = () => {
    let newAvancement = 0
    
    newAvancement = nature.avancement +5    
    let newNature = {...nature};    
    newNature.avancement = newAvancement
    setNature(newNature)
    props.updateNature(newNature)        
  }

  const handleClickDown = () => {
    let newAvancement = 0
    
    newAvancement = nature.avancement -5    
    let newNature = {...nature};    
    newNature.avancement = newAvancement
    setNature(newNature)
    props.updateNature(newNature)  
    
  }

  useEffect(() => {
      !props.projet.nature?setNature(blanckNature):
      setNature({...blanckNature,...props.projet.nature});
      return () => {
        setNature(blanckNature);
    }
  }, [props.projet])

  return (
    <Box>
    <Box >
    <IconButton aria-label='avance' icon={<FcUp />} id='up' onClick={handleClickUp} />
    <IconButton aria-label='recule' icon={<FcDown />} id='down' onClick={handleClickDown} />
    </Box>
    <Box >
    <Chart
      chartType="Gauge"
      width="80px"
      height="80px"
      data={[["Label", "Value"], ["avancement",nature.avancement]]}
      options={optionsGauge}
         
    />
    </Box>
    </Box>
    
  );
}
