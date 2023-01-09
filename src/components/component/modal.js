
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Checkbox,      
  } from '@chakra-ui/react';
import { Button, Input, FormControl, IconButton, Link, Text, Box, Heading, Table, Tbody, VStack } from '@chakra-ui/react';

import { useEffect, useState, useRef } from 'react';
import { modJalon } from '../util';
import { GrPowerShutdown, GrMore, GrMemory } from 'react-icons/gr';
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useFormik, Formik, Form,  } from 'formik';
import { MyTextInput, MySelect, MyCheckbox, MyRatingInput } from './common/forms';
import { useNavigate } from 'react-router-dom';
import { cleanSessionStorage } from '../../auth';



export function Connexion() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    let currentUser = sessionStorage.user?JSON.parse(sessionStorage.getItem('user')):null
 
    const navigate = useNavigate()
        
    const handleLogout = () => {
      cleanSessionStorage()
      currentUser = ""
      onClose();
      navigate('/login')
           
    }


    return (
      <>
        {currentUser&&<Button size='sm' onClick={onOpen} leftIcon={<GrPowerShutdown/>}>{currentUser.username}</Button>}
        <Modal          
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          
          <ModalContent>
          
            <ModalHeader marginBottom='5px' fontFamily='serif' fontSize='xx-large'>Bonjour {currentUser&&currentUser.username}</ModalHeader>
            <ModalCloseButton />
  
            <ModalBody>
              
              <Link href='https://planproj.herokuapp.com/reset_password_request' isExternal>
                Pour réinitialiser ton mot de passe <ExternalLinkIcon mx='2px' />
              </Link>
            </ModalBody>
            
            
            <ModalFooter>
        
              <Button colorScheme='red' mr={3} onClick={handleLogout}>
                Logout
              </Button>
              
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        
        </Modal>
      </>
    )
  }


export function EstimateurRessources({projet, applyEstimation}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tempsCharge, setTempsCharge] = useState(0);
  const [tempsTech, setTempsTech] = useState(0)


  const handleClickApply = () => {
    applyEstimation(tempsCharge, tempsTech);
    setTempsCharge(0);
    setTempsTech(0);
    onClose();
  }




  return (
    <>
      <Button size='sm' onClick={onOpen} leftIcon={<GrMemory/>} bg='blue.100' margin='2'>estimateur</Button>
      <Modal          
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        
        <ModalContent>
        
          <ModalHeader colorScheme>Estimateur de ressources</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody pb={6} >
            

          <Formik
          initialValues={{            
            montant: 0,
            externe: false, 
            

          }}       
          
          onSubmit={(values, actions) => {
              //applique la formule logarithmique selon le cas
              let tempsChargeEstime = ((-94.86*(Math.log(values.montant*1000000))+1621)*values.montant);
              let tempsTechEstime = ((-101.8*(Math.log(values.montant*1000000))+1937.2)*values.montant);
              let tempsChargeEstimeParc = ((-132.2*(Math.log(values.montant*1000000))+2196.9)*values.montant);
              let tempsTechEstimeParc = ((-192.6*(Math.log(values.montant*1000000))+3178.9)*values.montant)
              console.log(projet.cat, projet.cat === 'Parcs, espaces verts, loisirs, culture')
              if (!values.externe && !(projet.cat === 'Parcs, espaces verts, loisirs, culture')) {
                tempsChargeEstime = tempsChargeEstime.toFixed(0);
                tempsTechEstime = tempsTechEstime.toFixed(0);
                setTempsCharge(tempsChargeEstime);
                setTempsTech(tempsTechEstime);
              } else if (values.externe && !(projet.cat === 'Parcs, espaces verts, loisirs, culture')) {
                tempsChargeEstime = (tempsChargeEstime*.8).toFixed(0);
                tempsTechEstime = (tempsTechEstime*.4).toFixed(0);
                setTempsCharge(tempsChargeEstime);
                setTempsTech(tempsTechEstime);
              } else if (!values.externe && projet.cat === 'Parcs, espaces verts, loisirs, culture') {
                tempsChargeEstimeParc = tempsChargeEstimeParc.toFixed(0);
                tempsTechEstimeParc = tempsTechEstimeParc.toFixed(0);
                setTempsCharge(tempsChargeEstimeParc);
                setTempsTech(tempsTechEstimeParc);
              } else {
                tempsChargeEstimeParc = (tempsChargeEstimeParc*.8).toFixed(0);
                tempsTechEstimeParc = (tempsTechEstimeParc*.4).toFixed(0);
                setTempsCharge(tempsChargeEstimeParc);
                setTempsTech(tempsTechEstimeParc);
              }
              
              actions.setSubmitting(false);                         
            
          }}
        >
        

            <Form>
              
            <MyTextInput
              label='Valeur total du projet (en million)'
              name='montant'
              type='number'  
              />
                         
            
              <MyCheckbox name='externe'>
                mandat externe
              </MyCheckbox>
            <Button colorScheme='blue' mr={3} type='submit'>
              Lancer l'estimation
            </Button>
          
            </Form>
          </Formik>

            <Box>Temps chargé de projet estimé : {tempsCharge}</Box>
            <Box>Temps technicien estimé : {tempsTech}</Box>
          </ModalBody>
          
          <ModalFooter>
            
            
           
            <Button onClick={handleClickApply} colorScheme='green'>Appliquer au projet</Button>
          </ModalFooter>
        </ModalContent>
      
      </Modal>
    </>
  )
}





