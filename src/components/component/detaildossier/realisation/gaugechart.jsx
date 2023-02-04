import React, { useEffect, useState, useContext } from "react";
import GaugeChart from 'react-gauge-chart'
import { Box, Grid, GridItem, Heading, IconButton, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { FcUp, FcDown } from "react-icons/fc";
import { BaseDataContext } from '../../../../auth';



export function GaugeChartSimple(props) {
    
    const {blanckNature} = useContext(BaseDataContext)
    const [nature, setNature] = useState(props.projet.nature)
    

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

    const updateEcheance = ({target}) => {
      let newNature = {...nature};    
      newNature.echeance = target.value
      setNature(newNature)
      props.updateNature(newNature)        
    }
    

    
    

    useEffect(() => {
          setNature(props.projet.nature)
        
    }, [props])
  
    return (
      <Box maxW='md' padding='5' borderWidth='2px' borderRadius='lg' boxShadow='md' >  
      <Grid templateRows='(1fr, 1fr, 4fr, 1fr)' templateColumns='1fr' gap='1px' justifyItems='center'>
      <GridItem gridRow='1 / span 1'>
        <Heading size='lg' marginBottom='2'>Avancement</Heading>
      </GridItem>
      <GridItem gridRow='2 / span 1' position='center'>
      <IconButton aria-label='avance' icon={<FcUp />} id='up' onClick={handleClickUp} />
      <IconButton aria-label='recule' icon={<FcDown />} id='down' onClick={handleClickDown} />
      </GridItem>
      <GridItem gridRow='3 / span 1'>
      <GaugeChart       
        id={(props.projet.id).toString()}
        nrOfLevels={20}
        hideText={false}
        animate={false}
        percent={nature.avancement/100}
        textColor='blue.500'
        colors={['#2185d0', '#21ba45']}
        
           
      />
      </GridItem>
      <GridItem gridRow='4 / span 1'>
        <FormControl display='flex' alignItems='center'>
          <FormLabel htmlFor='echeance' mb='0'>Échéance</FormLabel>
          <Input type='date' name='echeance' value={nature.echeance} onChange={updateEcheance} onKeyDown={(e) => e.preventDefault()}></Input>
        </FormControl>
      </GridItem>
      </Grid>
      </Box>
      
    );
  }
