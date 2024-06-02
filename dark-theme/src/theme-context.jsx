import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {  
   const [isDarkMode, setisDarkMode] = useState(false);
   const toggleTheme = () => {
    setisDarkMode(!isDarkMode);
   }; 

   const theme = isDarkMode ? 'dark' : 'light';

   useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
   }, [theme])

    return (
         <ThemeContext.Provider value={{theme, toggleTheme}}>
              {children}
         </ThemeContext.Provider>
    );
}