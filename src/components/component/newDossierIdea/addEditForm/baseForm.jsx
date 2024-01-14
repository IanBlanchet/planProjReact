/*import some components from detaildossier*/
import { TextDescriptifInput } from "../../detaildossier/descriptif/textDescriptifInput";

import { useState, useEffect, useContext } from 'react';
import { Button, ButtonGroup, Grid, GridItem, Heading, Tag } from '@chakra-ui/react';
import { BaseDataContext } from "../../../../auth";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MyTextInput, MySelect, MyDateInput, MyTextAreaInput, MyNumberInput} from "../../common/forms";
import { modJalon } from "../../../util";


export const BaseFormDossier = ({currentProjet, projetIsSelected, clearSelection}) => {
    
    const {blanckNature, user, projet, refreshData, categories } = useContext(BaseDataContext);
    
    
    const [newprojet, setNewProjet] = useState({
                                                'desc':'',
                                                'cat':'',
                                                'immo':false,
                                                'charge':'',
                                                'nature':blanckNature})
   

    const filterUser = user.filter(item => item.statut === 'actif' || item.statut === 'admin')
    
    const handleClearSelection = () => {
      setNewProjet({
        'desc':'',
        'cat':'',
        'immo':false,
        'charge':'',
        'nature':blanckNature})
      clearSelection()
    }

    const updateDescriptif = (data) => {
        let newDescriptif = {...newprojet.nature};
        newDescriptif = {...newDescriptif, ...data}
        const updateNewprojet = {...newprojet, 'nature':newDescriptif}
        
        setNewProjet(updateNewprojet);     
               
    };

    useEffect(() => {
      
      setNewProjet(projetIsSelected?currentProjet:{
        'desc':'',
        'cat':'',
        'immo':false,
        'charge':'',
        'nature':blanckNature})
      

                                  
    },[projet, currentProjet, projetIsSelected])


    return (
        <>
        <Grid templateColumns='1fr 1fr' templateRows='40px' >
        <GridItem margin='10px' gridRow='1 / span 1' gridColumn='1 / span 2'  justifySelf='left'>
          <Tag size='lg' borderRadius='full' variant='solid' colorScheme={currentProjet?'blue':'green'}><Heading as='h3' textAlign='center'>{currentProjet?'Modifier dossier':'Nouveau dossier'}</Heading></Tag>
        </GridItem>
        <GridItem gridRow='2 / span 1' gridColumn='1 / span 2' margin='10px' >
        <Formik
          initialValues={{            
            desc: newprojet.desc, 
            cat:newprojet.cat,           
            immo: newprojet.immo,                    
            charge:newprojet.charge,
            notes: newprojet.nature.notes,
            echeance: newprojet.nature.echeance,
            estimation: !newprojet.nature.estimation?'':newprojet.nature.estimation,
            isStrategic: newprojet.nature.isStrategic

          }} 
          enableReinitialize      
          
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
            let newNature = {...newprojet.nature,                            
                            'isStrategic':values.isStrategic,
                            'echeance':values.echeance,
                            'estimation':parseInt(values.estimation)
                            }

            const newProjet = {'desc':values.desc, 'cat':values.cat, 'immo':values.immo==='true'?true:values.immo===true?true:false, 'charge':values.charge, 'nature': newNature}

      
            if (currentProjet)  {
            modJalon(('/api/v1/projet/'+currentProjet.id), {}, newProjet, 'PUT').then(projet => refreshData())
            clearSelection()
            }  else {
            modJalon('/api/v1/projet', {}, newProjet, 'POST').then(projet => refreshData());
            clearSelection()
            } 
   
            setNewProjet({
              'desc':'',
              'cat':'',
              'immo':false,
              'charge':'',
              'nature':blanckNature})
            
            actions.setSubmitting(false);
            actions.resetForm();              
            
          }
        
        }
        >
          
        
          <Form >
            <Grid templateColumns='1fr 1fr 1fr' templateRows='1fr 1fr 3fr 1fr 0.5fr' alignItems='center'>
                
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

                <GridItem gridRow='3 / span 1' gridColumn='1 / span 3'> 
                  <Grid templateColumns='1fr 1fr 1fr'>
                    <TextDescriptifInput name='nature' label='Description/Nature' detail={newprojet.nature.nature} updateNature={updateDescriptif} isChecked={true}/>
                    <TextDescriptifInput name='justification' label='Justifications' detail={newprojet.nature.justification} updateNature={updateDescriptif} isChecked={true}/>
                    <TextDescriptifInput name='refus' label='Conséquences du refus' detail={newprojet.nature.refus} updateNature={updateDescriptif} isChecked={true}/>
                  </Grid> 
                </GridItem>

                <GridItem gridRow='2 / span 1' gridColumn='1 / span 3'>
                    <Grid templateColumns='1fr 1fr 1fr'>
                      <MySelect label="Chargé de projet" name="charge">
                      <option value="">Choisir le chargé du projet</option>
                      {filterUser.map(item => <option value={item.id}>{item.username}</option>)}      
                      </MySelect>

                      <MySelect label="Stratégique?" name="isStrategic">
                      <option value={true}>Oui</option>
                      <option value={false}>Non</option>                     
                      </MySelect>

                      <MyDateInput name='echeance'
                          label='Échéance'>                
                      </MyDateInput>
                    </Grid>
                </GridItem>
                <GridItem gridRow='4 / span 1' gridColumn='1 / span 3' >
                    
                    <Grid templateColumns='1fr 1fr 2fr' alignItems='center'>
                      <MySelect label="Le projet implique une immobilisation?" name="immo" >
                        <option value={true}>Oui</option>
                        <option value={false}>Non</option>                     
                      </MySelect>

                      <MyNumberInput
                        label='Estimation'
                        name='estimation'
                        type='number'
                                                 
                        /> 
                      <MyTextAreaInput
                        label='Notes/commentaires'
                        name='notes'
                        type='textArea'                              
                        />

                    </Grid>
                </GridItem>

                <GridItem gridRow='5 / span 1' gridColumn='3 / span 1' alignSelf='end' justifySelf='right'>
                  <ButtonGroup gap='2'>
                  <Button type='reset' bg='red.400' onClick={handleClearSelection}>Annuler</Button>
                  <Button type="submit" bg='green.400' >Soumettre</Button>
                  </ButtonGroup>
                </GridItem>

            </Grid>
          </Form>
          
          
        </Formik>
        </GridItem>
        </Grid>
             
        </>
    )
}