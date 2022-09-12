import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, IconButton, Box, HStack  } from '@chakra-ui/react'
import { FcExpand, FcCollapse } from "react-icons/fc";
import { SelectFiltre } from '../common/select';
import { AddPointage } from '../modal';


const cat = ['Bâtiments municipaux', 'Parcs, espaces verts, loisirs, culture',
'Environnement','Infrastructures existantes', 'Developpement', 'Cours d\'eau','Véhicules, Machineries, matériel, équipements','Logiciel, équipements informatique', 'Divers']


export function TableAllProjet(props) {

    const [tries, setTries] =useState({'no_projet':true, 'desc':true, 'charge': true, 'pointage': true, 'statut':true})    
    

    const handleSelectProjet = (e) => {
        
        props.afficheProjet(parseInt(e.target.getAttribute('value')))
    }

    const handleFilter = (filter, column) => {        
        props.filter(filter, column);
    }

    const handleTrie = (e) => {
        let newTries = {...tries}
        tries[e.currentTarget.name]?props.trie(e.currentTarget.name, true):props.trie(e.currentTarget.name, false)
        newTries[e.currentTarget.name]?newTries[e.currentTarget.name]=false:newTries[e.currentTarget.name]=true;
        setTries(newTries)
    }



    useEffect(() => {
       
    }, [props])


    return (
        
        
        <Box >
            <HStack >
           <SelectFiltre items={cat} column='cat' placeHolder='catégorie' onChange={handleFilter}/>
           <SelectFiltre items={props.user.map(user => user.username)} column='responsable' placeHolder='responsable' onChange={handleFilter} />
           </HStack>
        <Table colorScheme='blue' overflowY='scroll'  size='sm' display='inline-block' maxHeight='1000px'>
            <Thead position='sticky' top='0' zIndex='banner'>
                <Tr bg='blue.200'>
                    <Th>no projet<IconButton name='no_projet' onClick={handleTrie} icon={tries.no_projet?<FcExpand/>:<FcCollapse></FcCollapse> } size='xs' bgColor='blue.200'/></Th>
                    <Th>Description<IconButton name='desc' onClick={handleTrie} icon={tries.description?<FcExpand/>:<FcCollapse></FcCollapse> } size='xs' bgColor='blue.200'/></Th>
                    <Th >Responsable<IconButton name='charge' onClick={handleTrie} icon={tries.charge?<FcExpand/>:<FcCollapse></FcCollapse> } size='xs' bgColor='blue.200'/></Th>
                    <Th>Pointage<IconButton name='pointage' onClick={handleTrie} icon={tries.pointage?<FcExpand/>:<FcCollapse></FcCollapse> } size='xs' bgColor='blue.200'/></Th>
                    <Th>Statut<IconButton name='statut' onClick={handleTrie} icon={tries.statut?<FcExpand/>:<FcCollapse></FcCollapse> } size='xs' bgColor='blue.200'/></Th>                   
                    <Th>Chargé projet (hrs)</Th>
                    <Th>Technicien (hrs)</Th>
                    
                </Tr>
            </Thead>
            <Tbody >
                {props.projets.map(projet =>
                
                <Tr>
                    <Td onClick={handleSelectProjet}  value={projet.id} textColor='blue' _hover={{background: "white", color: "teal.500",}}>{projet.no_projet}</Td>
                    <Td>{projet.desc}</Td>
                    <Td>{projet.responsable?projet.responsable:''}</Td>
                    <Td>{<AddPointage rating={projet.rating} projet={projet} />}</Td>
                    <Td>{projet.statut}</Td>
                    <Td>{projet.nature?projet.nature.tempsCharge:0}</Td>
                    <Td>{projet.nature?projet.nature.tempsTech:0}</Td>                    
                    
                </Tr>
                )}
                
            </Tbody>
           

        </Table>
        </Box>
        
    )
}