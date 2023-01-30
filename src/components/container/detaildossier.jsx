import { useContext, useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { BaseDataContext } from '../../auth';
import { Box, Grid, GridItem} from '@chakra-ui/react';
import { TitleProjet } from '../component/detaildossier/title';
import { CoreTabs } from '../component/detaildossier/tabs';
import { getRessources } from '../util'



export const DetailDossier = () => {
    let {projetID} = useParams();    
    const data = useContext(BaseDataContext);
    const [projet, setProjet] = useState(projetID&&data.projet.find(item => item.id == projetID));
    

    useEffect(() => {
        getRessources('/api/v1/projet/'+projetID).then(
            (response) => setProjet(response)
        ); 
         

    }, [projetID])



    return (

        <Grid   templateRows='1fr 8fr'
                templateColumns='1fr 1fr 1fr'
>
            <GridItem gridRow='1 / span 1' gridColumn='1 /span 3'>
                <TitleProjet projet={projet}></TitleProjet>
            </GridItem>

            <GridItem gridRow='2 / span 1' gridColumn='1 /span 3'>
                <CoreTabs projet={projet} ></CoreTabs>
            </GridItem>


           
            
        </Grid>

        
    )
}