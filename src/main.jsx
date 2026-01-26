import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import * as atatus from 'atatus-spa';
import import * as serviceWorkerRegistration from './serviceWorkerRegistration';

atatus.config('9f04e638d63f485a8a7ddf3d1fb89f2b').install();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

serviceWorkerRegistration.register();