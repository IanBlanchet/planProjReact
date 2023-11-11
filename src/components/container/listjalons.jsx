import { TableAllJalon } from '../component/listjalons/tableAllJalon';
import { useContext, useState, useEffect } from 'react';
import {  
    Box, VStack, Flex, Grid, GridItem,
    Select, ButtonGroup, Input, Heading } from '@chakra-ui/react'
import { BaseDataContext } from '../../auth';
import { useFilter } from '../../hooks/useFilter';
import { getRessources } from '../util';


const jalonsDesc = ['C_Direction', 'Conseil', 'Commission', 'AO', 'Livrable', 'D_travaux', 'F_travaux', 'Fermeture', 'Demande_CA', 'TQC']
const services = ['ING', 'TP', 'ENV', 'GEN', 'SRC', 'URBA', 'GREFFE' ]


export const ListJalons = () => {
    
   const data = useContext(BaseDataContext)
   const [jalons, setJalons] = useState([]);
   const [filters, setFilters] = useState(data.savedFilter['listjalon']);    
   let jalonFiltre = useFilter(filters, jalons);


   const refresh = (initiater, selectedJalon) => {
        if (initiater === 'delete') {
            setJalons(jalons.filter(jalon => jalon.id !== selectedJalon.id))
        } else {
            setJalons([...jalons, selectedJalon])
        }
        
        };

    
    const handleFilter =  ({target}) => {
            const filter = {};        
            if (target.name === 'charge_jalon') {
                filter[target.name] = parseInt(target.value);
            } else {
                filter[target.name] = target.value;
            }
            
            setFilters({...filters, ...filter});
            data.retainFilter({'listjalon':{...filters, ...filter}})
        }


   useEffect(() => { getRessources('/api/v1/jalon').then(
        (lesjalons) => {
        
        for (let i = 0; i < lesjalons.length; i++) {
            lesjalons[i].charge_jalon?lesjalons[i].service = data.user.find(element => element.id === lesjalons[i].charge_jalon).service:lesjalons[i].service = ""
        }
        
        
        lesjalons = lesjalons.filter(jalon => jalon.etat === 'travail').sort((a,b) => (a['date'] > b['date']) ? 1 : ((b['date'] > a['date']) ? -1 : 0));
        setJalons(lesjalons);
        //setFilters({'charge_jalon':false})            
            
        }
        )

        }, [])
    
    return (
        <>
        <Grid templateColumns='1fr 5px 8fr' gap='2px'>
            
            <GridItem colSpan='1' width='max-content' bg='blue.500'>

                <VStack overflow='hidden' gap='3' margin='5px'>
                    <>
                    

                    <Select minWidth='285px' placeholder='filtrer par responsable' value={filters.charge_jalon&&filters.charge_jalon} onChange={handleFilter} name='charge_jalon' bg='white' size='xs'>
                        {data.user.filter(item => item.statut === 'actif' || item.statut === 'admin')
                        .map(item => <option key={item.id} value={item.id}>{item.prenom} {item.nom}</option>)}
                        
                    </Select>
                    <Select placeholder='filtrer par jalon' onChange={handleFilter} value={filters.jalon&&filters.jalon}  name='jalon' bg='white' size='xs'>
                        {jalonsDesc.map(item => <option key={item} value={item.id}>{item}</option>)}
                    </Select>
                    <Select placeholder='filtrer par service' onChange={handleFilter} value={filters.service&&filters.service} name='service' bg='white' size='xs'>
                        {services.map(item => <option key={item} value={item}>{item}</option>)}
                    </Select>
                    
                

                    </>
                 
                </VStack>
            </GridItem >


            <GridItem colSpan='1' margin='1px'>
                <Box bg='blue.300' height='880px' ></Box>
            </GridItem>

           <GridItem colSpan='1' height='880px' overflowY='scroll' >

            <  TableAllJalon jalons={jalonFiltre} 
                             users={data.user}
                             projets={data.projet}
                             contrats={data.contrat}
                             refresh={refresh}
                             />
            </GridItem>
         </Grid>

        </>
    )

}