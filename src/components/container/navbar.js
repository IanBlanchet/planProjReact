import { useContext } from 'react';
import { AuthContext } from '../../auth';
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

import { GenButtonGroup } from '../component/navbar/genButtonGroup';
import { ElusButtonGroup } from '../component/navbar/elusButtonGroup';
import { ResponsiveButton } from '../component/navbar/responsiveButton';




/** 
* Create a navigation bar with login button.
* @param {} 
* @return {React Component} A React component.
*/
export function NavBar() {
   
    const value = useContext(AuthContext)
    

    return (
        <>
        <Flex bg='blue.800' h='12' padding='1'>
            <Image  borderRadius='2px' boxSize='40px' margin='1px' src={logo} alt="logo" />
            <Spacer />
                {value.user&&value.user.statut != 'elu'?
                <GenButtonGroup />:<ElusButtonGroup/>}
            <Spacer/>

            <Connexion />
        </Flex>
                
        <Outlet/>
       
        </>
    )
}
