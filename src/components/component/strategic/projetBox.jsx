import { useEffect, useState, useReducer} from 'react';
import { modJalon } from '../../util';
import { AddPointage } from '../modal';
import { Box, Flex, Badge, HStack, Grid, GridItem, Input, Tag, FormLabel, Tooltip, Textarea, Text, TagLabel, Avatar, } from '@chakra-ui/react';
import { FcGlobe, FcEditImage, FcVlc, FcSynchronize } from "react-icons/fc";
import GaugeChart from 'react-gauge-chart'
import { Link } from 'react-router-dom';
import { InputDuree } from '../events/dureeinput';
import { DeleteJalonAlert } from '../common/alert';
import { CheckCircleIcon, CloseIcon} from '@chakra-ui/icons'
import { MdRestorePage } from "react-icons/md";
import { Events } from '../../container/events';
import { GrWindows } from 'react-icons/gr';





const param = {
    size:25,
    margin:'10px',
}

const icons = {
    TP: {icon:<FcVlc size={param.size}/>, bg:'orange.300'},
    ING: {icon:<FcEditImage size={param.size}/>, bg:'blue.300'},
    ENV: {icon:<FcGlobe size={param.size}/>, bg:'green.300'},
    GEN: {icon:<FcSynchronize size={param.size}/>, bg:'gray.300'}
}

const User = ({user}) => {

    return (
        <Tag size='lg' colorScheme='blue' borderRadius='full'>
            <Tag
                colorScheme='yellow'
                size='sm'
                borderRadius='full'
                ml={-1}
                mr={2}
            >
                <TagLabel>{user.service}</TagLabel> 
            </Tag>
        <TagLabel>{user.username}</TagLabel>
        
        </Tag>

    )
}




const reducer = (state, action) => {
    switch (action.type) {
        case "edit":
          for (const key in state) {
            if (key === action.param) {
                const newValue = {}
                newValue[key] = action.value                
                modJalon(`/api/v1/projet/${action.id}`, {}, {...state, ...newValue}, 'PUT');
                return {...state, ...newValue}
            }
          }     
        
        case "editNature":
            for (const key in state.nature) {
                if (key === action.param) {
                    let updatedState = {...state}
                    let newNature = {...state.nature};
                    newNature[key] = action.value;
                    updatedState.nature = newNature 
                    modJalon(`/api/v1/projet/${action.id}`, {}, {'nature': newNature}, 'PUT');
                    return updatedState
                }
                
            }
        default:
          return state;
      }
}

export function ProjetBox(props) {
    
    const [projet, dispatch] = useReducer(reducer, props.projet);    
        
    const updateNotes = ({target}) => {
        dispatch({type: 'editNature', id:projet.id, param:'notes', value:target.value});                      
      }

    const updateEcheance = ({target}) => {
        dispatch({type: 'editNature', id:projet.id, param:'echeance', value:target.value});                      
      }
    


    useEffect(() => {

    }, [props])


    return ( 



        <Box  
            borderWidth='1px' 
            borderRadius='lg' 
            overflow='auto'
            padding='10px' 
            margin='0.75' 
            bg='blue.200'
            width='full'
            boxShadow='md'
            
            
            >            
                
                <Grid   templateRows='1fr 1fr'
                        templateColumns='1fr 1fr 1fr 2.5fr'
                        templateAreas=' "no chart nom notes" 
                                        "description services echeance notes" '
                        gap='1px'
                        
                     
                        >

                    
                    <GridItem  gridArea='no'  >
                        <Link to={`/detailprojet/${projet.id}`} >
                            <Tag size='lg' variant='solid' bg='blue.400' value={projet.id} boxShadow="md">
                                {projet.no_projet}
                            </Tag>
                        </Link>
                    </GridItem>

                    <GridItem gridArea='chart'  justifySelf='left' boxShadow='md'>
                        <GaugeChart
                            style={{ width:'200px'}}       
                            id={projet.id}
                            nrOfLevels={20}
                            hideText={false}
                            arcWidth={0.3}
                            animate={false}
                            percent={(projet.nature.avancement)/100}
                            textColor='blue.500'
                            colors={['#2185d0', '#21ba45']}
                            
                            
                        />
                    </GridItem>
                    
                    <GridItem gridArea='description'><Text fontSize='lg'as='b'>{projet.desc}</Text></GridItem>

                    <GridItem margin={param.margin} gridArea='notes' width='full' rowSpan='2' >
                        <Textarea name={projet.id} size='sm' value={projet.nature?projet.nature.notes:''} onChange={updateNotes} bg='whiteAlpha.700' ></Textarea>
                    </GridItem>

                    <GridItem margin={param.margin} gridArea='nom'><User user={props.user} /></GridItem>

                    <GridItem fontSize='sm' margin={param.margin}  gridArea='services' >
                        <Flex gap='1' direction='row' wrap='wrap'>
                            {projet.nature.services.map(item => 
                                <Badge colorScheme='yellow'>{item}</Badge>)
                            }
                        </Flex>
                    </GridItem>
                    
                    <GridItem margin={param.margin} width='100px' gridArea='echeance' >
                        <FormLabel htmlFor='echeance'>Échéance</FormLabel>
                        <Text >{projet.nature?projet.nature.echeance:''}</Text>
                    </GridItem>
                   
                    
                    
                
                </Grid>           
             

        </Box>
       
    )
}

//replace text for echeance with : <Input bg='whiteAlpha.600' type='date' name='echeance' size='xs' value={projet.nature?projet.nature.echeance:''} onChange={updateEcheance} onKeyDown={(e) => e.preventDefault()}></Input>