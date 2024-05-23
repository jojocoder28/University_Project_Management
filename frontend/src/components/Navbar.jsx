import React from "react";
import ThemeSwitch from "./ThemeSwitch.jsx";
import NavbarElements from "../elements/NavbarElements.jsx";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <nav
      className={
        (props.transparent
          ? "top-0 relative z-50 w-full"
          : "relative bg-white shadow-lg") +
        " flex flex-wrap items-center justify-between px-2 py-3 top-2"
      }
    >
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
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
          <a
            className={
              (props.transparent ? "text-black dark:text-white" : "text-gray-800") +
              " text-sm leading-none mr-4 whitespace-nowrap uppercase px-3 py-4 lg:py-2 flex items-center font-bold"
            }
            href="/"
          >
            UniFolio
          </a>
          
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
          <NavbarElements name="Login" link="login" flag={navbarOpen}/>
          <NavbarElements name="Register" link="register" flag={navbarOpen}/>

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