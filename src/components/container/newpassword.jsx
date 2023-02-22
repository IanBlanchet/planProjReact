import { useEffect, useState, useContext } from 'react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { modJalon } from '../util';
import { useNavigate, Navigate, Link, useParams, useSearchParams } from "react-router-dom";
import { AuthContext } from '../../auth';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  VStack,
  InputLeftElement,
  chakra,
  Box,  
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export function NewPassword()  {

    const [newPass, setNewPass] = useState();
    const [secondNewPass, setSecondNewPass] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    
    let [searchParams] = useSearchParams();
    
    
    const toast = useToast({                
        position: '',
        duration: 1000,
        isClosable: true
      });

    const handleChangePass = () => { 
        
        if (newPass !== secondNewPass) {
            {toast({status:'error', description:'Les deux mots passe ne correspondent pas'})};
            return
        }
        modJalon('/api/v1/resetPassword', {}, {'newPass':newPass, 'email':searchParams.get('email'), 'token':searchParams.get('token')}, 'POST').then(
            (returnData) => {
                    if (returnData.user) {                              
                            toast({status:'success', description:'Mot de passe remplacé avec succès'});                            
                            navigate('/')                                                                    
                                                                                               
                    } else {
                            toast({status:'error', description:'une erreur s\'est produite'});
                            
                    }
                    
            }
    )
 
    }

    const handleShowClick = () => setShowPassword(!showPassword);
      
    const handleNewPassChange = (e) => {
        setNewPass(e.target.value)
        
      }

      const handleSecondNewPassChange = (e) => {
        setSecondNewPass(e.target.value)
        
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
                
                <Heading color="blue.400">Entrer un nouveau mot de passe</Heading>
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
                            children={<CFaLock color="gray.300" />}
                          />
                          <Input id='leBonInput1' placeholder='Nouveau mot de passe' name='newPassword' value={newPass} onChange={handleNewPassChange} autoComplete='newpassword' type={showPassword ? "text" : "password"}/>
                          <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                              {showPassword ? "Masquer" : "Afficher"}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                      <FormControl>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            color="gray.300"
                            children={<CFaLock color="gray.300" />}
                          />                       
                          <Input id='leBonInput2' placeholder='Entrer à nouveau' name='secondNewPass' value={secondNewPass} onChange={handleSecondNewPassChange} type={showPassword ? "text" : "password"} />
                        
                        </InputGroup>                    
                      </FormControl>
                      <Button colorScheme='blue' mr={3} onClick={handleChangePass}>
                        Réinitialiser
                      </Button>
                    </Stack>
                  </form>
                </Box>
              </Stack>
          
            </Flex>
       
          
        </>
        

      
    )


}