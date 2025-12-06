import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-primary"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5 text-yellow-400 transition-transform duration-300" />
      ) : (
        <MoonIcon className="h-5 w-5 text-pm-background transition-transform duration-300" />
      )}
    </button>
  );
}
