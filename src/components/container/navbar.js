import { Flex, Spacer, Box, Button, ButtonGroup} from '@chakra-ui/react'
import { Connexion } from '../component/modal'
import { TriangleDownIcon } from '@chakra-ui/icons'
import { GrTextAlignLeft, GrSchedules, GrUserAdmin, GrMoney, GrTable, GrSort, GrFlag, GrVulnerability } from 'react-icons/gr'
import { useToast } from '@chakra-ui/react';
import logo from '../../static/logo.png';
import { Outlet } from 'react-router-dom';
import { AuthStatus } from '../../auth';
import { useNavigate, Link } from 'react-router-dom';

/** 
* Create a navigation bar with login button.
* @param {props} props - props containing function to get data from database on login.
* @return {React Component} A React component.
*/
export function NavBar(props) {
    const toast = useToast({
        status: 'error',
        position: 'top',
        duration: 1000,
        isClosable: true
      })
    const navigate = useNavigate()

    const handleClick = (e) => {  
        console.log('hey')          
        sessionStorage.getItem('user')?navigate(e.value): toast({description:'Vous devez vous logger.'});
    }

    


    return (
        <>
        <Flex bg='#022958' h='12' padding='1'>
            <Box fontFamily='fantasy' bg='blue.200' w='50px' ><img src={logo}  alt="logo" /></Box>
            <Spacer />
            <ButtonGroup spacing='4' variant='outline' size='sm'>
                <Link to='/listjalons'><Button leftIcon={<GrFlag/>} variant='solid' borderWidth={1} borderColor="white">Liste jalons</Button> </Link>
                <Link to='/suiviprojet'><Button leftIcon={<GrFlag />}  variant='solid' borderWidth={1} borderColor="white">Suivi projets</Button></Link>
                <Link to='/evenement'><Button leftIcon={<GrSchedules />}  variant='solid' borderWidth={1} borderColor="white">Évènement</Button></Link>  
                <Link to='/detailprojet'><Button leftIcon={<GrTable/>}  variant='solid' borderWidth={1} borderColor="white">Détail projet</Button></Link>
                <Link to='/pti'><Button leftIcon={<GrMoney/>} variant='solid' borderWidth={1} borderColor="white">Pti</Button></Link>
                <Link to='/strategique'><Button leftIcon={<GrVulnerability/>} variant='solid' borderWidth={1} borderColor="white">Dossiers stratégiques</Button></Link>
                {   
                    sessionStorage.user&&
                    JSON.parse(sessionStorage.user).username=== 'Ian'&&
                    <Link to='/admin'><Button leftIcon={<GrUserAdmin />}  variant='solid' borderWidth={1} borderColor="white">Admin</Button></Link>
                }             
                           
                
                
                
            </ButtonGroup>
            <Spacer/>        
            <Connexion onLogin={props.onLogin} onLogout={props.onLogout}/>
            

        </Flex>
                
        <Outlet/>
       
        </>
    )
}

//<Button leftIcon={<GrSort/>} onClick={handleClick} value='priorisation' variant='solid' borderWidth={1} borderColor="white">Priorisation</Button>
//
//{sessionStorage.username=== 'Ian'&& <Button leftIcon={<GrUserAdmin />} onClick={handleClick} value='admin' variant='solid' borderWidth={1} borderColor="white">Admin</Button>}