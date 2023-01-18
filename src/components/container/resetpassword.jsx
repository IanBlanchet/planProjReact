import { useEffect, useState, useContext } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import { modJalon } from '../util';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,  
  Avatar,
  FormControl,
  FormHelperText,
  useToast
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const domain = process.env.REACT_APP_URL

const CFaUserAlt = chakra(FaUserAlt);
//const CFaLock = chakra(FaLock);

export function ResetPasswordRequest()  {

    const [email, setEmail] = useState('')
    
    const navigate = useNavigate();

    
    const toast = useToast({                
        position: '',
        duration: 1000,
        isClosable: true
      });

    const handleReset = () => { 
        modJalon('/api/v1/resetPasswordRequest', {}, {'email':email, 'url':domain}, 'POST').then(
          (response) => {
            
            if (response.user) {
              toast({status:'success', description:'Voir tes courriels pour réinitialiser'});
              navigate('/')
            } else {
              toast({status:'error', description:'Il n\'y a pas d\'usager avec ce courriel'})
            }
          }
        )
    }

    const handleCancel = () => {
      navigate('/')
    }

         
    const handleChangeEmail = ({target}) => {
      
      setEmail(target.value)
        
      }
    
      useEffect(() => {
        
      }, [])



    return (
        <>

        <Flex
              flexDirection="column"
              width="100wh"
              height="100vh"
              backgroundColor="gray.200"
              justifyContent="center"
              alignItems="center"
            >
              <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
              >
                
                <Heading color="blue.400">Réinitialiser le mot de passe</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                  <form>
                    <Stack
                      spacing={4}
                      p="1rem"
                      backgroundColor="whiteAlpha.900"
                      boxShadow="md"
                    >
                      <FormControl>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<CFaUserAlt color="gray.300" />}
                          />
                          <Input id='leBonInput1' placeholder='Courriel' name='email' type='email' value={email} onChange={handleChangeEmail} />
                        </InputGroup>
                      </FormControl>
                      
                      <Button colorScheme='blue' mr={3} onClick={handleReset}>
                        Envoyer
                      </Button>
                      <Button colorScheme='blue' mr={3} onClick={handleCancel}>
                        Annuler
                      </Button>
                    </Stack>
                  </form>
                </Box>
              </Stack>
           
            </Flex>
       
          
        </>
        

      
    )

}


