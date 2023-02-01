import { useContext } from 'react';
import { Flex, Spacer, Box, Button, ButtonGroup, Image} from '@chakra-ui/react'
import { Connexion } from '../component/modal'
import { GrSchedules, GrUserAdmin, GrMoney, GrTable, GrFlag, GrVulnerability, GrAnchor } from 'react-icons/gr'
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
                <Link to='/listjalons'><ResponsiveButton text='Liste jalons'><GrFlag/></ResponsiveButton></Link>
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
