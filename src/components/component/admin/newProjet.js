import { useState, useEffect} from 'react';
import { useFormik, Formik, Form,  } from 'formik';
import { Button, Grid, GridItem, Heading } from '@chakra-ui/react';
import { getRessources, modJalon } from '../../util';
import * as Yup from 'yup';
import { MyTextInput, MySelect, MyCheckbox, MySwitch } from '../common/forms';


const categories = ['Bâtiments municipaux', 'Parcs, espaces verts, loisirs, culture',
'Infrastructures existantes', 'Developpement', 'Véhicules, Machineries, matériel, équipements','Logiciel, équipements informatique', 'Divers']


export function NewProjet() {
      const [users, setUsers] = useState([]);
      const [noProjet, setNoProjet] = useState([]);
      

      const validate = (value) => {
  
        if (noProjet.includes(value)) {
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
              const allNoProjet = [];
              lesProjets.forEach(element => {
                allNoProjet.push(element.no_projet)
              }); 
              setNoProjet(allNoProjet);
            }
            )

      },[])

      return (
        <>
        <Grid templateColumns='repeat(3, 1fr)' >
        <GridItem gridColumn='2 / span 1' gridRow='1 / span 1'>
          <Heading as='h3' size='lg' textAlign='center'>Nouveau projet</Heading>
        </GridItem>
        <GridItem gridColumn='2 /span 1'>
        <Formik
          initialValues={{            
            no_projet: '',
            desc: '', 
            cat:'',           
            immo: false, // added for our checkbox
            affectation:'',//select            
            charge:''

          }}       
          

          validationSchema={Yup.object({
            no_projet: Yup.string()
              .matches(/^[0-9]{4}-[0-9]{5}$/, 'le numéro de projet doit être sous le format 0000-00000')        
              .required('Requis'),              
            desc: Yup.string()
              .max(64, 'Doit être de 64 caractères ou moins')
              .required('Requis'),
            cat: Yup.string()              
              .required('Requis'),            
            charge: Yup.number()              
              .required('Requis'),

                  
          })}

          onSubmit={(values, actions) => {
              
              if (validate(values.no_projet)) {
                alert('le numéro de projet existe déjà')
              }else {
                
                modJalon('/api/v1/projet', {}, values, 'POST');
              }
              const allNoProjet = [...noProjet];
              allNoProjet.push(values.no_projet);
              setNoProjet(allNoProjet)
              actions.setSubmitting(false);
              actions.resetForm();              
            
          }}
        >
          
          
          <Form >
            <MyTextInput
                label='no_projet'
                name='no_projet'
                type='text'
                    
                />

            <MyTextInput
                label='description'
                name='desc'
                type='text' 
                             
                />

            <MySelect label="catégorie" name="cat">
              <option value="">Choisi la catégorie</option>
              {categories.map(item => <option value={item}>{item}</option>)}       
             
              
            </MySelect>

            <MySelect label="Chargé de projet" name="charge">
              <option value="">Choisi le chargé du projet</option>
              {users.map(item => <option value={item.id}>{item.username}</option>)}       
             
              
            </MySelect>             
  
            <MySelect label="affectation" name="affectation">
              <option value="">Choisi le type d'affectation si requis</option>
              <option value="D2D3">D2D3 (temps régulier)</option>
              <option value="SD2SD3">SD2SD3 (temps supplémentaire seulement)</option>
              <option value="D3">D3 (surveillance seulement)</option>              
            </MySelect>
  
            <MySwitch name="immo">
              <span style={{margin:'5px'}}>Le projet implique une immobilisation?</span>
            </MySwitch>
  
            <Button type="submit" bg='blue.500' >Soumettre</Button>
          </Form>
          
          
        </Formik>
        </GridItem>
        </Grid>
      </>
          )     

}