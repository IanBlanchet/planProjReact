
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { TextBox } from './descriptif/textbox';

export const Descriptif = ({projet}) => {

    return (
        
    <Grid   
        templateRows='1fr 1fr 1fr 4fr'
        templateColumns='3fr 1fr'
        templateAreas=' "nature strategique"
                        "justification strategique"
                        "refus strategique"
                        "notes localisation"
                        '>
    <GridItem gridArea='nature' justifySelf='start' width='full' >
        <TextBox projet={projet} data='nature' />
    </GridItem>

    <GridItem gridArea='justification' justifySelf='start' width='full'>
        <Box justification={projet.nature.justification}>{projet.nature.justification.map(item => item)}</Box>
    </GridItem>

    <GridItem gridArea='refus' justifySelf='start' width='full'>
        <Box refus={projet.nature.refus}>{projet.nature.refus.map(item => item)}</Box>
    </GridItem>

    <GridItem gridArea='notes' justifySelf='start' width='full'>
        <Box notes={projet.nature.notes}>{projet.nature.notes}</Box>
    </GridItem>

    <GridItem gridArea='strategique' justifySelf='end' width='full'>
        <Box isStrategic={projet.nature.isStrategic}>{projet.nature.isStrategic&&'true'}</Box>
        <Box statut={projet.statut}>{projet.statut}</Box>
    </GridItem>

    <GridItem gridArea='localisation' justifySelf='end' width='full' heigth='full'>
        <Box width='300px' heigth='300px' bg='blue.100'>MAP</Box>
    </GridItem>


   
    
</Grid>

    )



}