import { Button, ButtonGroup} from '@chakra-ui/react';
import { GrList, GrSchedules, GrUserAdmin, GrMoney, GrTable, GrFlag, GrVulnerability, GrAnchor, GrFormDown } from 'react-icons/gr'
import { ResponsiveButton } from './responsiveButton';
import { Outlet, Link } from 'react-router-dom';

export const ElusButtonGroup = () => {

    return (

        <ButtonGroup spacing='4' variant='outline' size='sm'>
              
                <Link to='/pti'><ResponsiveButton text='Pti'><GrMoney/></ResponsiveButton></Link>
                <Link to='/strategique'><ResponsiveButton text='Dossiers stratégiques'><GrVulnerability/></ResponsiveButton></Link>                 
          
                  
            </ButtonGroup>
    )
}