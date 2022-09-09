import { useState, useEffect } from 'react';
import { getRessources, modJalon } from '../../util';
import { List, ListItem, ListIcon, OrderedList, UnorderedList, Text, Box, IconButton, Heading, Button, Select, HStack, Input } from '@chakra-ui/react';
import { Formik, Form,  } from 'formik';
import { MySelect, MyTextInput } from '../common/forms';
import { FcSettings, FcFeedIn, FcPlus } from "react-icons/fc";
import { CloseIcon } from '@chakra-ui/icons'
import { DeleteButton } from './buttondelete';




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

    const handleChange = (e) => {
        
        let newFinance ={}
        let financemod = []      
        if (e.target.name === 'reglements') {
            newFinance = {'reglements' : finance[e.target.name].map(item => (item.no === e.target.attributes.identifiant.value)?{'montant':parseInt(e.target.value), 'no':e.target.attributes.identifiant.value}:item )}
            financemod = {...finance, ...newFinance};
            setFinance(financemod)
            const idReglement = reglements.find(item => item.numero === e.target.attributes.identifiant.value).id
            modJalon('/api/v1/affectefinance', {}, {'reglements':{'id':idReglement,'montant':e.target.value, 'projet':props.projet.id}}, 'PUT')
        } else if (e.target.name === 'subventions') {
            newFinance = {'subventions' : finance[e.target.name].map(item => (item.nom === e.target.attributes.identifiant.value)?{'montant':parseInt(e.target.value), 'nom':e.target.attributes.identifiant.value}:item )}
            financemod = {...finance, ...newFinance};
            setFinance(financemod);
            const idSubvention = subventions.find(item => item.nomProg === e.target.attributes.identifiant.value).id
            modJalon('/api/v1/affectefinance', {}, {'subventions':{'id':idSubvention,'montant':e.target.value, 'projet':props.projet.id}}, 'PUT')
        } else if (e.target.name === 'fonds') {
            newFinance = {'fonds' : finance[e.target.name].map(item => (item.nom === e.target.attributes.identifiant.value)?{'montant':parseInt(e.target.value), 'nom':e.target.attributes.identifiant.value}:item )}
            financemod = {...finance, ...newFinance};
            setFinance(financemod);
            const idFonds = fonds.find(item => item.nom === e.target.attributes.identifiant.value).id
            modJalon('/api/v1/affectefinance', {}, {'fonds':{'id':idFonds,'montant':e.target.value, 'projet':props.projet.id}}, 'PUT')
        }

    }

    const handleDelete = (type, identifiant) => {
        let newFinance ={}
        let financemod = []      
        if (type === 'reglements') {
            newFinance = {'reglements' : finance[type].filter(item => !(item.no === identifiant) )}
            financemod = {...finance, ...newFinance};
            setFinance(financemod)
        }else if (type === 'subventions') {
            newFinance = {'subventions' : finance[type].filter(item => !(item.nom === identifiant))}
            financemod = {...finance, ...newFinance};
            setFinance(financemod)
        }else if (type === 'fonds') {
            newFinance = {'fonds' : finance[type].filter(item => !(item.nom === identifiant))}
            financemod = {...finance, ...newFinance};
            setFinance(financemod)
        }
        
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
                            {finance.reglements&&finance.reglements.map(item => 
                                
                                    !isChecked?
                                    <ListItem>{item.no} -- {item.montant.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</ListItem>:
                                    <ListItem><HStack ><Text>{item.no}-</Text>-<Input size='sm' type='currency' name={'reglements'} identifiant={item.no} value={item.montant} onChange={handleChange}></Input>
                                    <DeleteButton identifiant={item.no} type='reglements' projet_id={props.projet.id} listSources={reglements} handleDelete={handleDelete}/></HStack>
                                    </ListItem>)
                            
                            }                        
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
                                { finance.subventions&&finance.subventions.map(item =>                                    
                                    !isChecked?<ListItem>{item.nom} -- {item.montant.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</ListItem>:
                                    <ListItem><HStack><Text>{item.nom} --</Text><Input size='sm' type='currency' name={'subventions'} identifiant={item.nom} value={item.montant} onChange={handleChange}></Input>
                                    <DeleteButton identifiant={item.nom} type='subventions' projet_id={props.projet.id} listSources={subventions} handleDelete={handleDelete}/>
                                    </HStack>
                                    </ListItem>)
                                }
                                                           
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
                                {finance.fonds&&finance.fonds.map(item => 
                                !isChecked?<ListItem>{item.nom} -- {item.montant.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</ListItem>:
                                <ListItem><HStack><Text>{item.nom} --</Text><Input size='sm' type='currency' name={'fonds'} identifiant={item.nom} value={item.montant} onChange={handleChange}></Input>
                                <DeleteButton identifiant={item.nom} type='fonds' projet_id={props.projet.id} listSources={fonds} handleDelete={handleDelete}/>
                                </HStack>
                                </ListItem>)
                            }
                                                      
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