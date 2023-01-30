import { useEffect, useState } from "react"
import { Grid, GridItem, Heading} from "@chakra-ui/react"
import { modJalon, getRessources } from "../../util"
import { GaugeChartSimple } from "./realisation/gaugechart";
import { Gantt } from "./realisation/gantchart";



export const Realisation = ({projet, updateNature}) => {

    const [depense, setDepense] = useState({});
    



    useEffect(() => {
        
    }, [projet])
    

    return (
        
        <Grid
            templateRows='1fr 1fr'
            templateColumns='4fr 1fr'
            gap='5px'
            >
                <GridItem  gridColumn='1 /span 1' gridRow='1 / span 1'>

                    <GaugeChartSimple projet={projet} updateNature={updateNature} />

                </GridItem>

                <GridItem  gridColumn='1 /span 2' gridRow='2 / span 1'>

                    <Gantt />
                    
                </GridItem>

        </Grid>
    )

}