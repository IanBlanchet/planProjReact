import { useContext } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Heading } from '@chakra-ui/react';
import { Descriptif } from './descriptif';
import { Finance } from './finance';
import { Realisation } from './realisation';
import { modJalon } from '../../util';






export const CoreTabs = ({projet}) => {

    

    const updateNature = (data) => {        
        modJalon(`/api/v1/projet/${projet.id}`, {}, {'nature':data}, 'PUT');
        
    }





    return (

        <Tabs isFitted variant='solid-rounded' size='sm'>
            <TabList bg='gray.200'>
                <Tab><Heading size='sm'>Descriptif</Heading></Tab>
                <Tab><Heading size='sm'>Finance</Heading></Tab>
                <Tab><Heading size='sm'>Réalisation</Heading></Tab>
            </TabList>
            <TabPanels >
                <TabPanel>
                    <Descriptif projet={projet} updateNature={updateNature}/>
                </TabPanel>
                <TabPanel>                    
                    <Finance projet={projet} /> 
                </TabPanel>
                <TabPanel>
                    <Realisation projet={projet} updateNature={updateNature}/>
                </TabPanel>
            </TabPanels>
        </Tabs>

    )
}