import ThemeSwitch from "./ThemeSwitch.jsx";
import NavbarElements from "../elements/NavbarElements.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import React, { useContext, useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {backend_api} from "../config.js";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const {user, setUser} = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          backend_api+"api/v1/user/me" || "http://localhost:4000/api/v1/user/me",
          { withCredentials: true }
        );
        setUser(data.user);
        // console.log(data.user);
      } catch (error) {
        setUser([]);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await axios
      .get(backend_api+"api/v1/user/logout" || "http://localhost:4000/api/v1/user/logout", {
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

  const goToLogin = () => {
    navigateTo("/login");
  };
  return (
    <nav
      className={
        (props.transparent
          ? "top-0 relative z-50 w-full"
          : "relative bg-white shadow-lg") +
        " flex flex-wrap items-center justify-between px-2 py-3 top-2"
      }
    >
      <div className="container lg:px-4 lg:mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex lg:w-auto lg:static lg:block lg:justify-start">
        <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
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
          {!isAuthenticated ? (<a
            className={
              (props.transparent ? "text-black dark:text-white" : "text-gray-800") +
              " text-sm leading-none mr-4 whitespace-nowrap uppercase px-3 py-4 lg:py-2 flex items-center font-bold dark:hover:text-teal-700 hover:text-teal-900"
            }
            href="/"
          >
            UniFolio
          </a>):(<a
            className={
              (props.transparent ? "text-black dark:text-white" : "text-gray-800") +
              " text-sm leading-none mr-4 whitespace-nowrap uppercase px-3 py-4 lg:py-2 flex items-center font-bold dark:hover:text-teal-700 hover:text-teal-900"
            }
            href="/dashboard"
          >
            {user.username}
          </a>)}
          
        </div>
        <div
          className={
            "lg:flex dark:bg-transparent bg-white lg:bg-transparent lg:shadow-none" +
            (navbarOpen ? " block rounded shadow-lg" : " hidden")
          }
          id="example-navbar-warning"
        >
          <NavbarElements name="Home" link="/" flag={navbarOpen}/>
          <NavbarElements name="About Us" link="about" flag={navbarOpen}/>
          {/* <NavbarElements name="Login" link="login" flag={navbarOpen}/> */}
          <ul className="flex flex-col lg:flex-row list-none mr-auto">
            
            {isAuthenticated ? (
              <li className="flex items-center">
                <button
                className={"dark:text-white text-gray-800 dark:hover:text-teal-500 hover:text-teal-500 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"}
                onClick={handleLogout}
              >
                Logout
              </button></li>):(<><li><NavbarElements name="Register" link="register" flag={navbarOpen} /></li>
              <li><button
                  className={"dark:text-white dark:hover:text-teal-500 text-gray-800 hover:text-teal-500 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"}
                  onClick={goToLogin}
                >
                  Login
                </button></li></>)}
            
          </ul>

        </div>
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">       
            <li className="flex items-center">
             <ThemeSwitch/>
            </li>
          </ul>
      </div>
    </nav>
    
  );
}