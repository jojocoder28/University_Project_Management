import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";


const Sidebar = (props) => {
  const [show, setShow] = useState(false);
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/admin/logout", {
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

  const navigateTo = useNavigate();

  const gotoHomePage = () => {
    navigateTo("/");
    setShow(!show);
  };
  const gotoUsersPage = () => {
    navigateTo("/users");
    setShow(!show);
  };
  const gotoUniversityPage = () => {
    navigateTo("/university");
    setShow(!show);
  };
  const gotoAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
    setShow(!show);
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  };
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }


  return (
    <>
      

      <nav
      className={
        (props.transparent
          ? "top-0 relative z-50 w-full"
          : "relative bg-white shadow-lg") +
        " flex flex-wrap items-center justify-between px-2 py-3 top-2"
      }
    >
      <div className={"container px-4 mx-auto flex flex-wrap items-center" + (navbarOpen ? "justify-start" : " justify-center")}>
        <div className="w-full relative flex lg:w-auto lg:static lg:block lg:justify-start">
        <button
            className="overflow-hidden cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i
              className={
                (props.transparent ? "dark:text-white text:black"  : "text-gray-800") +
                " fas fa-bars"
              }
            ><svg
            className={`h-8 w-8 transition-transform duration-300 ${navbarOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={navbarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg></i>
          </button>
        
          
        </div>
        <div
          className={
            "lg:flex dark:bg-transparent bg-white lg:bg-transparent lg:shadow-none" +
            (navbarOpen ? "block rounded shadow-lg" : " hidden")
          }
          id="example-navbar-warning"
        >
          <TiHome onClick={gotoHomePage} className="text-2xl mx-12 cursor-pointer hover:text-blue-700" />
          <div className={navbarOpen ? "py-2":""}></div>
          <FaUserDoctor onClick={gotoUsersPage} className="text-2xl mx-12 cursor-pointer hover:text-blue-700" />
          <div className={navbarOpen ? "py-2":""}></div>
          <MdAddModerator onClick={gotoAddNewAdmin} className="text-2xl mx-12 cursor-pointer hover:text-blue-700" />
          <div className={navbarOpen ? "py-2":""}></div>
          <IoPersonAddSharp onClick={gotoAddNewDoctor} className="text-2xl mx-12 cursor-pointer hover:text-blue-700" />
          <div className={navbarOpen ? "py-2":""}></div>
          <AiFillMessage onClick={gotoUniversityPage} className="text-2xl mx-12 cursor-pointer hover:text-blue-700" />
          <div className={navbarOpen ? "py-2":""}></div>
          <RiLogoutBoxFill onClick={handleLogout} className="text-2xl mx-12 cursor-pointer hover:text-blue-700" />
          {/* <NavbarElements name="Login" link="login" flag={navbarOpen}/> */}
         

        </div>
          {/* <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">       
            <li className="flex items-center">
             <ThemeSwitch/>
            </li>
          </ul> */}
      </div>
    </nav>
    </>
  );
};

export default Sidebar;
