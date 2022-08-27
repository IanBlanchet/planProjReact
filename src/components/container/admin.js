import { Box, Button, Select, Input } from "@chakra-ui/react"
import { useState, useEffect } from 'react';
import { NewProjet } from "../component/admin/newProjet";
import { AddEvents } from "../component/admin/addEvents";
import { NewContrat } from "../component/admin/newContrat";
import { EditProjet } from "../component/admin/editProjet";
import { EditContrat } from "../component/admin/editContrat";




export function Admin() {

    const [choice, setChoice] = useState(<p>accueil</p>)
    
    const handleSelect = (e) => {
        switch(e.target.value) {
            case 'Ajout Evenement': setChoice(<AddEvents/>);  break;
            case 'Ajout Projet': setChoice(<NewProjet/>);  break;
            case 'Ajout Contrat': setChoice(<NewContrat/>);  break;
            case 'Edit Projet' : setChoice(<EditProjet/>); break;
            case 'Edit Contrat' : setChoice(<EditContrat/>); break;
            default: setChoice(<p>Faire un choix</p>)
        };
        
    }


    useEffect(() => {        
   
    }, [])

    return (
        <Box>
            <Select onChange={handleSelect}>
                <option>Ajout Evenement</option>
                <option>Ajout Projet</option>
                <option>Ajout Contrat</option>
                <option>Edit Projet</option>
                <option>Edit Contrat</option>
            </Select>           
            {choice}
        </Box>
        
    )
}