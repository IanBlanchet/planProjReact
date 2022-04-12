import './App.css';
import { getRessources } from './components/util';
import { useState, useEffect ,createContext } from 'react'
import { NavBar } from './components/container/navbar'
import { SuiviProjet } from './components/container/suiviProjet'
import { Events } from './components/container/events'




const loginContext = createContext()



function App() {
  const [user, setUser] = useState([]);
  const [contrat, setContrat] = useState([]);
  const [projet, setProjet] = useState([]);
  const [view, setView ] = useState('accueil')  
  
  

  
  let menuChoice = {
    suiviProjet: <SuiviProjet projet={projet} contrat={contrat} user={user}/>,
    evenement: <Events projet={projet} contrat={contrat} user={user}/>,
    accueil : (<div>bienvenue</div>),
  }
  const getData = () => {
    getRessources('/api/v1/user').then(
      users => setUser(users)
    )
    getRessources('/api/v1/contrat').then(
      contrats => setContrat(contrats));
    getRessources('/api/v1/projet').then(
      projets => setProjet(projets.filter(item => item.statut === 'Actif').sort( (a,b) => {
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

  const menuClick = (container) => {
    
    setView(container)    
  };

  const showAccueil = () => {
    setView('accueil')
  }

  useEffect(() => {
    sessionStorage.isLogin = false
  }, [])


  return (
    
    <div>
        <loginContext.Provider value={sessionStorage.getItem('isLogin')}>
          <NavBar onLogin={getData} onLogout={showAccueil} onMenuSelect={menuClick}/>  
        
        {menuChoice[view]}    
        </loginContext.Provider>
    </div>
   
  );
}

export default App;
