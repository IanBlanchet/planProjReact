import { useState, useEffect } from 'react';
import {  Box, VStack, Flex, Grid, GridItem, Select, Text, Textarea, Checkbox, CheckboxGroup, Input, Heading } from '@chakra-ui/react'
import { FcExpand, FcCollapse } from "react-icons/fc";
import { SelectFiltre } from '../common/select';
import { AddPointage } from '../modal';
import { modJalon } from '../../util';
import { getRessources } from '../../util';
import { ProjetBox } from './projetBox';
import { useFilter } from '../../../hooks/useFilter';
import { BarChart } from './charts';


const blanckNature = {'nature': [' '], 'justification':[' '], 'refus':[' '], 'tempsCharge':0, 'tempsTech' :0, 'services':[], 'avancement':0, 'impacts':[], 'isStrategic':true, 'echeance':'', 'notes':'' }
const cat = ['Bâtiments municipaux', 'Parcs, espaces verts, loisirs, culture',
'Environnement','Infrastructures existantes', 'Developpement', 'Cours d\'eau','Véhicules, Machineries, matériel, équipements','Logiciel, équipements informatique', 'Divers']

const serviceArray = ['Ingénierie', 'Travaux publics', 'Environnement', 'SRC', 'Urbanisme', 'Développement Économique', 'Greffe', 'Finance', 'Communications', 'Incendies', 'RH']

export function TableStrategic({user, afficheProjet}) {
    const [projet, setProjet] = useState([])
    const [tries, setTries] =useState({'no_projet':true, 'desc':true, 'charge': true, 'pointage': true})    
    const [filters, setFilters] = useState({});    
    let projetFiltre = useFilter(filters, projet)
   
    const calcTotalProjetServices = () => {
        const entete = ["Services", "Nombre de projets", { role: 'annotation' }]
        const data = serviceArray.map(item => [item, projetFiltre.reduce(
            (accumulator, currentValue) => accumulator + (currentValue.nature.services.find(x => item === x)?1:0),
            0), item])            
        return [ entete, ...data]
    }
    const totalProjetServices = calcTotalProjetServices()


    const handleTrie = (e) => {
        let newTries = {...tries}
        tries[e.currentTarget.name]?props.trie(e.currentTarget.name, true):props.trie(e.currentTarget.name, false)
        newTries[e.currentTarget.name]?newTries[e.currentTarget.name]=false:newTries[e.currentTarget.name]=true;
        setTries(newTries)
    } 
    
    const handleFilter = ({target}) => {
        const filter = {};        
        if (target.name === 'charge') {
            filter[target.name] = parseInt(target.value);
        } else {
            filter[target.name] = target.value;
        }
        
        setFilters({...filters, ...filter})
    }
    


    useEffect(() => {
        getRessources('/api/v1/projet').then( projets => {                     
            let filterProjet = projets.filter(item => item.nature&&item.nature.isStrategic);                        
            filterProjet = filterProjet.filter(item => item.nature&&(new Date(item.nature.echeance).getFullYear()) === 2023)
            setProjet(filterProjet.sort((a,b) => {
                if (a.no_projet < b.no_projet){
                  return -1;
                } 
                if (a.no_projet > b.no_projet) {
                  return 1;
                }
                return 0
            }))
          
            }
        );
       
    }, [])


    return (
        
        
        <Grid templateColumns='1fr 1fr 1fr 1fr'  templateAreas=' "filter projets projets projets"' >
            
            <GridItem gridArea='filter' width='max-content'>

                <VStack overflow='hidden' gap='3'>
                    <>
                    <Heading>Filtres</Heading>
                    <Select placeholder='filtrer par catégorie' onChange={handleFilter} name='cat'>
                        {cat.map(item => <option key={item} value={item}>{item}</option>)}
                    </Select>
                    <Select placeholder='filtrer par responsable' onChange={handleFilter} name='charge'>
                        {user.map(item => <option key={item.id} value={item.id}>{item.username}</option>)}
                    </Select>
                    </>
                    <>
                    <Heading>Statistiques</Heading>
                    <BarChart data={totalProjetServices}/>                   
                    </>
                </VStack>
           </GridItem>
        
           <GridItem gridArea='projets' height='850px' overflowY='scroll'>
                <Flex gap='1' direction='row' wrap='wrap' justifyContent='right' >
                    {projetFiltre.map(projet =>                      
                        <ProjetBox projet={projet} user={projet.charge?user.find(item => item.id === projet.charge):[]} afficheProjet={afficheProjet}/>                   
                    )}
                    
                </Flex>
            </GridItem>
           
        </Grid>
        
    )
}

