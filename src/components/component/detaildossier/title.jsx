import { Heading, Grid, GridItem, Text } from "@chakra-ui/react"


export const TitleProjet = ({projet}) => {

    return (

        <Grid templateRows='3fr 1fr'
              templateColumns='6fr 1fr'
              bg='blue'>

            <GridItem justifySelf='start' >

                <Heading size='xl'>{projet.no_projet} - {projet.desc}</Heading>

            </GridItem>

            <GridItem justifySelf='end' >

                <Text>Note</Text>

            </GridItem>

            <GridItem><span></span></GridItem>

            <GridItem></GridItem>
        
        </Grid>
    )
}