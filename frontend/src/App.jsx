import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import AboutUs from "./pages/AboutUs.jsx"
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import Dashboard from './pages/Dashboard.jsx'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar.jsx';
import CopyrightElement from './elements/CopyrightElement.jsx';
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "./main.jsx";
import NotFound from "./components/NotFound.jsx";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/me",
          {
            withCredentials: true,
          }
        );
        // console.log(response);
        setIsAuthenticated(true);
        // console.log(isAuthenticated);
        setUser(response.data.user);
      } catch (error) {
        console.log("sdk cnq error !!!!!!!!!!!!!");
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);
  return (
    <>
    <Router>
    <Navbar transparent/>
      <Routes>
        {isAuthenticated ? (<Route path="/" element={<Dashboard />} />):(<Route path="/" element={<Home />} />)}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <CopyrightElement name="SDK CNQ" link="/"/>
      <ToastContainer position='top-center' />
    </Router>
    </>
  )
}

export default App