const correspondance = {
  "A":["La santé et la sécurité des personnes", "Amélioration de la sécurité de nos infrastructures ou de nos procédures et processus"],
  "B":["La fin de la vie utile d\'un actif ou la mise aux normes de l\'actif ou d'un processus", "Le remplacement d'un actif en fin de vie.  La mise aux normes d'un actif ou d'un processus imposé par un intrant externe ou interne. (ex. nouvelle règlementation provinciale)"],
  "C":["Amélioration de l\'efficience de l\'organisation", "La continuité ou la performance (quantitative et qualitative) des services.  Optimisation d'un actif  (opération, entretien, maintenance) .  Optimisation des ressources."],
  "D":["Impact sur l\'environnement", "Le projet a un impact positif sur l'environnement au sens 'écologique'"],
  "E":["Amélioration de la qualité de vie des citoyens ou l\'expérience citoyenne", "L'amélioration de l'environnement urbain ou de l'expérience du citoyen avec son milieu ou avec l'organisation"],
  "F":["Alignement avec la planification stratégique", "Le projet répond à une ou des aspirations de la planification stratégique"],  
  "G":["La présence d\'une aide financière", "Une subvention est anticipée ou confirmée"],
  "H":["Le rendement de l\'investissement", "L'appréciation du retour sur l'investissement du projet par exemple un impact positif sur le budget."],
}
const criteres = [["A",1.5],["B",1.5], ["C",1.5], ["D",1.5], ["E",1.5], ["F",1], ["G",0.75], ["H",0.75]];

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
      if (didMount.current) func();
      else didMount.current = true;
  }, deps);
}

export function AddPointage({rating, projet}) {
  const {isOpen, onOpen, onClose } = useDisclosure();  
  const [newRating, setNewRating] = useState({});
  const [pointage, setPointage] = useState(0);

  

  useEffect(()=>{   
    setNewRating({
      "A":rating?rating["A"]:0,
      "B":rating?rating["B"]:0,
      "C":rating?rating["C"]:0,
      "D":rating?rating["D"]:0,
      "E":rating?rating["E"]:0,
      "F":rating?rating["F"]:0,
      "G":rating?rating["G"]:0,
      "H":rating?rating["H"]:0      
    }); 
  },[rating])

  useDidMountEffect(()=> {
    
      setPointage(criteres.reduce((accumulator, currentValue) => {
        
        return accumulator + (newRating[currentValue[0]]*currentValue[1]);    
        
      }, 0));     
    
  }, [newRating])


  return (
    <>
      <Button size='sm' onClick={onOpen} bg='green.200' margin='2'>{pointage}</Button>
      <Modal          
        isOpen={isOpen}
        onClose={onClose}
        size='lg'
        scrollBehavior='inside'
      >
        <ModalOverlay />
        
        <ModalContent>
        
          <ModalHeader color='blue.400'>POINTAGE</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody pb={6} >
          <Heading size='sm'>Entrez l'impact du projet sur le critère de -3 à 10</Heading>

          <Formik
          initialValues={
            newRating            
            
          }
          
          validate={(values) => {
            const errors = {};
            const keys = Object.keys(values)
            keys.forEach(value => {
              
                if (values[value] > 10) {
                  errors[value] = 'max 10';
              } else if (values[value] < -3) {
                  errors[value] = 'min -3';
            }
            })  
            
            return errors;
          }          }
          
          onSubmit={(values, actions) => {
                            
              setNewRating(values)
              modJalon('/api/v1/projet/'+projet.id, {}, {'rating':values}, 'PUT');
              
              actions.setSubmitting(false);                         
              actions.resetForm();
              onClose() 
          }}
        >
        

            <Form>
            
           {criteres.map(item => <MyRatingInput
              key={item.key}
              label={correspondance[item[0]][0]}
              description={correspondance[item[0]][1]}
              name={item[0]}
              type='number'  
              />)}
                      
          
          
          <ModalFooter>
        
            <Button  colorScheme='green' mr={3} type='submit'>Enregistrer</Button>
          </ModalFooter>
          
          </Form>
          </Formik>
          </ModalBody>
        </ModalContent>
      
      </Modal>
    </>
  )
}






  