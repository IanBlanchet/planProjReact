import { useState, useEffect, useContext} from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure
  } from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons'
import { Button, Heading, Text, Box, IconButton, VStack, HStack, Spacer, Grid, GridItem } from '@chakra-ui/react';
import { JalonInput } from '../suiviProjet/JalonInput';
import {modJalon} from "../../util";
import { ContextSelectProject } from '../../container/suiviProjet';
import { AddJalonInput } from '../suiviProjet/JalonInput';


const jalonsTypeProjet = ['C_Direction','Commission', 'Rencontre publique', 'Conseil', 'Demande_CA', 'Fermeture']
const jalonsTypeContrat = ['AO', 'Conseil', 'D_travaux', 'F_travaux', 'Livrable', 'Fermeture']


export function EditJalon(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [jalonsMod, setJalonsMod] = useState({});
    const [jalonAdd, setJalonAdd] = useState({})
    const [newJalon, setNewJalon ] = useState([]);
    const [newJalonId, setNewJalonId] = useState(1)
    const context = useContext(ContextSelectProject);
    
        
    const modJalons = (jalonId, jalonDict) => {
        let listJalons = jalonsMod
        let newJalon = {}
        newJalon[jalonId] = jalonDict
        const newlistJalons = {...listJalons, ...newJalon}
        setJalonsMod(newlistJalons)
      }
    
    const enregistre = async () => {     
                 
        for (const jalon in jalonsMod) {        
          await modJalon(`/api/v1/jalon/${jalonsMod[jalon].id}`, {}, jalonsMod[jalon], 'PUT');              
        };
        for (const jalon in jalonAdd) {
            await modJalon('/api/v1/jalon', {}, jalonAdd[jalon], 'POST');
        }
        context.updateContext();
        setNewJalon([]);
        setJalonAdd({});
        setJalonsMod({});
        setNewJalonId(1);      
        onClose();      
      }
    
    const cancelChange = () => {
        setNewJalon([]);
        setNewJalonId(1);
        setJalonAdd({});
        setJalonsMod({})
        onClose();
    }

    const addBlanckJalon = () => {
        let listNewJalons = [...newJalon];
        const currentJalonId = newJalonId
        let jalonToAdd = {}
        const projet_id = props.projet_contrat === 'projet'?props.currentProject.id:'';
        const contrat_id = props.projet_contrat === 'contrat'?props.contrat:'';
        jalonToAdd[newJalonId] = {'date':'2022-08-01', 'commentaire':'', 'jalon':'C_Direction', 'charge_jalon':props.currentProject.charge, projet_id:projet_id, contrat_id:contrat_id }

        setNewJalon([]);
        setNewJalon([...listNewJalons, jalonToAdd]);
        setNewJalonId(currentJalonId+1)
        
    }

    const addJalon = (newJalonId, jalonDict) => {
        let jalonToAdd = {}
        jalonToAdd[newJalonId] = jalonDict;
        setJalonAdd({...jalonAdd, ...jalonToAdd});
        
    }

 
  
    useEffect(() => {  
        setNewJalon([]);
        setJalonAdd({});
        return () => {setJalonsMod({}); setNewJalon([])}
      }, [])

  
    return (
      <>        
        <Button colorScheme={props.projet_contrat==='projet'?'green':'blue'} size='sm' onClick={onOpen}>
            {props.title}
        </Button>
        <Drawer size='lg' placement='left' onClose={cancelChange} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
          <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px' textAlign='center' >Editer jalons pour : {props.title}</DrawerHeader>
            <DrawerBody>
              <Grid  gridTemplateColumns='0.5fr 3fr'>
                
                  <GridItem grid>
                    <Heading size='sm'>Jalons typiques</Heading>
                    {props.projet_contrat === 'projet'?
                    jalonsTypeProjet.map(item => <><Text>{item}</Text><Spacer/></>):
                    jalonsTypeContrat.map(item => <Text>{item}</Text>)}
                  </GridItem>
                  
                  <GridItem>
                    < VStack>
                    {props.jalons.map((item) => 
                      <JalonInput key={item.id} jalon={item} modJalons={modJalons} users={context.users}/>
                    )}
                    {newJalon.map(item => <AddJalonInput users={context.users} currentProject={props.currentProject} 
                                                        newJalon={item[Object.keys(item)[0]]} 
                                                        newJalonId={Object.keys(item)[0]} 
                                                        addJalon={addJalon}
                                                        />)}
                    <IconButton icon={<SmallAddIcon/>}
                                variant='outline'
                                color='blue'
                                size='md'
                                title='ajouter un jalon' 
                                onClick={addBlanckJalon} >
                    </IconButton>                       
                    </VStack>
                  </GridItem>
                </Grid> 
            </DrawerBody>
            <DrawerFooter>                
                <Button colorScheme='blue' variant='solid' size='lg' onClick={enregistre}>terminer</Button>
            </DrawerFooter>
          </DrawerContent>

        </Drawer>
      </>
    )
  }

