import { useContext } from 'react';
import { Flex, Spacer, Box, Button, ButtonGroup, Image, HStack, List, ListItem, ListIcon} from '@chakra-ui/react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,    
  } from '@chakra-ui/react'
import { Connexion } from '../component/modal'
import { GrList, GrSchedules, GrUserAdmin, GrMoney, GrTable, GrFlag, GrVulnerability, GrAnchor, GrFormDown } from 'react-icons/gr'
import logo from '../../static/logo.png';
import { Outlet, Link } from 'react-router-dom';
import { Show, Hide } from '@chakra-ui/react'



const ResponsiveButton = (props) => {

    return (

            <Button leftIcon={props.children} variant='solid' borderWidth={1} borderColor="white">
               <Show above='1024px'>
                    <>{props.text}</>
                </Show> 
            </Button>


    )
}




/** 
* Create a navigation bar with login button.
* @param {} 
* @return {React Component} A React component.
*/
export function NavBar() {
   
    


    return (
        <>
        <Flex bg='blue.800' h='12' padding='1'>
            <Image  borderRadius='2px' boxSize='40px' margin='1px' src={logo} alt="logo" />
            <Spacer />
            <ButtonGroup spacing='4' variant='outline' size='sm'>
                <Menu >
                    <MenuButton
                        as={Button}                       
                        variant='solid'
                        borderColor="white"                                          
                    >
                        <HStack spacing='2'><GrFlag/><div><Show above='1024px'>Lists</Show></div><GrFormDown /></HStack>
                    </MenuButton>
                    <MenuList zIndex='2' border='1px' borderColor="gray"  >
                        <List>
                            <MenuItem><ListIcon as={GrList}/><Link to='/listjalons'>Jalons</Link></MenuItem>
                            <MenuItem><ListIcon as={GrList}/><Link to='/allprojet'>Projets</Link></MenuItem>
                            <MenuItem><ListIcon as={GrList}/>Contrats</MenuItem>
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
            <Spacer/>

            <Connexion />
        </Flex>
                
        <Outlet/>
       
        </>
    )
}
