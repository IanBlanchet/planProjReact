import { List, ListItem, ListIcon, OrderedList, UnorderedList, Text, Box } from '@chakra-ui/react';


export function Descriptif(props) {


    return (
        <Box>
        {props.projet.nature?
        <Box width='fit-content'>
                    <Text fontSize='xl' fontWeight='bold' bg='blue.400'>Description générale</Text>
                    
                    <Box>          
                    <Text fontSize='large' fontFamily='cursive'>Nature:</Text><UnorderedList fontSize='md'>{props.projet.nature.nature&&props.projet.nature.nature.map(item => <ListItem>{item}</ListItem>)}</UnorderedList>
                    <Text fontSize='large' fontFamily='cursive'>Justification:</Text><UnorderedList fontSize='md'>{props.projet.nature.justification&&props.projet.nature.justification.map(item => <ListItem>{item}</ListItem>)}</UnorderedList>
                    <Text fontSize='large' fontFamily='cursive'>Conséquences d'un refus:</Text><UnorderedList fontSize='md'>{props.projet.nature.refus&&props.projet.nature.refus.map(item => <ListItem>{item}</ListItem>)}</UnorderedList>
                    </Box>
                      
        </Box> 
        :
        <Box width='fit-content'>
                    <Text fontSize='xl' fontWeight='bold' bg='blue.400'>Description générale</Text>
                            
                    <Text fontSize='large' fontFamily='cursive'>Nature:</Text><UnorderedList fontSize='md'><ListItem>-</ListItem></UnorderedList>
                    <Text fontSize='large' fontFamily='cursive'>Justification:</Text><UnorderedList fontSize='md'><ListItem>-</ListItem></UnorderedList>
                    <Text fontSize='large' fontFamily='cursive'>Conséquences d'un refus:</Text><UnorderedList fontSize='md'><ListItem>-</ListItem></UnorderedList>
                    
                       
        </Box> }         
        </Box>
    )
}