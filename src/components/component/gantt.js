import { TimelineChart } from "./charts";
import { Flex, Spacer, Box, VStack } from '@chakra-ui/react'
import { Jalons } from './modal'
import { EditJalon } from "./drawers";
import { useState, useEffect } from 'react'

export function GanttProjet(props) {
    const [graphData, setGraphData] = useState([])
    
    useEffect(() => {
        setGraphData([]);
        setGraphData(props.newData);
    })

    return (
        <Flex>
            <Box p='1' >
                <VStack alignItems='right'>                
                <EditJalon 
                        title={props.currentProject.no_projet}  
                        jalons={props.jalons.filter(item => item.projet_id === props.currentProject.id).sort(
                                                                    (a,b) => new Date(a.date) - new Date(b.date))}
                        currentProject={props.currentProject}
                        projet_contrat={'projet'}                        
                />
                {props.assContrat.map(contrat => 
                                        <EditJalon key={contrat.id}                                            
                                                    title={contrat.no} 
                                                    jalons={props.jalons.filter(item => item.contrat_id === contrat.id).sort((a, b) => new Date(a.date) - new Date(b.date) )}
                                                    currentProject={props.currentProject}
                                                    projet_contrat={'contrat'} 
                                                    contrat={contrat.id}/>)}
                </VStack>
            </Box>
            <Spacer/>
            <TimelineChart newData={props.newData}/>
        </Flex>
        
    )
}

//title={dataProject.no_projet}  jalons={dataJalons.filter(item => item.projet_id === dataProject.id )}
/*
<Jalons title={dataProject.currentProject.no_projet}  jalons={dataProject.assJalons.filter(item => item.projet_id === dataProject.currentProject.id).sort(
                                                                    (a,b) => new Date(a.date) - new Date(b.date))}/>
{dataProject.assContrat.map(contrat => 
    <Jalons title={contrat.no} 
            jalons={dataProject.assJalons.filter(item => item.contrat_id === contrat.id).sort((a, b) => new Date(a.date) - new Date(b.date) )}/>)}*/
