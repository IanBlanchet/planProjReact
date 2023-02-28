import { useState, useEffect, useContext } from 'react';
import { TableAllContrat } from '../component/allContrats/tableAllContrat';
import {  
    Box, VStack, Flex, Grid, GridItem,
    Select, ButtonGroup, Input, Heading } from '@chakra-ui/react'
import { getRessources } from '../util';
import { useFilter } from '../../hooks/useFilter';
import { useSort } from '../../hooks/useSort';
import { SortButton } from '../component/common/sortButton';
import { BaseDataContext } from '../../auth';


const cat = ['Bâtiments municipaux', 'Parcs, espaces verts, loisirs, culture',
'Environnement','Infrastructures existantes', 'Developpement', 'Cours d\'eau','Véhicules, Machineries, matériel, équipements','Logiciel, équipements informatique', 'Divers']

const serviceArray = ['Ingénierie', 'Travaux publics', 'Environnement', 'SRC', 'Urbanisme', 'Développement Économique', 'Greffe', 'Finance', 'Communications', 'Incendies', 'RH']
const statut = ['actif', 'complet', 'annulé']


export const AllContrat = () => {
    
    const {user, projet, savedFilter, retainFilter} = useContext(BaseDataContext)
    const [rawContrat, setRawContrat] = useState([]);
    const [contrat, setContrat] = useState([]);    
    const [filters, setFilters] = useState(savedFilter['listcontrat']); 
    const [sortCriteria, setSortCriteria] = useState({level:'baseColumn', criteria:'', direction:true})
    const [searchInput, setSearchInput]= useState('')  
    let contratFiltre = useFilter(filters, contrat);
    let contratFiltreSort = useSort(sortCriteria, contratFiltre)

    

    const handleFilter = ({target}) => {
        const filter = {};        
        if (target.name === 'charge_contrat') {
            filter[target.name] = parseInt(target.value);
        } else {
            filter[target.name] = target.value;
        }
        
        setFilters({...filters, ...filter});
        retainFilter({'listcontrat':{...filters, ...filter}})
    }


    const handleSort = (target, sortDirection) => {
        
        const newCriteria = {level:target.getAttribute('level'), criteria:target.getAttribute('value'), direction:sortDirection }
        setSortCriteria(newCriteria)
    }



    const handleSearch = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);        
        if (e.target.value.length > 0) {
            let findedContrats = [];
            findedContrats = rawContrat.filter(contrat => contrat.desc.toLowerCase().includes(e.target.value.toLowerCase()));            
            setContrat(findedContrats);
        } else {
            setContrat(rawContrat);
        }
    }

    useEffect(() => {
        
        getRessources('/api/v1/contrat').then( contrats => {                     
            contrats.forEach(contrat => {
                if (!contrat.charge_contrat) {
                    if (contrat.projet_id) {
                        const associatedProjet = projet.find(item => item.id === contrat.projet_id);
                        associatedProjet&&(contrat['charge_contrat'] = associatedProjet.charge)
                        contrat['responsable'] = contrat.charge_contrat?user.find(item => item.id === contrat.charge_contrat).username:''
                    }
                } else {                    
                    const leResponsable = user.find(item => item.id === contrat.charge_contrat);
                    contrat['responsable'] = leResponsable.username
                }            
            
            })
            setRawContrat(contrats);
            setContrat(contrats);            
            
            }
            
        );
       
    }, [])
    
    return (
        <>  
            <Grid templateColumns='1fr 5px 8fr' gap='2px'>
            
            <GridItem colSpan='1' width='max-content' bg='blue.500'>

                <VStack overflow='hidden' gap='3' margin='5px'>
                    <>

                    <Select minWidth='285px' placeholder='filtrer par responsable' value={filters.charge_contrat&&filters.charge_contrat} onChange={handleFilter} name='charge_contrat' bg='white' size='xs'>
                        {user.map(item => <option key={item.id} value={item.id}>{item.username}</option>)}
                    </Select>
                    <Select placeholder='filtrer par statut' value={filters.statut&&filters.statut} onChange={handleFilter} name='statut' bg='white' size='xs'>
                        {statut.map(item => <option key={item} value={item}>{item}</option>)}
                    </Select>
                    <Input type='search' placeholder='Recherche par mot clé' value={searchInput} onChange={handleSearch} bg='white' size='xs'></Input>
                    <ButtonGroup variant='outline' spacing='2px'>
                        <SortButton level='baseColumn' value='no' title='No contrat' onClick={handleSort}/>
                        <SortButton level='baseColumn' value='montant' title='Montant' onClick={handleSort}/>
                    </ButtonGroup>

                    </>
                 
                </VStack>
           </GridItem >
            
           <GridItem colSpan='1' margin='1px'>
            <Box bg='blue.300' height='880px' ></Box>
           </GridItem>
        
           <GridItem colSpan='1' height='880px' overflowY='scroll' >
                    <TableAllContrat  contrat={contratFiltreSort}/>
            </GridItem>
           
        </Grid>          
            
        </>
    )
}