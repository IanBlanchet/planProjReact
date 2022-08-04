import { SelectProjet } from '../component/common/select';
import { Grid, GridItem} from '@chakra-ui/react';
import { useState, useEffect, createContext  } from 'react'
import { getRessources } from '../util';
import { GanttProjet } from '../component/suiviProjet/gantt';
import { DateTime, Duration } from 'luxon';

/**
 * 
 * @param {item in list} jalon - each jalons in the list 
 * @returns { html } - return a html that render a tooltip in timelinechart
 */
function createToolTips(jalon) {
              return `<h1 style="color:blue; font-weight:bold;">${jalon.jalon}</h1><b>
                    <h5>${jalon.date}</h5>
                    `
                                     
};

                                                                
export const ContextSelectProject = createContext();


/** 
* Container for project  overview with associated contract.
* @param {React props} props - props containing all project and contracts.
* @return {React Component} A react component.
*/
export function SuiviProjet(props) {
    
    const [currentProject, setCurrentProject] = useState(props.projet[0]);    
    const [assContrat, setAssContrat] = useState([]);
    const [jalons, setJalons] = useState([]);    
    const [assJalons, setAssJalons] = useState([]);
    const [graphData, setGraphData] = useState([]);    
    
    
    const selectProjet = async (project_id) => {              
        setAssJalons([]);
        setCurrentProject([]);        
        setGraphData([]);
        const le_projet = props.projet.find(item => item.id == project_id);

        //uitilisation de la donnée direct pour éviter le décalage avec le state
        const lesjalons = await getRessources('/api/v1/jalon').then( (lesjalons) => {
            setJalons(lesjalons); return lesjalons;});

        setCurrentProject(le_projet);          
        const selectContrats = props.contrat.filter(item => item.projet_id == project_id);    
        let assjalon = [];
        assjalon = [...assjalon, ...(lesjalons.filter(item => item.projet_id == project_id))];
        selectContrats.forEach(element => {
            assjalon = [...assjalon, ...(lesjalons.filter(item => item.contrat_id == element.id))]           
        });              
        setAssJalons(assjalon);  
        setAssContrat(selectContrats);
                
        //construire une list pour produire le Gantt
        let data = [];
        //ajouter l'élément today qui permet de faire apparaitre tous les contrats meme sans jalons
        data.push([le_projet.desc, 'now', '', new Date(Date.now()), new Date(Date.now()) ]);        
        data = [...data, ...selectContrats.map(contrat => { return [contrat.desc, 'now','', new Date(Date.now()), new Date(Date.now())] })];
        //ajouter un element sur le timeline pour chacun des projet et contrats
        const jalonData = assjalon.map((jalon) => {
            const id = (jalon.projet_id ? jalon.projet_id : jalon.contrat_id);
            const contrat = props.contrat.find(item => item.id == id)
            const description = jalon.projet_id ? le_projet.desc : contrat.desc;            
            return [description, jalon.jalon, createToolTips(jalon), new Date(jalon.date), new Date(jalon.date)]
                                });

        data = [...data, ...jalonData];
        setGraphData(data);                          
      };
    

    const updateContext = async () => {
        await getRessources('/api/v1/jalon').then( (lesjalons) => {
            setJalons(lesjalons); return lesjalons;});
        const id = currentProject.id                   
        selectProjet(id);    
        
    }     

    useEffect(() => {
        getRessources('/api/v1/jalon').then(
      lesjalons => setJalons(lesjalons));      
        
    }, [])

    return (
        
            <Grid  templateRows='50px'>

                <GridItem marginLeft='35%' marginTop='5px'>
                    <SelectProjet projets={props.projet} onChange={selectProjet}/>                    
                </GridItem>                                              
                
                            
                <GridItem padding='5px' paddingTop='10px'>
                    <ContextSelectProject.Provider value={{updateContext, users:props.user, projet:props.projet, contrat:props.contrat}} >
                    <GanttProjet currentProject={currentProject} assContrat={assContrat} jalons={jalons} assJalons={assJalons}
                                    newData={graphData}                                                    
                         />
                    </ContextSelectProject.Provider>
                </GridItem>             
                
            </Grid> 
            
        
  )
}




