import { CalendarPicker } from "../events/calendar";
import { Box, Button, Select, Input } from "@chakra-ui/react"
import { useState, useEffect } from 'react';
import { getRessources, modJalon } from '../../util';

const eventsType = ['','Commission', 'Conseil', 'C_Direction']

export function AddEvents() {

    const [events, setEvents] = useState([]);
    const [date, setDate] = useState('');
    const [eventTitle, setEventTitle] = useState('');
    const [selectedEvent, setSelectedEvent] = useState({})
    const [isInput, setIsInput] = useState(false);

    const handleSelectEvent = (eventId) => {        
        const event = events.find(item => item.id == eventId);   
        setIsInput(true)
        setDate(event.date.toString());
        setEventTitle(event.title);
        setSelectedEvent(event)        
    }

    const handleSelectDate = (date) => {
        setDate(date.toString());
    }

    const selectType = (e) => {
        setEventTitle(e.target.value)
    }

    const addEvents = () => {
        const data = { date:date, title:eventTitle }
        modJalon('/api/v1/event', {}, data, 'POST')
        setDate('');
    }

    const editEvents = () => {        
        modJalon('/api/v1/event/'+selectedEvent.id, {date:date}, {}, 'PUT')
        setDate('');
        setIsInput(false)
    }


    useEffect(() => {        
        getRessources('/api/v1/event').then(
            lesEvents => { setEvents(lesEvents);
            }
        );
    }, [date])



    return (
    <Box name='events' display='flex' >
            <CalendarPicker events={events} onSelect={handleSelectEvent} onSelectDate={handleSelectDate}/>
            {!isInput?
            <Box>
            <Button colorScheme='blue' margin='1' onClick={addEvents}>Ajouter évènement</Button>
            <Select size='sm' w='200px' margin='1' onChange={selectType}>
                {eventsType.map(item => <option value={item}>{item}</option>)}
            </Select>
            </Box>
            : <Box><p>{date}</p><Button onClick={editEvents}>Changer la date</Button></Box>
            }
    </Box>
    )
}