import { useState, useEffect } from 'react';
import { TableStrategic } from '../component/strategic/tableStrategic';


import { useContext } from 'react';
import { BaseDataContext } from '../../auth';





export const ProjetStrategic = () => {
    
    const {user} = useContext(BaseDataContext)


    useEffect(() => {
                                                 
    }, [])
    
    return (
    <TableStrategic user={user} />
    )
}