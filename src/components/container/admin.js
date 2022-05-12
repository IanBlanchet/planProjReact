import { CalendarPicker } from "../component/calendar"
import { Box } from "@chakra-ui/react"
import { useState, useEffect } from 'react';
import { getRessources } from '../util';

export function Admin(props) {
    const [events, setEvents] = useState([]);
    const [date, setDate] = useState([]);


    const selectEvent = (date, title) => {
        setDate(date);
    }

    useEffect(() => {        
        getRessources('/api/v1/event').then(
            lesEvents => { setEvents(lesEvents);
            }
        );
    }, [])

    return (
        <Box>
            <CalendarPicker events={events} onSelect={selectEvent} />
            <div>{date.toString()}</div>
        </Box>
        
    )
}