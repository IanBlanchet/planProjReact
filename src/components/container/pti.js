import { Grid, GridItem, Box, Text, Stack} from '@chakra-ui/react';
import { TableAllPti } from '../component/pti/tableAllPti';
import { getRessources } from '../util';
import { useState, useEffect } from 'react';
import { Radio, RadioGroup } from '@chakra-ui/react'


const CurrentYear = new Date().getFullYear();

export function Pti(props) {
    // declaration de donne de base correspondant au pti pour eviter des call à l'api au changement d'années qui ralentissent.
    const [donneeBase, setDonneeBase] = useState([])
    const [donneeBaseEnPrep, setDonneeBaseEnPrep] = useState([])
    const [ptis, setPtis] = useState([]);
    const [ptisEnPrep, setPtisEnPrep] = useState([])    
    const [year, setYear] = useState((CurrentYear-1));

    
    const changePti = (e) => {
        setYear(parseInt(e));
        setPtis(donneeBase);
        setPtisEnPrep(donneeBaseEnPrep);
    }

    const filtrePti = (filtre) => {
        const donnee = !(year === CurrentYear)?donneeBase:donneeBaseEnPrep
        if (filtre) {         
            let newPti = [];
            const projetFiltre = props.projet.filter(item => item.cat === filtre);
            projetFiltre.forEach(element => {
                const pti = donnee.find(pti => pti.projet_id === element.id)
                pti&&newPti.push(pti)
                });        
                !(year === CurrentYear)?setPtis(newPti):setPtisEnPrep(newPti)
            } else {
                !(year === CurrentYear)?setPtis(donneeBase):setPtisEnPrep(donneeBaseEnPrep)
            }               
            
        
    }

    const triPti = (column, sens) => {
        let ptiTrie = !(year === CurrentYear)?[...ptis]:[...ptisEnPrep];
        sens?ptiTrie.sort((a,b) => (a[column] > b[column]) ? 1 : ((b[column] > a[column]) ? -1 : 0)):
        ptiTrie.sort((a,b) => (b[column] > a[column]) ? 1 : ((a[column] > b[column]) ? -1 : 0));
        !(year === CurrentYear)?setPtis(ptiTrie):setPtisEnPrep(ptiTrie);
    }

    useEffect(() => {
        console.log(CurrentYear-1);
        document.body.style.cursor = "wait";
        getRessources('/api/v1/pti/all/'+(CurrentYear-1)).then(
             lesPti => {setPtis(lesPti);setDonneeBase(lesPti)});
        getRessources('/api/v1/pti/all/'+CurrentYear).then(
                lesPtiEnPrep => {setPtisEnPrep(lesPtiEnPrep);setDonneeBaseEnPrep(lesPtiEnPrep); document.body.style.cursor = "default"});
              
     },[])



    return (
        <Grid >
            
            <RadioGroup onChange={changePti} value={year} >
                <Stack direction='row'>
                <Radio value={(CurrentYear-1)}>En vigueur</Radio>
                <Radio value={(CurrentYear)}>En préparation</Radio>                
                </Stack>
            </RadioGroup>
            
            
                <TableAllPti year={year} projet={props.projet} ptis={!(year === CurrentYear)?ptis:ptisEnPrep} afficheProjet={props.afficheProjet} filter={filtrePti} trie={triPti}/>
            
            
        </Grid>
    )
}

