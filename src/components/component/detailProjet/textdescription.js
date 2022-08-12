import { Box, HStack, Grid, GridItem, Input, IconButton, Text, List, ListItem, ListIcon, OrderedList, UnorderedList, Heading } from '@chakra-ui/react';
import { FcPlus } from "react-icons/fc";
import { useState, useEffect } from 'react';



export function EditTextDescriptif({titre, detail, updateNature, isChecked}) {

    const [modDetail, setModDetail] = useState([])
   

    
    const handleClick = () => {
        let newDetail = [...modDetail];
        setModDetail([]);
        newDetail = [...newDetail, ' ']        
        setModDetail(newDetail);
    }

    const handleChange = (e) => {
     
        //update detail state
        let editDetail = [...modDetail];
        setModDetail([])        
        editDetail[e.target.getAttribute('index')] = e.target.value;        
        setModDetail(editDetail);
        //update nature
        let editNature = {};
        editNature[titre] = editDetail
        updateNature(editNature);

    }

    useEffect( () => {
       
       setModDetail(detail);       
         
    },[isChecked, detail])

    return (
        <Box>
        {!isChecked?
            <Box>
                <Heading size='md'>{titre}</Heading><UnorderedList fontSize='md'>{modDetail.map(item => <ListItem key={item}>{item}</ListItem>)}</UnorderedList>
            </Box>:
            <Box>
                <Heading size='md' >{titre}</Heading>
                            <UnorderedList fontSize='md'>{modDetail.map((item, index) => 
                                <ListItem key={index}>
                                    
                                    <Input size='sm' type='text' name={titre} index={index} value={item} onChange={handleChange}/>
                                   
                                </ListItem>)}
                            </UnorderedList>
                            <IconButton icon={<FcPlus/>} onClick={handleClick}/>
            </Box>
        }
        </Box>
        
    )
}
