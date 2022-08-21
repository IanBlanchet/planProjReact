
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Checkbox,      
  } from '@chakra-ui/react';
import { Button, Input, FormControl, IconButton, Link, Text, Box, InputLeftAddon } from '@chakra-ui/react';
import {postLogin } from "../util";
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { GrPowerShutdown, GrMore, GrMemory } from 'react-icons/gr';
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useFormik, Formik, Form,  } from 'formik';
import { MyTextInput, MySelect, MyCheckbox } from './common/forms';


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
              <Text marginBottom='5px' fontFamily='serif' fontSize='xx-large'>Bonjour {sessionStorage.username}</Text>
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


export function EstimateurRessources({projet, applyEstimation}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tempsCharge, setTempsCharge] = useState(0);
  const [tempsTech, setTempsTech] = useState(0)


  const handleClickApply = () => {
    applyEstimation(tempsCharge, tempsTech);
    setTempsCharge(0);
    setTempsTech(0);
    onClose();
  }




  return (
    <>
      <Button size='sm' onClick={onOpen} leftIcon={<GrMemory/>} bg='blue.100' margin='2'>estimateur</Button>
      <Modal          
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        
        <ModalContent>
        
          <ModalHeader colorScheme>Estimateur de ressources</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody pb={6} >
            

          <Formik
          initialValues={{            
            montant: 0,
            externe: false, 
            

          }}       
          
          onSubmit={(values, actions) => {
              //applique la formule logarithmique selon le cas
              let tempsChargeEstime = ((-94.86*(Math.log(values.montant*1000000))+1621)*values.montant);
              let tempsTechEstime = ((-101.8*(Math.log(values.montant*1000000))+1937.2)*values.montant);
              let tempsChargeEstimeParc = ((-132.2*(Math.log(values.montant*1000000))+2196.9)*values.montant);
              let tempsTechEstimeParc = ((-192.6*(Math.log(values.montant*1000000))+3178.9)*values.montant)
              console.log(projet.cat, projet.cat === 'Parcs, espaces verts, loisirs, culture')
              if (!values.externe && !(projet.cat === 'Parcs, espaces verts, loisirs, culture')) {
                tempsChargeEstime = tempsChargeEstime.toFixed(0);
                tempsTechEstime = tempsTechEstime.toFixed(0);
                setTempsCharge(tempsChargeEstime);
                setTempsTech(tempsTechEstime);
              } else if (values.externe && !(projet.cat === 'Parcs, espaces verts, loisirs, culture')) {
                tempsChargeEstime = (tempsChargeEstime*.8).toFixed(0);
                tempsTechEstime = (tempsTechEstime*.4).toFixed(0);
                setTempsCharge(tempsChargeEstime);
                setTempsTech(tempsTechEstime);
              } else if (!values.externe && projet.cat === 'Parcs, espaces verts, loisirs, culture') {
                tempsChargeEstimeParc = tempsChargeEstimeParc.toFixed(0);
                tempsTechEstimeParc = tempsTechEstimeParc.toFixed(0);
                setTempsCharge(tempsChargeEstimeParc);
                setTempsTech(tempsTechEstimeParc);
              } else {
                tempsChargeEstimeParc = (tempsChargeEstimeParc*.8).toFixed(0);
                tempsTechEstimeParc = (tempsTechEstimeParc*.4).toFixed(0);
                setTempsCharge(tempsChargeEstimeParc);
                setTempsTech(tempsTechEstimeParc);
              }
              
              actions.setSubmitting(false);                         
            
          }}
        >
        

            <Form>
              
            <MyTextInput
              label='Valeur total du projet (en million)'
              name='montant'
              type='number'  
              />
                         
            
              <MyCheckbox name='externe'>
                mandat externe
              </MyCheckbox>
            <Button colorScheme='blue' mr={3} type='submit'>
              Lancer l'estimation
            </Button>
          
            </Form>
          </Formik>

            <Box>Temps chargé de projet estimé : {tempsCharge}</Box>
            <Box>Temps technicien estimé : {tempsTech}</Box>
          </ModalBody>
          
          <ModalFooter>
            
            
           
            <Button onClick={handleClickApply} colorScheme='green'>Appliquer au projet</Button>
          </ModalFooter>
        </ModalContent>
      
      </Modal>
    </>
  )
}





  