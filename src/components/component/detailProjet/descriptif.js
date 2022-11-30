
import { useState, useEffect } from 'react';
import {Radio, RadioGroup, FormControl, FormLabel, Stack, Box, IconButton, Heading } from '@chakra-ui/react';
import { EditTextDescriptif } from './textdescription';
import { FcSettings, FcFeedIn } from "react-icons/fc";



const blanckNature = {'nature': [' '], 'justification':[' '], 'refus':[' '], 'tempsCharge':0, 'tempsTech' :0, 'services':[], 'avancement':0, 'impacts':[], 'isStrategic':false, 'echeance':'', 'notes':[] }

export function Descriptif(props) {

    const [isChecked, setIschecked] = useState(false);
    //const [listDesc, setlistDesc] = useState([]);
    const [nature, setNature] = useState(blanckNature);    

    
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
        //setlisDesc({});
        //setlistDesc(renderListDesc(props.projet.nature));
        //setNature({})
        setNature(!props.projet.nature?blanckNature:{...blanckNature, ...props.projet.nature})
                
    },[props.projet])
    

    return (
        
        
        <Box maxW='md' padding='5' borderWidth='2px' borderRadius='lg' overflow='hidden'>
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
                    <EditTextDescriptif titre='nature' detail={nature.nature} updateNature={updateNature} isChecked={isChecked}/>
                    <EditTextDescriptif titre='justification' detail={nature.justification} updateNature={updateNature} isChecked={isChecked}/>
                    <EditTextDescriptif titre='refus' detail={nature.refus} updateNature={updateNature} projet={props.projet} isChecked={isChecked}/>
                    </Stack>
                    
                   
                                        
                      
        </Box> 
        
        
    )
}



