import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route , BrowserRouter, Routes } from 'react-router-dom';
import Auth from './components/auth';
import { CookiesProvider } from 'react-cookie';


export const TokenContext = createContext(null);

function Router(){

  // const TOKEN = "a5f742ed10c01cd442900e7c6fa3dd8566b34d7a"
  // const [token, setToken] = useState('');

  return(
    <React.StrictMode>
      {/* <TokenContext.Provider value={{token, setToken}}> */}
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" Component={Auth} />
            <Route exact path="/movies/" Component={App} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
      {/* </TokenContext.Provider> */}
  </React.StrictMode>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
