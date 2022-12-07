import { useState, useEffect } from 'react';
import { TableStrategic } from '../component/strategic/tableStrategic';

import { useFilter } from '../../hooks/useFilter';
import { modJalon } from '../util';






export const ProjetStrategic = ({user}) => {
    



    useEffect(() => {
                                                 
    }, [])
    
    return (
    <TableStrategic user={user}/>
    )
}