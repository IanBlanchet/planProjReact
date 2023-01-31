import { useEffect, useState } from "react"
import { Grid, GridItem, Heading} from "@chakra-ui/react"
import { modJalon, getRessources } from "../../util"
import { GaugeChartSimple } from "./realisation/gaugechart";
import { Gantt } from "./realisation/gantchart";
import { TableContrat } from "./realisation/tableContrat";



export const Realisation = ({projet, updateNature}) => {

    const [depense, setDepense] = useState({});
    



    useEffect(() => {
        
    }, [projet])
    

    return (
        
        <Grid
            templateRows='1fr 1fr'
            templateColumns='1fr 2fr'
            gap='5px'
            >
                <GridItem  gridColumn='1 /span 1' gridRow='1 / span 1'>

                    <GaugeChartSimple projet={projet} updateNature={updateNature} />

                </GridItem>

                <GridItem  gridColumn='2 /span 1' gridRow='1 / span 1'>

                    <TableContrat projet={projet}  />

                </GridItem>



                <GridItem  gridColumn='1 /span 2' gridRow='2 / span 1'>

                    <Gantt projet={projet}/>
                    
                </GridItem>

        </Grid>
    )

}