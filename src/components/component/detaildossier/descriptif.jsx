
import { useState, useEffect } from 'react';
import {Radio, RadioGroup, FormControl, FormLabel, Stack, Box, IconButton, Heading } from '@chakra-ui/react';
import {Grid, GridItem} from '@chakra-ui/react'
import { TextDescriptifInput } from './descriptif/textDescriptifInput';
import { FcSettings, FcFeedIn } from "react-icons/fc";
import { RessourceRequise } from './descriptif/ressource';



const blanckNature = {'nature': [' '], 'justification':[' '], 'refus':[' '], 'tempsCharge':0, 'tempsTech' :0, 'services':[], 'avancement':0, 'impacts':[], 'isStrategic':true, 'echeance':'', 'notes':'' }

export function Descriptif(props) {

    const [isChecked, setIschecked] = useState(false);
    const [nature, setNature] = useState(blanckNature);
    const [projet, setProjet] = useState({})   

    
    const buttonClick = () => {
        setIschecked(isChecked?false:true)        
        
    }

    const updateNature = (data) => {
        let newNature = {...nature};
        newNature = {...newNature, ...data}
        setNature(newNature);        
        props.updateNature(newNature);        
    }

    const updateStrategic = (value) => {
        let newNature = {...nature};
        let booleanValue = value === 'true'?true:false
        newNature = {...newNature, 'isStrategic':booleanValue}
        setNature(newNature);               
        props.updateNature(newNature); 
    }

    useEffect(() => {

        setNature(!props.projet.nature?blanckNature:{...blanckNature, ...props.projet.nature});
        setProjet(props.projet)
                
    },[props.projet])
    

    return (
        
    <Grid   
        templateRows='1fr 1fr 1fr'
        templateColumns='2fr 2fr 2fr'
        gap='5px'
        >
        <GridItem  gridRow='1 / span 3' gridColumn='1 /span 1'>
            <Box maxW='md' padding='5' borderWidth='2px' borderRadius='lg'  >
                        <Heading size='lg' marginBottom='2'>Description générale <IconButton onClick={buttonClick} variant={isChecked?'solid':'outline'} colorScheme='whiteAlpha' icon={!isChecked?<FcSettings/>:<FcFeedIn/>}/></Heading>
                        
                        <Stack orientation='vertical'>
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='isStrategic' mb='0'>
                                Stratégique?
                            </FormLabel>
                            <RadioGroup onChange={updateStrategic} value={nature?nature.isStrategic:false}>
                            <Stack direction='row'>
                                <Radio value={true}>Oui</Radio>
                                <Radio value={false}>Non</Radio>                            
                            </Stack>
                            </RadioGroup>
                        </FormControl>
                        <TextDescriptifInput titre='nature' detail={nature.nature} updateNature={updateNature} isChecked={isChecked}/>
                        <TextDescriptifInput titre='justification' detail={nature.justification} updateNature={updateNature} isChecked={isChecked}/>
                        <TextDescriptifInput titre='refus' detail={nature.refus} updateNature={updateNature} projet={props.projet} isChecked={isChecked}/>
                        </Stack>
                        
            </Box> 
        </GridItem>

        <GridItem  gridRow='1 / span 3' gridColumn='2 /span 1'>

            <RessourceRequise projet={projet} updateNature={updateNature} />

        </GridItem>

        <GridItem  gridRow='1 / span 3' gridColumn='3 /span 1' justifySelf='end'>
            <Box maxW='md' padding='5' borderWidth='2px' borderRadius='lg' overflow='hidden'>
                <Heading>
                    Localisation (en construction)
                </Heading>
            </Box>
        </GridItem>

    </Grid>
        
        
    )
}



