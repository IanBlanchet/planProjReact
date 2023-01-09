import { TableListJalons } from '../component/listjalons/tableListJalons';
import { useContext } from 'react';
import { BaseDataContext } from '../../auth';


export const ListJalons = () => {
    
   const data = useContext(BaseDataContext)

    
    return (
        <>
         <TableListJalons  projets={data.projet} contrats={data.contrat} users={data.user}/>
        
        </>
    )

}