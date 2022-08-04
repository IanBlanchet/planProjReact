import { SelectProjet } from "../component/common/select";
import { Grid, GridItem, Box, Text, Flex, Stack, Heading } from '@chakra-ui/react';
import { List, ListItem, ListIcon, OrderedList, UnorderedList } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react'
import { useState, useEffect} from 'react';
import { TablePti } from "../component/detailProjet/tablePti";
import { Descriptif } from "../component/detailProjet/descriptif";
import { SourceFinance } from "../component/detailProjet/sourceFinance";
import { GaugeChart } from "../component/common/charts";
import { RessourceRequise } from "../component/detailProjet/ressource";
import { Impacts } from "../component/detailProjet/impactbudget";
import { getRessources } from '../util';
import { modJalon } from '../util';


export function DetailProjet(props) {
    const [projet, setProjet] = useState([])
    const [currentProject, setCurrentProject] = useState(props.isSelected?props.selected:{});
    const [depense, setDepense] = useState({});
    const [pti, setPti] = useState({});
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    
    
    const year = new Date().getFullYear();
    
    
    const selectProjet = (projet_id) => {             
        const leprojet = projet.find(item => item.id == projet_id)
        setCurrentProject(leprojet)
        const user = users.find(item => item.id == leprojet.charge)

        if (user) {
            setUser(user)
        } else {
            setUser({'username':'', 'service':'', 'email':''})
        }

    }

  
    const updatePti = (pti) => {
        modJalon(`/api/v1/pti/${currentProject.id}`, {}, pti, 'POST')        

    }

    const updatePrevision = (prev) => {        
        modJalon(`/api/v1/projet/${currentProject.id}`, {}, prev, 'PUT');        
        
    }

    const updateNature = (data) => {        
        modJalon(`/api/v1/projet/${currentProject.id}`, {}, {'nature':data}, 'PUT');

    }

    const updateAvancement = (indicateur) => {

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
        getRessources('/api/v1/user').then(
            lesUser => setUsers(lesUser));
   
            
        
    }, [currentProject, props])


    

    return (
        
        <Grid  templateRows='repeat(3, 1fr, 3fr, 3fr)' templateColumns='2fr, 3fr, 1fr' gap={6} >
            <GridItem  margin='5px' colSpan='3'>
                    <Stack direction='row'><SelectProjet projets={projet} onChange={selectProjet} defaultValue={currentProject.id?(currentProject.id).toString():''}/>
                    <Heading borderWidth='2px' borderRadius='lg' size='lg' width='lg' padding='1'>{currentProject.desc}</Heading>
                    </Stack>                    
            </GridItem>

            <GridItem marginLeft='2%' display='flex'>
                <Descriptif projet={currentProject} lesprojet={projet} updateProjet={selectProjet}/>
            </GridItem>

            <GridItem marginLeft='2%' marginTop='5px' display='flex' gap='100px'>                               
                <Box  >
                    <TablePti depense={depense} pti={pti} projet={currentProject} updatePti={updatePti} updatePrevision={updatePrevision}/>                    
                </Box>
            </GridItem>

            <GridItem display='flex'>
                <SourceFinance  projet={currentProject}  />
            </GridItem>

            <GridItem display='flex' marginLeft='2%' marginTop='5px'>
                <RessourceRequise projet={currentProject} updateNature={updateNature} user={user}/>
            </GridItem>
            <GridItem>
                <Impacts projet={currentProject} lesprojet={projet} updateProjet={selectProjet}/>
            </GridItem>
            <GridItem display='flex'>
                <GaugeChart projet={currentProject} onClick={updateAvancement('plus')} onDoubleClick={updateAvancement('moins')} updateNature={updateNature}/>
            </GridItem>
            
        </Grid>
        
        
    )
}

//