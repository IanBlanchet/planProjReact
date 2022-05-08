import { Box } from '@chakra-ui/react'
import { SelectEvent } from '../component/select';
import { useState, useEffect, createContext  } from 'react'
import { getRessources } from '../util';
import { JalonDetail } from '../component/box';
import { CalendarPicker } from '../component/calendar';


export function Events(props) {
    const [jalons, setJalons] = useState([]);
    const [filterJalons, setFilterJalons] = useState([])
    const [events, setEvents] = useState([])


    const selectEvent = (date, title) => {
        let lesjalons = jalons;
        lesjalons = lesjalons.filter(jalon => jalon.date === date && jalon.jalon === title);
        setFilterJalons(lesjalons);
        
    }



    useEffect(() => {
        getRessources('/api/v1/jalon').then(
            lesjalons => setJalons(lesjalons));
        getRessources('/api/v1/event').then(
            lesEvents => { setEvents(lesEvents);
            }
        );
    }, [])

    return (
        <Box display='flex'>
        
            <CalendarPicker events={events} onSelect={selectEvent}></CalendarPicker>
            <Box display='grid'>
            {filterJalons.map(item => { return <JalonDetail user={props.user.find(element => element.id === item.charge_jalon)}
                                                            projet={props.projet.find(element => element.id === item.projet_id)}
                                                            contrat={props.contrat.find(element => element.id === item.contrat_id)}
                                                            jalon={item}
                                                            />})}
            </Box>
        </Box>
    )



}