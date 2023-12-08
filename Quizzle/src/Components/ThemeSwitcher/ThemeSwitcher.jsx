import { useEffect, useState } from "react";
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    return isDarkMode;
});

useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
}, [darkMode]);

const toggleDarkMode = () => {
    setDarkMode(!darkMode);
};
  
    return (
      <button
        onClick={toggleDarkMode}
        className={`px-4 py-2 rounded-full border-2 border-transparent focus:outline-none transition-all duration-500 ${darkMode ? 'bg-yellow-300' : 'bg-gray-800'}`}
      >
        <div className={`transform transition-transform duration-500 ${darkMode ? 'rotate-180' : ''}`}>
          {darkMode ? <FaSun className="text-orange-400" /> : <FaMoon className="text-white" />}
        </div>
      </button>
    );
  };
  
  export default ThemeSwitcher;