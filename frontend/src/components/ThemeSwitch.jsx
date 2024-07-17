import React from 'react'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const ThemeSwitch = () => {
    const [darkMode, setDarkMode] = useState(() => {
        // Get the theme from localStorage if it exists
        const storedMode = localStorage.getItem('darkMode');
        return storedMode ? JSON.parse(storedMode) : false;
      });
      useEffect(() => {
        if (darkMode) {
          document.documentElement.classList.add('dark');
          document.body.classList.add('bg-slate-950'); // Change body background color
          document.body.classList.add('text-white');
        } else {
          document.documentElement.classList.remove('dark');
          document.body.classList.remove('bg-gray-900');
          document.body.classList.remove('bg-slate-950'); // Change body background color
           // Change body background color
          document.body.classList.remove('text-white');
        }
        // Save the theme to localStorage
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
      }, [darkMode]);
    return (
    <button onClick={() => setDarkMode(!darkMode)} className="text-white text-lg focus:outline-none">
        <div className={`w-17 h-7 btn-circle ${!darkMode ? 'bg-teal-100 border-black border-1 shadow-lg' : 'bg-gray-700 border-white border-1 shadow-lg'} overflow-hidden absolute top-4 right-4 transition-transform duration-300 transform-gpu`}>
            <FontAwesomeIcon icon={darkMode ? faMoon : faSun} className="text-slate-950" />
          </div>
    </button>
  )
}

export default ThemeSwitch