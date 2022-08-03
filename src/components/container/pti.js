import { Grid, GridItem, Box, Text, Stack} from '@chakra-ui/react';
import { TableAllPti } from '../component/pti/tableAllPti';
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

    const filtrePti = (filtre) => {
        getRessources('/api/v1/pti/all/'+year).then(
            lesPti => 
            {
            if (filtre) {         
            let newPti = [];
            const projetFiltre = props.projet.filter(item => item.cat === filtre);
            projetFiltre.forEach(element => {
                const pti = lesPti.find(pti => pti.projet_id === element.id)
                pti&&newPti.push(pti)
                });        
            setPtis(newPti);
            } else {
                setPtis(lesPti); 
            }
            }            
            ); 
        
    }

    const triPti = (column, sens) => {
        let ptiTrie = [...ptis];
        sens?ptiTrie.sort((a,b) => (a[column] > b[column]) ? 1 : ((b[column] > a[column]) ? -1 : 0)):
        ptiTrie.sort((a,b) => (b[column] > a[column]) ? 1 : ((a[column] > b[column]) ? -1 : 0));
        setPtis(ptiTrie)
    }

    useEffect(() => {
        getRessources('/api/v1/pti/all/'+year).then(
             lesPti => setPtis(lesPti));   
     },[year])



    return (
        <Grid >
            
            <RadioGroup onChange={changePti} value={year} >
                <Stack direction='row'>
                <Radio value={(CurrentYear-1)}>En vigueur</Radio>
                <Radio value={(CurrentYear)}>En préparation</Radio>                
                </Stack>
            </RadioGroup>
            
            
                <TableAllPti year={year} projet={props.projet} ptis={ptis} afficheProjet={props.afficheProjet} filter={filtrePti} trie={triPti}/>
            
            
        </Grid>
    )
}

