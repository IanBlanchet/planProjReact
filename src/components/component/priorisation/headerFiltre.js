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
import { FcFilledFilter, FcEmptyFilter } from "react-icons/fc";


export function HeaderFilter({options, check, column, handleFilter}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
 
    const handleCheck = ({target}) => {
      
      handleFilter(target.value, column)
    }
  
    return (
      <>
        <Button size='xs' onClick={onOpen} leftIcon={check.length !== options.length?<FcFilledFilter/>:<FcEmptyFilter/>} bg='blue.200' margin='0' padding='0'></Button>
        <Modal          
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          
          <ModalContent>
          
            <ModalCloseButton />
            
            <ModalBody pb={6} >
              
            <CheckboxGroup colorScheme='green' defaultValue={check} >
            <VStack spacing={[1, 5]} direction={['column', 'row']}>
                {options.map(item => <Checkbox key={item} value={item} onChange={handleCheck} >{item}</Checkbox>)}
               
            </VStack>
            </CheckboxGroup>
           
            </ModalBody>
                     
          </ModalContent>
        
        </Modal>
      </>
    )
  }