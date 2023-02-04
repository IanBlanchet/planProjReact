import { IconButton } from '@chakra-ui/react';
import { FcDeleteRow } from "react-icons/fc";


export function ButtonRemoveService({service, updateService}) {

    const handleClick = () => {

        updateService(service, false)
    }
    


    return (
        <IconButton                                                                                                                                       
            size='xs'
            icon={<FcDeleteRow />}                                                                                          
            onClick={handleClick}
            />
    )
}