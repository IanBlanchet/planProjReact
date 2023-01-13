import { useState, useEffect } from 'react';
import { TableStrategic } from '../component/strategic/tableStrategic';


import { useContext } from 'react';
import { BaseDataContext } from '../../auth';





export const ProjetStrategic = () => {
    
    const {user, refreshData} = useContext(BaseDataContext)


    useEffect(() => {

                                              
    }, [user])
    
    return (
    <TableStrategic user={user} />
    )
}