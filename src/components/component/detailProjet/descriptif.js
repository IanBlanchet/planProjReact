
import { useState, useEffect } from 'react';
import { modJalon } from '../../util';
import { List, ListItem, ListIcon, OrderedList, UnorderedList, Stack, Box, IconButton, Heading } from '@chakra-ui/react';
import { EditTextDescriptif } from './textdescription';
import { FcSettings, FcFeedIn } from "react-icons/fc";


//à nettoyer plus nécessaire
    /**
     * a function to return an array from object
     * @returns array
     */
     const renderListDesc = (nature) => {
        if (nature) {
            let listDesc = [];
            Object.keys(nature).forEach( (key) => listDesc.push( {'titre':key, 'detail': nature[key] }))
            
            return listDesc
        }
        else {
            //setNature({'nature': [' '], 'justification':[' '], 'refus':[' ']})
            return [{'titre':'nature', 'detail':[' ']}, {'titre':'justification', 'detail':[' ']}, {'titre':'refus', 'detail':[' ']}]
        }
    }

const blanckNature = {'nature': [' '], 'justification':[' '], 'refus':[' '], 'tempsCharge':0, 'tempsTech' :0, 'services':[], 'avancement':0, 'impacts':[]}

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
                    <EditTextDescriptif titre='nature' detail={nature.nature} updateNature={updateNature} isChecked={isChecked}/>
                    <EditTextDescriptif titre='justification' detail={nature.justification} updateNature={updateNature} isChecked={isChecked}/>
                    <EditTextDescriptif titre='refus' detail={nature.refus} updateNature={updateNature} projet={props.projet} isChecked={isChecked}/>
                    </Stack>
                    
                   
                                        
                      
        </Box> 
        
        
    )
}



