import { useState, useEffect } from 'react';
import { modJalon } from '../../util';
import { List, ListItem, ListIcon, OrderedList, UnorderedList, Stack, Box, IconButton, Heading } from '@chakra-ui/react';
import { EditTextDescriptif } from './textdescription';
import { FcSettings, FcFeedIn } from "react-icons/fc";

const blanckNature = {'nature': [' '], 'justification':[' '], 'refus':[' '], 'tempsCharge':0, 'tempsTech' :0, 'services':[], 'avancement':0, 'impacts':[]}

export function Impacts(props) {

    const [isChecked, setIschecked] = useState(false);
    const [listDesc, setlistDesc] = useState([]);
    const [nature, setNature] = useState(blanckNature);    

    
    const buttonClick = () => {
        setIschecked(isChecked?false:true)
        //setlisDesc(renderListDesc(nature));
        props.updateProjet(props.projet.id);
        
    }

    const updateNature = (data) => {
        let newNature = nature;
        newNature = {...nature, ...data}
        setNature({...props.projet.nature, ...newNature})        
        const objectNature = {"nature":{...props.projet.nature, ...newNature}}
        
        modJalon(`/api/v1/projet/${props.projet.id}`, {}, objectNature, 'PUT');
    }

    useEffect(() => {
        
        setNature(!props.projet.nature?blanckNature:{...blanckNature,...props.projet.nature})
                
    },[props, isChecked])
    

    return (
        
        
        <Box maxW='lg' padding='5' borderWidth='2px' borderRadius='lg' overflow='hidden'>
                    <Heading size='lg' marginBottom='2'>Impacts sur le budget de fonctionnement<IconButton onClick={buttonClick} variant={isChecked?'solid':'outline'} colorScheme='whiteAlpha' icon={!isChecked?<FcSettings/>:<FcFeedIn/>}/></Heading>
                    
                    <Stack orientation='vertical'>
                    <EditTextDescriptif titre='Impacts' detail={nature.impacts} />
                    
                    
                    </Stack>
                   
                         
                    
                    
                      
        </Box> 
        
        
    )
}