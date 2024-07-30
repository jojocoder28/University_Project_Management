import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { Context } from "./main";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import AddNewAdmin from "./components/AddNewAdmin";
import "./App.css";
import CopyrightElement from "./components/CopyrightElement";
import NotFound from "./components/NotFound";
import University from "./components/University";
import AddUniversityAdmin from "./components/AddUniversityAdmin";
import AddUniversity from "./components/AddUniversity";
import Loading from "./components/Loading";
import backend_api from "./config";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
    useContext(Context);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          backend_api+"api/v1/user/admin/me",
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
    {isLoading ? (
      <Loading/>):(
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addUniversity" element={<AddUniversity />} />
        <Route path="/login" element={<Login />} />
        <Route path="/university" element={<University />} />
        <Route path="/admin/addnew" element={<AddNewAdmin />} />
        <Route path="/admin/adduniversityadmin" element={<AddUniversityAdmin />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <CopyrightElement name="SDK CNQ" link="/"/>
      <ToastContainer position="top-center" />
    </Router>
  )}
  </>
  );
};

export default App;
