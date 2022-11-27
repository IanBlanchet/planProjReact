import { useEffect, useState, useReducer} from 'react';
import { modJalon } from '../../util';
import { Box, HStack, Grid, GridItem, Input, IconButton, Select, Tooltip } from '@chakra-ui/react';
import { FcGlobe, FcEditImage, FcVlc, FcSynchronize } from "react-icons/fc";
import { InputDuree } from '../events/dureeinput';
import { DeleteJalonAlert } from '../common/alert';
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

const reducer = (state, action) => {
    switch (action.type) {
        case "edit":
          for (const key in state) {
            if (key === action.param) {
                const newValue = {}
                newValue[key] = action.value
                console.log({...state, ...newValue})
                modJalon(`/api/v1/jalon/${action.id}`, {}, {...state, ...newValue}, 'PUT');
                return {...state, ...newValue}
            }
          }     
        
        case "delete":
            modJalon(`/api/v1/jalon/${action.id}`, {}, {}, 'DELETE');
            return state
        
        default:
          return state;
      }
}

export function JalonDetail(props) {
    
    const [jalon, dispatch] = useReducer(reducer, props.jalon);    
        

    const deleteJalon = () => {
        dispatch({ type: "delete", id: jalon.id })        
        props.refresh('delete',jalon)
    };

    const completeJalon = () => {
        dispatch({ type: "edit", id: jalon.id, param:'etat', value:'complet' })
        
        
    };

    const reactivateJalon = () => {
        dispatch({ type: "edit", id: jalon.id, param:'etat', value:'travail' })
        
    }  

    const changeDate = ({target}) => {
        dispatch({ type: "edit", id: jalon.id, param:'date', value:target.value })
    }


    return (
        <Grid templateColumns='1fr 1fr 10fr'>
        <Box 
            borderWidth='1px 0px 1px 1px'
             
            borderRadius='lg' 
            overflow='hidden' 
            padding='5px'            
            bg='#fefde6'
            
            >
        <Input position='relative' top='50%' type='date' value={jalon.date} onChange={changeDate} size='xs' onKeyDown={(e) => e.preventDefault()}/>
        
        </Box>
        <Box 
            borderWidth='1px 1px 1px 0px' 
            borderRadius='lg' 
            overflow='hidden' 
            padding='5px'            
            bg='#fefde6'
            >
        <Box position='relative' top='50%'>{jalon.jalon}</Box>
        
        </Box>



        <Box  borderWidth='1px' 
            borderRadius='lg' 
            overflow='hidden' 
            padding='10px' 
            margin='0.5' 
            bg={jalon.etat==='complet'?'gray':props.user&&icons[props.user.service].bg}>
            
                
                <Grid   templateRows='repeat(2)'
                        templateColumns='repeat(3, 175px) auto'
                        gap={1}>

                    <GridItem margin={param.margin}>{props.user&&icons[props.user.service].icon}</GridItem>
                    {props.projet?<GridItem margin={param.margin}>{props.projet.no_projet}</GridItem>:
                    props.contrat?<GridItem margin={param.margin}>{props.contrat.no}</GridItem>:<GridItem/>
                    }
                    <GridItem></GridItem>                   
                    
                    
                    {props.projet?<GridItem fontSize='sm' margin={param.margin}>{props.projet.desc}</GridItem>:
                    props.contrat?<GridItem fontSize='sm' margin={param.margin}>{props.contrat.desc}</GridItem>:<GridItem/>
                    } 
                    <GridItem margin={param.margin}>{props.user&&props.user.username}</GridItem>
                    
                    
                    <GridItem margin={param.margin}><InputDuree jalon={props.jalon} incrementDuree={props.incrementDuree}/></GridItem>
                    
                    
                    <GridItem>
                        
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
                

                    <GridItem fontSize='sm' margin={param.margin}>{props.jalon.commentaire}</GridItem>
                    
                
                </Grid>           
             

        </Box>
        </Grid>
    )
}