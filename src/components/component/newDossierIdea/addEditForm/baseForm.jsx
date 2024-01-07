/*import some components from detaildossier*/
import { TextDescriptifInput } from "../../detaildossier/descriptif/textDescriptifInput";

import { useState, useEffect, useContext } from 'react';
import { Button, Grid, GridItem, Heading } from '@chakra-ui/react';
import { BaseDataContext } from "../../../../auth";
import { Formik, Form,  } from 'formik';
import * as Yup from 'yup';
import { MyTextInput, MySelect, MySwitch, MyDateInput} from "../../common/forms";
import { getRessources, modJalon } from "../../../util";

export const BaseFormDossier = ({currentProjet}) => {
    
    const {blanckNature, user, projet, refreshData, categories } = useContext(BaseDataContext);
    const [nature, setNature] = useState(blanckNature);
    const [newprojet, setNewProjet] = useState({})

    const updateDescriptif = (data) => {
        let newNature = {...nature};
        newNature = {...newNature, ...data}
        setNature(newNature);     
               
    };



    useEffect(() => {
        if (currentProjet) {
            setNature(!currentProjet.nature?blanckNature:{...blanckNature, ...currentProjet.nature}); 
        }
               
                        
    },[projet])

    return (
        <>
        <Grid templateColumns='1fr 1fr' templateRows='40px' >
        <GridItem gridRow='1 / span 1' gridColumn='1 / span 2' bgColor='blue.300' >
        <Heading as='h3' size='lg' textAlign='center'>{currentProjet?'Modifier dossier':'Nouveau dossier'}</Heading>
        </GridItem>
        <GridItem gridRow='2 / span 1' gridColumn='1 / span 2' margin='10px' bgColor='yellow.300'>
        <Formik
          initialValues={{            
            desc: '', 
            cat:'',           
            immo: false, // added for our checkbox                    
            charge:'',
            nature: nature

          }}       
          

          validationSchema={Yup.object({
            
            desc: Yup.string()
              .max(64, 'Doit être de 64 caractères ou moins')
              .required('Requis'),
            cat: Yup.string()              
              .required('Requis'),            
            charge: Yup.number()              
              .required('Requis'),

                  
          })}

          onSubmit={(values, actions) => {
              
              if (projet) {
                alert('le numéro de projet existe déjà')
              }else {
                
                /*modJalon('/api/v1/projet', {}, values, 'POST');*/
              }
            
              actions.setSubmitting(false);
              actions.resetForm();              
            
          }}
        >
          
          
          <Form >
            <Grid templateColumns='1fr 1fr 1fr' templateRows='1fr 4fr 1fr 1fr' >
                
                <GridItem gridRow='1 / span 1' gridColumn='1 / span 3' > 
                    <Grid templateColumns='1fr 1fr'>
                    <MyTextInput
                        label='Titre'
                        name='desc'
                        type='text'                              
                        />
                
                    <MySelect label="Catégorie" name="cat">
                    <option value="">Choisir la catégorie</option>
                    {categories.map(item => <option value={item}>{item}</option>)}   
                    </MySelect>
                    </Grid>
                </GridItem>


                <GridItem gridRow='2 / span 1' gridColumn='1 / span 3'>  
                    <TextDescriptifInput titre='Description/Nature' detail={nature.nature} updateNature={updateDescriptif} isChecked={true}/>
                    <TextDescriptifInput titre='Justifications' detail={nature.justification} updateNature={updateDescriptif} isChecked={true}/>
                    <TextDescriptifInput titre='Conséquences du refus' detail={nature.refus} updateNature={updateDescriptif} isChecked={true}/>
                </GridItem>

                <GridItem gridRow='3 / span 1' gridColumn='1 / span 3'>
                    <Grid templateColumns='1fr 1fr 1fr'>
                    <MySelect label="Chargé de projet" name="charge">
                    <option value="">Choisi le chargé du projet</option>
                    {user.map(item => <option value={item.id}>{item.username}</option>)}      
                    </MySelect>
                    <MySwitch name="immo">
                    <span style={{margin:'5px'}}>Le projet implique une immobilisation?</span>
                    </MySwitch>
                    <MyDateInput name='echeance'
                        label='Échéance'>                
                    </MyDateInput>
                    </Grid>
                </GridItem>
                <GridItem gridRow='4 / span 1' gridColumn='3 / span 1'>
                    <Button type="submit" bg='blue.500' >Soumettre</Button>

                </GridItem>
            
    

        

  
            
          
          </Grid>
          </Form>
          
          
        </Formik>
        </GridItem>
        </Grid>
             
        </>
    )
}