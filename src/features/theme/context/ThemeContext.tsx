import { createContext, useEffect, useMemo, useState } from "react";
import { Theme, ThemeContextType } from "../theme.types";

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  //Get the stored theme from the loaclStorage
  const getStoredTheme = () => {
    const storedTheme = (localStorage.getItem("theme") as Theme) || null;
    return storedTheme || "light";
  };
  const storedTheme = getStoredTheme();

  const [theme, setTheme] = useState<Theme>(storedTheme);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const root = window.document.documentElement; //get the root element => html tag
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const ctxValue = useMemo(() => ({ theme, toggleTheme }), [theme]);
  return (
    <ThemeContext.Provider value={ctxValue}>{children}</ThemeContext.Provider>
  );
}
