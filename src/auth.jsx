import * as React from "react";
import { useEffect } from "react";
import { createContext, useContext, useState } from 'react'
import {
  useNavigate,
  useLocation,
  Navigate,
  } from "react-router-dom";
import { getRessources } from "./components/util";


export let AuthContext = createContext()
export let BaseDataContext = createContext()

export function cleanSessionStorage() {
  sessionStorage.token = "";
  sessionStorage.user = "";
}



export function AuthProvider({ children }) {
  let [user, setUser] = useState(sessionStorage.getItem('user')&&JSON.parse(sessionStorage.getItem('user')));
 
  let signin = (newUser) => {
    setUser(newUser)    
    
  };

  let signout = (callback) => {
    cleanSessionStorage()
    setUser(null)
    callback()
    
  };

  let value = { user, signin, signout };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}



function BaseDataProvider({children}) {
  const [user, setUser] = useState([]);
  const [contrat, setContrat] = useState([]);
  const [projet, setProjet] = useState([]);

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

  return <BaseDataContext.Provider value={{user, projet, contrat, refreshData}}>{children}</BaseDataContext.Provider>;
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




  