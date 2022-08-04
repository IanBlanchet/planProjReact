
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,      
  } from '@chakra-ui/react';
import { Button, Input, FormControl, IconButton, Link, Text, Box } from '@chakra-ui/react';
import {postLogin } from "../util";
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { GrPowerShutdown, GrMore } from 'react-icons/gr';
import { ExternalLinkIcon } from '@chakra-ui/icons'

export function Connexion(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [user, setUser] = useState({'username':'', 'password':''})
    const toast = useToast({
                            status: 'error',
                            position: 'top-right',
                            duration: 1000,
                            isClosable: true
                          })

    const handleLogin = () => {
      const object = {'username':user.username, 'password':user.password};
      document.body.style.cursor = "wait"
      const data = async () => {        
        postLogin('/api/v1/autorize', {}, object, "POST").then((data) =>
        {
          sessionStorage.token = data.token;
          sessionStorage.username = user.username;
          sessionStorage.msToken = data.msToken;
          sessionStorage.isLogin = true
          setUser({'username':'', 'password':''});
          if (data.isUser === 'false') {
            toast({description:'usager inexistant'})
          } else if (data.isLogged === 'false') {
            toast({description:'mauvais mot de passe'})
          } else {
            toast({status:'success', description:'bienvenue '+user.username});
            onClose();
            props.onLogin()
          };
          document.body.style.cursor = "default"
            
           
        });     
      }
    data();    
    }
    
    const handleLogout = () => {
      sessionStorage.token = "";
      sessionStorage.username = "";
      sessionStorage.isLogin = false;      
      onClose()
      props.onLogout()      
    }

    const handleUserChange = (e) => {
      setUser({...user ,'username':e.target.value})
      
    }
    const handlePassChange = (e) => {
      setUser({...user ,'password':e.target.value})
      
    }
    

    return (
      <>
        <Button size='sm' onClick={onOpen} leftIcon={<GrPowerShutdown/>}>{sessionStorage.isLogin==='false'? 'Connexion': sessionStorage.username}</Button>
        <Modal          
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          
          <ModalContent>
          
            <ModalHeader>{sessionStorage.isLogin==='false'?'Connexion':''}</ModalHeader>
            <ModalCloseButton />
            {sessionStorage.isLogin==='false'?
            (<ModalBody pb={6}>
              <FormControl>
                <Input  placeholder='Nom usager' name='name' value={user.username} onChange={handleUserChange}/>
              </FormControl>              
              <FormControl mt={4}>
                <Input placeholder='Mot de passe' name='pass' value={user.password} onChange={handlePassChange} type='password'/>
              </FormControl>
              <Box marginTop='20px'>
              <Link href='https://planproj.herokuapp.com/register' isExternal >
                Pas encore inscrit?<ExternalLinkIcon mx='2px' />
              </Link>
              </Box>
            </ModalBody>)
            : 
            (<ModalBody>
              <Text marginBottom='5px'>Bonjour {sessionStorage.username}</Text>
              <Link href='https://planproj.herokuapp.com/reset_password_request' isExternal>
                Pour réinitialiser ton mot de passe <ExternalLinkIcon mx='2px' />
              </Link>
            </ModalBody>
            )
            }
            <ModalFooter>
              {sessionStorage.isLogin==='false'?
              <Button colorScheme='blue' mr={3} onClick={handleLogin}>
                Login
              </Button>
              :
              <Button colorScheme='red' mr={3} onClick={handleLogout}>
                Logout
              </Button>
              }
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        
        </Modal>
      </>
    )
  }



  