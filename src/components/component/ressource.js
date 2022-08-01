import { useState, useEffect } from 'react';
import { Box, IconButton, Heading, Input, InputGroup, InputLeftAddon, InputRightAddon, Stack, Text, List, ListItem, Select } from '@chakra-ui/react';
import { FcSettings, FcFeedIn } from "react-icons/fc";

const year = new Date().getFullYear();

const options = ['Ingénierie', 'Travaux publics', 'Environnement', 'SRC', 'Urbanisme', 'Développement Économique', 'Greffe', 'Finance', 'Communications']

const blanckNature = {'nature': [' '], 'justification':[' '], 'refus':[' '], 'tempsCharge':0, 'tempsTech' :0, 'services':[], 'avancement':0}

export function RessourceRequise (props) {

    const [nature, setNature] = useState(blanckNature)
    const [isChecked, setIschecked] = useState(false);

    const handleChange = (e) => {
        let temp = {...nature};
        const name = e.target.name;
        let data = {}
        data[name] = parseInt(e.target.value);        
        let newnature = { ...temp, ...data};
        setNature(newnature);
        props.updateNature(newnature)
        
    }

    const addService = (e) => {
        let temp = {...nature};
        let service =[]
        nature.services&&(service = [...nature.services])
        service.push(e.target.value)
        const newService = {'services':service}
        let newnature = {...temp, ...newService}
        setNature(newnature)
        props.updateNature(newnature)
    }

    const handleCheck = () => {
        !isChecked?setIschecked(true):setIschecked(false)
    }

    useEffect(()=>{
        
        setNature(!props.projet.nature?blanckNature:{...blanckNature,...props.projet.nature})
        return () => {
            setNature(blanckNature);
        }
    }, [props.projet])
    

    return (
        <Box maxW='md' padding='5' borderWidth='2px' borderRadius='lg' overflow='hidden'>
            <Heading size='lg' marginBottom='2'>Ressources</Heading>
            <Heading size='md' marginBottom='2'>Estimation heures requises</Heading>        
            
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
                <Heading size='md'>Chargé de projet</Heading>
                <Text>{props.user.username}</Text>               
                </Stack>


                <Heading size='md'>Services impliqués<IconButton icon={<FcSettings/>} onClick={handleCheck} /></Heading>
                {isChecked&&<Stack >
                <Select placeholder='Selectionne un service' onDoubleClick={addService}> 
                    {options.map(item => <option value={item} >{item}</option>)}                   
                </Select>
                </Stack>}
                <Text><List>{nature.services?nature.services.map(item => <ListItem>{item}</ListItem>):''}</List></Text>

                            
            
                
            
            
        </Box>
        
    )
}