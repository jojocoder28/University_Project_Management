import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx';
import CopyrightElement from './elements/CopyrightElement.jsx';

export const Context = createContext({ isAuthenticated: false});

const AppWrapper = ()=>{
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  return(
    <Context.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser}}>
      <Navbar transparent/>
        <App />
      <CopyrightElement name="SDK CNQ" link="/"/>
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar transparent/>
      <App />
    <CopyrightElement name="SDK CNQ" link="/"/>
  </React.StrictMode>,
)
