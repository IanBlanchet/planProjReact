
import { useEffect, useState, useRef } from 'react';
import { Button, Radio, RadioGroup, Input, Select, Checkbox, Stack, FormControl,
    FormLabel, VStack, HStack,} from '@chakra-ui/react';
import { SelectContrat, SelectProjet } from '../common/select';
import { useToast } from '@chakra-ui/react';

const jalonTitle = ['C_Direction', 'Commission', 'Conseil', 'AO', 'TQC', 'Livrable', 'Fermeture', 'F_travaux', 'D_travaux', 'Demande_CA']


export const NewJalonForm = ({projets, contrats, users, pushNewJalon}) => {
    const [association, setAssociation] = useState('');
    const newJalon = useRef({date:'', jalon:'', charge_jalon:'', projet_id:null, contrat_id:null, commentaire:''})
    const toast = useToast({
        status: 'error',
        position: 'top',
        duration: 3000,
        isClosable: true
      })

    const setValue = (e) => {
        newJalon.current = {...newJalon.current, ...{projet_id:null, contrat_id:null}}
        setAssociation(e)      

    }

    const changeAssociation = (value) => {
        switch (association) {
            case 'projet' : newJalon.current.projet_id = value         
                break;
            case 'contrat' : newJalon.current.contrat_id = value 
                break;            
            default:
                break;
        }        
    }

    const changeJalon = ({target}) => {
        newJalon.current[target.name] = target.value        
    }

    const handleSubmit = () => {
        newJalon.current.charge_jalon = parseInt(newJalon.current.charge_jalon)
        if (!newJalon.current.jalon || !newJalon.current.date || !newJalon.current.charge_jalon) {
            toast({description:'Vous devez entrer au minimum la date, le jalon et le chargé du jalon'})
        } else {
            pushNewJalon(newJalon.current)
        }
        
    }


        return (    
        
        
            <FormControl spacing={4} >
            <VStack>
            <RadioGroup onChange={setValue} label='test' name='niveau'>
                <Stack direction='row'>
                    <FormLabel>Niveau</FormLabel>
                    <Radio value='projet'>Projet</Radio>
                    <Radio value='contrat'>Contrat</Radio>
                    <Radio value='aucun'>Aucun</Radio>
                </Stack>
            </RadioGroup>

            
            {association==='projet'?
                    <SelectProjet projets={projets} onChange={changeAssociation} name='projet_id'/>:
                association==='contrat'?
                    <SelectContrat contrats={contrats} onChange={changeAssociation} name='contrat_id'/>:
                    <Select name='aucun'/>}

            <Select onChange={changeJalon} name='charge_jalon' placeholder='choisir un responsable' >
                {users.filter(user => !['support', 'archive'].includes(user.statut)).map(item => <option value={item.id}>{item.username}</option>)}
            </Select>

            <Select onChange={changeJalon} name='jalon' placeholder='choisir un jalon' >
                {jalonTitle.map(item => <option value={item}>{item}</option>)}
            </Select>

            <HStack><FormLabel>Date</FormLabel><Input type='date' onChange={changeJalon} name='date' onKeyDown={(e) => e.preventDefault()} /></HStack>

            <HStack><FormLabel>Commentaire</FormLabel><Input type='text' onChange={changeJalon} name='commentaire' /></HStack>



            <Button onClick={handleSubmit} bg='blue.500' >Soumettre</Button>
            
            </VStack>
            </FormControl>
       

        )


}

