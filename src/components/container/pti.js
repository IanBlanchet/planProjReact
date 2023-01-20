import { Grid, GridItem, Box, Text, Stack, Button} from '@chakra-ui/react';
import { TableAllPti } from '../component/pti/tableAllPti';
import { TableFinance } from '../component/pti/tablefinance';
import { getRessources } from '../util';
import { useState, useEffect } from 'react';
import { Radio, RadioGroup } from '@chakra-ui/react'
import { FcSynchronize } from "react-icons/fc";
import { ExportCSV } from '../component/pti/exportExcel';
import { useContext } from 'react';
import { BaseDataContext } from '../../auth';

const CurrentYear = new Date().getFullYear();

export function Pti() {
    // declaration de donne de base correspondant au pti pour eviter des call à l'api au changement d'années qui ralentissent.
    const [donneeBase, setDonneeBase] = useState([])
    const [donneeBaseEnPrep, setDonneeBaseEnPrep] = useState([])
    const [ptis, setPtis] = useState([]);
    const [ptisEnPrep, setPtisEnPrep] = useState([])    
    const [year, setYear] = useState((CurrentYear));
    const [isFinance, setIsFinance] = useState(false);
    const [assReglements, setAssReglements] = useState([]);
    const [assFonds, setAssFonds] = useState([]);
    const [assSubvention, setAssSubvention] = useState([]);
    const [reglement, setReglement] = useState([]);
    const [fonds, setFonds] = useState([])
    const {user, projet} = useContext(BaseDataContext)
    
    const changePti = (e) => {
        setYear(parseInt(e));
        setPtis(donneeBase);
        setPtisEnPrep(donneeBaseEnPrep);
    }

    const filtrePti = (filtre, column) => {
        const donnee = !(year === CurrentYear)?donneeBase:donneeBaseEnPrep
        
        if (filtre) {         
            let newPti = [];
            const projetFiltre = projet.filter(item => filtre.find(critere => item[column] === critere));
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

    const handleClickFinance = () => {
        setIsFinance(isFinance?false:true)
    }

    useEffect(() => {
        
        document.body.style.cursor = "wait";
        getRessources('/api/v1/pti/all/'+(CurrentYear-1)).then(
             lesPti => {
                lesPti.map(pti => {
                    const leuser = user.find(user => user.id === pti.responsable_id);
                    pti['responsable'] = leuser?leuser.username:'';
                })
                setPtis(lesPti);setDonneeBase(lesPti)});
        getRessources('/api/v1/pti/all/'+CurrentYear).then(
                lesPtiEnPrep => {
                    lesPtiEnPrep.map(pti => {
                        const leuser = user.find(user => user.id === pti.responsable_id);
                        pti['responsable'] = leuser?leuser.username:'';
                    })                    
                setPtisEnPrep(lesPtiEnPrep);setDonneeBaseEnPrep(lesPtiEnPrep); document.body.style.cursor = "default"});
        
        getRessources('/api/v1/reglement').then( reglements => {
                    setReglement(reglements)
                });
        getRessources('/api/v1/fonds').then( fonds => {
            setFonds(fonds)
        });
        getRessources('/api/v1/assfinance').then( association => {            
                    setAssReglements(association.assReglement);
                    setAssFonds(association.assFonds);
                    setAssSubvention(association.assSubvention)
                });   
     },[])



    return (
        <Grid justifyItems='center'>
            
            <RadioGroup onChange={changePti} value={year} >
                <Stack direction='row'>
                <Radio value={(CurrentYear-1)}>En vigueur</Radio>
                <Radio value={(CurrentYear)}>En préparation</Radio>
                <ExportCSV ptiData={ptisEnPrep} financeData={{assReglement:assReglements,assFonds:assFonds, assSubvention:assSubvention}} LesReglements={reglement} fileName={'extraitPTI'} />                 
                </Stack>
                  
            </RadioGroup>
                    
            <Button size='sm' onClick={handleClickFinance}>{isFinance?'MODES DE FINANCEMENT':'PROGRAMME TRIENNAL D\'IMMOBILISATION'}<FcSynchronize/></Button>
            
            
                {isFinance?
                <GridItem  >
                <TableFinance ptis={!(year === CurrentYear)?ptis:ptisEnPrep} 
                             assReglements={assReglements}
                             assFonds={assFonds}
                             assSubvention={assSubvention}
                             reglement={reglement}
                             fonds={fonds}
                             />
                             
                </GridItem>
                             :
                <TableAllPti year={year} projet={projet} 
                            ptis={!(year === CurrentYear)?ptis:ptisEnPrep} 
                            filter={filtrePti} 
                            trie={triPti}                            
                            reglement={reglement}
                            assReglements={assReglements}
                            user={user}/>
                }
            
        </Grid>
    )
}

