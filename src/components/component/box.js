import { Box } from '@chakra-ui/react';
import { FcGlobe, FcEditImage, FcVlc } from "react-icons/fc";

const icons = {
    TP:<FcVlc/>,
    ING:<FcEditImage/>,
    ENV:<FcGlobe/>
}

export function JalonDetail(props) {

    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            {props.user&&icons[props.user.service]}
            <p>{props.projet&&props.projet.no_projet}</p>

        </Box>
    )
}