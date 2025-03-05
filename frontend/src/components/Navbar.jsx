import React, { useState, useContext, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, Monitor, LogOut } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("accessToken"); // Clear the token
        toast.success("Logged out successfully!");
        navigate("/login"); // Redirect to login page
      } else {
        toast.error("Logout failed!");
      }
    } catch (error) {
      toast.error("An error occurred while logging out.");
    }
  };

  return (
    <nav className=" fixed top-0 left-0 w-full z-50 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-4 px-6 ">
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
          <button 
            onClick={handleLogout} 
            className="text-red-500 hover:text-red-600 flex items-center gap-1"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Theme Toggle */}
        <div className="hidden md:flex gap-2">
          <button onClick={() => setTheme("light")} className={`p-2 rounded ${theme === "light" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}`}>
            <Sun size={20} />
          </button>
          <button onClick={() => setTheme("dark")} className={`p-2 rounded ${theme === "dark" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}`}>
            <Moon size={20} />
          </button>
          <button onClick={() => setTheme("system")} className={`p-2 rounded ${theme === "system" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}`}>
            <Monitor size={20} />
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

          {/* Mobile Logout Button */}
          <button 
            onClick={handleLogout} 
            className="text-red-500 hover:text-red-600 flex items-center gap-1"
          >
            <LogOut size={18} /> Logout
          </button>

          {/* Mobile Theme Toggle */}
          <div className="flex gap-2 justify-center mt-2">
            <button onClick={() => setTheme("light")} className={`p-2 rounded ${theme === "light" ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-700 dark:text-white"}`}>
              <Sun size={20} />
            </button>
            <button onClick={() => setTheme("dark")} className={`p-2 rounded ${theme === "dark" ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-700 dark:text-white"}`}>
              <Moon size={20} />
            </button>
            <button onClick={() => setTheme("system")} className={`p-2 rounded ${theme === "system" ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-700 dark:text-white"}`}>
              <Monitor size={20} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
