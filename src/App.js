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
import { ResetPasswordRequest } from './components/container/resetpassword';
import { NewPassword } from './components/container/newpassword';
import { RegisterUser } from './components/container/registerUser';
import { ProjetStrategic } from './components/container/projetStrategic';
import { DetailDossier } from './components/container/detaildossier';
import { AllProjet } from './components/container/allProjets';
import { AllContrat } from './components/container/allContrats';


import {Routes, Route} from "react-router-dom"
import { AuthProvider, RequireAuth, AuthContext } from './auth';




function App() {
  

  return (
    
      <>
        
            
            <AuthProvider>
              <Routes >
                
                <Route  path='/' element={<NavBar />} >
                  <Route index element={<Login/>} />
                  <Route path='acceuil' element={<RequireAuth><Acceuil /></RequireAuth>} />
                  <Route path='listjalons' element={<RequireAuth><ListJalons /></RequireAuth>} />
                  <Route path='suiviprojet' element={<RequireAuth><SuiviProjet /></RequireAuth>} />
                  <Route path='evenement' element={<RequireAuth><Events /></RequireAuth>} />
                  <Route path='detailprojet' element={<RequireAuth><DetailProjet  /></RequireAuth>} >
                    <Route
                        path=":projetID"            
                        element={<RequireAuth><DetailProjet /></RequireAuth>}                      
                      />
                  </Route>
                  <Route path='pti' element={<RequireAuth><Pti /></RequireAuth>} />
                  <Route path='strategique' element={<RequireAuth><ProjetStrategic /></RequireAuth>} />
                  <Route path='admin' element={<RequireAuth><Admin /></RequireAuth>} />
                  <Route path='resetpasswordrequest' element={<ResetPasswordRequest />}/> 
                  <Route path='newpassword' element={<NewPassword/>}/>
                  <Route path='registeruser' element={<RegisterUser/>}/>
                  
                  <Route path='detaildossier' element={<RequireAuth><DetailDossier /></RequireAuth>}>
                    <Route
                          key='projetID'
                          path=":projetID"            
                          element={<RequireAuth><DetailDossier /></RequireAuth>}                                         
                        />
                    </Route>
                  <Route path='allprojet' element={<RequireAuth><AllProjet/></RequireAuth>} />
                  <Route path='allcontrat' element={<RequireAuth><AllContrat/></RequireAuth>} />
                </Route>
                

              </Routes>
              </AuthProvider>
            
            

      </>    
        
          
       
    
   
  );
}

export default App;

