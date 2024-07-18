import React, { useContext, useEffect, useState } from 'react'
import { BiSolidHome } from "react-icons/bi";
import { LuPackage } from "react-icons/lu";
import { GrValidate } from "react-icons/gr";
import { PiStudent } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { Context } from '../main';
import { BiLogInCircle } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";

function NavBar({activeTab}) {
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
                <a className={`tooltip ${activeTab == "Logout" ? "active" : ""}`} data-tip="Logout" href="/logout">
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
