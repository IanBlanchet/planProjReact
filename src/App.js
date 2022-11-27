import './App.css';
import { getRessources } from './components/util';
import { useState, useEffect ,createContext } from 'react'
import { NavBar } from './components/container/navbar'
import { Acceuil } from './components/container/accueil';
import { SuiviProjet } from './components/container/suiviProjet'
import { Events } from './components/container/events';
import { Admin } from './components/container/admin';
import { DetailProjet } from './components/container/detailprojet';
import { Pti } from './components/container/pti';
import { TableauPriorisation } from './components/container/priorisation';
import { ListJalons } from './components/container/listjalons';


export const loginContext = createContext()



function App() {
  const [user, setUser] = useState([]);
  const [contrat, setContrat] = useState([]);
  const [projet, setProjet] = useState([]);
  const [view, setView ] = useState('accueil');
  const [selected, setSelected] = useState([false,{}, {}])//le choix du menu.  true if projet select in pti
  
    

  const getData = () => {
    getRessources('/api/v1/user').then(
      users => setUser(users)
    )
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
 
  let menuChoice = {
    suiviProjet: <SuiviProjet user={user}/>,
    evenement: <Events projet={projet} contrat={contrat} user={user}/>,
    accueil : <Acceuil />,
    admin : <Admin />,
    detailProjet : <DetailProjet projet={projet} isSelected={false} selected=''/>,
    detailProjetSelected : <DetailProjet projet={projet} isSelected={true} selected={''}/>,
    pti : <Pti projet={projet} user={user} afficheProjet={afficheDetailprojet}/>,
    priorisation : <TableauPriorisation user={user} afficheProjet={afficheDetailprojet}/>,
    listJalons : <ListJalons projets={projet} contrats={contrat} users={user}/>
  }

  const menuClick = (container) => {
    setSelected([false,{}])
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
        
        {selected[0]?<DetailProjet projet={projet} isSelected={true} user={selected[2]} selected={selected[1]}/>:menuChoice[view]}    
        </loginContext.Provider>
    </div>
   
  );
}

export default App;
