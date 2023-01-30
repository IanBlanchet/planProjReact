
import { modJalon } from '../../../util';
import { IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons'



export function DeleteButton({identifiant, type, projet_id, listSources, handleDelete}) {

    const handleClick = () => {        

        if (type === 'reglements') {
            const idReglement = listSources.find(item => item.numero === identifiant).id
            modJalon('/api/v1/affectefinance', {}, {'reglements':{'id':idReglement, 'projet':projet_id}}, 'DELETE');            
        } else if (type === 'subventions') {
            const idSubvention = listSources.find(item => item.nomProg === identifiant).id
            modJalon('/api/v1/affectefinance', {}, {'subventions':{'id':idSubvention, 'projet':projet_id}}, 'DELETE')
        } else if (type === 'fonds') {
            const idFonds = listSources.find(item => item.nom === identifiant).id
            modJalon('/api/v1/affectefinance', {}, {'fonds':{'id':idFonds,'projet':projet_id}}, 'DELETE')
        }
        handleDelete(type, identifiant )
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