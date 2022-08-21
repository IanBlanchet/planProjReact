import { useState, useEffect } from 'react';
import { getRessources, modJalon } from '../../util';
import { List, ListItem, ListIcon, OrderedList, UnorderedList, Text, Box, IconButton, Heading, Button, Select, HStack } from '@chakra-ui/react';
import { Formik, Form,  } from 'formik';
import { MySelect, MyTextInput } from '../common/forms';
import { FcSettings, FcFeedIn, FcPlus } from "react-icons/fc";

export function SourceFinance(props) {

    const [finance, setFinance] = useState({});
    const [reglements, setReglements] = useState([]);
    const [subventions, setSubventions] = useState([])
    const [fonds, setFonds] = useState([]);
    const [ajoutFinance, setAjoutFinance]= useState({});    
    const [isChecked, setIschecked] = useState(false);


    const handleCheck = () => {
        !isChecked?setIschecked(true):setIschecked(false)
    }


    useEffect(() => {
        getRessources('/api/v1/finance/'+props.projet.id).then(
            lesfinance => setFinance(lesfinance));
        getRessources('/api/v1/reglement').then(
                lesReglements => setReglements(lesReglements));
        getRessources('/api/v1/subvention').then(
                    lesSubventions => setSubventions(lesSubventions));
        getRessources('/api/v1/fonds').then(
                        lesFonds => setFonds(lesFonds));

    }, [props.projet])

    return (
        <Box display='inline'>
        
        <Box maxW='md' padding='5' borderWidth='2px' borderRadius='lg' overflow='hidden'>
                    <Heading size='lg'>Sources de financement{!isChecked?<IconButton icon={<FcSettings/>} onClick={handleCheck}/>:<IconButton icon={<FcFeedIn/>} onClick={handleCheck} />}</Heading>

        <Formik
            initialValues={{            
            reglements: '',            
            montantReglement:0,         
            }} 
          
            onSubmit={(values, actions) => {
            
                      let addReglement = {'reglements':{'id':values.reglements,'montant':values.montantReglement, 'projet':props.projet.id}}
                      modJalon('/api/v1/affectefinance', {}, addReglement, 'POST').then(item =>
                        {getRessources('/api/v1/finance/'+props.projet.id).then(
                            lesfinance => setFinance(lesfinance));} );
                           
                      
                                     
            actions.resetForm();          
            actions.setSubmitting(false);
            }}   
        >
            <Form>
            <Heading size='md' color='blue.500'>Règlements</Heading>
                        <UnorderedList>
                            {finance.reglements?finance.reglements.map(item => <ListItem>{item.no} -- {item.montant.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</ListItem>):<ListItem>-</ListItem>}                        
                        </UnorderedList>
                        {isChecked&&<HStack>                                    
                                    <MySelect label='Ajout règlement' name='reglements'>
                                        <option value=''>choisir un numéro de règlement</option>
                                        {reglements.map(item => <option value={item.id} >{item.numero}</option>)}
                                    </MySelect>
                                    <MyTextInput name='montantReglement' label='montant' type='number' />
                                    <IconButton type='submit' icon={<FcPlus/>}/>
                                    </HStack>}
                        
            </Form>
        </Formik>

        <Formik
            initialValues={{            
            subventions: '',            
            montantSubvention:0,         
            }} 
          
            onSubmit={(values, actions) => {            
                      let addSubvention = {'subventions':{'id':values.subventions,'montant':values.montantSubvention, 'projet':props.projet.id}}
                      modJalon('/api/v1/affectefinance', {}, addSubvention, 'POST').then(item =>
                        {getRessources('/api/v1/finance/'+props.projet.id).then(
                            lesfinance => setFinance(lesfinance));} )
                                      
                                     
            actions.resetForm();          
            actions.setSubmitting(false);
            }}   
        >
            <Form>
            <Heading size='md' color='blue.500'>Subventions</Heading>
                        <UnorderedList>
                            {finance.subventions?finance.subventions.map(item => <ListItem>{item.nom} -- {item.montant.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</ListItem>):<ListItem>-</ListItem>}                        
                        </UnorderedList>
                        {isChecked&&<HStack>
                                    <MySelect label='Ajout subvention' name='subventions'>
                                        <option value=''>choisir une subvention</option>
                                        {subventions.map(item => <option value={item.id} >{item.nomProg} -- {item.no_id}</option>)}
                                    </MySelect>
                                    <MyTextInput name='montantSubvention' label='montant' type='number' />
                                    <IconButton type='submit' icon={<FcPlus/>}/>
                                    </HStack>}
                        
            </Form>
        </Formik>

        <Formik
            initialValues={{            
            fonds: '',            
            montantFonds:0,         
            }} 
          
            onSubmit={(values, actions) => {
            
                      let addFonds = {'fonds':{'id':values.fonds,'montant':values.montantFonds, 'projet':props.projet.id}}
                      modJalon('/api/v1/affectefinance', {}, addFonds, 'POST').then(item =>
                        {getRessources('/api/v1/finance/'+props.projet.id).then(
                            lesfinance => setFinance(lesfinance));} 
                      );
                            
                      
                                     
            actions.resetForm();          
            actions.setSubmitting(false);
            }}   
        >
            <Form>
            <Heading size='md' color='blue.500'>Fonds</Heading>
                        <UnorderedList>
                            {finance.fonds?finance.fonds.map(item => <ListItem>{item.nom} -- {item.montant.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</ListItem>):<ListItem>-</ListItem>}                        
                        </UnorderedList>
                        {isChecked&&<HStack>
                                    <MySelect label='Ajout fonds' name='fonds'>
                                        <option value=''>choisir un fonds</option>
                                        {fonds.map(item => <option value={item.id} >{item.nom}</option>)}
                                    </MySelect>
                                    <MyTextInput name='montantFonds' label='montant' type='number' />
                                    <IconButton type='submit' icon={<FcPlus/>}/>
                                    </HStack>}
                        
            </Form>
        </Formik>       
                    
                      
        </Box> 
        
        </Box>
    )
}