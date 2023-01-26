import { useContext, useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { BaseDataContext } from '../../auth';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { TitleProjet } from '../component/detaildossier/title';
import { CoreTabs } from '../component/detaildossier/tabs';



export const DetailDossier = () => {
    let {projetID} = useParams();    
    const data = useContext(BaseDataContext);
    const [projet, setProjet] = useState(projetID?data.projet.find(item => item.id == projetID):{});
    

    useEffect(() => {
        setProjet(data.projet.find(item => item.id == projetID))        

    }, [projetID])



    return (

        <Grid   templateRows='1fr 8fr'
                templateColumns='1fr 1fr 1fr'
                templateAreas=' "Title Title Title"
                                "core core core"
                                '>
            <GridItem gridArea='Title' justifySelf='start' width='full'>
                <TitleProjet projet={projet}></TitleProjet>
            </GridItem>

            <GridItem gridArea='core' justifySelf='start' width='full'>
                <CoreTabs projet={projet} ></CoreTabs>
            </GridItem>


           
            
        </Grid>

        
    )
}