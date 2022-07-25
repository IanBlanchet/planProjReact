import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Text } from '@chakra-ui/react'

export function TableAllPti(props) {

    const year = new Date().getFullYear();

    const handleSelectProjet = (e) => {
        console.log(e.target.getAttribute('value'))
        props.afficheProjet(parseInt(e.target.getAttribute('value')))
    }

    return (
        <Table colorScheme='blue'>
            <Thead >
                <Tr bg='blue.200'>
                    <Th>no projet</Th>
                    <Th>Description</Th>
                    <Th>Anterieur</Th>
                    <Th >{year}</Th>
                    <Th>{year+1}</Th>
                    <Th>{year+2}</Th>
                    <Th>ultérieur</Th>
                    
                </Tr>
            </Thead>
            <Tbody>
                {props.ptis.map(pti =>
                
                <Tr>
                    <Td onClick={handleSelectProjet}  value={pti.projet_id}>{props.projet.find(item => item.id === pti.projet_id)?props.projet.find(item => item.id === pti.projet_id).no_projet:pti.projet_id}</Td>
                    <Td>{props.projet.find(item => item.id === pti.projet_id)?props.projet.find(item => item.id === pti.projet_id).desc:''}</Td>
                    <Td>null</Td>
                    <Td>{pti.cycleCour/1000000}</Td>
                    <Td>{pti.cycle2/1000000}</Td>
                    <Td>{pti.cycle3/1000000}</Td>
                    <Td>{(pti.cycle4 + pti.cycle5)/1000000}</Td>
                    
                </Tr>
                )}
                
            </Tbody>
        </Table>
    )
}

