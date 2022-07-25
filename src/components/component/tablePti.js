import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Text } from '@chakra-ui/react'
import { Input, InputLeftAddon, InputGroup, IconButton, ButtonGroup, Select, Box} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { getRessources } from '../util';



const year = new Date().getFullYear();


export function TablePti(props) {

    const [ptiEnPrep, setPtiEnPrep] = useState({})
    //const [prevCourante, setprevCourante] = useState(props.projet.prev_courante/1000000)
    const [projet, setProjet] = useState({})
    

    const handleChange = (e) => {
        if (ptiEnPrep.id) {
            const item = {};        
            item[e.target.name] = e.target.value*1000000
            let ptiActuel = ptiEnPrep
            ptiActuel = {...ptiActuel, ...item}
            setPtiEnPrep(ptiActuel)
            props.updatePti(ptiActuel)
            }
        else {
            let newPti = {'annee':year, 'projet_id':props.projet.id, 'cycleCour':0, 'cycle2':0, 'cycle3':0, 'cycle4':0, 'cycle5':0};
            const item = {}; 
            console.log(newPti)
            item[e.target.name] = e.target.value*1000000;
            newPti = {...newPti, ...item}
            console.log(newPti)
            setPtiEnPrep(newPti)
            props.updatePti(newPti);            
        }
             
        
    }  

    const handleChangePrevison = (e) => {
        const newprevCourante = {'prev_courante':e.target.value*1000000}        
        props.updatePrevision(newprevCourante);
        let newprojet = projet;
        newprojet = {...newprojet, ...newprevCourante}
        setProjet(newprojet)
        //getRessources('/api/v1/projet/'+props.projet.id).then(
            //(leprojet) => setProjet(leprojet));         
    }

    useEffect(()=> {
        setPtiEnPrep(props.pti.ptiEnPrep);
        setProjet(props.projet)
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
                    <Td><Text color='red.400'>{(props.depense.courante/1000000).toFixed(2)}</Text>/
                        <Input size='sm' width='12' type='number' name='prevision' value={projet.prev_courante/1000000} onChange={handleChangePrevison}/></Td>
                    <Td><Input size='sm' width='12' type='number' name='cycleCour' value={ptiEnPrep?ptiEnPrep.cycleCour/1000000:0} onChange={handleChange} bg='white'/></Td>
                    <Td><Input size='sm' width='12' type='number' name='cycle2' value={ptiEnPrep?ptiEnPrep.cycle2/1000000:0} onChange={handleChange} bg='white'/></Td>
                    <Td><Input size='sm' width='12' type='number' name='cycle3' value={ptiEnPrep?ptiEnPrep.cycle3/1000000:0} onChange={handleChange} bg='white'/></Td>
                    <Td><Input size='sm' width='12' type='number' name='cycle4' value={ptiEnPrep?ptiEnPrep.cycle4/1000000:0} onChange={handleChange} bg='white'/></Td>
                </Tr>
            </Tbody>
        </Table>
    )
}