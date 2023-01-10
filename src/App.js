import './App.css';
import { getRessources } from './components/util';
import { useState, useEffect ,createContext, useContext } from 'react'
import { NavBar } from './components/container/navbar'
import { Acceuil } from './components/container/accueil';
import { SuiviProjet } from './components/container/suiviProjet'
import { Events } from './components/container/events';
import { Admin } from './components/container/admin';
import { DetailProjet } from './components/container/detailprojet';
import { Pti } from './components/container/pti';
import { TableauPriorisation } from './components/container/priorisation';
import { ListJalons } from './components/container/listjalons';
import { Login } from './components/container/login';
import { ProjetStrategic } from './components/container/projetStrategic';
import { Outlet,  useLoaderData } from "react-router-dom";
import useFetch from './hooks/useFetch';
//import { useNavigate } from "react-router-dom";
import {Routes, Route, Navigate} from "react-router-dom"
import { AuthProvider, RequireAuth, AuthContext } from './auth';


const setData = (element) => {
  const elementFetchData = useFetch('/api/v1/'+element);
  //elementFetchData.response&&console.log(elementFetchData.response)
}




export const loginContext = createContext()
export const contextData = createContext()


function App() {
  
  const [user, setUser] = useState([]);
  const [contrat, setContrat] = useState([]);
  const [projet, setProjet] = useState([]);
  const [view, setView ] = useState('accueil');
  const [selected, setSelected] = useState([false,{}, {}])//le choix du menu.  true if projet select in pti
  
 
  const getData = () => {    
    getRessources('/api/v1/user').then(
      users => setUser(users));
    getRessources('/api/v1/contrat').then(
      contrats => setContrat(contrats));
    getRessources('/api/v1/projet').then(
      projets => setProjet(projets.filter(item => !(['Complété', 'En suspend', 'Abandonné'].includes(item.statut))).sort( (a,b) => {
                                            if (a.no_projet < b.no_projet){
                                              return -1;
                                            } 
                                            if (a.no_projet > b.no_projet) {
                                              return 1;
                                            }
                                            return 0
                                        }
                                        )));
      
  };


  const afficheDetailprojet = (projet_id) => {
    let selectedProjet = {}
    getRessources('/api/v1/projet').then(   
      projets => {
        selectedProjet = projets.find(item => item.id == projet_id);
        let newSelected = [...selected]
        newSelected[1] = selectedProjet
        newSelected[0] = true
        const leuser = user.find(item => item.id == selectedProjet.charge)

        if (leuser) {
            newSelected[2] = leuser
        } else {
          newSelected[2] = {'id':'', 'username':'', 'service':'','statut':'', 'email':''}
        }
        setSelected(newSelected)
       })   
    
    
  }
 


  const menuClick = (container) => {
    setSelected([false,{}])
    setView(container)    
  };


  useEffect(() => {
    getData()
  },[])



  return (
    
      <>
       
             
            
            <contextData.Provider value={{'setData': setData, 'projets':projet, 'contrats':contrat, 'users':(user)}}>
            <AuthProvider>
              <Routes >
                
                <Route  path='/' element={<NavBar onMenuSelect={menuClick}/>} >
                  <Route path='/' element={<Login/>} />
                  <Route path='acceuil' element={<RequireAuth><Acceuil /></RequireAuth>} />
                  <Route path='listjalons' element={<RequireAuth><ListJalons /></RequireAuth>} />
                  <Route path='suiviprojet' element={<RequireAuth><SuiviProjet /></RequireAuth>} />
                  <Route path='evenement' element={<RequireAuth><Events /></RequireAuth>} />
                  <Route path='detailprojet' element={<RequireAuth><DetailProjet isSelected={false} selected='' /></RequireAuth>} />
                  <Route
                      path="/detailprojet/:projetID"            
                      element={<RequireAuth><DetailProjet isSelected={false} selected='' /></RequireAuth>}
                    />
                  <Route path='pti' element={<RequireAuth><Pti afficheProjet={afficheDetailprojet}/></RequireAuth>} />
                  <Route path='strategique' element={<RequireAuth><ProjetStrategic afficheProjet={afficheDetailprojet}/></RequireAuth>} />
                  <Route path='admin' element={<RequireAuth><Admin /></RequireAuth>} />
                </Route>   
                

              </Routes>
              </AuthProvider>
            </contextData.Provider>
            

      </>    
        
          
       
    
   
  );
}

export default App;

