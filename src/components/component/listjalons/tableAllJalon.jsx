
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, IconButton, Box, HStack, Select, Checkbox, CheckboxGroup  } from '@chakra-ui/react'



export function TableAllJalon({jalons, users}) {



    return (
        
        
        <Box >

        <Table colorScheme='blue' overflowY='scroll'  size='sm' display='inline-block' maxHeight='800px'>
            <Thead position='sticky' top='0' zIndex='1'>
                <Tr bg='white'>
                    <Th>Date</Th>
                    <Th>Jalon</Th>
                    <Th>Responsable</Th>
                    <Th>Service</Th>                    
                    <Th>Commentaire</Th>
                    <Th>Action</Th>                   

                    
                </Tr>
            </Thead>
            <Tbody >
                {jalons.map(jalon =>
                
                <Tr key={jalon.id}>
                    <Td>{jalon.date} </Td>
                    <Td>{jalon.jalon}</Td>
                    <Td>
                        {jalon.charge_jalon?
                        users.find(user => user.id === jalon.charge_jalon).prenom+ ' ' + users.find(user => user.id === jalon.charge_jalon).nom:''}</Td>
                    <Td>
                        {jalon.charge_jalon?
                        users.find(user => user.id === jalon.charge_jalon).service:''}</Td>
                    
                    <Td>
                       {jalon.commentaire}
                    </Td>
                    <Td></Td>               
                    
                </Tr>
                )}
                
            </Tbody>
            

        </Table>
        </Box>
        
    )

}