import { useState, useEffect, useContext } from 'react';
import { TableAllProjet } from '../component/allProjets/tableAllProjet';
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
const statut = ['Complété', 'Actif', 'Abandonné', 'En réception', 'En approbation', 'En suspend']


export const AllProjet = () => {
    
    const {user, savedFilter, retainFilter} = useContext(BaseDataContext)
    const [rawProjet, setRawProjet] = useState([]);
    const [projet, setProjet] = useState([]);    
    const [filters, setFilters] = useState(savedFilter['listprojet']); 
    const [sortCriteria, setSortCriteria] = useState({level:'baseColumn', criteria:'', direction:true})
    const [searchInput, setSearchInput]= useState('')  
    let projetFiltre = useFilter(filters, projet);
    let projetFiltreSort = useSort(sortCriteria, projetFiltre)

    

    const handleFilter = ({target}) => {
        const filter = {};        
        if (target.name === 'charge') {
            filter[target.name] = parseInt(target.value);
        } else {
            filter[target.name] = target.value;
        }
        
        setFilters({...filters, ...filter});
        retainFilter({'listprojet':{...filters, ...filter}})
    }


    const handleSort = (target, sortDirection) => {
        
        const newCriteria = {level:target.getAttribute('level'), criteria:target.getAttribute('value'), direction:sortDirection }
        setSortCriteria(newCriteria)
    }



    const handleSearch = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);        
        if (e.target.value.length > 0) {
            let findedProjets = [];
            findedProjets = rawProjet.filter(projet => projet.desc.toLowerCase().includes(e.target.value.toLowerCase()));            
            setProjet(findedProjets);
        } else {
            setProjet(rawProjet);
        }
    }

    useEffect(() => {
        
        getRessources('/api/v1/projet').then( projets => {                     

            setRawProjet(projets);
            setProjet(projets);            
            
            }
            
        );
       
    }, [])
    
    return (
        <>  
            <Grid templateColumns='1fr 5px 8fr' gap='2px'>
            
            <GridItem colSpan='1' width='max-content' bg='blue.500'>

                <VStack overflow='hidden' gap='3' margin='5px'>
                    <>
                    
                    <Select placeholder='filtrer par catégorie' value={filters.cat&&filters.cat} onChange={handleFilter} name='cat' bg='white' size='xs'>
                        {cat.map(item => <option key={item} value={item}>{item}</option>)}
                    </Select>
                    <Select placeholder='filtrer par responsable' value={filters.charge&&filters.charge} onChange={handleFilter} name='charge' bg='white' size='xs'>
                        {user.map(item => <option key={item.id} value={item.id}>{item.username}</option>)}
                    </Select>
                    <Select placeholder='filtrer par statut' value={filters.statut&&filters.statut} onChange={handleFilter} name='statut' bg='white' size='xs'>
                        {statut.map(item => <option key={item} value={item.id}>{item}</option>)}
                    </Select>
                    <Input type='search' placeholder='Recherche par mot clé' value={searchInput} onChange={handleSearch} bg='white' size='xs'></Input>
                    <ButtonGroup variant='outline' spacing='2px'>
                        <SortButton level='baseColumn' value='no_projet' title='No projet' onClick={handleSort}/>
                        
                    </ButtonGroup>

                    </>
                 
                </VStack>
           </GridItem >
            
           <GridItem colSpan='1' margin='1px'>
            <Box bg='blue.300' height='880px' ></Box>
           </GridItem>
        
           <GridItem colSpan='1' height='880px' overflowY='scroll' >
                    <TableAllProjet  projet={projetFiltreSort}/>
            </GridItem>
           
        </Grid>          
            
        </>
    )
}