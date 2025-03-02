import React, { useState, useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, Monitor } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-3  transition-all">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold">
          QuizMaster
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <NavLink to="/dashboard" className="hover:text-blue-500">Dashboard</NavLink>
          <NavLink to="/create-quiz" className="hover:text-blue-500">Create Quiz</NavLink>
          <NavLink to="/attempt-quiz" className="hover:text-blue-500">Attempt Quiz</NavLink>
          <NavLink to="/profile" className="hover:text-blue-500">Profile</NavLink>
        </div>

        {/* Theme Toggle */}
        <div className="hidden md:flex gap-2">
          <button onClick={() => setTheme("light")} className={`p-2 rounded ${theme === "light" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}`}>
            <Sun size={20} className={theme === "light" ? "text-white" : "text-gray-900 dark:text-gray-300"} />
          </button>
          <button onClick={() => setTheme("dark")} className={`p-2 rounded ${theme === "dark" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}`}>
            <Moon size={20} className={theme === "dark" ? "text-white" : "text-gray-900 dark:text-gray-300"} />
          </button>
          <button onClick={() => setTheme("system")} className={`p-2 rounded ${theme === "system" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}`}>
            <Monitor size={20} className={theme === "system" ? "text-white" : "text-gray-900 dark:text-gray-300"} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 bg-gray-200 dark:bg-gray-800 p-4 rounded-md transition-all duration-300 ease-in-out">
          <NavLink to="/dashboard" className="hover:text-blue-500">Dashboard</NavLink>
          <NavLink to="/create-quiz" className="hover:text-blue-500">Create Quiz</NavLink>
          <NavLink to="/attempt-quiz" className="hover:text-blue-500">Attempt Quiz</NavLink>
          <NavLink to="/profile" className="hover:text-blue-500">Profile</NavLink>

          {/* Mobile Theme Toggle */}
          <div className="flex gap-2 justify-center mt-2">
            <button onClick={() => setTheme("light")} className={`p-2 rounded ${theme === "light" ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-700 dark:text-white"}`}>
              <Sun size={20} className={theme === "light" ? "text-white" : "text-gray-900 dark:text-gray-300"} />
            </button>
            <button onClick={() => setTheme("dark")} className={`p-2 rounded ${theme === "dark" ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-700 dark:text-white"}`}>
              <Moon size={20} className={theme === "dark" ? "text-white" : "text-gray-900 dark:text-gray-300"} />
            </button>
            <button onClick={() => setTheme("system")} className={`p-2 rounded ${theme === "system" ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-700 dark:text-white"}`}>
              <Monitor size={20} className={theme === "system" ? "text-white" : "text-gray-900 dark:text-gray-300"} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
