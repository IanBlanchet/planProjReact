import { Grid, GridItem, Box, Text, Stack, Button, Select} from '@chakra-ui/react';
import { TableAllPti } from '../component/pti/tableAllPti';
import { TableFinance } from '../component/pti/tablefinance';
import { getRessources } from '../util';
import { useState, useEffect } from 'react';
import { Radio, RadioGroup } from '@chakra-ui/react'
import { FcSynchronize } from "react-icons/fc";
import { ExportCSV } from '../component/pti/exportExcel';
import { useContext } from 'react';
import { BaseDataContext } from '../../auth';
import { useFilter} from '../../hooks/useFilter';
import { useSort } from '../../hooks/useSort';

const CurrentYear = new Date().getFullYear();

const cat = ['Bâtiments municipaux', 'Parcs, espaces verts, loisirs, culture',
'Environnement','Infrastructures existantes', 'Developpement', 'Cours d\'eau','Véhicules, Machineries, matériel, équipements','Logiciel, équipements informatique', 'Divers']

const useBuildPti = (projetFiltre, donnee) => {
    const [ptiList, setPtiList] = useState(donnee);

    useEffect(() => {
        
        let newPti = [];
        projetFiltre.forEach(element => {
            const pti = donnee.find(pti => pti.projet_id === element.id)
            pti&&newPti.push(pti)
            });        
            setPtiList(newPti);

    }, [projetFiltre, donnee])

    return ptiList

}


export function Pti() {
    // declaration de donne de base correspondant au pti pour eviter des call à l'api au changement d'années qui ralentissent.
    const [donneeBase, setDonneeBase] = useState([])
    const [donneeBaseEnPrep, setDonneeBaseEnPrep] = useState([])
    const [ptis, setPtis] = useState([]);
    const [ptisEnPrep, setPtisEnPrep] = useState([])    
    const [year, setYear] = useState((CurrentYear-1));
    const [isFinance, setIsFinance] = useState(false);
    const [assReglements, setAssReglements] = useState([]);
    const [assFonds, setAssFonds] = useState([]);
    const [assSubvention, setAssSubvention] = useState([]);
    const [reglement, setReglement] = useState([]);
    const [fonds, setFonds] = useState([]);
    const [sortCriteria, setSortCriteria] = useState({'criteria':'','level':'baseColumn', 'direction':true});
    const {user, projet, savedFilter, retainFilter} = useContext(BaseDataContext);
    const [filters, setFilters] = useState(savedFilter['listpti']); 
    let projetFiltre = useFilter(filters, projet);
    let ptiList = useBuildPti(projetFiltre, (!(year === CurrentYear)?donneeBase:donneeBaseEnPrep) )
    let ptiListSort = useSort(sortCriteria, ptiList);

    const changePti = (e) => {
        setYear(parseInt(e));

    }


    const handleFilter = ({target}) => {
        const filter = {};        
        if (target.name === 'charge') {
            filter[target.name] = parseInt(target.value);
        } else {
            filter[target.name] = target.value;
        }        
        setFilters({...filters, ...filter});
        retainFilter({'listpti':{...filters, ...filter}});       
        } 


    const sortPti = (sortCriteria) => {
        setSortCriteria(sortCriteria)
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
        let ptiTrie = []
        if (!(year === CurrentYear)) {
            ptiTrie = [...donneeBase];
            setDonneeBase([])
        } else {
           ptiTrie = [...donneeBaseEnPrep];
           setDonneeBaseEnPrep([])
        };
        sens?ptiTrie.sort((a,b) => (a[column] > b[column]) ? 1 : ((b[column] > a[column]) ? -1 : 0)):
        ptiTrie.sort((a,b) => (b[column] > a[column]) ? 1 : ((a[column] > b[column]) ? -1 : 0));
        !(year === CurrentYear)?setDonneeBase(ptiTrie):setDonneeBaseEnPrep(ptiTrie);
        console.log(ptiTrie)
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
                setDonneeBase(lesPti);
            });
                
        getRessources('/api/v1/pti/all/'+CurrentYear).then(
                lesPtiEnPrep => {
                    lesPtiEnPrep.map(pti => {
                        const leuser = user.find(user => user.id === pti.responsable_id);
                        pti['responsable'] = leuser?leuser.username:'';
                    })                    
                setDonneeBaseEnPrep(lesPtiEnPrep); document.body.style.cursor = "default";
                });
        
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
            
            
                <Stack direction='row'>
                    <RadioGroup onChange={changePti} value={year} >
                        <Radio value={(CurrentYear-1)}>En vigueur</Radio>
                        <Radio value={(CurrentYear)}>En préparation</Radio>
                    </RadioGroup>
                <ExportCSV ptiData={!(year === CurrentYear)?ptis:ptisEnPrep} financeData={{assReglement:assReglements,assFonds:assFonds, assSubvention:assSubvention}} LesReglements={reglement} fileName={'extraitPTI'} />                 
                </Stack>
                <Select placeholder='filtrer par catégorie' value={filters.cat&&filters.cat} onChange={handleFilter} name='cat' bg='white' size='xs'>
                        {cat.map(item => <option key={item} value={item}>{item}</option>)}
                </Select>
                  
            
                    
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
                            ptis={ptiListSort} 
                            filter={filtrePti}
                            sort={sortPti} 
                            trie={triPti}                            
                            reglement={reglement}
                            assReglements={assReglements}
                            user={user}/>
                }
            
        </Grid>
    )
}

