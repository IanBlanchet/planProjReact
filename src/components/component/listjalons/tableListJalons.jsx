import { useState, useEffect } from 'react';
import { useFilter } from '../../../hooks/useFilter';
import  { JalonDetail } from './detailsbox';
import { getRessources } from '../../util';
import { Table, Thead, Tbody, Tr, Th, TableContainer, Box, Heading, Select, HStack, VStack} from '@chakra-ui/react';
import { GrWindows } from 'react-icons/gr';


const jalonsDesc = ['C_Direction', 'Conseil', 'Commission', 'AO', 'Livrable', 'D_travaux', 'F_travaux', 'Fermeture']
const services = ['ING', 'TP', 'ENV', 'GEN', 'SRC', 'URBA', 'GREFFE' ]

export const TableListJalons = ({projets, contrats, users}) => {

    const [events, setEvents] = useState([]);
    const [jalons, setJalons] = useState([]);
    const [filters, setFilters] = useState({});
    let [isrefresh, setIsrefresh] = useState(0);
    let jalonFiltre = useFilter(filters, jalons)
            

    const refresh = () => {
        const newRefresh = isrefresh += 1
        setIsrefresh(newRefresh);
    };

    const handleFilter =  ({target}) => {
        const filter = {};        
        if (target.name === 'charge_jalon') {
            filter[target.name] = parseInt(target.value);
        } else {
            filter[target.name] = target.value;
        }
        
        setFilters({...filters, ...filter})
    }




    useEffect(() => {getRessources('/api/v1/jalon').then(
        (lesjalons) => {
       
        for (let i = 0; i < lesjalons.length; i++) {
            lesjalons[i].charge_jalon?lesjalons[i].service = users.find(element => element.id === lesjalons[i].charge_jalon).service:lesjalons[i].service = ""
        }
        
        lesjalons = lesjalons.filter(jalon => jalon.etat === 'travail').sort((a,b) => (a['date'] > b['date']) ? 1 : ((b['date'] > a['date']) ? -1 : 0));
        setJalons(lesjalons);
        setFilters({'charge_jalon':false})            
              
        }
        )
        
        getRessources('/api/v1/event').then(
        lesEvents => { setEvents(lesEvents);
        }
    );
    }, [isrefresh])

    
    return (
        <Box marginLeft='200px' >
            <Heading color='red'>  Ce tableau est en développement</Heading>
            <HStack>
            
            <Select onChange={handleFilter} name='charge_jalon' placeholder='Filtrer par chargé de projet'>
                
                {users.map(item => <option value={item.id} key={item.id}>{item.username}</option>)}
            </Select>
           
            <Select onChange={handleFilter} name='jalon' placeholder='Filtrer par jalon'>
                
                {jalonsDesc.map(item => <option value={item} key={item}>{item}</option>)}
            </Select>
            
            <Select onChange={handleFilter} name='service' placeholder='Filtrer par service'>
                
                {services.map(item => <option value={item} key={item}>{item}</option>)}
            </Select>
            </HStack>


        <Table colorScheme='blue' overflowY='scroll'  display='inline-block' maxHeight='700px'>

                <Thead position='sticky' top='0'>
                <Tr bg='blue.200'>
                    
                    <Th>Jalons actifs</Th>
                    
                </Tr>

            </Thead>
            <Tbody>
                    {jalonFiltre.map(item => 
                    <Tr key={item.id}>
                      
                        <Th colSpan='3'>
                        <JalonDetail 
                            user={users.find(element => element.id === item.charge_jalon)}
                            projet={projets.find(element => element.id === item.projet_id)}
                            contrat={contrats.find(element => element.id === item.contrat_id)}
                            jalon={item}
                            refresh={refresh}
                            events={events} />
                        </Th>
                    </Tr>
                    )}

            </Tbody>
        </Table>
        </Box>
    )
}