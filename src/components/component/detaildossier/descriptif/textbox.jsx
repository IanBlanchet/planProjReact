import { Box, Heading, UnorderedList, ListItem } from "@chakra-ui/react"

export const TextBox = ({projet, niveau1, data}) => {


    
    return (
                    
            
            <Box  >
                <Heading size='md'>{data.toUpperCase()}</Heading>
                <UnorderedList>
                    {projet.nature[data].map(item => <ListItem>{item}</ListItem>)}
                </UnorderedList>
                

            </Box>
            
        
        
    )
    

}