import { useSetShowHomeEventsList } from "@/common/hooks"
import { useEffect } from "react"

export default function ShowHomeEventsListController(){
   const setShowHomeEventList = useSetShowHomeEventsList()

   function showOrHideEventList(){
      const windowWidth = window.innerWidth
      
      const screenSizeThreshold = 769

      if(windowWidth >= screenSizeThreshold){
         setShowHomeEventList(true)
      }else{
         setShowHomeEventList(false)
      }
   }

   useEffect(()=>{
      showOrHideEventList()

      window.addEventListener('resize', ()=>{
         showOrHideEventList()
      })
   }, [])
   
   return (
      <></>
   )
}