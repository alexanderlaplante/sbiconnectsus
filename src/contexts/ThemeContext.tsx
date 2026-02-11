import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Theme = "dark-gold" | "dark-blue" | "dusk" | "light" | "light-warm" | "light-forest";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("sbi-theme") as Theme;
    return saved || "dark-gold";
  });

  useEffect(() => {
    localStorage.setItem("sbi-theme", theme);
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
