import { useState, useEffect, useContext } from 'react';
import {Radio, RadioGroup, FormControl, FormLabel, Stack, Box, IconButton, Heading, Input, Link, Icon } from '@chakra-ui/react';
import {Grid, GridItem} from '@chakra-ui/react'
import { TextDescriptifInput } from './textDescriptifInput';
import { FcSettings, FcFeedIn } from "react-icons/fc";
import { BaseDataContext } from '../../../../auth';
import { SiMicrosoftsharepoint } from "react-icons/si";



export function DescriptionGen({projet, updateNature}) {

    const {blanckNature} = useContext(BaseDataContext)
    const [isChecked, setIschecked] = useState(false);
    const [nature, setNature] = useState(blanckNature);     

    
    const saveChange = () => {
        setIschecked(isChecked?false:true);
        updateNature(nature)        
        
    }

    const updateDescriptif = (data) => {
        let newNature = {...nature};
        newNature = {...newNature, ...data}
        setNature(newNature);     
               
    }

    const updateStrategic = (value) => {
        let newNature = {...nature};
        let booleanValue = value === 'true'?true:false
        newNature = {...newNature, 'isStrategic':booleanValue}
        setNature(newNature);               
        updateNature(newNature); 
    }

    const updateSharepoint = (e) => {
        let newNature = {...nature};
        newNature = {...newNature, 'sharepoint':e.target.value}
        setNature(newNature);
        updateNature(newNature)
    }

    useEffect(() => {
        setNature(!projet.nature?blanckNature:{...blanckNature, ...projet.nature});        
                        
    },[projet])
    

    return (
        
    
        <GridItem  gridRow='1 / span 3' gridColumn='1 /span 1'>
            <Box maxW='md' padding='5' borderWidth='2px' borderRadius='lg'  >
                        <Heading size='lg' marginBottom='2'>Description générale <IconButton onClick={saveChange} variant={isChecked?'solid':'outline'} colorScheme='whiteAlpha' icon={!isChecked?<FcSettings/>:<FcFeedIn/>}/></Heading>
                        
                        <Stack orientation='vertical'>
                        {isChecked?<Input type='text' value={nature.sharepoint} onChange={updateSharepoint}></Input>:                    
                            <Link   variant="underline"
                                    href={nature.sharepoint}
                                    colorPalette="teal"
                                    isExternal>
                                <Icon fontSize="25px" color="teal"><SiMicrosoftsharepoint/></Icon>
                            </Link> }
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
                        <TextDescriptifInput name='nature' label='Description/Nature' detail={nature.nature} updateNature={updateDescriptif} isChecked={isChecked}/>
                        <TextDescriptifInput name='justification' label='Justifications' detail={nature.justification} updateNature={updateDescriptif} isChecked={isChecked}/>
                        <TextDescriptifInput name='refus' label='Conséquences du refus' detail={nature.refus} updateNature={updateDescriptif} isChecked={isChecked}/>
                        </Stack>
                        
            </Box> 
        </GridItem>



    
        
        
    )
}