import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Descriptif } from './descriptif';



export const CoreTabs = ({projet}) => {

    return (

        <Tabs isFitted variant='line' size='sm'>
            <TabList >
                <Tab>Descriptif</Tab>
                <Tab>Finance</Tab>
                <Tab>Réalisation</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Descriptif projet={projet}/>
                </TabPanel>
                <TabPanel>
                <p>two!</p>
                </TabPanel>
                <TabPanel>
                <p>two!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>

    )
}