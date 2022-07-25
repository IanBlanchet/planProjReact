import { useState, useEffect } from 'react';
import { getRessources } from '../util';
import { List, ListItem, ListIcon, OrderedList, UnorderedList, Text, Box, IconButton, Heading } from '@chakra-ui/react';


export function SourceFinance(props) {

    const [finance, setFinance] = useState({})

    useEffect(() => {
        getRessources('/api/v1/finance/'+props.projet.id).then(
            lesfinance => setFinance(lesfinance))
    }, [props])

    return (
        <Box display='inline'>
        
        <Box width='fit-content'>
                    <Heading size='lg'>Sources de financement</Heading>
                    <Heading size='md' color='blue.500'>Règlements</Heading>
                        <UnorderedList>
                            {finance.reglements?finance.reglements.map(item => <ListItem>{item.no} -- {item.montant}</ListItem>):<ListItem>-</ListItem>}                        
                        </UnorderedList>
                    <Heading size='md' color='blue.500'>Subventions</Heading>
                        <UnorderedList>
                            {finance.subventions?finance.subventions.map(item => <ListItem>{item.nom} -- {item.montant}</ListItem>):<ListItem>-</ListItem>}                        
                        </UnorderedList>
                    <Heading size='md' color='blue.500'>Fonds</Heading>
                        <UnorderedList>
                            {finance.fonds?finance.fonds.map(item => <ListItem>{item.nom} -- {item.montant}</ListItem>):<ListItem>-</ListItem>}                        
                        </UnorderedList>
                    
                    
                      
        </Box> 
        
        </Box>
    )
}