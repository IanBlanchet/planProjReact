import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, IconButton, Box, HStack, Select, Checkbox, CheckboxGroup  } from '@chakra-ui/react'
import { ActionOnJalon } from './actionOnJalon'




export function TableAllJalon({jalons, users, projets, contrats, refresh}) {
    
    


    return (
        
        
        <Box >

        <Table colorScheme='blue' overflowY='scroll'  size='sm' display='inline-block' maxHeight='800px'>
            <Thead position='sticky' top='0' zIndex='1'>
                <Tr bg='white'>
                    <Th>Date</Th>
                    <Th>Jalon</Th>
                    <Th>Projet/contrat</Th>
                    <Th>Description</Th>
                    <Th>Responsable</Th>
                    <Th>Service</Th>                    
                    <Th>Commentaire</Th>
                    <Th>Action</Th>                   

                    
                </Tr>
            </Thead>
            <Tbody >
                {jalons.map(jalon =>
                
                <Tr key={jalon.id} bg={jalon.etat==='complet'&&'gray'}>
                    <Td>{jalon.date} </Td>
                    <Td>{jalon.jalon}</Td>
                    <Td>{jalon.projet_id?projets.find(element => element.id === jalon.projet_id).no_projet:
                        jalon.contrat_id?contrats.find(element => element.id === jalon.contrat_id).no:""}</Td>
                    <Td>{jalon.projet_id?projets.find(element => element.id === jalon.projet_id).desc:
                        jalon.contrat_id?contrats.find(element => element.id === jalon.contrat_id).desc:""}</Td>
                    <Td>
                        {jalon.charge_jalon?
                        users.find(user => user.id === jalon.charge_jalon).prenom+ ' ' + users.find(user => user.id === jalon.charge_jalon).nom:''}</Td>
                    <Td>
                        {jalon.charge_jalon?
                        users.find(user => user.id === jalon.charge_jalon).service:''}</Td>
                    
                    <Td>
                       {jalon.commentaire}
                    </Td>
                    <Td><ActionOnJalon jalon={jalon} refresh={refresh}/></Td>               
                    
                </Tr>
                )}
                
            </Tbody>
            

        </Table>
        </Box>
        
    )

}