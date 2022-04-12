import { Box } from '@chakra-ui/react'
import { SelectEvent } from '../component/select';
import { useState, useEffect, createContext  } from 'react'
import { getRessources } from '../util';
import { JalonDetail } from '../component/box';

const events = 
    [
    ['2022-04-12', 'conseil'],
    ['2022-04-05', 'C_Direction']
]


export function Events(props) {
    const [jalons, setJalons] = useState([]);
    const [filterJalons, setFilterJalons] = useState([])


    const selectEvent = (eventDate) => {
        let lesjalons = jalons;
        lesjalons = lesjalons.filter(jalon => jalon.date === eventDate);
        setFilterJalons(lesjalons);
        
    }


    useEffect(() => {
        getRessources('/api/v1/jalon').then(
            lesjalons => setJalons(lesjalons));
    }, [])

    return (
        <Box>
        <SelectEvent events={events} onChange={selectEvent}/>
        {filterJalons.map(item => { return <JalonDetail  user={props.user.find(element => item.charge_jalon)}/>})}
        </Box>
    )



}