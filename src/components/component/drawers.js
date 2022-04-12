import { useState, useEffect, useContext, useRef } from 'react';
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
import { Button, Input, FormControl, IconButton, VStack } from '@chakra-ui/react';
import { JalonInput } from './JalonInput';
import {modJalon} from "../util";
import { ContextSelectProject } from '../container/suiviProjet';
import { AddJalonInput } from './JalonInput';

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
            await modJalon('/api/v1/jalon', {}, jalonAdd[jalon]);
        }
        context.updateContext();
        setNewJalon([]);
        setNewJalonId(1)      
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
        let listNewJalons = newJalon;
        const currentJalonId = newJalonId
        let jalonToAdd = {}
        const projet_id = props.projet_contrat === 'projet'?props.currentProject.id:'';
        const contrat_id = props.projet_contrat === 'contrat'?props.contrat:'';
        jalonToAdd[newJalonId] = {'date':'2022-04-01', 'commentaire':'', 'jalon':'C_Direction', 'charge_jalon':props.currentProject.charge, projet_id:projet_id, contrat_id:contrat_id }

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
            </DrawerBody>
            <DrawerFooter>                
                <Button colorScheme='blue' variant='solid' size='lg' onClick={enregistre}>terminer</Button>
            </DrawerFooter>
          </DrawerContent>

        </Drawer>
      </>
    )
  }

