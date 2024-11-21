
import { useEffect } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import {Grid, GridItem} from '@chakra-ui/react'
import { RessourceRequise } from './descriptif/ressource';
import { DescriptionGen } from './descriptif/descriptionGen';

import {  Todo} from '@microsoft/mgt-react';


export function Descriptif({projet, updateNature}) {

    

    useEffect(() => {
        
                        
    },[projet])
    

    return (
        
    <Grid   
        templateRows='1fr 1fr 1fr'
        templateColumns='2fr 2fr 2fr'
        gap='5px'
        >
        <GridItem  gridRow='1 / span 3' gridColumn='1 /span 1'>
            <DescriptionGen projet={projet} updateNature={updateNature}/>
        </GridItem>

        <GridItem  gridRow='1 / span 3' gridColumn='2 /span 1'>

            <RessourceRequise projet={projet} updateNature={updateNature}  />

        </GridItem>

        <GridItem  gridRow='1 / span 3' gridColumn='3 /span 1' justifySelf='end'>
            <Box maxW='md' padding='5' borderWidth='2px' borderRadius='lg' overflow='hidden'>
                <Heading>
                    Localisation (en construction)
                </Heading>
            </Box>
        </GridItem>
        <GridItem>
            <Todo></Todo>
        </GridItem>

    </Grid>
        
        
    )
}



/*<Box maxW='md' padding='5' borderWidth='2px' borderRadius='lg'  >
                        <Heading size='lg' marginBottom='2'>Description générale <IconButton onClick={saveChange} variant={isChecked?'solid':'outline'} colorScheme='whiteAlpha' icon={!isChecked?<FcSettings/>:<FcFeedIn/>}/></Heading>
                        
                        <Stack orientation='vertical'>
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='isStrategic' mb='0'>
                                Stratégique?
                            </FormLabel>
                            <RadioGroup onChange={updateStrategic} value={nature?nature.isStrategic:false}>
                            <Stack direction='row'>
                                <Radio value={true}>Oui</Radio>
                                <Radio value={false}>Non</Radio>                            
                            </Stack>
                            </RadioGroup>
                        </FormControl>
                        <TextDescriptifInput titre='nature' detail={nature.nature} updateNature={updateDescriptif} isChecked={isChecked}/>
                        <TextDescriptifInput titre='justification' detail={nature.justification} updateNature={updateDescriptif} isChecked={isChecked}/>
                        <TextDescriptifInput titre='refus' detail={nature.refus} updateNature={updateDescriptif} isChecked={isChecked}/>
                        </Stack>
                        
            </Box> */