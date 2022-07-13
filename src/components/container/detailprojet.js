import { SelectProjet } from "../component/select";
import { Grid, GridItem, Box, Text} from '@chakra-ui/react';
import { List, ListItem, ListIcon, OrderedList, UnorderedList } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react'
import { useState, useEffect, createContext  } from 'react';
import { TablePti } from "../component/tablePti";
import { Descriptif } from "../component/descriptif";
import { getRessources } from '../util';
import { modJalon } from '../util';


export function Finance(props){

    const [currentProject, setCurrentProject] = useState({});
    const [depense, setDepense] = useState({});
    const [pti, setPti] = useState({});
    
    const year = new Date().getFullYear();
    
    
    const selectProjet = (projet_id) => {
        setCurrentProject(props.projet.find(item => item.id == projet_id))        
    }

    const updatePti = (pti) => {
        modJalon(`/api/v1/pti/${currentProject.id}`, {}, pti, 'POST')

    }


    useEffect(() => {
       getRessources('/api/v1/depense/'+currentProject.id).then(
            lesdepense => setDepense(lesdepense));
        getRessources('/api/v1/pti/'+currentProject.id).then(
            lesPti => setPti(lesPti));   
    }, [currentProject])


    return (
        <Grid  templateRows='50px' >
            <GridItem marginLeft='35%' marginTop='5px'>
                    <SelectProjet projets={props.projet} onChange={selectProjet}/>                    
            </GridItem>

            <GridItem marginLeft='2%' marginTop='5px' display='flex' gap='100px'>
                <Descriptif projet={currentProject}/>
                              

                <Box display='inline'>
                    <TablePti depense={depense} pti={pti} projet={currentProject} updatePti={updatePti}/>                    
                </Box>
            </GridItem>



        </Grid>
        
    )
}