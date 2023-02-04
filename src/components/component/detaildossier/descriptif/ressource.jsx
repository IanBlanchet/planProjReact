import { useState, useEffect, useContext } from 'react';
import { Box, IconButton, Heading, HStack, Stack, Text, List, ListItem, Select} from '@chakra-ui/react';
import { FcSettings, FcFeedIn, FcPlus } from "react-icons/fc";
import { modJalon } from '../../../util';
import { ButtonAddService } from './buttonAddService';
import { BaseDataContext } from '../../../../auth';

const year = new Date().getFullYear();

const options = ['Ingénierie', 'Travaux publics', 'Environnement', 'SRC', 'Urbanisme', 'Développement Économique', 'Greffe', 'Finance', 'Communications', 'Incendies', 'RH']



export function RessourceRequise ({projet, updateNature}) {
    
    const {user, blanckNature} = useContext(BaseDataContext)
    const [nature, setNature] = useState(blanckNature)
    const [isChecked, setIschecked] = useState(false);
    const [charge, setCharge] = useState('');
    const [selectedService, setSelectedService] = useState('')
    



    const handleChangeService = (e) => {
        setSelectedService(e.target.value)
    }

    const addService = (value) => {
        if(value) {
            let temp = {...nature};
            let service =[];
            nature.services&&(service = [...nature.services]);
            service.push(value)
            const newService = {'services':service};
            let newnature = {...temp, ...newService}
            setNature(newnature);
            modJalon(`/api/v1/projet/${projet.id}`, {}, {'nature':newnature}, 'PUT');
            setSelectedService('')
        }
    }

    const saveChange = () => {
        !isChecked?setIschecked(true):setIschecked(false);
        updateNature(nature);
    }



    const changeResponsable = (e) => {               
       setCharge(user.find(item => item.id == e.target.value).username);
       modJalon(`/api/v1/projet/${projet.id}`, {}, {'charge':e.target.value}, 'PUT');
    }

    useEffect(()=>{
        
        setNature(!projet.nature?blanckNature:{...blanckNature,...projet.nature})
        setCharge(projet.charge?user.find(item => item.id === projet.charge).username:'')
  
    }, [projet])
    

    return (
        <Box maxW='md' padding='5' borderWidth='2px' borderRadius='lg' overflow='hidden'>
            <Heading size='lg' marginBottom='2'>Ressources<IconButton icon={isChecked?<FcFeedIn/>:<FcSettings/>} onClick={saveChange} /></Heading>
                   
            
                <Stack orientation='vertical'>

                <Heading size='md'>Chargé de projet</Heading>
                {isChecked?<Stack >
                <Text>{charge}</Text> 
                <Select placeholder='choisir un chargé de projet' onChange={changeResponsable}> 
                    {user.map(item => (<option value={item.id} key={item.id}>{item.username}</option>))}                   
                </Select>
                </Stack>:<Text>{charge}</Text> }
                              
                </Stack>


                <Heading size='md'>Services impliqués</Heading>
                {isChecked&&<HStack >
                <Select placeholder='Selectionne un service' onChange={handleChangeService} onDoubleClick={addService}> 
                    {options.map(item => !nature.services.includes(item)&&(<option value={item} key={item}>{item}</option>))}                   
                </Select>
                <ButtonAddService service={selectedService} addService={addService}/>
                
                </HStack>}
                <Text><List>{nature.services?nature.services.map(item => <ListItem key={item}>{item}</ListItem>):''}</List></Text>

                 
            
        </Box>
        
    )
}