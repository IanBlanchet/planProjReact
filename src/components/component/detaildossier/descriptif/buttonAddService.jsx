
import { IconButton } from '@chakra-ui/react';
import { FcPlus } from "react-icons/fc";


export function ButtonAddService({service, updateService}) {

    const handleClick = () => {

        updateService(service, true)
    }
    


    return (
        <IconButton                                                                                                                                       
            size='xs'
            icon={<FcPlus />}                                                                                          
            onClick={handleClick}
            />
    )
}