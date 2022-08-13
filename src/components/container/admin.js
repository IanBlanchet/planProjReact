import { Box, Button, Select, Input } from "@chakra-ui/react"
import { useState, useEffect } from 'react';
import { NewProjet } from "../component/admin/newProjet";
import { AddEvents } from "../component/admin/addEvents";




export function Admin() {

    const [choice, setChoice] = useState(<p>accueil</p>)
    
    const handleSelect = (e) => {
        switch(e.target.value) {
            case 'AjoutEvenement': setChoice(<AddEvents/>);  break;
            case 'AjoutProjet': setChoice(<NewProjet/>);  break;
            case 'AjoutContrat': setChoice(<AddEvents/>);  break;
            default: setChoice(<p>Faire un choix</p>)
        };
        
    }


    useEffect(() => {        
   
    }, [])

    return (
        <Box>
            <Select onChange={handleSelect}>
                <option>AjoutEvenement</option>
                <option>AjoutProjet</option>
                <option>AjoutContrat</option>
            </Select>           
            {choice}
        </Box>
        
    )
}