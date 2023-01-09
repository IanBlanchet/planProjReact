import { useContext} from 'react'
import { SelectProjet } from '../component/common/select';
import { Grid, GridItem} from '@chakra-ui/react';
import { useState, useEffect, createContext  } from 'react'
import { getRessources } from '../util';
import { GanttProjet } from '../component/suiviProjet/gantt';
import { BaseDataContext } from '../../auth';



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
export function SuiviProjet() {
    const [projets, setProjets] = useState([])
    const [contrats, setContrats] = useState([])
    const [currentProject, setCurrentProject] = useState([]);    
    const [assContrat, setAssContrat] = useState([]);
    const [jalons, setJalons] = useState([]);    
    const [assJalons, setAssJalons] = useState([]);
    const [graphData, setGraphData] = useState([]);    
    
    const {user} = useContext(BaseDataContext)
    

    const selectProjet = async (project_id) => {              
        setAssJalons([]);
        setCurrentProject([]);        
        setGraphData([]);
        const le_projet = projets.find(item => item.id == project_id);

        //uitilisation de la donnée direct pour éviter le décalage avec le state
        const lesjalons = await getRessources('/api/v1/jalon').then( (lesjalons) => {
            setJalons(lesjalons); return lesjalons;});

        setCurrentProject(le_projet);          
        const selectContrats = contrats.filter(item => item.projet_id == project_id);    
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
            const contrat = contrats.find(item => item.id == id)
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
        getRessources('/api/v1/contrat').then(
            contrats => setContrats(contrats));
        getRessources('/api/v1/projet').then(
            projets => setProjets(projets.filter(item => !(['Complété', 'En suspend', 'Abandonné'].includes(item.statut))).sort( (a,b) => {
                                                  if (a.no_projet < b.no_projet){
                                                    return -1;
                                                  } 
                                                  if (a.no_projet > b.no_projet) {
                                                    return 1;
                                                  }
                                                  return 0
                                              }
                                              )));
        getRessources('/api/v1/jalon').then(
      lesjalons => setJalons(lesjalons));      
        
    }, [currentProject])

    return (
        
            <Grid  templateRows='50px'>

                <GridItem marginLeft='35%' marginTop='5px'>
                    <SelectProjet projets={projets} onChange={selectProjet}/>                    
                </GridItem>                                              
                
                            
                <GridItem padding='5px' paddingTop='10px'>
                    <ContextSelectProject.Provider value={{updateContext, users:user, projet:projets, contrat:contrats}} >
                    <GanttProjet currentProject={currentProject} assContrat={assContrat} jalons={jalons} assJalons={assJalons}
                                    newData={graphData} users={user}                                                    
                         />
                    </ContextSelectProject.Provider>
                </GridItem>             
                
            </Grid> 
            
        
  )
}




