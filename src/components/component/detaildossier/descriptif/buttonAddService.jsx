
import { IconButton } from '@chakra-ui/react';
import { FcPlus } from "react-icons/fc";


export function ButtonAddService({service, addService}) {

    const handleClick = () => {

        addService(service)
    }
    


    return (
        <IconButton                                                                                                                                       
            size='xs'
            icon={<FcPlus />}                                                                                          
            onClick={handleClick}
            />
    )
}