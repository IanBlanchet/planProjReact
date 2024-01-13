

import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, IconButton, Box, HStack, Select, Checkbox, CheckboxGroup  } from '@chakra-ui/react'
import { useState, useEffect } from 'react'


export const TableDossierEnPrep = ({projet, user, handleSelectProjet}) => {
    const [projets, setProjets] = useState([]);

    const onSelectProjet = ({target}) => {
        
        handleSelectProjet(target.getAttribute("value"))
    };

    
        
    
        useEffect(() => {
        setProjets(projet.filter(item => item.statut === 'En approbation'));
        
     }, [projet])

    return (
        
        
        <Box >

        <Table colorScheme='blue' overflowY='scroll'  size='sm' display='inline-block' maxHeight='800px'>
            <Thead position='sticky' top='0' zIndex='1'>
                <Tr bg='white'>
                    
                    <Th>Description</Th>
                    <Th>Responsable</Th>                                
                    
                    <Th>Immo</Th>
                    <Th>Stratégique</Th>                   

                    
                </Tr>
            </Thead>
            <Tbody >
                {projets.map(item =>
                
                <Tr key={item.id}  >
                   
                    <Td value={item.id} onClick={onSelectProjet}>{item.desc}</Td>
                    <Td >{item.charge?
                        user.find(user => user.id === item.charge).prenom+ ' ' +user.find(user => user.id === item.charge).nom:''}</Td>
                    
                    
                    <Td >{item.immo?'oui':'non'}</Td>  
                    <Td >
                        {item.nature.isStrategic?'oui':'non'}
                    </Td> 
                         
                    
                </Tr>
                )}
                
            </Tbody>
            

        </Table>
        </Box>
        
    )

}