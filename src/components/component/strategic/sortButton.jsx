import { useState } from 'react';
import { Button } from '@chakra-ui/react'
import { FcExpand, FcCollapse } from "react-icons/fc";


export const SortButton = ({level, value, title, onClick}) => {
    const [sortDirection, setSortDirection] = useState(true)

    const handleOnClick = ({target}) => {
        onClick(target, sortDirection);
        setSortDirection(sortDirection?false:true)
    }

    return (

        <Button size='sm' variant='solid' colorScheme='yellow' level={level} value={value} onClick={handleOnClick}>
            {title}{sortDirection?<FcExpand/>:<FcCollapse/>}
        </Button>
            
    )

    }