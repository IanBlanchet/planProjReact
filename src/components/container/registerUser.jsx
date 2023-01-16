import { useEffect, useState, useContext } from 'react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { getRessources } from '../util';
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
import { MyTextInput, MySelect } from '../component/common/forms';
import { useFormik, Formik, Form  } from 'formik';
import * as Yup from 'yup';


const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const services = ['ING', 'SRC', 'URBA', 'TP', 'ENV', 'RH', 'DEV', 'GREFFE', 'INC', 'GEN', 'FIN', 'COM']

export function AddUserForm({}) {

  const toast = useToast({                
    position: '',
    duration: 1000,
    isClosable: true
  });




    return (
    <Formik
    initialValues={{            
      username: '',
      email: '',            
      password: '', 
      secondpassword:'',          
      service:''

    }}       
    

    validationSchema={Yup.object({
      username: Yup.string()
        .max(63, 'maximum de 64 caractères')               
        .required('Requis'),              
      email: Yup.string()
        .email('entrer un courriel valide')    
        .max(64, 'Doit être de 64 caractères ou moins')
        .required('Requis'),
      password: Yup.string()              
        .required('Requis'),            
      secondpassword: Yup.string()              
        .required('Requis')
        .oneOf([Yup.ref('password'), null], "Les mots de passes ne correspondent pas"),
      service: Yup.string()
        .required('requis')

            
    })}

    onSubmit={(values, actions) => {
        let minValues = {'username':values.username,'email':values.email, 'service':values.service}
        getRessources('/api/v1/user', {}, {'values':minValues, 'pass':values.password}, 'POST').then(
            (response) => {
                if (response.user) {
                  toast({status:'success', description:'Usager ajouté - approbation en cours'}); 
                } else {
                  toast({status:'error', description:response.message});
                }
            }
        );                
        actions.setSubmitting(false);
        actions.resetForm();              
      
    }}
  >
    
    
    <Form >
      <MyTextInput
          label='Nom usager'
          name='username'
          type='text'
              
          />

      <MyTextInput
          label='Courriel'
          name='email'
          type='text' 
                       
          />


      <MySelect label="Service" name="service">
        <option value=''></option>
        {services.map(item => <option value={item}>{item}</option>)}       
       
        
      </MySelect>

      <MyTextInput
          label='Mot de passe'
          name='password'
          type='text' 
                       
          />

        <MyTextInput
          label='Répéter le mot de passe'
          name='secondpassword'
          type='text' 
                       
          />



      <Button type="submit" bg='blue.500' >Soumettre</Button>
    </Form>
    
    
  </Formik>
    )


}





export function RegisterUser()  {



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
                
                <Heading color="blue.400">Enregistrer un nouvel usager</Heading>
                <Box minW={{ base: "90%", md: "575px" }}>
                <Stack
                      spacing={4}
                      p="1rem"
                      backgroundColor="whiteAlpha.900"
                      boxShadow="md"
                    >
                  <AddUserForm />
                </Stack>
                </Box>
              </Stack>
          
            </Flex>
       
          
        </>
        

      
    )


}