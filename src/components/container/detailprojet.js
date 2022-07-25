import { SelectProjet } from "../component/select";
import { Grid, GridItem, Box, Text} from '@chakra-ui/react';
import { List, ListItem, ListIcon, OrderedList, UnorderedList } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react'
import { useState, useEffect} from 'react';
import { TablePti } from "../component/tablePti";
import { Descriptif } from "../component/descriptif";
import { SourceFinance } from "../component/sourceFinance";
import { getRessources } from '../util';
import { modJalon } from '../util';





export function DetailProjet(props) {
    const [projet, setProjet] = useState([])
    const [currentProject, setCurrentProject] = useState(props.isSelected?props.selected:{});
    const [depense, setDepense] = useState({});
    const [pti, setPti] = useState({});
    
    const year = new Date().getFullYear();
    
    
    const selectProjet = (projet_id) => {             
        setCurrentProject(projet.find(item => item.id == projet_id))        
    }

  
    const updatePti = (pti) => {
        modJalon(`/api/v1/pti/${currentProject.id}`, {}, pti, 'POST')        

    }

    const updatePrevision = (prev) => {        
        modJalon(`/api/v1/projet/${currentProject.id}`, {}, prev, 'PUT');        
        
    }


    useEffect(() => {
        getRessources('/api/v1/projet').then(
            projets => setProjet(projets.filter(item => item.statut === 'Actif').sort( (a,b) => {
                                                  if (a.no_projet < b.no_projet){
                                                    return -1;
                                                  } 
                                                  if (a.no_projet > b.no_projet) {
                                                    return 1;
                                                  }
                                                  return 0
                                              }
                                              ))); 
        
        
        getRessources('/api/v1/depense/'+currentProject.id).then(
            lesdepense => setDepense(lesdepense));
        getRessources('/api/v1/pti/'+currentProject.id).then(
            lesPti => setPti(lesPti));
   
            
        
    }, [currentProject, props])


    return (
        
        <Grid  templateRows='repeat(2, 50px)' templateColumns='2fr, 3fr, 1fr' gap={6}>
            <GridItem marginLeft='35%' marginTop='5px' colSpan='3'>
                    <SelectProjet projets={projet} onChange={selectProjet}/>                    
            </GridItem>

            <GridItem marginLeft='2%' marginTop='5px' display='flex' gap='100px'>
                
                <Descriptif projet={currentProject} lesprojet={projet} updateProjet={selectProjet}/>
                              

                <Box display='inline'>
                    <TablePti depense={depense} pti={pti} projet={currentProject} updatePti={updatePti} updatePrevision={updatePrevision}/>                    
                </Box>
            </GridItem>
            <GridItem display='flex'>
                <SourceFinance  projet={currentProject}  />
            </GridItem>
            
        </Grid>
        
        
    )
}