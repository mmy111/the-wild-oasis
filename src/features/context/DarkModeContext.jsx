import { createContext, useContext, useEffect } from "react";
import {useLocalStorageState} from "../../hooks/useLocalStorageState"

const DarkModeContext = createContext();

function DarkModeProvider({children}){
   const [isDarkMode,setIsDarkMode] = useLocalStorageState(false,"isDarkMode");
   useEffect(function(){
      if(isDarkMode){
         document.documentElement.classList.add('dark-mode')
         document.documentElement.classList.remove('dark-light')
      }else{
         document.documentElement.classList.remove('dark-mode')
         document.documentElement.classList.add('dark-light')
      }

   },[isDarkMode]);

   function toggleDarkMode(){
      setIsDarkMode((isDark)=>!isDark)
   }
   
   return <DarkModeContext.Provider value={{isDarkMode,toggleDarkMode}}>
   {children}
   </DarkModeContext.Provider>
}

function useDrakMode(){
   const context= useContext(DarkModeContext);
   if(context === undefined) throw Error('DarkMode context was used outsside of DarkModeProvider')
   return context;
}

export {DarkModeProvider,useDrakMode};