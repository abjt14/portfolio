"use client";

import React from "react";
import Cookie from "js-cookie";

export type ThemeName = "light" | "dark";

export type SurfaceTheme = ThemeName | "both";

type ThemeContextValue = {
  theme: ThemeName;
  handleChange: () => void;
  themeSwitching: boolean;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return context;
}

export default function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: ThemeName;
}) {
  const [theme, setTheme] = React.useState<ThemeName>(initialTheme);
  const [themeSwitching, setThemeSwitching] = React.useState(false);

  function handleChange() {
    const nextTheme = theme === "light" ? "dark" : "light";

    Cookie.set("color-theme", nextTheme, {
      expires: 1000,
    });

    const root = document.documentElement;

    root.setAttribute("data-color-theme", nextTheme);

    if (nextTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    setTheme(nextTheme);
    setThemeSwitching(true);
  }

  // if theme switches, make it true first, but after one second, make it false again, add the appropriate cleanup functions
  React.useEffect(() => {
    if (!themeSwitching) return;
    const timeoutId = setTimeout(() => {
      setThemeSwitching(false);
    }, 0);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [themeSwitching]);

  return (
    <ThemeContext.Provider value={{ theme, handleChange, themeSwitching }}>
      {children}
    </ThemeContext.Provider>
  );
}
