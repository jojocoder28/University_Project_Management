import React from 'react'


import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";


const Home = () => {
  return ( <>
  <Navbar transparent/>
    <main>
    <div className="bg-white dark:bg-slate-800
    border-slate-100 dark:border-slate-500
    rounded-box px-7 py-5
    w-48 h-32">
      hello
    </div>
    </main>
    {/* <Footer/> */}
    </>
  )
}

export default Home