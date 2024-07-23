import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";

//591351204824-bjt4mo6c3i8mvackhfcmb86ocnvv94kd.apps.googleusercontent.com
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="1057630297732-63404uhe0rsf6hu78ohud3pte4fn4bpm.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </BrowserRouter> 
)
