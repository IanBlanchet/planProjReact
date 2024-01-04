import { getRessources, modJalon } from '../../../util';
import { List, ListItem, ListIcon, OrderedList, UnorderedList, Text, Box, IconButton, Heading, Button, Select, HStack, Input } from '@chakra-ui/react';
import { Formik, Form,  } from 'formik';
import { MySelect, MyTextInput } from '../../common/forms';
import { FcPlus } from "react-icons/fc";
import { DeleteButton } from './buttondelete';




export function FinanceForm({projet, categorie, availableItem, finance, isChecked, handleDelete, handleChange, validate, setFinance}) {
    
    const genCategorie = (item) => {
        return {'reglements': item.numero, 'subventions': item.nomProg + ' -- ' + item.no_id, 'fonds' : item.nom}
    }
    
    return (
        <Formik
            initialValues={{
            categorie ,           
            idCategorie: '',            
            montant:0,         
            }} 
          
            onSubmit={(values, actions) => {
                
                if (validate(values.idCategorie, categorie)) {
                    alert('Ce financement est déjà attribué')
                    
                } else {
                    let addFinance = {}
                    addFinance[categorie] = {'id':values.idCategorie,'montant':parseInt(values.montant), 'projet':projet.id}
                                   
                      modJalon('/api/v1/affectefinance', {}, addFinance, 'POST').then(item =>
                        {getRessources('/api/v1/finance/'+projet.id).then(
                            lesfinance => setFinance(lesfinance));} );                     
                        }                               
                actions.resetForm();          
                actions.setSubmitting(false);
            }}   
        >
            <Form>
            <Heading size='md' color='blue.500'>{categorie}</Heading>
                        <UnorderedList>
                            {finance[categorie]&&finance[categorie].map(item => 
                                
                                    !isChecked?
                                    <ListItem key={item.id}>{item.nom} -- {item.montant.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</ListItem>:
                                    <ListItem key={item.id}><HStack ><Text>{item.nom}-</Text>-<Input size='sm' type='currency' name={categorie} id={item.id} identifiant={item.nom} value={item.montant} onChange={handleChange}></Input>
                                    <DeleteButton identifiant={item.id} categorie={categorie} projet_id={projet.id} listSources={availableItem} handleDelete={handleDelete}/></HStack>
                                    </ListItem>)
                            
                            }                        
                        </UnorderedList>
                        {isChecked&&<HStack>                                    
                                    <MySelect label='Ajout'  name='idCategorie'>
                                        <option value=''>choisir un {categorie}</option>
                                        {availableItem.map(item => <option value={item.id} key={item.id}>{genCategorie(item)[categorie]}</option>)}
                                    </MySelect>
                                    <MyTextInput name='montant' label='montant' type='number' />
                                    <IconButton type='submit' icon={<FcPlus/>}/>
                                    </HStack>}
                        
            </Form>
        </Formik>

    )
}