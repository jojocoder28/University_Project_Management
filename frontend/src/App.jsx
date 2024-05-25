import React from 'react'
import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUs"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from './pages/Dashboard'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      <ToastContainer position='top-center' />
    </Router>
    </>
  )
}

export default App