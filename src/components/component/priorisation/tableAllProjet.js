import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, IconButton, Box, HStack, Select, Checkbox, CheckboxGroup  } from '@chakra-ui/react'
import { FcExpand, FcCollapse } from "react-icons/fc";
import { SelectFiltre } from '../common/select';
import { AddPointage } from '../modal';
import { modJalon } from '../../util';
import { HeaderFilter } from './headerFiltre';


const cat = ['Bâtiments municipaux', 'Parcs, espaces verts, loisirs, culture',
'Environnement','Infrastructures existantes', 'Developpement', 'Cours d\'eau','Véhicules, Machineries, matériel, équipements','Logiciel, équipements informatique', 'Divers']

const statut = ['Actif', 'Complété', 'En suspend', 'En approbation', 'Abandonné']
const immo = ['oui', 'non']

export function TableAllProjet(props) {

    const [tries, setTries] =useState({'no_projet':true, 'desc':true, 'charge': true, 'pointage': true, 'statut':true, 'immo':true, 'tempsCharge':true, 'tempsTech':true })    
    const [projets, setProjets] = useState([]);
    const [listCheckbox, setListCheckbox] = useState({'statut':[], 'immo':[]});

    const handleSelectProjet = (e) => {        
        props.afficheProjet(parseInt(e.target.getAttribute('value')))
    }

    const handleFilterSelectValue = (filter, column) => {        
        props.filter(filter, column);
    }

    const handleChangeStatut = (e) => {
        let newProjets = [...projets]
        const leProjet = newProjets.find(projet => projet.id === parseInt(e.target.name))
        leProjet.statut = e.target.value;        
        setProjets(newProjets)
        modJalon(`/api/v1/projet/${e.target.name}`, {}, {'statut':e.target.value}, 'PUT')
    }

    const handleTrie = (e) => {
        let newTries = {...tries}
        tries[e.currentTarget.name]?props.trie(e.currentTarget.name, true):props.trie(e.currentTarget.name, false)
        newTries[e.currentTarget.name]?newTries[e.currentTarget.name]=false:newTries[e.currentTarget.name]=true;
        setTries(newTries)
    }

    const handleFilterCheckbox = (value, column) => {
        const newList = {}
    
       if (listCheckbox[column].find(item => item === value)) {        
        newList[column] = listCheckbox[column].filter(item => item !== value);
        setListCheckbox({...listCheckbox, ...newList});
        if (column !== 'immo') {
            handleFilterSelectValue(listCheckbox[column].filter(item => item !== value), column);
        } else {
            const booleanArray = newList[column].map(item => item === 'oui');            
            handleFilterSelectValue(booleanArray, column);
        }
        
       } else {
        newList[column] = [...listCheckbox[column], value]
        setListCheckbox({...listCheckbox, ...newList});
        if (column !== 'immo') {
            handleFilterSelectValue([...listCheckbox[column], value], column);
        } else {
            const booleanArray = newList[column].map(item => item === 'oui');           
            handleFilterSelectValue(booleanArray, column);
        }
       }
    
    }

    useEffect(() => {
        
        setListCheckbox({'statut':statut, 'immo':immo});
        
     }, [])


    useEffect(() => {
       setProjets(props.projets);
       
    }, [props])


    return (
        
        
        <Box >
            <HStack >
           <SelectFiltre items={cat} column='cat' placeHolder='catégorie' onChange={handleFilterSelectValue}/>
           <SelectFiltre items={props.user.map(user => user.username)} column='responsable' placeHolder='responsable' onChange={handleFilterSelectValue} />       
           </HStack>
        <Table colorScheme='blue' overflowY='scroll'  size='sm' display='inline-block' maxHeight='800px'>
            <Thead position='sticky' top='0' zIndex='banner'>
                <Tr bg='blue.200'>
                    <Th>no projet<IconButton name='no_projet' onClick={handleTrie} icon={tries.no_projet?<FcExpand/>:<FcCollapse></FcCollapse> } size='xs' bgColor='blue.200'/></Th>
                    <Th>Description<IconButton name='desc' onClick={handleTrie} icon={tries.description?<FcExpand/>:<FcCollapse></FcCollapse> } size='xs' bgColor='blue.200'/></Th>
                    <Th >Responsable<IconButton name='charge' onClick={handleTrie} icon={tries.charge?<FcExpand/>:<FcCollapse></FcCollapse> } size='xs' bgColor='blue.200'/></Th>
                    <Th>Pointage<IconButton name='pointage' onClick={handleTrie} icon={tries.pointage?<FcExpand/>:<FcCollapse></FcCollapse> } size='xs' bgColor='blue.200'/></Th>
                    <Th><HeaderFilter options={statut} check={listCheckbox['statut']} column='statut' handleFilter={handleFilterCheckbox}/>Statut<IconButton name='statut' onClick={handleTrie} icon={tries.statut?<FcExpand/>:<FcCollapse></FcCollapse> } size='xs' bgColor='blue.200'/></Th>
                    <Th><HeaderFilter options={immo} check={listCheckbox['immo']} column='immo' handleFilter={handleFilterCheckbox}/>Immobilisation<IconButton name='immo' onClick={handleTrie} icon={tries.immo?<FcExpand/>:<FcCollapse></FcCollapse> } size='xs' bgColor='blue.200'/></Th>                   
                    <Th>Chargé projet (hrs)<IconButton name='tempsCharge' onClick={handleTrie} icon={tries.tempsCharge?<FcExpand/>:<FcCollapse></FcCollapse> } size='xs' bgColor='blue.200'/></Th>
                    <Th>Technicien (hrs)<IconButton name='tempsTech' onClick={handleTrie} icon={tries.tempsTech?<FcExpand/>:<FcCollapse></FcCollapse> } size='xs' bgColor='blue.200'/></Th>
                    
                </Tr>
            </Thead>
            <Tbody >
                {projets.map(projet =>
                
                <Tr key={projet.id}>
                    <Td onClick={handleSelectProjet}  value={projet.id} textColor='blue' _hover={{background: "white", color: "teal.500",}}>{projet.no_projet}</Td>
                    <Td>{projet.desc}</Td>
                    <Td>{projet.responsable?projet.responsable:''}</Td>
                    <Td>{<AddPointage rating={projet.rating} projet={projet} />}</Td>
                    <Td>
                        <Select size='xs' name={projet.id} onChange={handleChangeStatut} value={projet.statut}>
                                {statut.map(item => <option key={item} value={item} >{item}</option>)}
                        </Select>
                    </Td>
                    <Td>{projet.immo?'oui':'non'}</Td>
                    <Td>{projet.nature?projet.nature.tempsCharge:0}</Td>
                    <Td>{projet.nature?projet.nature.tempsTech:0}</Td>                    
                    
                </Tr>
                )}
                
            </Tbody>
            <Tfoot position='sticky' bottom='0'  zIndex='1' background='#fff'>
                <Tr>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                    <Th>TOTAL</Th>
                    <Th>{(projets.reduce((accumulator, object) => {
                            if (object.nature) {
                                return accumulator + parseInt(object.nature.tempsCharge);
                            } else {
                                return accumulator
                            }                            
                            }, 0)) }
                                                            </Th>
                    <Th>{(projets.reduce((accumulator, object) => {
                            if (object.nature) {
                                return accumulator + parseInt(object.nature.tempsTech);
                            } else {
                                return accumulator
                            }                            
                            }, 0)) }
                                                            </Th>
                    

                </Tr>
            </Tfoot>
           

        </Table>
        </Box>
        
    )
}