import { useState, useEffect } from 'react';
import { useFilter } from '../../../hooks/useFilter';
import  { JalonDetail } from './detailsbox';
import { getRessources } from '../../util';
import { Table, Thead, Tbody, Tr, Th, TableContainer, Box, Heading, Select, HStack} from '@chakra-ui/react';
import { AddJalon } from './modalForm';


const jalonsDesc = ['C_Direction', 'Conseil', 'Commission', 'AO', 'Livrable', 'D_travaux', 'F_travaux', 'Fermeture', 'Demande_CA', 'TQC']
const services = ['ING', 'TP', 'ENV', 'GEN', 'SRC', 'URBA', 'GREFFE' ]

export const TableListJalons = ({projets, contrats, users}) => {

    const [events, setEvents] = useState([]);
    const [jalons, setJalons] = useState([]);
    const [filters, setFilters] = useState({});    
    let jalonFiltre = useFilter(filters, jalons)
            

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
    }, [])

    
    return (
        <Box marginLeft='200px' >
            
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


        <Table colorScheme='blue' overflowY='scroll'  display='inline-block' maxHeight='700px' size='sm'>

                <Thead position='sticky' top='0' bg='white' zIndex={1}>
                <Tr >
                    
                <Th colSpan='3' title='ajouter un jalon'><AddJalon projets={projets} contrats={contrats} users={users} refresh={refresh}/></Th>
                    
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