import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
      
  } from '@chakra-ui/react';
import { Button, Text, Box, Heading, Table, Tbody, VStack, Checkbox, CheckboxGroup  } from '@chakra-ui/react';
import { FcFilledFilter } from "react-icons/fc";


export function HeaderFilter({item}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
 
    const handleFilterStatut = () => {

    }
  
    return (
      <>
        <Button size='xs' onClick={onOpen} leftIcon={<FcFilledFilter/>} bg='blue.200' margin='2'></Button>
        <Modal          
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          
          <ModalContent>
          
            
            <ModalCloseButton />
            
            <ModalBody pb={6} >
              
            <CheckboxGroup colorScheme='green' defaultValue={['Actif']}>
            <VStack spacing={[1, 5]} direction={['column', 'row']}>
                <Checkbox value='Actif' onChange={handleFilterStatut}>Actif</Checkbox>
                <Checkbox value='En approbation' onChange={handleFilterStatut}>En approbation</Checkbox>
                <Checkbox value='En suspend' onChange={handleFilterStatut}>En suspend</Checkbox>
                <Checkbox value='En réception' onChange={handleFilterStatut}>En réception</Checkbox>
            </VStack>
            </CheckboxGroup>
           
  
            
            </ModalBody>
            
            <ModalFooter>
              
              
             
              <Button  colorScheme='green'>Appliquer au projet</Button>
            </ModalFooter>
          </ModalContent>
        
        </Modal>
      </>
    )
  }