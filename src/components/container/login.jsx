import { useEffect, useState, useContext } from 'react';
import { Image} from "@chakra-ui/react"
import { Button, Input, FormControl, IconButton, Link, Text, VStack, useToast } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { postLogin } from '../util';
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from '../../auth';




export function Login()  {

    if (sessionStorage.user) {
        return <Navigate to="/acceuil" replace />
    }
    const [userInfo, setUserInfo] = useState({'username':'', 'password':''});

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
                            navigate('/login') 
                    }
                    
            }
    )
 
    }
      
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
       
              <FormControl>
                <Input id='leBonInput1' placeholder='Nom usager' name='name' value={userInfo.username} onChange={handleUserChange} autoComplete='username'/>
              </FormControl>              
              <FormControl mt={4}>
                <Input id='leBonInput2' placeholder='Mot de passe' name='pass' value={userInfo.password} onChange={handlePassChange} type='password' autoComplete='current-password'/>
              </FormControl>
              
              <VStack marginTop='20px'>
              <Link href='https://planproj.herokuapp.com/register' isExternal >
                Pas encore inscrit?<ExternalLinkIcon mx='2px' />
              </Link>
              <Link href='https://planproj.herokuapp.com/reset_password_request' isExternal>
                Pour réinitialiser ton mot de passe <ExternalLinkIcon mx='2px' />
              </Link>              
              </VStack>
                
            

              <Button colorScheme='blue' mr={3} onClick={handleLogin}>
                Login
              </Button>         
            
        
        
        
        </>
        

      
    )


}
