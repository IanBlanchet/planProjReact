import { useState, useEffect, useContext } from 'react';
import { Box, IconButton, Heading, HStack, Stack, Text, List, ListItem, Select} from '@chakra-ui/react';
import { FcFeedIn} from "react-icons/fc";
import { TiEdit } from "react-icons/ti";
import { modJalon } from '../../../util';
import { ButtonAddService } from './buttonAddService';
import { ButtonRemoveService } from './buttonRemoveService';
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

    const updateService = (value, add) => {
        if(value) {
            let temp = {...nature};
            let service =[];
            nature.services&&(service = [...nature.services]);
            add?service.push(value):service = service.filter(item => item !== value)
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
       setCharge(user.find(item => item.id == e.target.value));
       modJalon(`/api/v1/projet/${projet.id}`, {}, {'charge':e.target.value}, 'PUT');
    }

    useEffect(()=>{
        
        setNature(!projet.nature?blanckNature:{...blanckNature,...projet.nature})        
        setCharge(projet.charge?user.find(item => item.id === projet.charge):'')
  
    }, [projet])
    

    return (
        <Box maxW='md' padding='5' borderWidth='2px' borderRadius='lg' overflow='hidden'>
            <Heading size='lg' marginBottom='2'>Ressources<IconButton icon={isChecked?<FcFeedIn/>:<TiEdit/>} onClick={saveChange} /></Heading>
                   
            
                <Stack orientation='vertical'>

                <Heading size='md'>Chargé de projet</Heading>
                {isChecked?<Stack >
                
                <Select placeholder='choisir un chargé de projet' onChange={changeResponsable}> 
                    {user.filter(item => item.statut === 'actif' || item.statut === 'admin')
                    .map(item => <option key={item.id} value={item.id}>{item.prenom} {item.nom}</option>)}                                     
                </Select>
                <Text>{charge?charge.prenom+' '+charge.nom:''}</Text> 
                </Stack>:<Text>{charge?charge.prenom+' '+charge.nom:''}</Text> }
                              
                </Stack>


                <Heading size='md'>Services impliqués</Heading>
                {isChecked&&<HStack >
                <Select placeholder='Selectionne un service' onChange={handleChangeService} > 
                    {options.map(item => !nature.services.includes(item)&&(<option value={item} key={item}>{item}</option>))}                   
                </Select>
                <ButtonAddService service={selectedService} updateService={updateService}/>
                
                </HStack>}
                <Text><List>{nature.services?nature.services.map(item => <ListItem key={item}>{item}<ButtonRemoveService service={item} updateService={updateService}/></ListItem>):''}</List></Text>

                 
            
        </Box>
        
    )
}