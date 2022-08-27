import { useState, useEffect} from 'react';
import { useFormik, Formik, Form, Field  } from 'formik';
import { Button, Box, Grid, GridItem, Heading } from '@chakra-ui/react';
import { getRessources, modJalon } from '../../util';
import { SelectContrat } from '../common/select';
import * as Yup from 'yup';
import { MyTextInput, MySelect, MyCheckbox, MySwitch } from '../common/forms';

const statuts= ['actif', 'complet']

export function EditContrat() {
      const [users, setUsers] = useState([]);
      const [projet, setProjet] = useState([]);
      const [contrats, setContrats] = useState([]);
      const [selectedContrat, setSelectedContrat] = useState()
      const [noContrat, setNoContrat] = useState([]);

      const validate = (value) => {
        let filterContrat = noContrat.filter(item => item != selectedContrat.no)
        if (filterContrat.includes(value)) {
            return true
            } else {
              return false
            }   
    }

    const selectContrat= (contrat_id) => {
        const lecontrat = contrats.find(item => item.id == contrat_id);        
        setSelectedContrat(lecontrat)
        
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
                  setContrats(lesContrats)
                  const allNoContrat = []
                  lesContrats.forEach(element => {
                    allNoContrat.push(element.no)
                  });
                  setNoContrat(allNoContrat)  
                }
                )

        

      },[selectedContrat])

      return (
        <>
        <Grid templateColumns='repeat(3, 1fr)' >
        <GridItem gridColumn='2 / span 1' gridRow='1 / span 1'>
          <Heading as='h3' size='lg' textAlign='center'>Modifier un contrat</Heading>
        </GridItem>
        <GridItem gridColumn='2 / span 1' gridRow='2 / span 1'>
            <SelectContrat contrats={contrats} onChange={selectContrat}/>
        </GridItem>
        <GridItem gridColumn='2 /span 1'>
        <Formik
          initialValues={{            
            no: selectedContrat?selectedContrat.no:'',
            desc: selectedContrat?selectedContrat.desc:'', 
            princ: selectedContrat?selectedContrat.princ:false,// added for our checkbox 
            estimation:selectedContrat?selectedContrat.estimation:'',           
            projet_id:selectedContrat?selectedContrat.projet_id:'',//select            
            charge_contrat:selectedContrat?selectedContrat.charge_contrat:'',//select
            statut:selectedContrat&&selectedContrat.statut,

          }}       
          
          enableReinitialize={true}

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
                retour
              }else {
                console.log(values);
                modJalon('/api/v1/contrat/'+selectedContrat.id, {}, values, 'PUT');
              }
              const allNoContrat = [...noContrat];
              allNoContrat.push(values.no);
              setNoContrat(allNoContrat);
              actions.setSubmitting(false);
              setSelectedContrat();
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
  
         
            <Box margin='10px'>
            <label>
            <Field type="checkbox" name="princ" />
            <span style={{margin:'5px', fontFamily:'fantasy'}}  >Est-ce le contrat principal?</span>
            </label>
            </Box>

            <MySelect label="Statut" name="statut">              
              {statuts.map(item => <option value={item} key={item}>{item}</option>)}              
            </MySelect>    
  
            <Button type="submit" bg='blue.500' >Soumettre</Button>
          </Form>
          
          
        </Formik>
        </GridItem>
        </Grid>
      </>
          )     

}