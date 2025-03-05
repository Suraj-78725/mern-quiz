import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, FilePlus, PlayCircle, KeyRound, Brain, User } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);

  return (
      <div className="w-[20%] fixed pt-16 hidden sm:block sm:w-[20%] min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg transition-all">

      <div className="flex flex-col gap-4 text-[15px] p-4">
        {/* Sidebar Links */}
        {[
          { to: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
          { to: "/create-quiz", icon: <FilePlus size={20} />, label: "Create Quiz" },
          { to: "/history", icon: <PlayCircle size={20} />, label: "History" },
          { to: "/join-quiz", icon: <KeyRound size={20} />, label: "Join Quiz By ID" },
          { to: "/ai-quiz", icon: <Brain size={20} />, label: "AI Quiz" },
          { to: "/profile", icon: <User size={20} />, label: "Profile" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-blue-400 text-white shadow-md"
                  : "hover:bg-blue-100 dark:hover:bg-gray-800"
              }`
            }
          >
            {item.icon}
            <p className="hidden md:block">{item.label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
