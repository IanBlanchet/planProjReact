

import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, IconButton, Box, HStack, Select, Checkbox, CheckboxGroup  } from '@chakra-ui/react'
import { useState, useEffect } from 'react'


export const TableDossierEnPrep = ({projet, user, handleSelectProjet}) => {
    const [projets, setProjets] = useState([]);

    const onSelectProjet = ({target}) => {
        
        handleSelectProjet(target.getAttribute("value"))
    };

    useEffect(() => {
        setProjets(projet);
        
     }, [projet])

    return (
        
        
        <Box >

        <Table colorScheme='blue' overflowY='scroll'  size='sm' display='inline-block' maxHeight='800px'>
            <Thead position='sticky' top='0' zIndex='1'>
                <Tr bg='white'>
                    
                    <Th>Description</Th>
                    <Th>Responsable</Th>                                
                    
                    <Th>Immobilisation</Th>
                    <Th>Estimation</Th>                   

                    
                </Tr>
            </Thead>
            <Tbody >
                {projets.map(projet =>
                
                <Tr key={projet.id}  >
                   
                    <Td value={projet.id} onClick={onSelectProjet}>{projet.desc}</Td>
                    <Td >{projet.charge?
                        user.find(user => user.id === projet.charge).prenom+ ' ' +user.find(user => user.id === projet.charge).nom:''}</Td>
                    
                    
                    <Td >{projet.immo?'oui':'non'}</Td>  
                    <Td >
                        {projet.nature.estimation}
                    </Td>             
                    
                </Tr>
                )}
                
            </Tbody>
            

        </Table>
        </Box>
        
    )

}