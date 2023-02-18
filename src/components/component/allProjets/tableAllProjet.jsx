import { useState, useEffect, useContext } from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, IconButton, Box, HStack, Select, Checkbox, CheckboxGroup  } from '@chakra-ui/react'
import { FcExpand, FcCollapse } from "react-icons/fc";
import { SelectFiltre } from '../common/select';
import { AddPointage } from '../modal';
import { modJalon } from '../../util';
import { BaseDataContext } from '../../../auth';



const cat = ['Bâtiments municipaux', 'Parcs, espaces verts, loisirs, culture',
'Environnement','Infrastructures existantes', 'Developpement', 'Cours d\'eau','Véhicules, Machineries, matériel, équipements','Logiciel, équipements informatique', 'Divers']

const statut = ['Actif', 'Complété', 'En suspend', 'En approbation', 'Abandonné', 'En réception']
const immo = ['oui', 'non']

export function TableAllProjet({projet}) {

    
    const [projets, setProjets] = useState(projet);
    const {user} = useContext(BaseDataContext)

    
    const handleChange = (e) => {
        const fieldToUpdate  = {}
        fieldToUpdate[e.target.getAttribute("field")] = e.target.value
        let newProjets = [...projets]
        const leProjet = newProjets.find(projet => projet.id === parseInt(e.target.name));        
        leProjet[e.target.getAttribute("field")] = e.target.value; 
        modJalon(`/api/v1/projet/${e.target.name}`, {}, fieldToUpdate, 'PUT').then(
            response => setProjets(newProjets)
        );       
        
        
    }


    useEffect(() => {
      
        
     }, [])


    useEffect(() => {
       setProjets(projet);
       
    }, [projet])


    return (
        
        
        <Box >

        <Table colorScheme='blue' overflowY='scroll'  size='sm' display='inline-block' maxHeight='800px'>
            <Thead position='sticky' top='0' zIndex='banner'>
                <Tr bg='white'>
                    <Th>no projet</Th>
                    <Th>Description</Th>
                    <Th>Responsable</Th>
                    <Th>Catégorie</Th>                    
                    <Th>Statut</Th>
                    <Th>Immobilisation</Th>                   

                    
                </Tr>
            </Thead>
            <Tbody >
                {projets.map(projet =>
                
                <Tr key={projet.id}>
                    <Td value={projet.id} textColor='blue' _hover={{background: "white", color: "teal.500",}}>{projet.no_projet}</Td>
                    <Td>{projet.desc}</Td>
                    <Td>{projet.charge?user.find(user => user.id === projet.charge).username:''}</Td>
                    <Td>
                        <Select size='xs' name={projet.id} field='cat' onChange={handleChange} value={projet.cat}>
                                {cat.map(item => <option key={item} value={item} >{item}</option>)}
                        </Select>
                    </Td>
                    <Td>
                        <Select size='xs' name={projet.id} field='statut' onChange={handleChange} value={projet.statut}>
                                {statut.map(item => <option key={item} value={item} >{item}</option>)}
                        </Select>
                    </Td>
                    <Td>{projet.immo?'oui':'non'}</Td>               
                    
                </Tr>
                )}
                
            </Tbody>
            

        </Table>
        </Box>
        
    )
}