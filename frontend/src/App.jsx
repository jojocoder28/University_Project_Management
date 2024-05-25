import React from 'react'
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

const App = () => {
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