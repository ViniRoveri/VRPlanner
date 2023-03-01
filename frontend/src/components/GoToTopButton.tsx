import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const stylesButton = `border bottom-8 fixed flex items-center justify-start left-[16%] pl-2 pr-8 py-1 rounded-xl text-[30px] -translate-x-[50%]`
const stylesIcon = `h-14 mr-4 w-14`

export default function GoToTopButton(){
   const [hideButton, setHideButton] = useState(true)

   function handleClick(){
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      })
   }

   function handleScroll(){
      const scrollHeight = window.scrollY
      const buttonShouldAppearHeight = 600

      const buttonShouldAppear = scrollHeight >= buttonShouldAppearHeight

      if(buttonShouldAppear){
         setHideButton(false)
      }else{
         setHideButton(true)
      }
   }

   useEffect(()=>{
      handleScroll()

      window.addEventListener('scroll', handleScroll)
   }, [])

   return (
      <button className={`${stylesButton} ${hideButton ? 'hidden' : ''}`} onClick={handleClick}>
         <ChevronUpIcon className={stylesIcon}/>

         Go to top
      </button>
   )
}