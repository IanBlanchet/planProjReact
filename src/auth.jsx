import * as React from "react";
import { useEffect } from "react";
import { createContext, useContext, useState } from 'react'
import {
  useNavigate,
  useLocation,
  Navigate,
  } from "react-router-dom";
import { getRessources } from "./components/util";
import { useToast } from "@chakra-ui/react";


export let AuthContext = createContext()
export let BaseDataContext = createContext()

export function cleanSessionStorage() {
  sessionStorage.token = "";
  sessionStorage.user = "";
}



export function AuthProvider({ children }) {
  let [user, setUser] = useState(sessionStorage.getItem('user')&&JSON.parse(sessionStorage.getItem('user')));
  const navigate = useNavigate()
  const toast = useToast({                
    position: '',
    duration: 1000,
    isClosable: true
  })

  function execute() {
    cleanSessionStorage();
    navigate('/');
    toast({status:'error', description:'Session expirée'});
  }

  let myTimeout = ''


  let signin = (newUser) => {
    clearTimeout(myTimeout)
    setUser(newUser)    
    
  };

  let signout = (callback) => {
    cleanSessionStorage()    
    clearTimeout(myTimeout)    
    callback()
    
  };

  let value = { user, signin, signout};

  useEffect(() => {
    
    myTimeout = setTimeout(() => {
      cleanSessionStorage();
      navigate('/');
      toast({status:'error', description:'Session expirée'});      
    }, (59000*60*24));
    
  }, [user])
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}



function BaseDataProvider({children}) {
  const [user, setUser] = useState([]);
  const [contrat, setContrat] = useState([]);
  const [projet, setProjet] = useState([]);
  const blanckNature = {
    'nature': [' '],
    'justification':[' '],
    'refus':[' '], 
    'tempsCharge':0, 
    'tempsTech' :0, 
    'services':[], 
    'avancement':0, 
    'impacts':[], 
    'isStrategic':true, 
    'echeance':'', 
    'notes':'',
    'tasks':[
      {
        id: '1',
        name: 'debut des travaux fictif',
        start: '2023-01-28',
        end: '2023-03-31',
        progress: 10,
        dependencies: ''
      },
      {
          id: '2',
          name: 'fin des travaux fictif',
          start: '2023-03-31',
          end: '2023-04-30',
          progress: 20,
          dependencies: '1'
        },      
    ]
  }
  
  const refreshData = () => {
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
      }

  useEffect(() => {
    refreshData()
    
  }, [])

  return <BaseDataContext.Provider value={{user, projet, contrat, blanckNature, refreshData}}>{children}</BaseDataContext.Provider>;
}


function useAuth() {
    return useContext(AuthContext);
  }


export function RequireAuth({ children }) {
    let auth = useAuth();
    let location = useLocation();
  
    if (!auth.user) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  
    return <BaseDataProvider>{children}</BaseDataProvider>;
  }




  