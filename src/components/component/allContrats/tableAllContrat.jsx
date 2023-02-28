import { useState, useEffect, useContext } from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, IconButton, Box, HStack, Select, Checkbox, CheckboxGroup  } from '@chakra-ui/react'
import { FcExpand, FcCollapse } from "react-icons/fc";
import { SelectFiltre } from '../common/select';
import { AddPointage } from '../modal';
import { modJalon } from '../../util';
import { BaseDataContext } from '../../../auth';
import { Link } from 'react-router-dom';




const statut = ['actif', 'complet', 'annulé']


export function TableAllContrat({contrat}) {

    
    const [contrats, setContrats] = useState(contrat);
    const {user} = useContext(BaseDataContext)

    
    const handleChange = (e) => {
        const fieldToUpdate  = {}
        fieldToUpdate[e.target.getAttribute("field")] = e.target.value
        let newContrats = [...contrats]
        const leContrat = newContrats.find(contrat => contrat.id === parseInt(e.target.name));        
        leContrat[e.target.getAttribute("field")] = e.target.value; 
        modJalon(`/api/v1/contrat/${e.target.name}`, {}, fieldToUpdate, 'PUT').then(
            response => setContrats(newContrats)
        );      
        
        
    }


    useEffect(() => {
      
        
     }, [])


    useEffect(() => {
       setContrats(contrat);
       
    }, [contrat])


    return (
        
        
        <Box >

        <Table colorScheme='blue' overflowY='scroll'  size='sm' display='inline-block' maxHeight='800px'>
            <Thead position='sticky' top='0' zIndex='1'>
                <Tr bg='white'>
                    <Th>no contrat</Th>
                    <Th>Description</Th>
                    <Th>Responsable</Th>                                     
                    <Th>Statut</Th>
                    <Th>Montant</Th>                   

                    
                </Tr>
            </Thead>
            <Tbody >
                {contrats.map(contrat =>
                
                <Tr key={contrat.id}>
                    <Td value={contrat.id} textColor='blue' _hover={{background: "white", color: "teal.500",}}>{contrat.no}</Td>
                    <Td>{contrat.desc}</Td>
                    
                    <Td>
                        {contrat.responsable}                     
                    </Td>
                    <Td>
                        <Select size='xs' name={contrat.id} field='statut' onChange={handleChange} value={contrat.statut}>
                                {statut.map(item => <option key={item} value={item} >{item}</option>)}
                        </Select>
                    </Td>
                    <Td>{contrat.montant&&contrat.montant.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}</Td>              
                    
                </Tr>
                )}
                
            </Tbody>
            

        </Table>
        </Box>
        
    )
}