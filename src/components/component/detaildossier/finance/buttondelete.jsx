
import { modJalon } from '../../../util';
import { IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons'



export function DeleteButton({identifiant, categorie, projet_id, listSources, handleDelete}) {

    const handleClick = () => { 
        
        let itemToDelete = {}
        itemToDelete[categorie] = {'id': identifiant, 'projet':projet_id};
        modJalon('/api/v1/affectefinance', {}, itemToDelete, 'DELETE')     
        handleDelete(categorie, identifiant )
    }
    


    return (
        <IconButton
            colorScheme='red'                                                                                                                              
            size='xs'
            icon={<CloseIcon />}                                                                                          
            onClick={handleClick}
            />
    )
}