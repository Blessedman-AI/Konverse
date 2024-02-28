'use client';

import { createContext, useState, useEffect } from 'react';

// Creating the Theme Context
export const ThemeContext = createContext();

// Function to retrieve theme information from local
//storage so theme does not revert to default upon page reload 00:35:50

// const getFromLocalStorage = () => {
//   if (typeof window !== 'undefined' && window.localStorage !== undefined) {
//     const value = localStorage.getItem('theme');
//     return value || 'light';
//   } else {
//     return 'light';
//   }
// };
const getFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem('theme');
    return value || 'light';
  }
};

// Creating the Theme Context Provider
export const ThemeContextProvider = ({ children }) => {
  //   Initializing state for the theme using useState
  const [theme, setTheme] = useState(() => {
    return getFromLocalStorage();
  });

  const toggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);
  //   const [theme, setTheme] = useState(getFromLocalStorage());
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
