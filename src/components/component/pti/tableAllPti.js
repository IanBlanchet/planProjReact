import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../auth';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, Text, TableCaption, TableContainer,Grid, Select, IconButton, Box, HStack, Badge, Switch } from '@chakra-ui/react'
import { FcExpand, FcCollapse } from "react-icons/fc";
import { SelectFiltre } from '../common/select';
import { Link } from 'react-router-dom';


const cat = ['Bâtiments municipaux', 'Parcs, espaces verts, loisirs, culture',
'Environnement','Infrastructures existantes', 'Developpement', 'Cours d\'eau','Véhicules, Machineries, matériel, équipements','Logiciel, équipements informatique', 'Divers']


export function TableAllPti(props) {

    const [tries, setTries] =useState({'no_projet':true, 'description':true, 'cycleCour': true, 'cycle2': true, 'cycle3':true})    
    const [assReglements, setAssReglements] = useState([]);
    const [reglement, setReglement] = useState([]);
    const [format, setFormat] = useState('sm');
    const [isOnlyNew, setIsOnlyNew] = useState(false)
    const value = useContext(AuthContext);


    const handleFilterStatus = () => {
        if (!isOnlyNew) {
            setIsOnlyNew(true);
            props.filter(['En approbation'], 'statut')
        } else {
            setIsOnlyNew(false)
            props.filter(false, 'statut')
        }
    }

    const handleTrie = (e) => {
        let newTries = {...tries};
        tries[e.currentTarget.name]?props.sort(
                                    {'criteria':e.currentTarget.name, 'level':'baseColumn', 'direction':true}):
                                    props.sort(
                                    {'criteria':e.currentTarget.name, 'level':'baseColumn', 'direction':false})
        //tries[e.currentTarget.name]?props.trie(e.currentTarget.name, true):props.trie(e.currentTarget.name, false)
        newTries[e.currentTarget.name]?newTries[e.currentTarget.name]=false:newTries[e.currentTarget.name]=true;
        setTries(newTries);
        
    }

    useEffect(() => {
        setReglement(props.reglement);
        setAssReglements(props.assReglements);
    }, [props])


    return (
        
        
        <Box >  
           
        <Table colorScheme='blue' overflowY='scroll'  size={format} display='inline-block' maxHeight='800px' 
                onDoubleClick={()=>(format === 'sm')?setFormat('md'):setFormat('sm')} >
            <Thead position='sticky' top='0'>
                <Tr bg='blue.200'>
                    <Th>no projet<IconButton name='no_projet' onClick={handleTrie} icon={tries.no_projet?<FcExpand/>:<FcCollapse></FcCollapse> } size='xs' bgColor='blue.200'/></Th>
                    <Th>Description<IconButton name='description' onClick={handleTrie} icon={tries.description?<FcExpand/>:<FcCollapse></FcCollapse> } size='xs' bgColor='blue.200'/></Th>
                    <Th>Règlement</Th>
                    <Th borderRight='2px'>Anterieur</Th>
                    <Th >{props.year+1}<IconButton name='cycleCour' onClick={handleTrie} icon={tries.cycleCour?<FcExpand/>:<FcCollapse></FcCollapse> } size='xs' bgColor='blue.200'/></Th>
                    <Th>{props.year+2}<IconButton name='cycle2' onClick={handleTrie} icon={tries.cycle2?<FcExpand/>:<FcCollapse></FcCollapse>} size='xs' bgColor='blue.200'/></Th>
                    <Th>{props.year+3}<IconButton name='cycle3' onClick={handleTrie} icon={tries.cycle3?<FcExpand/>:<FcCollapse></FcCollapse>} size='xs' bgColor='blue.200'/></Th>
                    <Th>ultérieur</Th>
                    <Th borderLeft='2px'>Dépenses réelles année courante</Th>
                    <Th>Avancement</Th>
                   
                    
                </Tr>
            </Thead>
            <Tbody >
                {props.ptis.map(pti =>
                
                <Tr>
                    <Td textColor='blue' _hover={{background: "white", color: "teal.500",}}>
                        {value.user&&value.user.statut != 'elu'?
                        <Link to={`/detaildossier/${pti.projet_id}`}>{pti.no_projet}</Link>:
                        pti.no_projet
                        }
                    </Td>
                    <Td>{pti.description}  </Td>
                    <Td>{assReglements.find(item => item.projet_id === pti.projet_id)?
                        reglement.find( lereglement => lereglement.id === assReglements.find(item => item.projet_id === pti.projet_id).reglement_id)?
                        reglement.find( lereglement => lereglement.id === assReglements.find(item => item.projet_id === pti.projet_id).reglement_id).numero:
                        "":""                
                    }</Td>
                  
                    
                    <Td borderRight='2px'>{(pti.anterieur/1000000).toFixed(2)}</Td>
                    <Td>{pti.cycleCour/1000000}</Td>
                    <Td>{pti.cycle2/1000000}</Td>
                    <Td>{pti.cycle3/1000000}</Td>
                    <Td>{((pti.cycle4 + pti.cycle5)/1000000).toFixed(2)}</Td>
                    <Td borderLeft='2px' backgroundColor='gray.200'>{(pti.depense_courante/1000000).toFixed(2)}
                    </Td>
                    <Td backgroundColor='gray.200'>{((props.projet.find(item => item.id === pti.projet_id)?
                        props.projet.find(item => item.id === pti.projet_id).nature.avancement?
                        props.projet.find(item => item.id === pti.projet_id).nature.avancement:0:0)/100).toLocaleString('en-US',
                        { style: 'percent',                          
                          
                          maximumFractionDigits: 0,})}</Td>
                   
                    
                </Tr>
                )}
                
            </Tbody>
            <Tfoot position='sticky' bottom='0'  zIndex='1' background='#fff'>
                <Tr>
                    <Th></Th>
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
                    <Th>{(props.ptis.reduce((accumulator, object) => {
                            return accumulator + object.depense_courante;
                            }, 0)/1000000).toFixed(2)  }</Th>
                    <Th></Th>


                </Tr>
            </Tfoot>
        </Table>
        </Box>
        
    )
}

