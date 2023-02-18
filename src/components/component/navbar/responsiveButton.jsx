
import { Show, Button } from '@chakra-ui/react';




export const ResponsiveButton = (props) => {

    return (

            <Button leftIcon={props.children} variant='solid' borderWidth={1} borderColor="white">
               <Show above='1024px'>
                    <>{props.text}</>
                </Show> 
            </Button>


    )
}
