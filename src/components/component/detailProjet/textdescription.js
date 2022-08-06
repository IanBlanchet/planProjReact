import { Box, HStack, Grid, GridItem, Input, IconButton, Text, List, ListItem, ListIcon, OrderedList, UnorderedList, Heading } from '@chakra-ui/react';
import { FcPlus } from "react-icons/fc";
import { useState, useEffect } from 'react';


export function EditTextDescriptif(props) {

    const [detail, setDetail] = useState([])

    
    const handleClick = () => {
        let newDetail = [...detail];
        setDetail([]);
        newDetail = [...newDetail, ' ']
        console.log(newDetail)
        setDetail(newDetail);
    }

    const handleChange = (e) => {
     
        //update detail state
        let editDetail = [...detail];
        setDetail([])        
        editDetail[e.target.getAttribute('index')] = e.target.value;        
        setDetail(editDetail);
        //update nature
        let editNature = {};
        editNature[props.titre] = editDetail
        props.updateNature(editNature);

    }

    useEffect( () => {
       
       setDetail(props.detail);       
         
    },[props])

    return (
        <Box>
        {!props.isChecked?
            <Box>
                <Heading size='md'>{props.titre}</Heading><UnorderedList fontSize='md'>{detail.map(item => <ListItem key={item}>{item}</ListItem>)}</UnorderedList>
            </Box>:
            <Box>
                <Heading size='md' >{props.titre}</Heading><UnorderedList fontSize='md'>{detail.map((item, index) => <ListItem key={index}>
                                        <Input size='sm' type='text' name={props.titre} index={index} value={item} onChange={handleChange}/></ListItem>)}</UnorderedList><IconButton icon={<FcPlus/>} onClick={handleClick}/>
            </Box>
        }
        </Box>
        
    )
}
