
import { useState, useEffect } from 'react';
import { Grid, GridItem, Box, Text, Stack, Button} from '@chakra-ui/react';
import { TableAllProjet } from '../component/priorisation/tableAllProjet';
import { getRessources } from '../util';



const criteres = [["A",1.5],["B",1.5], ["C",1], ["D",1], ["E",1], ["F",0.75], ["G",0.75], ["H",0.5], ["I",0.5], ["J",0.5], ["K", 0.5], ["L", 0.5]];

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
        
        const newProjet = [...donneeBase]
        if (filtre) {    
            const projetFiltre = newProjet.filter(item => item[column] === filtre);
            setProjets(projetFiltre)
                
        } else {
                setProjets(donneeBase);
            }               
            
        
    }



    useEffect(() => {
        getRessources('/api/v1/projet').then(
            projets => {
                const filtreProjet = projets.filter(item => (item.statut === 'Actif' || item.statut === 'En suspend'))
                filtreProjet.map(projet => {
                    let counter = 0
                    if (projet.rating) {                        
                        counter = criteres.reduce((accumulator, currentValue) => {        
                            return accumulator + (projet.rating[currentValue[0]]*currentValue[1]);                           
                          }, 0)
                    }
                    projet['pointage'] = counter
                    const leUser = props.user.find(user => user.id === projet.charge)
                    projet['responsable'] = leUser?leUser.username:''
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