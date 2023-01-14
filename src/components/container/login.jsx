import { useEffect, useState, useContext } from 'react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { postLogin } from '../util';
import { useNavigate, Navigate } from "react-router-dom";
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
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export function Login()  {

    if (sessionStorage.user) {
        return <Navigate to="/acceuil" replace />
    }
    const [userInfo, setUserInfo] = useState({'username':'', 'password':''});
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    let auth = useContext(AuthContext);
    const toast = useToast({                
        position: '',
        duration: 1000,
        isClosable: true
      });

    const handleLogin = () => { 
        postLogin('/api/v1/autorize', {}, userInfo).then(
            (returnData) => {
                    if (returnData.user) {                              
                            toast({status:'success', description:'bienvenue '+returnData.user.username});
                            sessionStorage.token = returnData.token;
                            sessionStorage.user = JSON.stringify(returnData.user) 
                            auth.signin(returnData.user);
                            navigate('/acceuil')                                                                    
                                                                                               
                    } else {
                            toast({status:'error', description:returnData.message});
                            navigate('/') 
                    }
                    
            }
    )
 
    }

    const handleShowClick = () => setShowPassword(!showPassword);
      
    const handleUserChange = (e) => {
        setUserInfo({...userInfo ,'username':e.target.value})
        
      }
      const handlePassChange = (e) => {
        setUserInfo({...userInfo ,'password':e.target.value})
        
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
                <Avatar bg="blue.500" />
                <Heading color="blue.400">Bienvenue</Heading>
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
                          <Input id='leBonInput1' placeholder='Nom usager' name='name' value={userInfo.username} onChange={handleUserChange} autoComplete='username'/>
                        </InputGroup>
                      </FormControl>
                      <FormControl>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            color="gray.300"
                            children={<CFaLock color="gray.300" />}
                          />                       
                          <Input id='leBonInput2' placeholder='Mot de passe' name='pass' value={userInfo.password} onChange={handlePassChange} type={showPassword ? "text" : "password"} />
                          <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                              {showPassword ? "Masquer" : "Afficher"}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormHelperText textAlign="right">
                        <Link href='https://planproj.herokuapp.com/reset_password_request' isExternal>Mot de passe oublié?</Link>
                        </FormHelperText>
                      </FormControl>
                      <Button colorScheme='blue' mr={3} onClick={handleLogin}>
                        Login
                      </Button>
                    </Stack>
                  </form>
                </Box>
              </Stack>
              <Box>
              Pas encore inscrit?{" "}
                <Link color="blue.500" href='https://planproj.herokuapp.com/register' isExternal >
                  Enregistrement
                </Link>
              </Box>
            </Flex>
       
          
        </>
        

      
    )


}


