import { useState, useEffect, useContext } from 'react';
import {  
    Box, VStack, Flex, Grid, GridItem,
    Select, ButtonGroup, Input, Heading } from '@chakra-ui/react'
import { SelectFiltre } from '../common/select';
import { AddPointage } from '../modal';
import { modJalon } from '../../util';
import { getRessources } from '../../util';
import { ProjetBox } from './projetBox';
import { useFilter } from '../../../hooks/useFilter';
import { useSort} from '../../../hooks/useSort';
import { SortButton } from '../common/sortButton';


const cat = ['Bâtiments municipaux', 'Parcs, espaces verts, loisirs, culture',
'Environnement','Infrastructures existantes', 'Developpement', 'Cours d\'eau','Véhicules, Machineries, matériel, équipements','Logiciel, équipements informatique', 'Divers']

const serviceArray = ['Ingénierie', 'Travaux publics', 'Environnement', 'SRC', 'Urbanisme', 'Développement Économique', 'Greffe', 'Finance', 'Communications', 'Incendies', 'RH']

export function TableStrategic({user}) {
    const [rawProjet, setRawProjet] = useState([]);
    const [projet, setProjet] = useState([]);    
    const [filters, setFilters] = useState({}); 
    const [sortCriteria, setSortCriteria] = useState({level:'baseColumn', criteria:'', direction:true})
    const [searchInput, setSearchInput]= useState('')  
    let projetFiltre = useFilter(filters, projet);
    let projetFiltreSort = useSort(sortCriteria, projetFiltre)

   
    const calcTotalProjetServices = () => {
        const entete = ["Services", "Nombre de projets", { role: 'annotation' }]
        const data = serviceArray.map(item => [item, projetFiltre.reduce(
            (accumulator, currentValue) => accumulator + (currentValue.nature.services.find(x => item === x)?1:0),
            0), item])            
        return [ entete, ...data]
    }
    const totalProjetServices = calcTotalProjetServices()
  
    
    const handleFilter = ({target}) => {
        const filter = {};        
        if (target.name === 'charge') {
            filter[target.name] = parseInt(target.value);
        } else {
            filter[target.name] = target.value;
        }
        
        setFilters({...filters, ...filter})
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
            let filterProjet = projets.filter(item => item.nature&&item.nature.isStrategic);                        
            filterProjet = filterProjet.filter(item => item.nature&&(new Date(item.nature.echeance).getFullYear()) === 2023);
            filterProjet = filterProjet.filter(item => item.statut === 'Actif' ||item.statut === 'En approbation');
            filterProjet = filterProjet.sort((a,b) => {
                if (a.nature.echeance < b.nature.echeance){
                  return -1;
                } 
                if (a.nature.echeance > b.nature.echeance) {
                  return 1;
                }
                return 0
            })
            setRawProjet(filterProjet);
            setProjet(filterProjet);            
          
            }
            
        );
       
    }
    
    
    
    , [])


    return (
        
        
        <Grid templateColumns='1fr 5px 8fr' gap='2px'>
            
            <GridItem colSpan='1' width='max-content' bg='blue.500'>

                <VStack overflow='hidden' gap='3' margin='5px'>
                    <>
                    
                    <Select placeholder='filtrer par catégorie' onChange={handleFilter} name='cat' bg='white' size='xs'>
                        {cat.map(item => <option key={item} value={item}>{item}</option>)}
                    </Select>
                    <Select placeholder='filtrer par responsable' onChange={handleFilter} name='charge' bg='white' size='xs'>
                        {user.filter(item => item.statut === 'actif' || item.statut === 'admin')
                        .map(item => <option key={item.id} value={item.id}>{item.prenom} {item.nom}</option>)}
                    </Select>
                    <Input type='search' placeholder='Recherche par mot clé' value={searchInput} onChange={handleSearch} bg='white' size='xs'></Input>
                    <ButtonGroup variant='outline' spacing='2px'>
                        <SortButton level='baseColumn' value='no_projet' title='No projet' onClick={handleSort}/>
                        <SortButton level='natureLevel' value='echeance' title='Échéance' onClick={handleSort}/>
                        <SortButton level='natureLevel' value='avancement' title='Avancement' onClick={handleSort}/>
                    </ButtonGroup>

                    </>
                 
                </VStack>
           </GridItem >
            
           <GridItem colSpan='1' margin='1px'>
            <Box bg='blue.300' height='880px' ></Box>
           </GridItem>
        
           <GridItem colSpan='1' height='880px' overflowY='scroll' >
                <Flex gap='1' direction='row' wrap='wrap' justifyContent='right' >
                    {projetFiltreSort.map(projet =>                      
                        <ProjetBox projet={projet} user={projet.charge?user.find(item => item.id === projet.charge):[]} key={projet.id}/>                   
                    )}
                    
                </Flex>
            </GridItem>
           
        </Grid>
        
    )
}

