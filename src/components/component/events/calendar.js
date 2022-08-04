import React, { useState } from 'react';
import {Calendar} from "react-multi-date-picker";
import { Button,  Box} from '@chakra-ui/react';

/** 
* a calendar picker that display events
* @param {object} props.events - list events object
* @param {function} props.onSelect- function to use data in selected date
* @return {JSX} a calendar picker
*/
export function CalendarPicker(props) {
    const [value, setValue] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState([])

    const select = (date) => {
        //props.onSelect(date, '') 
        setValue(date.toString())
        const event = props.events.filter(item => item.date === date.toString())
        props.onSelectDate(date) 
        setSelectedEvent(event);
        
    }

    const selectEvent = (e) => {
        props.onSelect(e.target.attributes.eventid.value)
        
    }


    return (        
    <Calendar value={value}                   
                onChange={select}                           
                format='YYYY-MM-DD'                
                mapDays={({ date }) => {
                      let color
                      props.events.map(event => {                        
                        if (event.date === date.toString()) {                          
                        color='white'
                          }}
                      );
                      
                      
                      if (color) return { className: "highlight highlight-" + color, style:{backgroundColor:'green'} }
                    }}>
        <Box padding='1' display='grid' gridTemplateColumns='1fr 1fr' gridTemplateRows='1fr 1fr'>
            {selectedEvent.map(item => <Button margin='1px' size='sm' bgColor='blue.200' key={item.id} onClick={selectEvent} eventid={item.id} date={item.date} title={item.title}>
                                        {item.title}
                                        </Button>)
                                        }
        </Box>
          
    </Calendar>    
    )
}