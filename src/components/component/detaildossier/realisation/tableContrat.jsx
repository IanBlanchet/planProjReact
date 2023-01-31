
import { useState, useEffect } from 'react'
import { getRessources } from '../../../util'

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Heading,
    Box
  } from '@chakra-ui/react'

export const TableContrat = ({projet}) => {
    const [contrats, setContrats] = useState([])

    useEffect(() =>{
        getRessources('/api/v1/contrat/by_project/'+projet.id).then(
            response => setContrats(response)
        )
    }, [])

    return (
        <Box padding='5' borderWidth='2px' borderRadius='lg' boxShadow='md'>
        <Heading size='md' position='sticky' top='0'>Liste des contrats associés</Heading>
        <TableContainer >
        <Table variant='simple' overflowY='scroll' display='inline-block' maxHeight='250px'>
          
          
          <Thead position='sticky' top='0' >
            <Tr bg='gray.200'>
              <Th >No</Th>
              <Th >Description</Th>
              <Th >Statut</Th>
            </Tr>
          </Thead>
          <Tbody>
            {contrats.map(contrat =>
                <Tr>
                    <Td>{contrat.no}</Td>
                    <Td>{contrat.desc}</Td>
                    <Td>{contrat.statut}</Td>
                </Tr>
                )}
            </Tbody>
      
        </Table>
      </TableContainer>
      </Box>

    )
}
