"use client";

import React from "react";
import Cookie from "js-cookie";

export const ThemeContext = React.createContext();

export default function ThemeProvider({ children, initialTheme }) {
  const [theme, setTheme] = React.useState(initialTheme);
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
    let timeoutId;
    if (themeSwitching) {
      timeoutId = setTimeout(() => {
        setThemeSwitching(false);
      }, 0);
    }
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
