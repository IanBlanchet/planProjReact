import { Flex, Spacer, Box, Button, ButtonGroup} from '@chakra-ui/react'
import { Connexion } from '../component/modal'
import { TriangleDownIcon } from '@chakra-ui/icons'
import { GrTextAlignLeft } from 'react-icons/gr'
import { GrSchedules } from 'react-icons/gr'
import { useToast } from '@chakra-ui/react';
import logo from '../../static/logo.png'

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
    

    const handleClick = (e) => {            
        sessionStorage.getItem('isLogin')==='true'? props.onMenuSelect(e.target.value): toast({description:'Vous devez vous logger.'});
    }

    


    return (
        <Flex bg='#022958' h='12' padding='1'>
            <Box fontFamily='fantasy' bg='blue.200' w='50px' ><img src={logo}  alt="logo" /></Box>
            <Spacer />
            <ButtonGroup spacing='4' variant='outline' size='sm'>           
                <Button leftIcon={<GrTextAlignLeft />} onClick={handleClick} value='suiviProjet' variant='solid' borderWidth={1} borderColor="white">Suivi projet</Button>
                <Button leftIcon={<GrSchedules />} onClick={handleClick} value='evenement' variant='solid' borderWidth={1} borderColor="white">Évènement</Button>
                
            </ButtonGroup>
            <Spacer/>        
            
            <Connexion onLogin={props.onLogin} onLogout={props.onLogout}/>

        </Flex>
    )
}

