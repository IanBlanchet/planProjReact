
import React from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    Button
  } from '@chakra-ui/react'

import { CheckCircleIcon, CloseIcon} from '@chakra-ui/icons'


export const DeleteJalonAlert = ({applyDelete}) => {

const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

 
  return (
    <>
      <Button onClick={onOpen} title='Abandonner le jalon' size='xs' bg='red'><CloseIcon/></Button>
      
      <AlertDialog
        motionPreset='slideInRight'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}        
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Abandon d'un jalon</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Voulez-vous vraiment abandonner ce jalon?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Non
            </Button>
            <Button colorScheme='red' ml={3} onClick={applyDelete}>
              Oui
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}


export const InputMillionAlert = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
  
   
    return (
      <>
        <Button onClick={onOpen} title='Limitation input millions' size='xs' bg='red'><CloseIcon/></Button>
        
        <AlertDialog
          motionPreset='slideInRight'
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}        
          isCentered
        >
          <AlertDialogOverlay />
  
          <AlertDialogContent>
            <AlertDialogHeader>Montant du PTI</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Attention, le montant doit être entré en millions. Votre chiffre ne semble pas réaliste!
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Ok, je vais faire attention
              </Button>
              
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }
  