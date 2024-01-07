import { useContext, useState, useEffect } from 'react';
import { BaseDataContext } from '../../auth';
import { Box, Grid, GridItem} from '@chakra-ui/react';
import { TitleProjet } from '../component/detaildossier/title';
import { CoreTabs } from '../component/detaildossier/tabs';
import { getRessources, modJalon } from '../util';
import { BaseFormDossier } from '../component/newDossierIdea/addEditForm/baseForm';


export const NewDossierIdea = () => {


    return (

        <Grid templateRows='1fr'
              templateColumns='2fr 1fr'>
                <GridItem gridRow='1 / span 1' >
                    <Box>
                        <BaseFormDossier/>
                    </Box>
                </GridItem>

                <GridItem gridRow='1 / span 1' >
                    <Box>
                        <p>test2</p>
                    </Box>
                </GridItem>


        </Grid>
    )
}