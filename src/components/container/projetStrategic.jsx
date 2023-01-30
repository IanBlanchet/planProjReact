import { useState, useEffect } from 'react';
import { TableStrategic } from '../component/strategic/tableStrategic';



import { useContext } from 'react';
import { BaseDataContext } from '../../auth';





export const ProjetStrategic = () => {
    
    const {user, refreshData} = useContext(BaseDataContext)


    useEffect(() => {
        
        //return () => {refreshData()}                                   
    }, [])
    
    return (
        <>            
            <TableStrategic user={user} />
        </>
    )
}