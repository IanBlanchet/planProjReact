import { useContext, useState, useEffect } from 'react';
import { BaseDataContext } from '../../auth';
import { Box, Grid, GridItem} from '@chakra-ui/react';
import { TitleProjet } from '../component/detaildossier/title';
import { CoreTabs } from '../component/detaildossier/tabs';
import { getRessources, modJalon } from '../util';
import { BaseFormDossier } from '../component/newDossierIdea/addEditForm/baseForm';
import { TableDossierEnPrep } from '../component/newDossierIdea/listNewDossier/tableDossier';


export const NewDossierIdea = () => {
    const [currentProjet, setCurrentProjet] = useState()
    const {blanckNature, user, projet, refreshData, categories } = useContext(BaseDataContext);
    const [projetIsSelected, setProjetIsSelected] = useState(false)

    const handleSelectProjet = (projetId) => {
        
        setProjetIsSelected(true)
        setCurrentProjet(projet.find( projet => projet.id === parseInt(projetId) ))
    }

    const clearSelection = () => {
        setProjetIsSelected(false);
        setCurrentProjet()
    }

    useEffect(() => {

    }, [currentProjet])

    return (

        <Grid templateRows='1fr'
              templateColumns='5fr 2fr'>
                <GridItem  gridRow='1 / span 1' margin='10px' border='1px' borderColor='gray.300' borderRadius='3px' padding='3px' >
                    <Box >
                        <BaseFormDossier projetIsSelected={projetIsSelected} currentProjet={currentProjet} clearSelection={clearSelection}/>
                    </Box>
                </GridItem>

                <GridItem gridRow='1 / span 1' margin='5px'>
                    <Box>
                        <TableDossierEnPrep projet={projet} user={user} handleSelectProjet={handleSelectProjet} />
                    </Box>
                </GridItem>


        </Grid>
    )
}