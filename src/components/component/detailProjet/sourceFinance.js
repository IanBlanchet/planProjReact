import { useState, useEffect } from 'react';
import { getRessources } from '../../util';
import { List, ListItem, ListIcon, OrderedList, UnorderedList, Text, Box, IconButton, Heading } from '@chakra-ui/react';


export function SourceFinance(props) {

    const [finance, setFinance] = useState({})

    useEffect(() => {
        getRessources('/api/v1/finance/'+props.projet.id).then(
            lesfinance => setFinance(lesfinance))
    }, [props.projet])

    return (
        <Box display='inline'>
        
        <Box maxW='md' padding='5' borderWidth='2px' borderRadius='lg' overflow='hidden'>
                    <Heading size='lg'>Sources de financement</Heading>
                    <Heading size='md' color='blue.500'>Règlements</Heading>
                        <UnorderedList>
                            {finance.reglements?finance.reglements.map(item => <ListItem>{item.no} -- {item.montant.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</ListItem>):<ListItem>-</ListItem>}                        
                        </UnorderedList>
                    <Heading size='md' color='blue.500'>Subventions</Heading>
                        <UnorderedList>
                            {finance.subventions?finance.subventions.map(item => <ListItem>{item.nom} -- {item.montant.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</ListItem>):<ListItem>-</ListItem>}                        
                        </UnorderedList>
                    <Heading size='md' color='blue.500'>Fonds</Heading>
                        <UnorderedList>
                            {finance.fonds?finance.fonds.map(item => <ListItem>{item.nom} -- {item.montant.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</ListItem>):<ListItem>-</ListItem>}                        
                        </UnorderedList>
                    
                    
                      
        </Box> 
        
        </Box>
    )
}