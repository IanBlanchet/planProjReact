import { useContext, useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { BaseDataContext } from '../../auth';
import { Box, Grid, GridItem} from '@chakra-ui/react';
import { TitleProjet } from '../component/detaildossier/title';
import { CoreTabs } from '../component/detaildossier/tabs';
import { getRessources, modJalon } from '../util'



export const DetailDossier = () => {
    let {projetID} = useParams();    
    const data = useContext(BaseDataContext);
    const [projet, setProjet] = useState(projetID&&data.projet.find(item => item.id == parseInt(projetID)));
    

    const updateStatut = ({target}) => {
        
        modJalon(`/api/v1/projet/${projet.id}`, {}, {'statut':target.value}, 'PUT').then(            
            returnValue => setProjet(returnValue)       
        );
    
    }

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
                <TitleProjet projet={projet} updateStatut={updateStatut}></TitleProjet>
            </GridItem>

            <GridItem gridRow='2 / span 1' gridColumn='1 /span 3'>
                <CoreTabs projet={projet} setProjet={setProjet}></CoreTabs>
            </GridItem>


           
            
        </Grid>

        
    )
}