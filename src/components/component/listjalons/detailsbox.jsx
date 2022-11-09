import { useEffect, useState} from 'react';
import { modJalon } from '../../util';
import { Box, HStack, Grid, GridItem, Input, IconButton, Select, Tooltip } from '@chakra-ui/react';
import { FcGlobe, FcEditImage, FcVlc, FcSynchronize } from "react-icons/fc";
import { InputDuree } from '../events/dureeinput';
import { DeleteJalonAlert } from '../common/alert';
import { FcSettings, FcFeedIn } from "react-icons/fc";
import { CheckCircleIcon, CloseIcon} from '@chakra-ui/icons'
import { MdRestorePage } from "react-icons/md";
import { Events } from '../../container/events';
import { GrWindows } from 'react-icons/gr';


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
    
    const [activated, setActivated] = useState(false)
    const [jalon, setJalon] = useState(props.jalon);
    const [dateChange, setDateChange] = useState(false)

    const activateChange = () => {
        activated?setActivated(false):setActivated(true)
        dateChange&&props.refresh(jalon.id);
    };

    const deleteJalon = () => {
        modJalon(`/api/v1/jalon/${jalon.id}`, {}, {}, 'DELETE');
        props.refresh(jalon.id)
    };

    const completeJalon = () => {
        modJalon(`/api/v1/jalon/${jalon.id}`, {}, {...jalon, ...{etat:'complet'}}, 'PUT');
        setJalon({...jalon, ...{etat:'complet'}})
        
    };

    const reactivateJalon = () => {
        modJalon(`/api/v1/jalon/${jalon.id}`, {}, {...jalon, ...{etat:'travail'}}, 'PUT');
        setJalon({...jalon, ...{etat:'travail'}})
    }

    const changeDateJalon = ({target}) => {
        modJalon(`/api/v1/jalon/${jalon.id}`, {}, {...jalon, ...{date:target.value}}, 'PUT');
        target.value !== jalon.date&&setDateChange(true)
       
    }    


    return (
        <Box  borderWidth='1px' 
            borderRadius='lg' 
            overflow='hidden' 
            padding='10px' 
            margin='1.5' 
            bg={jalon.etat==='complet'?'gray':props.user&&icons[props.user.service].bg}>
            
                
                <Grid   templateRows='repeat(2)'
                        templateColumns='repeat(3, 175px) auto'
                        gap={1}>
                    <GridItem margin={param.margin}>{props.user&&icons[props.user.service].icon}</GridItem>
                    {props.projet?<GridItem margin={param.margin}>{props.projet.no_projet}</GridItem>:
                    props.contrat?<GridItem margin={param.margin}>{props.contrat.no}</GridItem>:<GridItem/>
                    }                    
                    <GridItem margin={param.margin}>{props.user&&props.user.username}</GridItem>
                    <GridItem><IconButton icon={!activated?<FcSettings/>:<FcFeedIn/>} size='sm' bg={props.user&&icons[props.user.service].bg} onClick={activateChange}></IconButton></GridItem>
                    {props.projet?<GridItem fontSize='sm' margin={param.margin}>{props.projet.desc}</GridItem>:
                    props.contrat?<GridItem fontSize='sm' margin={param.margin}>{props.contrat.desc}</GridItem>:<GridItem/>
                    } 
                    
                    <GridItem fontSize='sm' margin={param.margin}>{props.jalon.commentaire}</GridItem>
                    <GridItem margin={param.margin}><InputDuree jalon={props.jalon} incrementDuree={props.incrementDuree}/></GridItem>
                    
                    {activated&&
                    <><GridItem>
                        <Select size='xs' onChange={changeDateJalon} defaultValue={jalon.date}>
                            {props.events.filter(event => event.title === jalon.jalon).map(item => 
                                <option value={item.date} key={item.id}>{item.date}</option>
                            )}
                        </Select>
                        <HStack gap='2'>
                        <IconButton icon={jalon.etat!=='complet'?
                                            <CheckCircleIcon/>:
                                            <MdRestorePage/>}
                                    title={jalon.etat!=='complet'?
                                            'Fermer le jalon':
                                            'Reactiver le jalon'}
                                    size='xs' 
                                    bg='green'
                                    onClick={jalon.etat!=='complet'?completeJalon:
                                            reactivateJalon}
                                    Tooltip='test'/>
                        <DeleteJalonAlert title='Abandonner le jalon'                                
                                    
                                    applyDelete={deleteJalon}/>
                        </HStack>    
                        
                    </GridItem>
                    <GridItem>
                        
                    </GridItem>
                    </>}
                
                </Grid>           
             

        </Box>
    )
}