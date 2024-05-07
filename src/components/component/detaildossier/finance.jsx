import { useEffect,useState } from "react"
import { Grid, GridItem, Heading} from "@chakra-ui/react"
import { modJalon, getRessources } from "../../util"
import { SourceFinance } from "./finance/sourceFinance"
import { TablePti } from "./finance/tablePti"


export const Finance = ({projet}) => {

    const [depense, setDepense] = useState({});
    const [pti, setPti] = useState({});

    const updatePti = (pti) => {
        modJalon(`/api/v1/pti/${projet.id}`, {}, pti, 'POST')        

    }

    const updatePrevision = (prev) => {        
        modJalon(`/api/v1/projet/${projet.id}`, {}, prev, 'PUT');        
        
    }

    const updateCourante = (newdepense_courante) => {        
        modJalon('/api/v1/depense/'+projet.id, {}, newdepense_courante, 'POST');        
        
    }


    useEffect(() => {
        getRessources('/api/v1/depense/'+projet.id).then(
            lesdepense => setDepense(lesdepense));
        getRessources('/api/v1/pti/'+projet.id).then(
                lesPti => setPti(lesPti));   
    }, [projet])
    

    return (
        
        <Grid   
            templateColumns='3fr 1fr'
            gap='5px'
            >
                <GridItem  gridColumn='1 /span 1'>
                    {projet.immo?
                    <TablePti projet={projet} pti={pti} depense={depense} updatePti={updatePti} updatePrevision={updatePrevision} updateCourante={updateCourante}></TablePti>:
                    <Heading>Ce projet n'est pas immobilisé</Heading>
                    }
                    

                </GridItem>

                <GridItem   gridColumn='2 /span 1'>

                    <SourceFinance projet={projet} ></SourceFinance>
                    
                </GridItem>

        </Grid>
    )

}

