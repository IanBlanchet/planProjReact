import { Grid, GridItem, Box, Text, Stack} from '@chakra-ui/react';
import { TableAllPti } from '../component/tableAllPti';
import { TablePtiEnPrep } from '../component/tablePtiEnPrep';
import { getRessources } from '../util';
import { useState, useEffect } from 'react';
import { Radio, RadioGroup } from '@chakra-ui/react'


const CurrentYear = new Date().getFullYear();

export function Pti(props) {

    const [ptis, setPtis] = useState([]);    
    const [year, setYear] = useState((CurrentYear-1));

    
    const changePti = (e) => {
        setYear(parseInt(e))
    }

    useEffect(() => {
        getRessources('/api/v1/pti/all/'+year).then(
             lesPti => setPtis(lesPti));   
     },[year])



    return (
        <Grid>
            <RadioGroup onChange={changePti} value={year}>
                <Stack direction='row'>
                <Radio value={(CurrentYear-1)}>En vigueur</Radio>
                <Radio value={(CurrentYear)}>En préparation</Radio>                
                </Stack>
            </RadioGroup>
            { year === CurrentYear?<TableAllPti projet={props.projet} ptis={ptis}/>
                :<TablePtiEnPrep projet={props.projet} ptis={ptis}/>
            }
            
        </Grid>
    )
}