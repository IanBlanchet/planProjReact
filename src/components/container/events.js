import { Box } from '@chakra-ui/react'
import { SelectEvent } from '../component/common/select';
import { useState, useEffect, createContext  } from 'react'
import { getRessources } from '../util';
import { JalonDetail } from '../component/events/box';
import { CalendarPicker } from '../component/events/calendar';



export function Events(props) {
    const [jalons, setJalons] = useState([]);
    const [filterJalons, setFilterJalons] = useState([])
    const [events, setEvents] = useState([])
    const [duree, setDuree] = useState('')


    const selectEvent = (eventId) => {
        let lesjalons = jalons;
        const event = events.find(item => item.id == eventId);        
        lesjalons = lesjalons.filter(jalon => jalon.date === event.date && jalon.jalon === event.title);        
        setFilterJalons(lesjalons);
        let cumul = 0;
        lesjalons.forEach(item => cumul+=item.duree);
        setDuree(cumul)
    }

    //empty function to keep props for other container
    const handleSelectDate = (date) => {
        setFilterJalons([]);
        getRessources('/api/v1/jalon').then(
            lesjalons => setJalons(lesjalons));
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
        
            <CalendarPicker events={events} onSelect={selectEvent} onSelectDate={handleSelectDate}></CalendarPicker>
            <Box display='grid'>
            {filterJalons.map(item => <JalonDetail user={props.user.find(element => element.id === item.charge_jalon)}
                                                            projet={props.projet.find(element => element.id === item.projet_id)}
                                                            contrat={props.contrat.find(element => element.id === item.contrat_id)}
                                                            jalon={item}
                                                            key={item.id}                                                           
                                                            />)}
            </Box>
            <Box>{duree}</Box>
        </Box>
    )
}

