import "./App.css";
import React, { useContext, useEffect, useState } from "react";
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
import axios from "axios";
import { Context } from "./main.jsx";
import NotFound from "./components/NotFound.jsx";
import Loading from "./components/Loading.jsx";
import {backend_api} from "./config.js";
import AboutData from "./components/AboutData.jsx";
import AddProject from "./pages/AddProject.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import ProfileView from "./pages/ProfileView.jsx";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          backend_api+"api/v1/user/me" || "http://localhost:4000/api/v1/user/me",
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
      finally{
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [isAuthenticated]);
  return (
    <>
    {isLoading ? (
      <Loading/>):(
    
    <Router>
    <Navbar transparent/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/project/add" element={<AddProject/>} />
        <Route path="/project/:projectId" element={<ProjectPage />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/profile/:email" element={<ProfileView />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <CopyrightElement name="Unifolio" link="/"/>
      <ToastContainer position='top-center' />
    </Router>
  )}
  </>
  )
}

export default App