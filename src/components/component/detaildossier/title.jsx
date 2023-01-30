import { Heading, Grid, GridItem, Text, ButtonGroup, Button } from "@chakra-ui/react"


export const TitleProjet = ({projet}) => {

    return (

        <Grid templateRows='60px'
              templateColumns='6fr 1fr'
              border='1px'
              padding='5px'
              margin='5px'
              borderRadius='5px'
              boxShadow='md'>

            <GridItem  gridRow='1 /span 1' gridColumn='1 / span1'>

                <Heading size='xl' margin='5px'>{projet.no_projet} - {projet.desc}</Heading>

            </GridItem>

            <GridItem justifySelf='end' gridRow='1 /span 1' gridColumn='2 / span1' >

                <Text>Note</Text>

            </GridItem>

           
        </Grid>
    )
}

/*                <ButtonGroup colorScheme='teal' variant='outline' isAttached size='md'>
                    <Button>Description</Button>
                    <Button>Finance</Button>
                    <Button>Réalisation</Button>
                </ButtonGroup> */