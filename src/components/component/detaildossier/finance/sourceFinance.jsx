import { useState, useEffect } from 'react';
import { getRessources, modJalon } from '../../../util';
import {  Box, IconButton, Heading } from '@chakra-ui/react';
import { FcFeedIn, FcPlus } from "react-icons/fc";
import { TiEdit } from "react-icons/ti";
import { FinanceForm } from './formfinance';



export function SourceFinance(props) {

    const [finance, setFinance] = useState({});
    const [reglements, setReglements] = useState([]);
    const [subventions, setSubventions] = useState([])
    const [fonds, setFonds] = useState([]);
    const [ajoutFinance, setAjoutFinance]= useState({});    
    const [isChecked, setIschecked] = useState(false);
    
    const validate = (value, categorie) => {
        
        return finance[categorie].some(item => item.id === parseInt(value))?true:false
          
        
    }

    const handleCheck = () => {
        !isChecked?setIschecked(true):setIschecked(false)
    }

    const handleChange = (e) => {
        
        let newFinance ={}
        let financemod = []
        let putItem = {}
        newFinance[e.target.name]  =  finance[e.target.name].map(item => (item.nom === e.target.attributes.identifiant.value)?
                                                            {'montant':parseInt(e.target.value), 
                                                            'id':e.target.attributes.id.value, 
                                                            'nom':e.target.attributes.identifiant.value}:
                                                            item )         
        financemod = {...finance, ...newFinance};
        setFinance(financemod)
        putItem[e.target.name] = {'id':e.target.attributes.id.value, 'montant':parseInt(e.target.value), 'projet':props.projet.id}
        modJalon('/api/v1/affectefinance', {},putItem, 'PUT')
      

    }

    const handleDelete = (categorie, identifiant) => {
        let newFinance ={}
        let financemod = []
        newFinance[categorie] = finance[categorie].filter(item => !(item.id === identifiant) )
        financemod = {...finance, ...newFinance};
        setFinance(financemod)    
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
                    <Heading size='lg'>Sources de financement{!isChecked?<IconButton icon={<TiEdit/>} onClick={handleCheck}/>:<IconButton icon={<FcFeedIn/>} onClick={handleCheck} />}</Heading>

        <FinanceForm 
            projet={props.projet} 
            categorie='reglements' 
            availableItem={reglements}
            finance={finance}
            isChecked={isChecked}
            handleDelete={handleDelete}
            handleChange={handleChange}
            validate={validate} 
            setFinance={setFinance} />
        
        <FinanceForm 
            projet={props.projet} 
            categorie='subventions' 
            availableItem={subventions}
            finance={finance}
            isChecked={isChecked}
            handleDelete={handleDelete}
            handleChange={handleChange}
            validate={validate} 
            setFinance={setFinance} />

        <FinanceForm 
            projet={props.projet} 
            categorie='fonds' 
            availableItem={fonds}
            finance={finance}
            isChecked={isChecked}
            handleDelete={handleDelete}
            handleChange={handleChange}
            validate={validate} 
            setFinance={setFinance} />

               
                    
                      
        </Box> 
        
        </Box>
    )
}

