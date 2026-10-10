"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemeMode = "dark" | "light";
export type Language = "uz" | "ru" | "en";

type AppContextValue = {
  theme: ThemeMode;
  language: Language;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: Language) => void;
  toggleTheme: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("dark");
  const [language, setLanguageState] = useState<Language>("en");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("grand-luxury-theme") as ThemeMode | null;
    const savedLanguage = window.localStorage.getItem("grand-luxury-language") as Language | null;

    if (savedTheme === "light" || savedTheme === "dark") {
      setThemeState(savedTheme);
    }

    if (savedLanguage === "uz" || savedLanguage === "ru" || savedLanguage === "en") {
      setLanguageState(savedLanguage);
    }

    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) {
      return;
    }

    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("grand-luxury-theme", theme);
  }, [theme, hasMounted]);

  useEffect(() => {
    if (!hasMounted) {
      return;
    }

    document.documentElement.lang = language;
    localStorage.setItem("grand-luxury-language", language);
  }, [language, hasMounted]);

  const setTheme = (nextTheme: ThemeMode) => setThemeState(nextTheme);
  const setLanguage = (nextLanguage: Language) => setLanguageState(nextLanguage);
  const toggleTheme = () => setThemeState((current) => (current === "dark" ? "light" : "dark"));

  const value = useMemo(
    () => ({ theme, language, setTheme, setLanguage, toggleTheme }),
    [theme, language],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
}
