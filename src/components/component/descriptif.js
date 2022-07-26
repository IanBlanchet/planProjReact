
import { useState, useEffect } from 'react';
import { modJalon } from '../util';
import { List, ListItem, ListIcon, OrderedList, UnorderedList, Stack, Box, IconButton, Heading } from '@chakra-ui/react';
import { TextDescriptif, EditTextDescriptif } from './textdescription';
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



export function Descriptif(props) {

    const [isChecked, setIschecked] = useState(false);
    const [listDesc, setlistDesc] = useState([]);
    const [nature, setNature] = useState({'nature': [' '], 'justification':[' '], 'refus':[' '], 'tempsCharge':0, 'tempsTech' :0, 'services':[], 'avancement':0});    

    
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
        setNature(!props.projet.nature?{'nature': [' '], 'justification':[' '], 'refus':[' '], 'tempsCharge':'', 'tempsTech' :''}:props.projet.nature)
                
    },[props, isChecked])
    

    return (
        
        
        <Box maxW='md' padding='5' borderWidth='2px' borderRadius='lg' overflow='hidden'>
                    <Heading size='lg' marginBottom='2'>Description générale <IconButton onClick={buttonClick} variant={isChecked?'solid':'outline'} colorScheme='whiteAlpha' icon={!isChecked?<FcSettings/>:<FcFeedIn/>}/></Heading>
                    {!isChecked?
                    <Stack orientation='vertical'>
                    <TextDescriptif titre='nature' detail={nature.nature} />
                    <TextDescriptif titre='justification' detail={nature.justification} />
                    <TextDescriptif titre='refus' detail={nature.refus} />
                    </Stack>:
                    <Stack orientation='vertical'>
                    <EditTextDescriptif titre='nature' detail={nature.nature} updateNature={updateNature}/>
                    <EditTextDescriptif titre='justification' detail={nature.justification} updateNature={updateNature}/>
                    <EditTextDescriptif titre='refus' detail={nature.refus} updateNature={updateNature}/>
                    </Stack>
                    }
                   
                    
                    
                      
        </Box> 
        
        
    )
}



//{listDesc.map(item => !isChecked?<TextDescriptif titre={item.titre} detail={item.detail} />:<EditTextDescriptif titre={item.titre} detail={item.detail} updateNature={updateNature}/>)}