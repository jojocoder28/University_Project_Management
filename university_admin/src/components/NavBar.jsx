import React, { useContext, useEffect, useState } from 'react'
import { BiSolidHome } from "react-icons/bi";
import { LuPackage } from "react-icons/lu";
import { GrValidate } from "react-icons/gr";
import { PiStudent } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { Context } from '../main';
import { BiLogInCircle } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";
import backend_api from '../config.js';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function NavBar({activeTab}) {
    const handleLogout = async () => {
        await axios
          .get(backend_api+"api/v1/university/admin/logout" || "http://localhost:4000/api/v1/university/admin/logout", {
            withCredentials: true,
          })
          .then((res) => {
            toast.success(res.data.message);
            setIsAuthenticated(false);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      };
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    return (
        <>
            <ul className="menu menu-lg menu-horizontal bg-base-200 rounded-box mt-6">
            <li>
                <a className={`tooltip ${activeTab == "Home" ? "active" : ""}`} data-tip="Home" href="/">
                    <BiSolidHome />
                </a>
            </li>
            <li>
                <a className={`tooltip ${activeTab == "Projects" ? "active" : ""}`} data-tip="Projects" href="/projects">
                    <LuPackage />
                </a>
            </li>
            <li>
                <a className={`tooltip ${activeTab == "ReviewProjects" ? "active" : ""}`} data-tip="Review Projects" href="/reviewProjects">
                    <GrValidate />
                </a>
            </li>
            <li>
                <a className={`tooltip ${activeTab == "Students" ? "active" : ""}`} data-tip="Students" href="/students">
                    <PiStudent />
                </a>
            </li>
            {isAuthenticated ? ( <li>
                <a className={`tooltip ${activeTab == "Login" ? "active" : ""}`} data-tip="Logout" onClick={handleLogout}>
                <TbLogout />
                </a>
            </li>):(
                 <li>
                 <a className={`tooltip ${activeTab == "Login" ? "active" : ""}`} data-tip="Login" href="/login">
                    <BiLogInCircle />
                 </a>
             </li>
            )}
           
            </ul>
        </>
    )
}

export default NavBar
