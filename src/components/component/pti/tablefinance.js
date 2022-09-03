import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Text, IconButton, Box, Container } from '@chakra-ui/react'



export function TableFinance({ptis, assReglements, assFonds, assSubvention, reglement}) {

    

    return (
        <Table colorScheme='blue' overflowY='scroll' size='sm'>
            <Thead position='sticky' top='0'>
                <Tr bg='blue.200'>
                    <Th>Règlements Ensemble</Th>
                    <Th>Règlements Secteur</Th>
                    <Th>Fonds</Th>
                    <Th>Subvention</Th>
                   
                    
                </Tr>
            </Thead>
            <Tbody >
                
                
                <Tr>
                <Td>                
                    {assReglements.reduce((accumulator, object) => {
                        if (ptis.some(item => item.projet_id === object.projet_id)) {
                            const pti = ptis.find(item => item.projet_id === object.projet_id)
                            let ratio = reglement.find(item => item.id === object.reglement_id).ratioSecteur
                            ratio?ratio = ratio:ratio = 0
                            return accumulator + 
                                (1-ratio) * object.montant * ((pti.cycleCour+pti.cycle2+pti.cycle3)/
                                (pti.anterieur+pti.prev_courante+pti.cycleCour+pti.cycle2+pti.cycle3+pti.cycle4+pti.cycle5+.00001))
                        } else {
                            return accumulator
                        }
                    }, 0) 
                    }
                </Td>
                <Td>                
                    {assReglements.reduce((accumulator, object) => {
                        if (ptis.some(item => item.projet_id === object.projet_id)) {
                            const pti = ptis.find(item => item.projet_id === object.projet_id)
                            let ratio = reglement.find(item => item.id === object.reglement_id).ratioSecteur
                            ratio?ratio = ratio:ratio = 0
                            return accumulator + 
                                (ratio) * object.montant * ((pti.cycleCour+pti.cycle2+pti.cycle3)/
                                (pti.anterieur+pti.prev_courante+pti.cycleCour+pti.cycle2+pti.cycle3+pti.cycle4+pti.cycle5+.00001))
                        } else {
                            return accumulator
                        }
                    }, 0) 
                    }
                </Td>    
                <Td>
                {assFonds.reduce((accumulator, object) => {
                        if (ptis.some(item => item.projet_id === object.projet_id)) {
                            const pti = ptis.find(item => item.projet_id === object.projet_id)
                            return accumulator + 
                                object.montant * ((pti.cycleCour+pti.cycle2+pti.cycle3)/
                                (pti.anterieur+pti.prev_courante+pti.cycleCour+pti.cycle2+pti.cycle3+pti.cycle4+pti.cycle5+.00001))
                        } else {
                            return accumulator
                        }
                    }, 0) 
                    }
                
                </Td>

                                <Td>
                {assSubvention.reduce((accumulator, object) => {
                        if (ptis.some(item => item.projet_id === object.projet_id)) {
                            const pti = ptis.find(item => item.projet_id === object.projet_id)
                            return accumulator + 
                                object.montant * ((pti.cycleCour+pti.cycle2+pti.cycle3)/
                                (pti.anterieur+pti.prev_courante+pti.cycleCour+pti.cycle2+pti.cycle3+pti.cycle4+pti.cycle5+.00001))
                        } else {
                            return accumulator
                        }
                    }, 0) 
                    }
                
                </Td>                  
                    
                </Tr>
                
                
            </Tbody>
            <Tfoot position='sticky' bottom='0'  zIndex='1' background='#fff'>
                <Tr>
                    <Th></Th>
                    
                </Tr>
            </Tfoot>
        </Table>
    )
}