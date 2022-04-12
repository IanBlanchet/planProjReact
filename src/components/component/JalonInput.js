
import { useState, useEffect, useContext } from 'react';
import { Input, InputLeftAddon, InputGroup, IconButton, ButtonGroup, Select, Box} from '@chakra-ui/react'
import { CheckCircleIcon, CloseIcon, PlusSquareIcon} from '@chakra-ui/icons'
import { modJalon } from '../util';
import { ContextSelectProject } from '../container/suiviProjet';
import { useFormik } from 'formik';




const setCharge = (data, context) => {
    
    let projet = context.projet.find(item => item.id === data.projet_id)
    let contrat = context.contrat.find(item => item.id === data.contrat_id)
    contrat && (projet = context.projet.find(item => item.id === contrat.projet_id))
    
    const charges = [data.charge_jalon, (contrat? contrat.charge_contrat:projet.charge), (projet?projet.charge:'')];
    let charge = charges[0]?charges[0]:charges[1]?charges[1]:charges[2]
    return charge
}
//la liste des jalons possible
const jalonTitle = ['C_Direction', 'Commission', 'Conseil', 'AO', 'TQC', 'Livrable', 'Fermeture', 'F_travaux', 'D_travaux', 'Demande_CA']

//object contenant les styles de composantes jalons
const styleBadge = {
    added : {
        bg:'blue.200',
        icon: <CheckCircleIcon />
    },
    toAdd : {
        bg:'blue.500',
        icon: <PlusSquareIcon />

    }
}


/**
 * form component for edit jalons
 * @param {props} props 
 * @returns {React component}
 */
export function JalonInput(props) {
        
    const [data, setData] = useState(props.jalon)
    const [visible, setVisible] = useState({})
    const context = useContext(ContextSelectProject);
    
    
    const charge = setCharge(data, context)
    

    const handleChange = (e) => {        
        let jalonDict = data
        const mod = {};        
        mod[e.target.name] = e.target.value
        jalonDict= {...jalonDict, ...mod}
        setData(jalonDict)        
        props.modJalons(props.jalon.id, jalonDict)              
    }


    const handleClose = () => {
        let jalonDict = data
        const mod = {}
        mod['etat'] = 'complet'
        jalonDict= {...jalonDict, ...mod}
        setData(jalonDict)
        props.modJalons(props.jalon.id, jalonDict)        
    }


    const handleDelete = () => {
        modJalon(`/api/v1/jalon/${props.jalon.id}`, {}, {}, 'DELETE');
        setVisible({display:'none'});
        
    }  

    return (
    <Box bg='blue.200' padding='1' borderRadius='md' boxShadow='lg'>
        <Box color='black.500'
                fontWeight='semibold'
                letterSpacing='wide'
                fontSize='xs'
                textTransform='uppercase'
                ml='1'>
        {props.jalon.jalon}
        </Box>
        <InputGroup size='sm' style={visible} >
            
            {data.etat === 'travail'? 
                    <>
                    <Input size='sm' type='date' name='date' value={data.date} onChange={handleChange} bg='white'/>
                    <Input size='sm' type='text' name='commentaire' value={data.commentaire} onChange={handleChange} bg='white' placeholder='commentaire'/>
                    <Select size='sm' name='charge_jalon' onChange={handleChange} bg='white' value={charge} >
                    {context.users.map(item => <option key={item.id} value={item.id} >{item.username}</option>)}
                    </Select>
                    </>
                    : 
                    <>
                    <Input size='sm' type='date' value={data.date} isDisabled={true}/>
                    <Input size='sm' type='text' value={data.commentaire} isDisabled={true}/>
                    <Input size='sm' type='text' value={props.users.find(user => user.id === charge).username} isDisabled={true}/>
                    </>}
            {data.etat === 'travail' &&
                        <ButtonGroup paddingLeft='1'>
                        <IconButton colorScheme='teal'
                                    aria-label='Call Segun'
                                    size='sm'
                                    icon={<CheckCircleIcon />}
                                    title='complet'                                
                                    onClick={handleClose}/>
                        <IconButton colorScheme='red'                                
                                    size='sm'
                                    icon={<CloseIcon />}
                                    title='effacer'
                                    onClick={handleDelete}/>
                        </ButtonGroup>
                                    }
        </InputGroup>
    </Box>
)
}



export function AddJalonInput(props) {
    
    const [data, setData] = useState(props.newJalon);
    const context = useContext(ContextSelectProject);

    const charge = props.currentProject.charge
    

    const handleChange = (e) => {        
        let jalonDict = data
        const mod = {}
        mod[e.target.name] = e.target.value
        jalonDict= {...jalonDict, ...mod}
        setData(jalonDict)        
        props.addJalon(props.newJalonId, jalonDict)                 
    }


    


    return (
    
    <Box bg='blue.500' padding='1' borderRadius='md' boxShadow='lg'>
        <Box color='black.500'
                fontWeight='semibold'
                letterSpacing='wide'
                fontSize='xs'
                textTransform='uppercase'
                ml='1'>
            <Select size='sm' name='jalon' onChange={handleChange} value={data.jalon}>
                {jalonTitle.map((item, index) => <option key={index} value={item}>{item}</option>)}
            </Select>
        </Box>
        <InputGroup size='sm' >
            
            
                
            <Input size='sm' type='date' name='date' value={data.date} onChange={handleChange} bg='white'/>
            <Input size='sm' type='text' name='commentaire' value={data.commentaire} onChange={handleChange} bg='white' placeholder='commentaire'/>
            <Select bg='white' name='charge_jalon' value={data.charge_jalon} onChange={handleChange}>
                {props.users.map(item => <option key={item.id} value={item.id} >{item.username}</option>)}
            </Select>       
            
                                    
        </InputGroup>
    </Box>
    )


}


