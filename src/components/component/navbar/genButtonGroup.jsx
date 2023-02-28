import { Button, ButtonGroup, HStack, List,  ListIcon} from '@chakra-ui/react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem   
  } from '@chakra-ui/react';
import { Show, Hide } from '@chakra-ui/react';
import { Outlet, Link } from 'react-router-dom';
import { GrList, GrSchedules, GrUserAdmin, GrMoney, GrTable, GrFlag, GrVulnerability, GrAnchor, GrFormDown } from 'react-icons/gr'
import { ResponsiveButton } from './responsiveButton';

export const GenButtonGroup = () => {

    return (

        <ButtonGroup spacing='4' variant='outline' size='sm'>
                <Menu >
                    <MenuButton
                        as={Button}                       
                        variant='solid'
                        borderColor="white"                                          
                    >
                        <HStack spacing='2'><GrFlag/><div><Show above='1024px'>Listes</Show></div><GrFormDown /></HStack>
                    </MenuButton>
                    <MenuList zIndex='2' border='1px' borderColor="gray"  >
                        <List>
                            <MenuItem><ListIcon as={GrList}/><Link to='/listjalons'>Jalons</Link></MenuItem>
                            <MenuItem><ListIcon as={GrList}/><Link to='/allprojet'>Projets</Link></MenuItem>
                            <MenuItem><ListIcon as={GrList}/><Link to='/allcontrat'>Contrats</Link></MenuItem>
                        </List>                       
                    </MenuList>
                </Menu>                
                <Link to='/suiviprojet'><ResponsiveButton text='Suivi projets'><GrAnchor /></ResponsiveButton></Link>       
                <Link to='/evenement'><ResponsiveButton text='Évènement'><GrSchedules /></ResponsiveButton></Link>  
                <Link to='/detailprojet' ><ResponsiveButton text='Détail projet'><GrTable/></ResponsiveButton></Link>
                <Link to='/pti'><ResponsiveButton text='Pti'><GrMoney/></ResponsiveButton></Link>
                <Link to='/strategique'><ResponsiveButton text='Dossiers stratégiques'><GrVulnerability/></ResponsiveButton></Link>                 
                {   
                    sessionStorage.user&&
                    (JSON.parse(sessionStorage.user)).username=== 'Ian'&&
                    <Link to='/admin'><Button leftIcon={<GrUserAdmin />}  variant='solid' borderWidth={1} borderColor="white">Admin</Button></Link>
                }             
                  
            </ButtonGroup>
    )
}