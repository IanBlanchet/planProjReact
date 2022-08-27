import { Box, HStack, Grid, GridItem, Input } from '@chakra-ui/react';
import { FcGlobe, FcEditImage, FcVlc, FcSynchronize } from "react-icons/fc";
import { InputDuree } from '../events/dureeinput';

const size = 25
const icons = {
    TP: {icon:<FcVlc size={size}/>, bg:'orange.300'},
    ING: {icon:<FcEditImage size={size}/>, bg:'blue.300'},
    ENV: {icon:<FcGlobe size={size}/>, bg:'green.300'},
    GEN: {icon:<FcSynchronize size={size}/>, bg:'gray.300'}
}

export function JalonDetail(props) {
    

    return (
        <Box  borderWidth='1px' borderRadius='lg' overflow='hidden' padding='10px' margin='1.5' bg={props.user&&icons[props.user.service].bg}>
            
                
                <Grid   templateRows='repeat(2, 50px)'
                        templateColumns='repeat(3, 200px)'
                        gap={1}>
                    <GridItem>{props.user&&icons[props.user.service].icon}</GridItem>
                    {props.projet?<GridItem>{props.projet.no_projet}</GridItem>:
                    props.contrat?<GridItem>{props.contrat.no}</GridItem>:<GridItem/>
                    }                    
                    <GridItem>{props.user&&props.user.username}</GridItem>
                    {props.projet?<GridItem fontSize='sm'>{props.projet.desc}</GridItem>:
                    props.contrat?<GridItem fontSize='sm'>{props.contrat.desc}</GridItem>:<GridItem/>
                    } 
                    <GridItem fontSize='sm'>{props.jalon.commentaire}</GridItem>
                    <GridItem><InputDuree jalon={props.jalon} incrementDuree={props.incrementDuree}/></GridItem>
                </Grid>
            
            
           

        </Box>
    )
}