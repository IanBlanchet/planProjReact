
import { useState, useEffect } from 'react';
import { Grid } from '@chakra-ui/react';
import { TableAllProjet } from '../component/priorisation/tableAllProjet';
import { getRessources } from '../util';



const criteres = [["A",1.5],["B",1.5], ["C",1.5], ["D",1.5], ["E",1.5], ["F",1], ["G",0.75], ["H",0.75]];

export function TableauPriorisation(props) {
    const [projets, setProjets] = useState([]);
    const [donneeBase, setDonneeBase] = useState([]);
    

    const triProjet = (column, sens) => {
        let projetTrie = [...projets];
        sens?projetTrie.sort((a,b) => (a[column] > b[column]) ? 1 : ((b[column] > a[column]) ? -1 : 0)):
        projetTrie.sort((a,b) => (b[column] > a[column]) ? 1 : ((a[column] > b[column]) ? -1 : 0));
        setProjets(projetTrie);
    }

    const filtreProjet = (filtre, column) => {
        
        const newProjet = [...projets]

        if (filtre) {
            let projetFiltre
            if (column === 'immo') {
                filtre.length===0?projetFiltre=[]:filtre.length===2?projetFiltre = newProjet:filtre[0]?projetFiltre = newProjet.filter(item => item[column]):projetFiltre = newProjet.filter(item => !item[column]);
            }  else {
                projetFiltre = newProjet.filter(item => filtre.find(critere => item[column] === critere)); 
            }             
            setProjets(projetFiltre)
                
        } else {
                setProjets(donneeBase);
            }      
    }


    useEffect(() => {
        getRessources('/api/v1/projet').then(
            projets => {
                const filtreProjet = projets.filter(item => (item.statut === 'Actif' || item.statut === 'En approbation' || item.statut === 'En suspend'))
                filtreProjet.map(projet => {
                    let counter = 0
                    if (projet.rating) {                        
                        counter = criteres.reduce((accumulator, currentValue) => {        
                            return accumulator + (projet.rating[currentValue[0]]*currentValue[1]);                           
                          }, 0)
                    }
                    projet['pointage'] = counter
                    const leUser = props.user.find(user => user.id === projet.charge)
                    projet['responsable'] = leUser?leUser.username:'';
                    projet['tempsCharge'] = projet.nature?projet.nature.tempsCharge:0;
                    projet['tempsTech'] = projet.nature?projet.nature.tempsTech:0;
                })
                setDonneeBase(filtreProjet)
                setProjets(filtreProjet)
            }); 

    }, [props])

    return (
        <Grid justifyItems='center'>

            <TableAllProjet projets={projets} trie={triProjet} afficheProjet={props.afficheProjet} filter={filtreProjet} user={props.user}/>

        </Grid>
        
    )
}