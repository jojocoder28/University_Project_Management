
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
import CopyrightElement from '../../admin/admin_frontend_Unifolio/src/components/CopyrightElement';
import NotFound from '../../admin/admin_frontend_Unifolio/src/components/NotFound';
import Loading from '../../admin/admin_frontend_Unifolio/src/components/Loading';
import { Context } from "./main";
import Login from './pages/Login';

const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
    useContext(Context);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/university/admin/universityadmin/getall",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
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
      <div className="flex flex-col items-center justify-start pb-4">
        <NavBar activeTab="Home" />
        </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        {/*<Route path="/university" element={<University />} />
        <Route path="/admin/addnew" element={<AddNewAdmin />} />
        <Route path="/admin/adduniversityadmin" element={<AddUniversityAdmin />} /> */}
        <Route path="*" element={<NotFound/>} />
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


