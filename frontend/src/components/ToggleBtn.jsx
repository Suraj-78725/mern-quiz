import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon, Monitor } from "lucide-react";

const ToggleBtn = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="flex gap-2">
      <button
        className={`p-2 rounded ${theme === "light" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setTheme("light")}
      >
        <Sun size={20} />
      </button>

      <button
        className={`p-2 rounded ${theme === "dark" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setTheme("dark")}
      >
        <Moon size={20} />
      </button>

      <button
        className={`p-2 rounded ${theme === "system" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setTheme("system")}
      >
        <Monitor size={20} />
      </button>
    </div>
  );
};

export default ToggleBtn;
