import React from 'react';
import { useContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ListJalons } from './components/container/listjalons';
import { Acceuil } from './components/container/accueil';
import { NavBar } from './components/container/navbar';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { Table } from './static/customStyle.ts'
import { contextData } from './App';


const ElementTest = () => {
  
  return <h1 >Va te logger pour commencer</h1>
  
}




import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter
} from "react-router-dom";



/*const router = createBrowserRouter([
  { 
    path: '/',
    element: <App/>,
    loader: () => {return sessionStorage.getItem('isLogin')},
    children : [
      
      {
        path: "/test",
        element: <ElementTest/>,
        },      
      {
        path: "/listjalons",
        element: <ListJalons/>,
        },
      ],
  },
  {
    path: "/test2",
    element: <ElementTest/>,

  }
]);*/






ReactDOM.render(
  
  <ChakraProvider >
    
    <React.StrictMode>

    <BrowserRouter >
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouveau lien vers l'application de gestion des projets</title>
    </head>
    <body>
        <h2>Nouveau lien vers l'application de gestion des projets</h2>
        <p>Cliquer ici pour accéder au nouvel URL:</p>
        <a href="https://projet.ville.valleyfield.qc.ca" target="_blank">https://projet.ville.valleyfield.qc.ca</a>
    
        <p>À noter que l'application sera désormais seulement disponible à l'interne ou via votre vpn.  Merci</p>
    </body>
    </BrowserRouter>
      
    </React.StrictMode>
    
  </ChakraProvider>
  
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//<RouterProvider router={router} />
