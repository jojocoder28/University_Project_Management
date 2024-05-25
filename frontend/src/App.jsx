import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUs"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar.jsx';
import CopyrightElement from './elements/CopyrightElement.jsx';
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "./main.jsx";

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
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        // console.log(error)
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
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <CopyrightElement name="SDK CNQ" link="/"/>

      <ToastContainer position='top-center' />
    </Router>
    </>
  )
}

export default App