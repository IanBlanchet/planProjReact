import { Box, HStack, Grid, GridItem, Input } from '@chakra-ui/react';
import { FcGlobe, FcEditImage, FcVlc, FcSynchronize } from "react-icons/fc";
import { InputDuree } from '../events/dureeinput';


const param = {
    size:25,
    margin:2,
}

const icons = {
    TP: {icon:<FcVlc size={param.size}/>, bg:'orange.300'},
    ING: {icon:<FcEditImage size={param.size}/>, bg:'blue.300'},
    ENV: {icon:<FcGlobe size={param.size}/>, bg:'green.300'},
    GEN: {icon:<FcSynchronize size={param.size}/>, bg:'gray.300'}
}

export function JalonDetail(props) {
    

    return (
        <Box  borderWidth='1px' borderRadius='lg' overflow='hidden' padding='10px' margin='1.5' bg={props.user&&icons[props.user.service].bg}>
            
                
                <Grid   templateRows='repeat(2)'
                        templateColumns='repeat(3, 175px)'
                        gap={1}>
                    <GridItem margin={param.margin}>{props.user&&icons[props.user.service].icon}</GridItem>
                    {props.projet?<GridItem margin={param.margin}>{props.projet.no_projet}</GridItem>:
                    props.contrat?<GridItem margin={param.margin}>{props.contrat.no}</GridItem>:<GridItem/>
                    }                    
                    <GridItem margin={param.margin}>{props.user&&props.user.username}</GridItem>
                    {props.projet?<GridItem fontSize='sm' margin={param.margin}>{props.projet.desc}</GridItem>:
                    props.contrat?<GridItem fontSize='sm' margin={param.margin}>{props.contrat.desc}</GridItem>:<GridItem/>
                    } 
                    <GridItem fontSize='sm' margin={param.margin}>{props.jalon.commentaire}</GridItem>
                    <GridItem margin={param.margin}><InputDuree jalon={props.jalon} incrementDuree={props.incrementDuree}/></GridItem>
                </Grid>
            
            
           

        </Box>
    )
}