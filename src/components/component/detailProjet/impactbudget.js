import { useState, useEffect } from 'react';
import { modJalon } from '../../util';
import { List, ListItem, ListIcon, OrderedList, UnorderedList, Stack, Box, IconButton, Heading } from '@chakra-ui/react';
import { EditTextDescriptif } from './textdescription';
import { FcSettings, FcFeedIn } from "react-icons/fc";


const blanckNature = {'nature': [' '], 'justification':[' '], 'refus':[' '], 'tempsCharge':0, 'tempsTech' :0, 'services':[], 'avancement':0, 'impacts':[], 'isStrategic':false, 'echeance':'', 'notes':[]}

export function Impacts(props) {

    const [isChecked, setIschecked] = useState(false);    
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

    useEffect(() => {
        
        setNature(!props.projet.nature?blanckNature:{...blanckNature,...props.projet.nature})
                
    },[props.projet])
    

    return (
        
        
        <Box maxW='lg' padding='5' borderWidth='2px' borderRadius='lg' overflow='hidden'>
                    <Heading size='lg' marginBottom='2'>Impacts sur le budget de fonctionnement<IconButton onClick={buttonClick} variant={isChecked?'solid':'outline'} colorScheme='whiteAlpha' icon={!isChecked?<FcSettings/>:<FcFeedIn/>}/></Heading>
                    
                    <Stack orientation='vertical'>
                    <EditTextDescriptif titre='impacts' detail={nature.impacts} updateNature={updateNature} isChecked={isChecked}/>
                    
                    
                    </Stack>              
                    
                    
                      
        </Box> 
        
        
    )
}