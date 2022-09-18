import { useState, useEffect } from 'react';
import { Box, IconButton, Heading, Input, InputGroup, InputLeftAddon, InputRightAddon, HStack, Stack, Text, List, ListItem, Select} from '@chakra-ui/react';
import { FcSettings, FcFeedIn, FcPlus } from "react-icons/fc";
import { EstimateurRessources } from '../modal';
import { modJalon } from '../../util';
import { ButtonAddService } from './buttonAddService';

const year = new Date().getFullYear();

const options = ['Ingénierie', 'Travaux publics', 'Environnement', 'SRC', 'Urbanisme', 'Développement Économique', 'Greffe', 'Finance', 'Communications', 'Incendies']

const blanckNature = {'nature': [' '], 'justification':[' '], 'refus':[' '], 'tempsCharge':0, 'tempsTech' :0, 'services':[], 'avancement':0, 'impacts':[]}

export function RessourceRequise (props) {

    const [nature, setNature] = useState(blanckNature)
    const [isChecked, setIschecked] = useState(false);
    const [charge, setCharge] = useState('');
    const [selectedService, setSelectedService] = useState('')

    const handleChange = (e) => {
        let temp = {...nature};
        const name = e.target.name;
        let data = {}
        data[name] = parseInt(e.target.value);        
        let newnature = { ...temp, ...data};
        setNature(newnature);
        props.updateNature(newnature)
        
    }

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
            props.updateNature(newnature);
            setSelectedService('')
        }
    }

    const handleCheck = () => {
        !isChecked?setIschecked(true):setIschecked(false)
    }

    const handleApplyEstimation = (tempsCharge, tempsTech) => {
        let temp = {...nature};
        let data = {};
        data['tempsCharge'] = tempsCharge;
        data['tempsTech'] = tempsTech;       
        let newnature = { ...temp, ...data};
        setNature(newnature);
        props.updateNature(newnature)
        
    }

    const changeResponsable = (e) => {               
       setCharge(props.users.find(item => item.id == e.target.value).username);
       modJalon(`/api/v1/projet/${props.projet.id}`, {}, {'charge':e.target.value}, 'PUT');
    }

    useEffect(()=>{
        
        setNature(!props.projet.nature?blanckNature:{...blanckNature,...props.projet.nature})
        setCharge(props.user.username)
        
        
        return () => {
            setNature(blanckNature);
        };
        
    }, [props.projet])
    

    return (
        <Box maxW='md' padding='5' borderWidth='2px' borderRadius='lg' overflow='hidden'>
            <Heading size='lg' marginBottom='2'>Ressources</Heading>
            <Heading size='md' marginBottom='2' >Estimation heures requises<EstimateurRessources projet={props.projet} applyEstimation={handleApplyEstimation}/></Heading>        
            
                <Stack orientation='vertical'>
                <InputGroup >
                <InputLeftAddon children='chargé projet'/>
                <Input  type='number' value={nature.tempsCharge} name='tempsCharge' onChange={handleChange}/>
                <InputRightAddon children='hrs'/>
                </InputGroup>

                <InputGroup>
                <InputLeftAddon children='technicien'/>
                <Input type='number'  value={nature.tempsTech} name='tempsTech' onChange={handleChange}/>
                <InputRightAddon children='hrs'/>
                </InputGroup>
                <Heading size='md'>Chargé de projet<IconButton icon={isChecked?<FcFeedIn/>:<FcSettings/>} onClick={handleCheck} /></Heading>
                {isChecked?<Stack >
                <Text>{charge}</Text> 
                <Select placeholder='choisir un chargé de projet' onChange={changeResponsable}> 
                    {props.users.map(item => (<option value={item.id} >{item.username}</option>))}                   
                </Select>
                </Stack>:<Text>{charge}</Text> }
                              
                </Stack>


                <Heading size='md'>Services impliqués<IconButton icon={isChecked?<FcFeedIn/>:<FcSettings/>} onClick={handleCheck} /></Heading>
                {isChecked&&<HStack >
                <Select placeholder='Selectionne un service' onChange={handleChangeService} onDoubleClick={addService}> 
                    {options.map(item => !nature.services.includes(item)&&(<option value={item} >{item}</option>))}                   
                </Select>
                <ButtonAddService service={selectedService} addService={addService}/>
                
                </HStack>}
                <Text><List>{nature.services?nature.services.map(item => <ListItem>{item}</ListItem>):''}</List></Text>

                            
            
                
            
            
        </Box>
        
    )
}