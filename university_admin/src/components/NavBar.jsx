import React from 'react'
import { BiSolidHome } from "react-icons/bi";
import { LuPackage } from "react-icons/lu";
import { GrValidate } from "react-icons/gr";
import { PiStudent } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";


function NavBar({activeTab}) {
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
            <li>
                <a className={`tooltip ${activeTab == "AdminSettings" ? "active" : ""}`} data-tip="Admin Settings" href="/adminSettings">
                    <IoMdSettings />
                </a>
            </li>
            </ul>
        </>
    )
}

export default NavBar
