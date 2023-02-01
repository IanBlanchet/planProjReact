import { Heading, Grid, GridItem, Text, Select, FormLabel, FormControl } from "@chakra-ui/react"


const statut = ['Actif', 'Complété', 'En suspend', 'En approbation', 'Abandonné', 'En réception']

export const TitleProjet = ({projet, updateStatut}) => {

    return (

        <Grid templateRows='60px'
              templateColumns='6fr 1fr'
              border='1px'
              padding='5px'
              margin='5px'
              borderRadius='5px'
              boxShadow='md'>

            <GridItem  gridRow='1 /span 1' gridColumn='1 / span1' overflow='hidden'>

                <Heading fontSize={['18px', '20px', '25px', '35px']}  margin='5px'>{projet.no_projet} - {projet.desc}</Heading>

            </GridItem>

            <GridItem justifySelf='end' gridRow='1 /span 1' gridColumn='2 / span1' >
                    <FormControl >
                    <FormLabel >Statut :</FormLabel>
                    <Select name='statut' value={projet.statut} size='sm' onChange={updateStatut} flexBasis='100px'>
                        {statut.map(item => <option value={item} key={item}>{item}</option>)}
                    </Select>
                    </FormControl>

            </GridItem>

           
        </Grid>
    )
}

/*                <ButtonGroup colorScheme='teal' variant='outline' isAttached size='md'>
                    <Button>Description</Button>
                    <Button>Finance</Button>
                    <Button>Réalisation</Button>
                </ButtonGroup> */