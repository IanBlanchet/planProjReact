
import {Stack, Heading, Flex} from '@chakra-ui/react'

export const NotFound = () => 

    { 
    return ( 
    <Flex align='center' justify='center'>
    <Stack>
        <Heading as="h1" size="2xl">404 - Page non trouvée</Heading>
        <Heading as="h2" size="xl">Oups! Le lien vers Sharepoint est inexistant ou erroné.</Heading>
        <Heading as="h2" size="xl">Veuillez ajouter ou corriger l'url</Heading>
        
    </Stack>
    </Flex>
    )
    }