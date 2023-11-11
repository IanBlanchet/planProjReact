
import { useReducer} from 'react';
import { modJalon } from '../../util';
import { IconButton, HStack} from '@chakra-ui/react';
import { CheckCircleIcon, CloseIcon} from '@chakra-ui/icons';
import { MdRestorePage } from "react-icons/md";
import { DeleteJalonAlert } from '../common/alert';

const reducer = (state, action) => {
    switch (action.type) {
        case "edit":
          for (const key in state) {
            if (key === action.param) {
                const newValue = {}
                newValue[key] = action.value
                modJalon(`/api/v1/jalon/${action.id}`, {}, {...state, ...newValue}, 'PUT');
                return {...state, ...newValue}
            }
          }     
        
        case "delete":
            modJalon(`/api/v1/jalon/${action.id}`, {}, {}, 'DELETE');
            return state
        
        default:
          return state;
      }
}

export function ActionOnJalon(props)  {

    const [jalon, dispatch] = useReducer(reducer, props.jalon);    
        

    const deleteJalon = () => {        
        dispatch({ type: "delete", id: jalon.id })        
        props.refresh('delete',jalon)
    };

    const completeJalon = () => {
        dispatch({ type: "edit", id: jalon.id, param:'etat', value:'complet' })
        
        
    };

    const reactivateJalon = () => {
        dispatch({ type: "edit", id: jalon.id, param:'etat', value:'travail' })
        
    }  

    const changeDate = ({target}) => {
        dispatch({ type: "edit", id: jalon.id, param:'date', value:target.value })
    }

    return (
        <HStack gap='2'>
        <IconButton icon={jalon.etat!=='complet'?
                                            <CheckCircleIcon/>:
                                            <MdRestorePage/>}
                                    title={jalon.etat!=='complet'?
                                            'Fermer le jalon':
                                            'Reactiver le jalon'}
                                    size='xs' 
                                    bg='green'
                                    onClick={jalon.etat!=='complet'?completeJalon:
                                            reactivateJalon}
                                    />
        <DeleteJalonAlert title='Abandonner le jalon'                                
                                    
                                    applyDelete={deleteJalon}/>
        </HStack>

    )
}