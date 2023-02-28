import { authenticateUserServerSide } from "@/common/functions";
import { pageTransitionDuration } from "@/common/globalConstants";
import { Ctx } from "@/common/types";
import Calendar from "@/components/Calendar";
import DateSelector from "@/components/DateSelector";
import DefaultHead from "@/components/DefaultHead";
import DividingLine from "@/components/DividingLine";
import HomePageEventList from "@/components/HomePageEventList";
import UserEventsPart from "@/components/UserEventsPart";
import { useEffect, useState } from "react";

export async function getServerSideProps(ctx:Ctx){
   return await authenticateUserServerSide(ctx)
}

const stylesContainer = `flex justify-center`

export default function HomePage(){
   const [hideEventList, setHideEventList] = useState(true)

   function showOrHideEventList(context:'start'|'resize'){
      const windowWidth = context === 'resize' ? window.innerWidth : window.innerWidth / 2

      if(windowWidth >= 769){
         setHideEventList(false)
      }else{
         setHideEventList(true)
      }
   }

   useEffect(()=>{
      showOrHideEventList('start')

      window.addEventListener('resize', ()=>{
         showOrHideEventList('resize')
      })
   }, [])

   return (
      <>
      <DefaultHead title="Home | VR Planner"/>

      <section className={stylesContainer}>
         <main className="main-home">
            <DateSelector/>

            <Calendar/>

            <DividingLine/>

            <UserEventsPart/>
         </main>

         {!hideEventList && 
            <HomePageEventList/>
         }
      </section>
      </>
   )
}