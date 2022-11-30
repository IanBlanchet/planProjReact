import React, { useEffect, useState } from "react";
import GaugeChart from 'react-gauge-chart'
import { Box, Grid, GridItem, Heading, IconButton } from "@chakra-ui/react";
import { FcUp, FcDown } from "react-icons/fc";


const blanckNature = {'nature': [' '], 'justification':[' '], 'refus':[' '], 'tempsCharge':0, 'tempsTech' :0, 'services':[], 'avancement':0, 'impacts':[], 'isStrategic':false, 'echeance':'', 'notes':[]}

export function GaugeChartSimple(props) {
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
      <Box maxW='md' padding='5' borderWidth='2px' borderRadius='lg' overflow='hidden'>
      <Grid templateRows='(1fr, 1fr, 3fr)' templateColumns='1fr' gap={0} justifyItems='center'>
      <GridItem>
        <Heading size='lg' marginBottom='2'>Avancement</Heading>
      </GridItem>
      <GridItem position='center'>
      <IconButton aria-label='avance' icon={<FcUp />} id='up' onClick={handleClickUp} />
      <IconButton aria-label='recule' icon={<FcDown />} id='down' onClick={handleClickDown} />
      </GridItem>
      <GridItem>
      <GaugeChart       
        id={`uph-chart`}
        nrOfLevels={20}
        hideText={false}
        animate={false}
        percent={(nature.avancement)/100}
        textColor='blue.500'
        colors={['#2185d0', '#21ba45']}
           
      />
      </GridItem>
      </Grid>
      </Box>
      
    );
  }
