import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Text, HStack } from '@chakra-ui/react'
import { Input, InputLeftAddon, InputGroup, IconButton, ButtonGroup, Select, Box} from '@chakra-ui/react'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { TiDeleteOutline } from "react-icons/ti";
import { getRessources } from '../../../util';
import { InputMillionAlert } from '../../common/alert';
import { useToast } from '@chakra-ui/react';
import { modJalon } from '../../../util';


const year = new Date().getFullYear();


export function TablePti(props) {

    const [ptiEnPrep, setPtiEnPrep] = useState()
    //const [prevCourante, setprevCourante] = useState(props.projet.prev_courante/1000000)
    const [projet, setProjet] = useState({})
    const [depenseCourante, setDepenseCourante] = useState(props.depense.courante)
    const toast = useToast({
        status: 'error',
        position: 'center',
        duration: 1000,
        isClosable: true
      })

    const handleChange = (e) => {
       
       if (e.target.value > 2100 || e.target.value < 0) {
            window.alert('Attention, le montant doit être entré en millions. Votre chiffre ne semble pas réaliste!')
            return
        }
        let newPti = {'annee':year, 'projet_id':props.projet.id, 'cycleCour':0, 'cycle2':0, 'cycle3':0, 'cycle4':0, 'cycle5':0};
        newPti = {...newPti, ...ptiEnPrep}
        const item = {};            
        item[e.target.name] = e.target.value*1000000;
        newPti = {...newPti, ...item}        
        setPtiEnPrep(newPti)
        props.updatePti(newPti);
        
        
        
             
        
    }  

    const handleChangePrevison = (e) => {
        if (e.target.value > 2100 || e.target.value < 0) {
            window.alert('Attention, le montant doit être entré en millions. Votre chiffre ne semble pas réaliste!')
            return
        }
        const newprevCourante = {'prev_courante':e.target.value*1000000}        
        props.updatePrevision(newprevCourante);
        let newprojet = projet;
        newprojet = {...newprojet, ...newprevCourante}
        setProjet(newprojet)
               
    }

    const handleChangeDepense_courante = (e) => {
        if (e.target.value > 2100 || e.target.value < 0) {
            window.alert('Attention, le montant doit être entré en millions. Votre chiffre ne semble pas réaliste!')
            return
        }
        setDepenseCourante((e.target.value*1000000));   
        const newdepense_courante = {'annee': year ,'projet_id': projet.id,'montant':e.target.value*1000000}        
        //props.updatePrevision(newprevCourante);
        //let newprojet = projet;
        //newprojet = {...newprojet, ...newprevCourante}
        //setProjet(newprojet)
        //modJalon('/api/v1/depense/'+projet.id, {}, newdepense_courante, 'POST')
        //(depenseCourante/1000000).toFixed(2)
        props.updateCourante(newdepense_courante)
    }


    const deletePtiEnPrep = () => {
        
        getRessources('/api/v1/pti/one/'+ptiEnPrep.id, {},{}, 'DELETE');
        setPtiEnPrep();
    }

    useEffect(()=> {
        setPtiEnPrep(props.pti.ptiEnPrep);              
        setProjet(props.projet);
        setDepenseCourante(props.depense.courante);
    }, [props])
    

    return (
        <Table colorScheme='blue'>
            <Thead >
                <Tr >
                    <Th></Th>
                    <Th>Anterieur</Th>
                    <Th>{year}</Th>
                    <Th>{year+1}</Th>
                    <Th>{year+2}</Th>
                    <Th>{year+3}</Th>
                    <Th>{year+4}</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>PTI EN VIGUEUR</Td>
                    <Td>{(props.depense.anterieur/1000000).toFixed(2)}</Td>
                    <Td>{props.pti.ptiCourant&&props.pti.ptiCourant.cycleCour/1000000}</Td>
                    <Td>{props.pti.ptiCourant&&props.pti.ptiCourant.cycle2/1000000}</Td>
                    <Td>{props.pti.ptiCourant&&props.pti.ptiCourant.cycle3/1000000}</Td>
                    <Td>{props.pti.ptiCourant&&props.pti.ptiCourant.cycle4/1000000}</Td>
                    <Td>{props.pti.ptiCourant&&props.pti.ptiCourant.cycle5/1000000}</Td>
                </Tr>
                <Tr>
                    <Td>PLANIFICATION</Td>
                    <Td>{(props.depense.anterieur/1000000).toFixed(2)}</Td>
                    <Td><HStack><Text>Réel</Text><Input size='sm' type="number"  maxW='20'  name='depense_courante' value={depenseCourante/1000000} onChange={handleChangeDepense_courante}/></HStack>/
                        <HStack><Text>Planif</Text><Input size='sm' maxW='20'  name='prevision' type='number' value={projet.prev_courante/1000000} onChange={handleChangePrevison}/></HStack></Td>
                    <Td><Input size='sm' width='12' type='number' name='cycleCour' value={ptiEnPrep?ptiEnPrep.cycleCour/1000000:''} onChange={handleChange} bg='white'/></Td>
                    <Td><Input size='sm' width='12' type='number' name='cycle2' value={ptiEnPrep?ptiEnPrep.cycle2/1000000:''} onChange={handleChange} bg='white'/></Td>
                    <Td><Input size='sm' width='12' type='number' name='cycle3' value={ptiEnPrep?ptiEnPrep.cycle3/1000000:''} onChange={handleChange} bg='white'/></Td>
                    <Td><Input size='sm' width='12' type='number' name='cycle4' value={ptiEnPrep?ptiEnPrep.cycle4/1000000:''} onChange={handleChange} bg='white'/></Td>
                    <Td><IconButton icon={<TiDeleteOutline/>} size='xs' bg='red.100' onClick={deletePtiEnPrep} /></Td>
                </Tr>
            </Tbody>
        </Table>
    )
}

//<Input size='sm' width='12' type='number' name='depense_courante' value={depenseCourante/1000000} onChange={handleChangeDepense_courante}/>