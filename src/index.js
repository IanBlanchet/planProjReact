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



import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';
// Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';


import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter
} from "react-router-dom";

const msalInstance = new PublicClientApplication(msalConfig);

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
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
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