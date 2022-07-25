import './App.css';
import { getRessources } from './components/util';
import { useState, useEffect ,createContext } from 'react'
import { NavBar } from './components/container/navbar'
import { SuiviProjet } from './components/container/suiviProjet'
import { Events } from './components/container/events';
import { Admin } from './components/container/admin';
import { DetailProjet } from './components/container/detailprojet';
import { Pti } from './components/container/pti';




const loginContext = createContext()



function App() {
  const [user, setUser] = useState([]);
  const [contrat, setContrat] = useState([]);
  const [projet, setProjet] = useState([]);
  const [view, setView ] = useState('accueil');
    
    

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


  const afficheDetailprojet = (projet_id) => {
    const selectedProjet = projet.find(item => item.id == projet_id);
    menuChoice['detailProjetSelected'] = <DetailProjet projet={projet} isSelected={true} selected={selectedProjet}/>
    setView('detailProjetSelected')
    
  }
 
  let menuChoice = {
    suiviProjet: <SuiviProjet projet={projet} contrat={contrat} user={user}/>,
    evenement: <Events projet={projet} contrat={contrat} user={user}/>,
    accueil : (<div>bienvenue</div>),
    admin : <Admin />,
    detailProjet : <DetailProjet projet={projet} isSelected={false} selected=''/>,
    detailProjetSelected : <DetailProjet projet={projet} isSelected={true} selected={''}/>,
    pti : <Pti projet={projet} afficheProjet={afficheDetailprojet}/>
  }

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
