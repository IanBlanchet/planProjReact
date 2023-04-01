import { TableListJalons } from '../component/listjalons/tableListJalons';
import { useContext } from 'react';
import {  
    Box, VStack, Flex, Grid, GridItem,
    Select, ButtonGroup, Input, Heading } from '@chakra-ui/react'
import { BaseDataContext } from '../../auth';


const jalonsDesc = ['C_Direction', 'Conseil', 'Commission', 'AO', 'Livrable', 'D_travaux', 'F_travaux', 'Fermeture', 'Demande_CA', 'TQC']
const services = ['ING', 'TP', 'ENV', 'GEN', 'SRC', 'URBA', 'GREFFE' ]


export const ListJalons = () => {
    
   const data = useContext(BaseDataContext)

    
    return (
        <>
        <Grid templateColumns='1fr 5px 8fr' gap='2px'>
            
            <GridItem colSpan='1' width='max-content' bg='blue.500'>

                <VStack overflow='hidden' gap='3' margin='5px'>
                    <>
                    

                    <Select placeholder='filtrer par responsable'   name='charge' bg='white' size='xs'>
                        {data.user.filter(item => item.statut === 'actif' || item.statut === 'admin')
                        .map(item => <option key={item.id} value={item.id}>{item.prenom} {item.nom}</option>)}
                        
                    </Select>
                    <Select placeholder='filtrer par jalon'   name='jalon' bg='white' size='xs'>
                        {jalonsDesc.map(item => <option key={item} value={item.id}>{item}</option>)}
                    </Select>
                    
                

                    </>
                 
                </VStack>
            </GridItem >


            <GridItem colSpan='1' margin='1px'>
                <Box bg='blue.300' height='880px' ></Box>
            </GridItem>



           <GridItem colSpan='1' height='880px' overflowY='scroll' >

            <   TableListJalons  projets={data.projet} contrats={data.contrat} users={data.user}/>
            </GridItem>
         </Grid>

        </>
    )

}