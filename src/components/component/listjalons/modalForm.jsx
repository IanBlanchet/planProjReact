import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    Button,
      
  } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { NewJalonForm } from './forms';
import { CheckCircleIcon, CloseIcon, PlusSquareIcon} from '@chakra-ui/icons';
import { modJalon } from '../../util';





  export function AddJalon({projets, contrats, users, refresh}) {
    const {isOpen, onOpen, onClose } = useDisclosure();  
     

    const pushNewJalon = (jalon) => {           
        modJalon('/api/v1/jalon', {}, jalon, 'POST').then(
          returnjalon =>  {refresh('add', returnjalon);
                        onClose();}
        )
        
    }
  
    return (
      <>
        <IconButton size='sm' onClick={onOpen} icon={<PlusSquareIcon size='md'/>}></IconButton>
        <Modal          
          isOpen={isOpen}
          onClose={onClose}
          size='lg'
          scrollBehavior='inside'
        >
          <ModalOverlay />
          
          <ModalContent>
          
            <ModalHeader color='blue.400'>Nouveau jalon</ModalHeader>
            <ModalCloseButton />
            
            <ModalBody pb={6} >
            
  
            <NewJalonForm {...{projets, contrats, users}} pushNewJalon={pushNewJalon}/>

            
            
            <ModalFooter>
          
              
            </ModalFooter>
            
           
            </ModalBody>
          </ModalContent>
        
        </Modal>
      </>
    )
  }