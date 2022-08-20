import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Text, IconButton, Box, Container } from '@chakra-ui/react'
import { FcExpand, FcCollapse, FcAlphabeticalSortingAz } from "react-icons/fc";
import { SelectCat } from '../common/select';

const cat = ['Bâtiments municipaux', 'Parcs, espaces verts, loisirs, culture',
'Environnement','Infrastructures existantes', 'Developpement', 'Cours d\'eau', 'Divers']


export function TableAllPti(props) {

    const [tries, setTries] =useState({'no_projet':true, 'description':true, 'cycleCour': true, 'cycle2': true, 'cycle3':true})    
    
    const handleSelectProjet = (e) => {
        
        props.afficheProjet(parseInt(e.target.getAttribute('value')))
    }

    const handleFilter = (filter) => {        
        props.filter(filter);
    }

    const handleTrie = (e) => {
        let newTries = {...tries}
        tries[e.currentTarget.name]?props.trie(e.currentTarget.name, true):props.trie(e.currentTarget.name, false)
        newTries[e.currentTarget.name]?newTries[e.currentTarget.name]=false:newTries[e.currentTarget.name]=true;
        setTries(newTries)
    }

    return (
        
        
        <Box >
            <Box display='grid'>
           <SelectCat cat={cat} onChange={handleFilter}/>
           </Box>
        <Table colorScheme='blue' overflowY='scroll' size='sm'>
            <Thead position='sticky' top='0'>
                <Tr bg='blue.200'>
                    <Th>no projet<IconButton name='no_projet' onClick={handleTrie} icon={tries.no_projet?<FcExpand/>:<FcCollapse></FcCollapse> } size='xs' bgColor='blue.200'/></Th>
                    <Th>Description<IconButton name='description' onClick={handleTrie} icon={tries.description?<FcExpand/>:<FcCollapse></FcCollapse> } size='xs' bgColor='blue.200'/></Th>
                    <Th>Anterieur</Th>
                    <Th >{props.year+1}<IconButton name='cycleCour' onClick={handleTrie} icon={tries.cycleCour?<FcExpand/>:<FcCollapse></FcCollapse> } size='xs' bgColor='blue.200'/></Th>
                    <Th>{props.year+2}<IconButton name='cycle2' onClick={handleTrie} icon={tries.cycle2?<FcExpand/>:<FcCollapse></FcCollapse>} size='xs' bgColor='blue.200'/></Th>
                    <Th>{props.year+3}<IconButton name='cycle3' onClick={handleTrie} icon={tries.cycle3?<FcExpand/>:<FcCollapse></FcCollapse>} size='xs' bgColor='blue.200'/></Th>
                    <Th>ultérieur</Th>
                    
                </Tr>
            </Thead>
            <Tbody >
                {props.ptis.map(pti =>
                
                <Tr>
                    <Td onClick={handleSelectProjet}  value={pti.projet_id} textColor='blue' _hover={{background: "white", color: "teal.500",}}>{pti.no_projet}</Td>
                    <Td>{pti.description}</Td>
                    <Td>{(pti.anterieur/1000000).toFixed(2)}</Td>
                    <Td>{pti.cycleCour/1000000}</Td>
                    <Td>{pti.cycle2/1000000}</Td>
                    <Td>{pti.cycle3/1000000}</Td>
                    <Td>{((pti.cycle4 + pti.cycle5)/1000000).toFixed(2)}</Td>
                    
                </Tr>
                )}
                
            </Tbody>
            <Tfoot position='sticky' bottom='0'  zIndex='1' background='#fff'>
                <Tr>
                    <Th></Th>
                    <Th></Th>
                    <Th>TOTAL</Th>
                    <Th>{(props.ptis.reduce((accumulator, object) => {
                            return accumulator + object.cycleCour;
                            }, 0)/1000000).toFixed(2)  }
                                                            </Th>
                    <Th>{(props.ptis.reduce((accumulator, object) => {
                            return accumulator + object.cycle2;
                            }, 0)/1000000).toFixed(2)  }
                                                            </Th>
                    <Th>{(props.ptis.reduce((accumulator, object) => {
                            return accumulator + object.cycle3;
                            }, 0)/1000000).toFixed(2)  }
                                                            </Th>
                    <Th>{((props.ptis.reduce((accumulator, object) => {
                            return accumulator + object.cycle4;
                            }, 0) +
                          props.ptis.reduce((accumulator, object) => {
                                return accumulator + object.cycle5;
                                }, 0))/1000000).toFixed(2)  }
                                                            </Th>

                </Tr>
            </Tfoot>
        </Table>
        </Box>
        
    )
}

//