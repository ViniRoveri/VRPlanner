import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'
import { useIsDarkMode, useSetIsDarkMode } from '@/common/hooks'

type Props = {
   styles: string
}

export default function DarkModeSwitcher(props: Props) {
   const isDarkMode = useIsDarkMode()
   const setIsDarkMode = useSetIsDarkMode()

   function switchIsDarkMode(){
      setIsDarkMode(!isDarkMode)
   }

   useEffect(() => {
      if (isDarkMode) {
         document.documentElement.classList.add('dark')
      } else {
         document.documentElement.classList.remove('dark')
      }
   }, [isDarkMode])

   return (
      <button onClick={()=> switchIsDarkMode()} type='button'>
         {
            isDarkMode ? 

            <SunIcon className={props.styles}/>
            
            :
            
            <MoonIcon className={props.styles}/>
         }
      </button>
   )
}