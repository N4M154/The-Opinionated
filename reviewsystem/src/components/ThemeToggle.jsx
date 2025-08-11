import { useEffect, useState } from "react";
import { FaSun } from "react-icons/fa";
import { IoMdMoon } from "react-icons/io";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newTheme = theme === "light" ? "dark" : "light";

    setTimeout(() => {
      setTheme(newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      localStorage.setItem("theme", newTheme);

      setTimeout(() => setIsAnimating(false), 300);
    }, 150);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Seesaw Container */}
      <div
        onClick={toggleTheme}
        className="relative w-20 h-8 cursor-pointer group"
      >
        {/* Seesaw Bar */}
        <div
          className={`absolute top-6 left-1 w-10 h-0.5 bg-black/80 dark:bg-white/80 transition-all duration-500 ease-in-out transform-gpu origin-center ${
            theme === "light" ? "rotate-20" : "-rotate-20"
          } ${isAnimating ? "duration-700" : ""}`}
        >
          {/* Sun Icon Left */}
          <div
            className={`absolute -top-7 -left-1 transition-all duration-500 ${
              theme === "light"
                ? "transform translate-y-2 opacity-100"
                : "transform translate-y-2 opacity-60"
            }`}
          >
            <FaSun
              size={18}
              className={`text-yellow-400 ${theme === "light" ? "animate-bounce" : ""}`}
            />
          </div>

          {/* Moon Icon Right */}
          <div
            className={`absolute -top-7 -right-1 transition-all duration-500 ${
              theme === "dark"
                ? "transform translate-y-2 opacity-100"
                : "transform translate-y-2 opacity-60"
            }`}
          >
            <IoMdMoon
              size={18}
              className={`text-pink-500 ${theme === "dark" ? "animate-bounce" : ""}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
