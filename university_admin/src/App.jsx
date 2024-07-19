
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Dashboard from './pages/Dashboard';
import './App.css';
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from './components/NavBar';
import CopyrightElement from './components/CopyrightElement';
import NotFound from './components/NotFound';
import Loading from './components/Loading';
import { Context } from "./main";
import Login from './pages/Login';
import Students from './pages/Students';
import backend_api from './config';

const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
    useContext(Context);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${backend_api}api/v1/university/admin/universityadmin/getall`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
          }
        );
        // console.log(response);
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        // console.log(response);
        setIsAuthenticated(false);
        setAdmin({});
      }
      finally{
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
    <div className="flex flex-col items-center justify-start w-screen gap-4">
    {isLoading ? (
      <Loading/>):(
    <Router>
      
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        {/*<Route path="/university" element={<University />} />
        <Route path="/admin/addnew" element={<AddNewAdmin />} /> */}
        <Route path="/students" element={<Students />} /> 
        {isAuthenticated ? (<Route path="*" element={<NotFound/>} />):
        (
          <Route path="*" element={<Login/>} />
        )}
        
      </Routes>
      <CopyrightElement name="SDK CNQ" link="/"/>
      <ToastContainer position="top-center" />
    </Router>
    
  )}
  </div>
  </>
  );
};

export default App;


