import { useIsDarkMode, useSetIsDarkMode } from "@/common/hooks"
import { useEffect } from "react"

export default function LocalStorageDarkModeController() {
   const isDarkMode = useIsDarkMode()
   const setIsDarkMode = useSetIsDarkMode()

   function getLocalStorageDarkMode(){
      const currentLocalStorageDarkModeString = localStorage.getItem('isDarkMode')
      const currentLocalStorageDarkMode = JSON.parse(currentLocalStorageDarkModeString || 'null')

      if(currentLocalStorageDarkMode){
         setIsDarkMode(currentLocalStorageDarkMode)
      }
   }

   function setLocalStorageDarkMode(){
      const currentDarkModeString = JSON.stringify(isDarkMode)
      
      localStorage.setItem('isDarkMode', currentDarkModeString)
   }

   useEffect(() => {
      getLocalStorageDarkMode()
   }, [])
   
   useEffect(() => {
      setLocalStorageDarkMode()
   }, [isDarkMode])

   return (
      <></>
   )
}