import { useState, useEffect} from 'react';
import { useFormik, Formik, Form,  } from 'formik';
import { Button, Grid, GridItem, Heading } from '@chakra-ui/react';
import { getRessources, modJalon } from '../../util';
import * as Yup from 'yup';
import { MyTextInput, MySelect, MyCheckbox } from '../common/forms';



export function NewContrat() {
      const [users, setUsers] = useState([]);
      const [projet, setProjet] = useState([]);
      const [noContrat, setNoContrat] = useState([]);

      const validate = (value) => {
  
        if (noContrat.includes(value)) {
            return true
            } else {
              return false
            }   
    }


      useEffect(() =>{
        getRessources('/api/v1/user').then(
          lesUsers => setUsers(lesUsers));
        getRessources('/api/v1/projet').then(
            lesProjets => {
              const lesProjet = []
              lesProjets.forEach(element => {
                lesProjet.push(element)
              });
              setProjet(lesProjet) 
            }
            );
        getRessources('/api/v1/contrat').then(
                lesContrats => {
                  const allNoContrat = []
                  lesContrats.forEach(element => {
                    allNoContrat.push(element.no)
                  });
                    setNoContrat(allNoContrat)  
                }
                )

        

      },[])

      return (
        <>
        <Grid templateColumns='repeat(3, 1fr)' >
        <GridItem gridColumn='2 / span 1' gridRow='1 / span 1'>
          <Heading as='h3' size='lg' textAlign='center'>Nouveau Contrat</Heading>
        </GridItem>
        <GridItem gridColumn='2 /span 1'>
        <Formik
          initialValues={{            
            no: '',
            desc: '', 
            princ: true,// added for our checkbox 
            estimation:0,           
            projet_id:'',//select            
            charge_contrat:'',//select

          }}       
          

          validationSchema={Yup.object({
            no: Yup.string()                    
              .required('Requis'),              
            desc: Yup.string()
              .max(100, 'Doit être de 100 caractères ou moins')
              .required('Requis'),           
            estimation: Yup.number()              
              .required('Requis'),

                  
          })}

          onSubmit={(values, actions) => {
              
              if (validate(values.no)) {
                alert('le numéro de contrat existe déjà')
              }else {
                console.log(values);
                modJalon('/api/v1/contrat', {}, values, 'POST');
              }
              const allNoContrat = [...noContrat];
              allNoContrat.push(values.no);
              setNoContrat(allNoContrat);
              actions.setSubmitting(false);
              actions.resetForm();              
            
          }}
        >
          
          
          <Form >
            <MyTextInput
                label='no contrat'
                name='no'
                type='text'
                    
                />

            <MyTextInput
                label='description'
                name='desc'
                type='text' 
                             
                />
             <MyTextInput
                label='estimation'
                name='estimation'
                type='number' 
                             
                />

            <MySelect label="projet associé" name="projet_id">
              <option value="">Choisir le projet associé</option>
              {projet.map(item => <option value={item.id} key={item.id}>{item.no_projet} -- {item.desc}</option>)}       
             
              
            </MySelect>

            <MySelect label="Chargé de contrat" name="charge_contrat">
              <option value="">Choisi le chargé du contrat</option>
              {users.map(item => <option value={item.id} key={item.id}>{item.username}</option>)}       
             
              
            </MySelect>             
  
         
  
            <MyCheckbox name="princ">
              <span style={{margin:'5px'}}>Est-ce le contrat principal?</span>
            </MyCheckbox>
  
            <Button type="submit" bg='blue.500' >Soumettre</Button>
          </Form>
          
          
        </Formik>
        </GridItem>
        </Grid>
      </>
          )     

}