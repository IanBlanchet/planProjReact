
import { useState, useEffect } from 'react';
import { modJalon } from '../util';
import { List, ListItem, ListIcon, OrderedList, UnorderedList, Text, Box, IconButton, Heading } from '@chakra-ui/react';
import { TextDescriptif, EditTextDescriptif } from './textdescription';
import { FcSettings, FcFeedIn } from "react-icons/fc";

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



export function Descriptif(props) {

    const [isChecked, setIschecked] = useState(false);
    const [listDesc, setlistDesc] = useState([]);
    const [nature, setNature] = useState({});    

    
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
        //setlisDesc({});
        setlistDesc(renderListDesc(props.projet.nature));
        //setNature({})
        setNature(!props.projet.nature?{'nature': [' '], 'justification':[' '], 'refus':[' ']}:props.projet.nature)
                
    },[props, isChecked])
    

    return (
        <Box>
        
        <Box width='fit-content'>
                    <Heading size='lg'>Description générale <IconButton onClick={buttonClick} variant={isChecked?'solid':'outline'} colorScheme='whiteAlpha' icon={!isChecked?<FcSettings/>:<FcFeedIn/>}/></Heading>
                    
                   
                    {listDesc.map(item => !isChecked?<TextDescriptif titre={item.titre} detail={item.detail} />:<EditTextDescriptif titre={item.titre} detail={item.detail} updateNature={updateNature}/>)}
                    
                      
        </Box> 
        
        </Box>
    )
}