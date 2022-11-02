import { useState, useEffect } from 'react';
import  { JalonDetail } from '../component/events/box';
import { getRessources } from '../util';
import { Table, Thead, Tbody, Tr, Th, TableContainer, Box, Heading } from '@chakra-ui/react';
import { GrWindows } from 'react-icons/gr';

export const ListJalons = ({projets, contrats, users}) => {

    const [events, setEvents] = useState([]);
    const [jalons, setJalons] = useState([]);

    useEffect(() => {getRessources('/api/v1/jalon').then(
        lesjalons => setJalons(lesjalons.filter(jalon => jalon.etat === 'travail')));
        getRessources('/api/v1/event').then(
        lesEvents => { setEvents(lesEvents);
        }
    );
    }, [])

    

    return (
        <Box marginLeft='200px' >
            <Heading color='red'>  Ce tableau est en développement</Heading>
        <Table colorScheme='blue' overflowY='scroll'  display='inline-block' maxHeight='700px'>

                <Thead position='sticky' top='0'>
                <Tr bg='blue.200'>
                    <Th>Date</Th>
                    <Th>Titre du Jalon</Th>
                    <Th>Jalon</Th>
                    
                    
                </Tr>
            </Thead>
            <Tbody>
                    {jalons.map(item => 
                    <Tr>
                        <Th>
                            {item.date}
                        </Th>
                        <Th>
                            {item.jalon}
                        </Th>
                        <Th>
                        <JalonDetail 
                            user={users.find(element => element.id === item.charge_jalon)}
                            projet={projets.find(element => element.id === item.projet_id)}
                            contrat={contrats.find(element => element.id === item.contrat_id)}
                            jalon={item}
                            key={item.id}
                            events={events} />
                        </Th>
                    </Tr>
                    )}

            </Tbody>
        </Table>
        </Box>
    )

}